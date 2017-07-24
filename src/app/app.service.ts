import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Server } from '../entity/server';
import { HttpClient } from '@angular/common/http';
import { ResponseEntity } from '../entity/response';

@Injectable()
export class AppService {
  private _rootPath = '/api';

  constructor(private _http: HttpClient) {
  }

  listServer(): Observable<Server[]> {
    return this._http.get<ResponseEntity>(`${this._rootPath}/server`)
      .map(data => data.result as Server[]);
  }
}
