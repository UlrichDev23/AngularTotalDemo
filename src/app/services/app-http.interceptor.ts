import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AppStateService } from './app-state.service';
import { LoadingService } from './loading.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private appState: AppStateService,
    private loadingService: LoadingService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /*this.appState.setProductsState({
      status: 'LOADING',
    });*/

    this.loadingService.showLoadingSpinner();

    let request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer JWT'),
    });

    console.log('Requête interceptée:', req.url);
    return next.handle(request).pipe(
      finalize(() => {
        /*this.appState.setProductsState({
          status:"LOADED"
        })*/
        this.loadingService.hideLoadingSpinner();
      })
    );
  }
}
