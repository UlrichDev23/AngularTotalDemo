import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private host: String = 'http://localhost:8089';
  constructor(private http: HttpClient) {}

  public getProduct(keyword: String = '', page: number = 1, size: number = 4) {
    return this.http.get(
      `${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,
      { observe: 'response' }
    );
  }

  public changeProduct(p: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.host}/${p.id}`, {
      checked: !p.checked,
    });
  }

  public deleteProduct(p: Product) {
    return this.http.delete(`${this.host}/${p.id}`);
  }

  public saveProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`, p);
  }

  /* public searchProduct(keyword: String): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `http://localhost:8089/products?name_like=${keyword}`
    );
  }*/
  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${id}`);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/${product.id}`, { product });
  }
}
