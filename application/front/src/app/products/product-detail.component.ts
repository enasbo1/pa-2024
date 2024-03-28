import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "./product";
import {ProductService} from "./product.service";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService : ProductService) { };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct().subscribe({
      next : products => {
        this.product = products.filter((prod:IProduct)=>(prod.productId==id))[0]
        }
    })
  }

  onBack(): void{
    this.router.navigate(['/products']);
  }
}
