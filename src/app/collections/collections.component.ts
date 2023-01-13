import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../shared/_services/product.service";
import {Product} from "../shared/_model/product";
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {MatChipListbox, MatChipListboxChange, MatChipOption} from "@angular/material/chips";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter', duration: 1500})]
})
export class CollectionsComponent implements OnInit {
  products: Product[] = [];
  filteredList: Product[] = [];
  options: string[] = [];

  constructor(private productService: ProductService) {
  }

  @ViewChild('matChipListbox') matChipListbox!: MatChipListbox;
  @ViewChild('all') allChip!: MatChipOption;
  @ViewChild('digital') digitalChip!: MatChipOption;
  @ViewChild('paint') paintChip!: MatChipOption;
  @ViewChild('ai') aiChip!: MatChipOption;


  ngOnInit() {
    this.productService.getProductsByEnabled(true).subscribe(products => {
      this.products = products.payload;
      this.products = this.randomize(this.products);
      this.filteredList = this.products;
    });
  }

  setCategory(click: MatChipOption) {
    let value = this.matChipListbox.value;
    let notAllChips = [this.digitalChip, this.paintChip, this.aiChip];
    if (value.length === 0) {
      this.allChip.selected = true;
      this.filteredList = this.products;
      return;
    }
    if (this.allChip.selected && click.value != 'all') {
      this.allChip.selected = false;
      value = value.filter((e: any) => e !== 'all');
      this.filterCategories(value);
      return;
    }
    if (this.allChip.selected && click.value == 'all') {
      this.setChipsFalse(notAllChips);
      this.allChip.selected = true;
      this.filteredList = this.products;
      return;
    }
    if (this.allChipsSelected(notAllChips)) {
      this.setChipsFalse(notAllChips);
      this.allChip.selected = true;
      this.filteredList = this.products;
      return;
    }
    this.filterCategories(value);
  }

  filterCategories(categories: number[]) {
    this.filteredList = this.products.filter((e) => categories.includes(e.categoryId));

  }

  randomize(arr: Product[]) {
    let currentIndex = arr.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }

  allChipsSelected(list: MatChipOption[]) {
    return list.every(v => v.selected);
  }

  setChipsFalse(list: MatChipOption[]) {
    for (let option of list) {
      option.selected = false;
    }
  }
}
