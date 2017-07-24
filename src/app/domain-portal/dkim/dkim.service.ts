import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DkimService {
  private _rootPath = '/api/dkim';

  constructor(private _http: HttpClient) {
  }

  getDkimRecord(domain_id: number): Observable<any> {
    return this._http.get(`${this._rootPath}/${domain_id}`);
  }

  updateDkimRecord(domain_id: number, record: any): Observable<any> {
    return this._http.put(`${this._rootPath}/${domain_id}`, record);
  }
}
