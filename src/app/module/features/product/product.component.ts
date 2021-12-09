import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ProductModel} from '../../../model/product.model';
import {ProductService} from "../../../service/product.service";

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public isSubmitted = false;
  public addProductForm: FormGroup | null = null;
  public updateProductForm: FormGroup | null = null;
  public deletedProduct: ProductModel | null = null;
  public updatedProduct: ProductModel | null = null;
  public products$: Observable<ProductModel[]> | null = null;

  constructor(private productService: ProductService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
    this.addProductForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
    this.addProductForm.valueChanges.subscribe(values => this.isSubmitted = false);
  }

  public addProduct(): void {
    const {title, description, category, price, quantity} = this.addProductForm?.value;
    this.isSubmitted = true;
    if (this.addProductForm?.valid) {
      this.productService.add(title, description, category, price, quantity).subscribe(
        (responseMessage: { message: string }) => {
          this.products$ = this.productService.getAll();
          $('#addProductModal').modal('hide');
          this.messageService.add({key: 'default', severity: 'success', summary: '', detail: responseMessage.message});
        },
        (response: { error: { message: string } }) => {
          this.messageService.add({key: 'default', severity: 'error', summary: '', detail: response.error.message});
        },
        () => this.isSubmitted = false);
    }
  }

  public deleteProduct(): void {
    if (this.deletedProduct) {
      this.productService.deleteById(this.deletedProduct?._id).subscribe((responseMessage: { message: string }) => {
        this.products$ = this.productService.getAll();
        this.deletedProduct = null;
        $('#deleteProductModal').modal('hide');
        this.messageService.add({key: 'default', severity: 'success', summary: '', detail: responseMessage.message});
      }, (response: { error: { message: string } }) => {
        this.messageService.add({key: 'default', severity: 'error', summary: '', detail: response.error.message});
      });
    }
  }

  public updateProduct(): void {
    const {title, description, category, price, quantity} = this.updateProductForm?.value;
    this.isSubmitted = true;
    if (this.updateProductForm?.valid) {
      this.productService.update(this.updatedProduct?._id, title, description, category, price, quantity).subscribe(
        (responseMessage: { message: string }) => {
          this.products$ = this.productService.getAll();
          this.updatedProduct = null;
          $('#editProductModal').modal('hide');
          this.messageService.add({key: 'default', severity: 'success', summary: '', detail: responseMessage.message});
        },
        (response: { error: { message: string } }) => {
          this.messageService.add({key: 'default', severity: 'error', summary: '', detail: response.error.message});
        }, () => this.isSubmitted = false);
    }
  }

  public setEditForm(product: ProductModel): void {
    this.updatedProduct = product;
    this.isSubmitted = false;
    this.updateProductForm = new FormGroup({
      title: new FormControl(product.title, Validators.required),
      description: new FormControl(product.description, Validators.required),
      category: new FormControl(product.category, Validators.required),
      price: new FormControl(product.price, Validators.required),
      quantity: new FormControl(product.quantity, Validators.required),
    });
    this.updateProductForm.valueChanges.subscribe(values => this.isSubmitted = false);
  }

  public clearAddForm(): void {
    this.addProductForm?.reset();
    this.isSubmitted = false;
  }
}
