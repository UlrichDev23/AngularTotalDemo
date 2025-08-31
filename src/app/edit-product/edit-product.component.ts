import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  productFormGroup!: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = this.activedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productFormGroup = this.fb.group({
          name: this.fb.control(product.name, [Validators.required]),
          price: this.fb.control(product.price, [Validators.required]),
          checked: this.fb.control(product.checked),
        });
        
      },
    });
  }

  onSave() {
  const updatedProduct = {
    id: this.productId,           // l’ID récupéré depuis la route
    ...this.productFormGroup.value // spread les valeurs name, price, checked
  };

  console.log(updatedProduct);
  // Résultat attendu : 
  // { id: 2, name: "computer", price: "5200", checked: true }

  this.productService.updateProduct(updatedProduct).subscribe({
    next: (data) => {
      console.log("Produit mis à jour", data);
    },
    error: (err) => {
      console.error("Erreur", err);
    }
  });
}

}
