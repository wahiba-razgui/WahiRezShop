import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RolesEnum} from '../../../model/roles.enum';
import {AuthService} from '../../../service/auth.service';
import {UserModel} from '../../../model/user.model';
import {MessageService} from 'primeng/api';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public isSubmitted = false;
  public addUserForm: FormGroup | null = null;
  public updateUserForm: FormGroup | null = null;
  public deletedUser: UserModel | null = null;
  public updatedUser: UserModel | null = null;
  public roles: { name: string, code: string }[] = [];
  public users$: Observable<any> | null = null;

  constructor(private userService: UserService,
              private authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getAll();
    for (const role in RolesEnum) {
      this.roles.push({name: role, code: role.toLowerCase()});
    }
    this.addUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      roles: new FormControl([])
    });
    this.addUserForm.valueChanges.subscribe(values => this.isSubmitted = false);
  }

  public addUser(): void {
    const {username, email, password} = this.addUserForm?.value;
    this.isSubmitted = true;
    if (this.addUserForm?.valid) {
      const roles = this.addUserForm.controls['roles'].value.map((role: { name: string, code: string }) => role.code);
      this.authService.register(username, email, password, roles).subscribe(
        (responseMessage: { message: string }) => {
          this.users$ = this.userService.getAll();
          $('#addEmployeeModal').modal('hide');
          this.messageService.add({key: 'default', severity: 'success', summary: '', detail: responseMessage.message});
        },
        (response: { error: { message: string } }) => {
          this.messageService.add({key: 'default', severity: 'error', summary: '', detail: response.error.message});
        },
        () => this.isSubmitted = false);
    }
  }

  public deleteUser(): void {
    if (this.deletedUser) {
      this.userService.deleteById(this.deletedUser?._id).subscribe((responseMessage: { message: string }) => {
        this.users$ = this.userService.getAll();
        this.deletedUser = null;
        $('#deleteEmployeeModal').modal('hide');
        this.messageService.add({key: 'default', severity: 'success', summary: '', detail: responseMessage.message});
      }, (response: { error: { message: string } }) => {
        this.messageService.add({key: 'default', severity: 'error', summary: '', detail: response.error.message});
      });
    }
  }

  public updateUser(): void {
    const {username, email, password} = this.updateUserForm?.value;
    this.isSubmitted = true;
    if (this.updateUserForm?.valid) {
      const roles = this.updateUserForm.controls['roles'].value.map((role: { name: string, code: string }) => role.code);
      this.userService.update(this.updatedUser?._id, username, email, password, roles).subscribe(
        (responseMessage: { message: string }) => {
          this.users$ = this.userService.getAll();
          this.updatedUser = null;
          $('#editEmployeeModal').modal('hide');
          this.messageService.add({key: 'default', severity: 'success', summary: '', detail: responseMessage.message});
        },
        (response: { error: { message: string } }) => {
          this.messageService.add({key: 'default', severity: 'error', summary: '', detail: response.error.message});
        }, () => this.isSubmitted = false);
    }
  }

  public setEditForm(user: UserModel): void {
    this.updatedUser = user;
    this.isSubmitted = false;
    this.updateUserForm = new FormGroup({
      username: new FormControl(user.username, Validators.required),
      email: new FormControl(user.email, Validators.required),
      password: new FormControl(user.password, Validators.required),
      roles: new FormControl(this.getUserRoles(user))
    });
    this.updateUserForm.valueChanges.subscribe(values => this.isSubmitted = false);
  }

  private getUserRoles(user: UserModel): { code: string, name: string }[] {
    const roles: any[] = [];
    user?.roles?.forEach((role: string) => {
      roles.push(this.roles.find(value => value.code === role));
    });
    return roles;
  }

  public clearAddForm(): void {
    this.addUserForm?.reset();
    this.isSubmitted = false;
  }
}
