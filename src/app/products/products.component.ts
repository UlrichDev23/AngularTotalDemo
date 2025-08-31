import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    public appState: AppStateService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    /*this.appState.setProductsState({
      status: 'LOADING',
    });*/
    this.productService
      .getProduct(
        this.appState.productsState.keyword,
        this.appState.productsState.currentPage,
        this.appState.productsState.totalSize
      )
      .subscribe({
        next: (res) => {
          let products = res.body as Product[];
          const totalProducts = Number(res.headers.get('X-Total-Count'));
          //this.appState.productsState.totalProducts = totalProducts;
          let totalPages = Math.ceil(
            totalProducts / this.appState.productsState.totalSize
          );

          this.appState.setProductsState({
            products: products,
            totalProducts: totalProducts,
            totalPages: totalPages,
            status: 'LOADED',
          });
        },
        error: (err) => {
          this.appState.setProductsState({
            status: 'error',
            errorMessage: err,
          });
          console.log(err);
        },
      });
  }

  change(p: Product) {
    this.productService.changeProduct(p).subscribe({
      next: (updateProduct) => {
        p.checked = !p.checked;
      },
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe({
      next: (value) => {
        //this.appState.productsState.products = this.appState.productsState.products.filter((p:any) => p.id != product.id);
        this.getProduct();
      },
    });
  }

  /*searchProduct(){
    this.productService.searchProduct(this.keyword).subscribe({
      next: data => this.products=data
    })
  }*/

  gotoPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.getProduct();
  }

  editProduct(product: Product) {
    this.router.navigate(['/admin/editProduct', product.id]);
  }
}
