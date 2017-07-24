import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Bcc } from '../../../entity/bbc';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from '../../../entity/response';

@Injectable()
export class BccService {
  private _rootPath = '/api/bcc';

  constructor(private _http: HttpClient) {
  }

  listBcc(domain_id: number): Observable<Bcc[]> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}`)
      .map(data => data.result as Bcc[]);
  }

  addBcc(domain_id: number, bcc: any): Observable<any> {
    return this._http.post<ResponseEntity>(`${this._rootPath}/${domain_id}`, bcc)
      .map(data => data.result);
  }

  getBcc(domain_id: number, bcc_id: number): Observable<Bcc> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}/${bcc_id}`)
      .map(data => data.result as Bcc);
  }

  deleteBcc(domain_id: number, bcc_id: number): Observable<any> {
    return this._http.delete(`${this._rootPath}/${domain_id}/${bcc_id}`);
  }
}
