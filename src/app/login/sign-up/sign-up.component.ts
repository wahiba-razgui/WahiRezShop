import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService]
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup = {} as FormGroup;
  public isSubmitted = false;

  constructor(private authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.signUpForm.valueChanges.subscribe(values => this.isSubmitted = false);
  }

  public signUp(): void {
    const {username, email, password} = this.signUpForm.value;
    this.isSubmitted = true;
    if (this.signUpForm.valid) {
      this.authService.register(username, email, password).subscribe(
        (responseMessage: { message: string }) => {
          this.messageService.add({key: 'default', severity: 'success', summary: '', detail: responseMessage.message});
        },
        (response: { error: { message: string } }) => {
          this.messageService.add({key: 'default', severity: 'error', summary: '', detail: response.error.message});
        },
        () => this.isSubmitted = false
      );
    }
  }

  get form(): { [key: string]: AbstractControl} {
    return this.signUpForm.controls;
  }

}
