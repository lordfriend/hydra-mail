import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Transport } from '../../../entity/transport';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from '../../../entity/response';

@Injectable()
export class TransportService {
  private _rootPath = '/api/transport';

  constructor(private _http: HttpClient) {
  }

  listTransport(domain_id: number): Observable<Transport[]> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}`)
      .map(data => data.result as Transport[]);
  }

  addTransport(domain_id: number, transport: any): Observable<any> {
    return this._http.post(`${this._rootPath}/${domain_id}`, transport);
  }

  getTransport(domain_id: number, transport_id: number): Observable<Transport> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/${domain_id}/${transport_id}`)
      .map(data => data.result as Transport);
  }

  deleteTransport(domain_id: number, transport_id: number): Observable<any> {
    return this._http.delete(`${this._rootPath}/${domain_id}/${transport_id}`);
  }

}
