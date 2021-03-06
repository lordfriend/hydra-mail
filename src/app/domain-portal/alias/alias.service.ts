import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Alias } from '../../../entity/alias';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from '../../../entity/response';
import { CrudService } from '../crud-service';

@Injectable()
export class AliasService implements CrudService<Alias> {
  private _rootPath = '/api/alias';

  constructor(private _http: HttpClient) {
  }

  list(domain_id: number): Observable<Alias[]> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}`)
      .map(data => data.result as Alias[]);
  }

  add(domain_id: number, alias: any): Observable<any> {
    return this._http.post(`${this._rootPath}/${domain_id}`, alias);
  }

  getAlias(domain_id: number, alias_id: number): Observable<Alias> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}/${alias_id}`)
      .map(data => data.result as Alias);
  }

  delete(domain_id: number, alias_id: number): Observable<any> {
    return this._http.delete(`${this._rootPath}/${domain_id}/${alias_id}`);
  }
}
