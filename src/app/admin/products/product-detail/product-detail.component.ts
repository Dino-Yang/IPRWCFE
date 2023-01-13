import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../shared/_services/product.service";
import {UserDetails} from "../../../shared/_model/user-details";
import {Product} from "../../../shared/_model/product";
import {ToastService} from "../../../shared/_services/toast.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: any;
  @Input() reason: any;

  productDetails: FormGroup = new FormGroup({
    categoryId: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    description: new FormControl(''),
    designer: new FormControl(''),
    enabled: new FormControl('')
  })

  selectedProductDetails: any = {};

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private productService: ProductService, private toastService: ToastService) {

  }

  ngOnInit(): void {
    if (this.reason === 'edit') {
      this.productDetails = this.formBuilder.group(
        {
          categoryId: [
            this.product.categoryId,
            [
              Validators.required,
              Validators.pattern(/^([1-3]\d*)?$/)
            ]
          ],
          name: [
            this.product.name,
            [
              Validators.required
            ]
          ],
          price: [
            this.product.price,
            [
              Validators.required,
              Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)
            ]
          ],
          stock: [
            this.product.stock,
            [
              Validators.required,
              Validators.pattern(/^(0|[1-9]\d*)?$/)
            ]
          ],
          description: [
            this.product.description,
            [
              Validators.required,
              Validators.maxLength(254)
            ]
          ],
          designer: [
            this.product.designer,
            [
              Validators.required,
              Validators.maxLength(254)
            ]
          ],
          enabled: [
            this.product.enabled,
            [
              Validators.required,
            ]
          ]
        },
      )
    }
  }


  get f(): { [key: string]: AbstractControl } {
    return this.productDetails.controls;
  }

  onSubmit() {
    if (this.productDetails.invalid) {
      return;
    }
    let value = this.productDetails.value;
    const newProduct = {
      id: this.product.id, categoryId: value.categoryId, name: value.name, price: value.price
      , stock: value.stock, description: value.description, designer: value.designer, enabled: value.enabled
    } as Product;
    this.productService.putProduct(newProduct)
      .subscribe(() => {
        this.toastService.show('', 'You have updated product with Id: ' + this.product.id);
        this.activeModal.dismiss()
      });
  }
}
