import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public showCategories = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public toggleCategoriesState(): void {
    this.showCategories = !this.showCategories;
  }

}