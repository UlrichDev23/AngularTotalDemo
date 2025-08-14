import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword:String="";
  totalPages:number=0
  totalSize:number=4
  currentPage:number=1

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct(this.keyword,this.currentPage,this.totalSize).subscribe({
      next: (res) => {
        
        this.products = res.body as Product[]
       const totalProducts=Number(res.headers.get('X-Total-Count'));
       this.totalPages = Math.ceil(totalProducts/this.totalSize)
      },
      error: (err) => {
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
        this.products = this.products.filter((p) => p.id != product.id);
      },
    });
  }

  /*searchProduct(){
    this.productService.searchProduct(this.keyword).subscribe({
      next: data => this.products=data
    })
  }*/

  gotoPage(page:number){
    this.currentPage = page
    this.getProduct();
  }
}
