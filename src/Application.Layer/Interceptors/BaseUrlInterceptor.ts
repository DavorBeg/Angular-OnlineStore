import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    baseUrl: string = "https://dummyjson.com";

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
        return next.handle(apiReq);
    }
    
}