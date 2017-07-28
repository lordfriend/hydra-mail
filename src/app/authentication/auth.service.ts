import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AccountInfo } from '../../entity/account-info';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthService {
  private _rootPath = '/api';
  private _loginChecked = false;
  private _accountInfoSubject = new BehaviorSubject<AccountInfo>(null);

  get accountInfo(): Observable<AccountInfo> {
    return this._accountInfoSubject.asObservable();
  }

  constructor(private _http: HttpClient) {
    this.checkLogin();
  }

  checkInviteCode(code: number): Observable<any> {
    return this._http.get(`${this._rootPath}/invite?code=${code}`);
  }

  register(username: string, password: string, code: string): Observable<any> {
    return this._http.post(`${this._rootPath}/register?code=${code}`, {
      username: username,
      password: password
    });
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post<AccountInfo>(`${this._rootPath}/login`, {
      username: username,
      password: password
    })
      .do((info: AccountInfo) => {
        window.localStorage.setItem('account_info.username', info.username);
        window.localStorage.setItem('account_info.level', info.level);
        window.localStorage.setItem('account_info.token', info.token);
        this._accountInfoSubject.next(info);
      });
  }

  private checkLogin(): void {
    const token = window.localStorage.getItem('account_info.token');
    if (token) {
      this._http.get(`${this._rootPath}/login`, {
        params: new HttpParams().set('token', token)
      })
        .subscribe(() => {
          this._loginChecked = true;
          this._accountInfoSubject.next({
            username: window.localStorage.getItem('account_info.username'),
            level: window.localStorage.getItem('account_info.level'),
            token: token
          });
        }, () => {
          this._loginChecked = true;
          this.invalidStorage();

        });
    } else {
      this._loginChecked = true;
      this._accountInfoSubject.next(null);
    }
  }

  logout(): Observable<any> {
    return this._http.delete(`${this._rootPath}/login`)
      .do(() => {
        this.invalidStorage();
      });
  }

  changePassword(password: string, code: string): Observable<any> {
    return this._http.put(`${this._rootPath}/login?code=${code}`, {
      password: password
    });
  }

  /**
   * get a checked account info
   * @returns {Promise<any>}
   */
  getAccountInfo(): Promise<AccountInfo|null> {
    return new Promise((resolve, reject) => {
      const subscription = this.accountInfo.subscribe(
        (info) => {
          if (this._loginChecked) {
            if (info) {
              resolve(info);
            } else {
              reject(info);
            }
            subscription.unsubscribe();
          }
        }
      );
    });
  }

  private invalidStorage() {
    window.localStorage.removeItem('account_info.username');
    window.localStorage.removeItem('account_info.level');
    window.localStorage.removeItem('account_info.token');
    this._accountInfoSubject.next(null);
  }
}
