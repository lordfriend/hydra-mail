import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

const WHITELIST = [
  {url: '/api/invite', method: 'GET'},
  {url: '/api/register', method: 'POST'},
  {url: '/api/login', method: 'POST'},
  {url: '/api/login', method: 'GET'},
  {url: '/api/login', method: 'PUT'}
];

/**
 * Intercept request append token
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isInWhiteList(req)) {
      return next.handle(req);
    }
    const token = window.localStorage.getItem('account_info.token');
    const dupReq = req.clone({params: req.params.set('token', token)});
    return next.handle(dupReq);
  }

  private isInWhiteList(req: HttpRequest<any>) {
    return WHITELIST.some((matcher) => {
      return matcher.url === req.url && matcher.method === req.method;
    });
  }
}
