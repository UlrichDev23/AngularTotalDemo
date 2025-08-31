import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  public productsState: any = {
    products: [],
    keyword: '',
    totalPages: 0,
    totalSize: 4,
    currentPage: 1,
    totalProducts: 0,
    status: '',
    errorMessage: '',
  };

  public authState: any = {
    isAuthenticated: false,
    username: undefined,
    password: undefined,
    roles: undefined,
    token: undefined,
  };

  constructor() {}

  public setProductsState(state: any): void {
    this.productsState = { ...this.productsState, ...state };
  }

  public setAuthState(state:any){
    this.authState={...this.authState, ...state};
  }
}
