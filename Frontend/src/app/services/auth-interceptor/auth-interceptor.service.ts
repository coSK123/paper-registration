import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { TokenHandlerService } from '../token-handler-service/token-handler.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
const token = inject(TokenHandlerService).getToken();
if (token) {
  const cloned = req.clone({
    setHeaders: {
      authorization: token,
    },
  });
  return next(cloned);
} else {
  return next(req);
}
};

