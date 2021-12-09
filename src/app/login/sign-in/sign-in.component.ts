import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {
  public signInForm: FormGroup = {} as FormGroup;
  private roles: string[] = [];
  public isSubmitted = false;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.roles = this.tokenStorageService.getUser().roles || [];
    this.checkTockenAndSetPath();
    this.signInForm.valueChanges.subscribe(values => this.isSubmitted = false);
  }

  public signIn(): void {
    const {username, password} = this.signInForm.value;
    this.isSubmitted = true;
    if (this.signInForm.valid) {
      this.authService.login(username, password).subscribe(
        user => {
          this.tokenStorageService.saveToken(user.accessToken);
          this.tokenStorageService.saveUser(user);
          this.roles = this.tokenStorageService.getUser().roles || [];
          this.checkTockenAndSetPath();
        },
        (response: { error: { message: string } }) => {
          this.messageService.add({key: 'default', severity: 'error', summary: '', detail: response.error.message});
        }, () => this.isSubmitted = false
      );
    }
  }

  private checkTockenAndSetPath(): void {
    if (this.roles.length) {
      this.router.navigate(['/home/profile']);
    }
  }

  get form(): { [key: string]: AbstractControl} {
    return this.signInForm.controls;
  }
}
