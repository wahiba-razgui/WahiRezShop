import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {UserModel} from '../../../model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }
  public connectedUser: UserModel = {} as UserModel;
  ngOnInit(): void {
    this.connectedUser = this.tokenStorageService.getUser();
  }

}
