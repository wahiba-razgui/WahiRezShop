import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../service/token-storage.service";
import {Router} from "@angular/router";
import {RolesEnum} from "../../../../DreamProject/src/app/model/roles.enum";
import {DEFAULT_ROUTES, MANAGER_ROUTES, USER_ROUTES} from "./routes";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public showCategories = false;
  public menuItems: any[] = [];
  public roles: string[] = [];

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  public toggleCategoriesState(): void {
    this.showCategories = !this.showCategories;
  }

  public logOut(e?: any): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['sign-in']);
  }

  public login(e?: any): void {
    this.router.navigate(['sign-in']);
  }

  public ngOnInit(): void {
    this.roles = this.tokenStorageService.getUser().roles || [];
    this.menuItems = DEFAULT_ROUTES;
    if (this.roles.includes(RolesEnum.USER.toString())) {
      this.menuItems = this.menuItems.concat(USER_ROUTES);
    }
    if (this.roles.includes(RolesEnum.ADMIN.toString()) || this.roles.includes(RolesEnum.MANAGER.toString())) {
      this.menuItems = this.menuItems.concat(MANAGER_ROUTES);
    }
  }

}
