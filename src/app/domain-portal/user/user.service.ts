import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../entity/user';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from '../../../entity/response';

@Injectable()
export class UserService {
  private _rootPath = '/api/user';

  constructor(private _http: HttpClient) {
  }

  listUser(domain_id: number): Observable<User[]> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}`)
      .map(data => data.result as User[]);
  }

  addUser(domain_id: number, username: string, password: string): Observable<any> {
    return this._http.post(`${this._rootPath}/${domain_id}`, {
      username: username,
      password: password
    });
  }

  getUser(domain_id: number, user_id: number): Observable<User> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}/${user_id}`)
      .map(data => data.result as User);
  }

  updateUser(domain_id: number, user_id: number, password: string): Observable<any> {
    return this._http.put(`${this._rootPath}/${domain_id}/${user_id}`, {password: password});
  }

  deleteUser(domain_id: number, user_id: number): Observable<any> {
    return this._http.delete(`${this._rootPath}/${domain_id}/${user_id}`);
  }

}
