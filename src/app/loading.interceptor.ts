import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from './services/loader.service';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loadingService: LoaderService,
    private tokenService: StorageService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {   
    let authentication = request;
    const token = this.tokenService.getToken();
    if (token != null) {
      authentication = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(authentication).pipe(
      catchError((error) => {
        if(this.router.url.indexOf('registration') < 0){
          this.router.navigate(['/']);
        }
        return throwError((error));
      }),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}