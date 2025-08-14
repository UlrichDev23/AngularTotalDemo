import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentRoute:any;
  actions: Array<any> = [
    { title: 'Home', route: '/home', icon: 'house' },
    { title: 'Products', route: '/products', icon: 'search' },
    { title: 'New Product', route: '/newProduct', icon: 'save' },
  ];

  currentAction:any;
  setcurrentAction(action:any){
    this.currentAction=action;

  }
}
