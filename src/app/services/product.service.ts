import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProduct(keyword: String = '', page: number = 1, size: number = 4) {
    return this.http.get(
      `http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`,
      { observe: 'response' }
    );
  }

  public changeProduct(p: Product): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:8089/products/${p.id}`, {
      checked: !p.checked,
    });
  }

  public deleteProduct(p: Product) {
    return this.http.delete(`http://localhost:8089/products/${p.id}`);
  }

  public saveProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products`, p);
  }

  /* public searchProduct(keyword: String): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `http://localhost:8089/products?name_like=${keyword}`
    );
  }*/
}
