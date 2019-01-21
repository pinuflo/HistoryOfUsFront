import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUserAuth = JSON.parse(localStorage.getItem(environment.env_key +'currentUserToken'));

        if (currentUserAuth) {
            request = request.clone({
                setHeaders: { 
                    'Authorization': `bearer ${currentUserAuth.token}`
                }
            });
        }

        return next.handle(request);
    }
}