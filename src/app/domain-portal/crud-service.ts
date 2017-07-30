import { Observable } from 'rxjs/Observable';

export interface CrudService<T> {
  list(domain_id: number): Observable<T[]>;
  add(domain_id: number, payload: any): Observable<any>;
  delete(domain_id: number, id: number): Observable<any>;
}
