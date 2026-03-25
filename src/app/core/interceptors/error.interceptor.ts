import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error) => {

      let message = 'Ha ocurrido un error';

      if (error?.error?.message) {
        message = error.error.message;
      }

      console.error('HTTP Error:', error);

      return throwError(() => new Error(message));
    })
  );
};