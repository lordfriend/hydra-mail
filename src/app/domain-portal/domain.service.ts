import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Domain } from '../../entity/domain';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from '../../entity/response';

@Injectable()
export class DomainService {
  private _rootPath = '/api/domain';

  constructor(private _http: HttpClient) {
  }

  listDomain(): Observable<Domain[]> {
    return this._http.get<ResponseEntity>(`${this._rootPath}`)
      .map(data => data.result as Domain[]);
  }

  addDomain(domain_name: string): Observable<Domain> {
    return this._http.post<ResponseEntity>(`${this._rootPath}`, {
      domain: domain_name
    })
      .map(data => data.result as Domain);
  }

  getDomain(domain_id: number): Observable<Domain> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}`)
      .map(data => data.result as Domain);
  }

  deleteDomain(domain_id: number): Observable<any> {
    return this._http.delete(`${this._rootPath}/${domain_id}`);
  }
}
