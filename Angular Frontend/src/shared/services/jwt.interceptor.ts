import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //if logged in (has token), put that jwt in the authorization header
        if (localStorage.getItem('token')) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            console.log(request)
        }
        return next.handle(request);
    }
}