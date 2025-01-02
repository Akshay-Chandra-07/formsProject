import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log(sessionStorage.getItem('token'))
  const newReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  })
  return next(newReq);
};
