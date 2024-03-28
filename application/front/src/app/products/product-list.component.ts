import { Component, OnDestroy, OnInit} from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit, OnDestroy{
  pageTitle:string = 'Product List';
  imageWidth:number = 50;
  imageMargin:number = 2;
  showImage:boolean = false;
  filteredProduct: Array<IProduct> = [];
  sub!: Subscription;
  private errorMessage:any;
  private _listFilter:string = '';

  products:IProduct[] = [];

  constructor(private productService:ProductService){}


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.sub = this.productService.getProduct().subscribe({
      next: products => {
        this.products = products;
        this.filteredProduct = products},
      error:err => this.errorMessage = err
    });
  };

  toggleImage():void {
    this.showImage = !this.showImage
  };

  get listFilter(): string{
    return this._listFilter;
  }

  set listFilter(value:string) {
    this._listFilter = value;
    this.filteredProduct = this.performFilter(value);
  };

  performFilter(filterBy:string):IProduct[]{
    filterBy = filterBy.toLowerCase();
    if (filterBy===''){
      return this.products;
    }
    return this.products.filter((product:IProduct)=>product.productName.toLowerCase().includes(filterBy));
  }

  onNotify(message:string){
    this.pageTitle = message;
  }

}
