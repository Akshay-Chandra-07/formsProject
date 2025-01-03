import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
  return next(newReq);
};
