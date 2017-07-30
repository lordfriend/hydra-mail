import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Transport } from '../../../entity/transport';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from '../../../entity/response';
import { CrudService } from '../crud-service';

@Injectable()
export class TransportService implements CrudService<Transport> {
  private _rootPath = '/api/transport';

  constructor(private _http: HttpClient) {
  }

  list(domain_id: number): Observable<Transport[]> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}`)
      .map(data => data.result as Transport[]);
  }

  add(domain_id: number, transport: any): Observable<any> {
    return this._http.post(`${this._rootPath}/${domain_id}`, transport);
  }

  getTransport(domain_id: number, transport_id: number): Observable<Transport> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}/${transport_id}`)
      .map(data => data.result as Transport);
  }

  delete(domain_id: number, transport_id: number): Observable<any> {
    return this._http.delete(`${this._rootPath}/${domain_id}/${transport_id}`);
  }

}
