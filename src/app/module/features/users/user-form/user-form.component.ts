import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  @Input()
  public set form(formGroup: FormGroup | null) {
    this.userForm = formGroup;
  }

  @Input()
  public set isActionLaunched(isSubmitted: boolean) {
    this.isSubmitted = isSubmitted;
  }

  @Input() roles: { name: string; code: string }[] = [];

  @Input() action: string = '';

  @Output() registerUser: EventEmitter<void> = new EventEmitter();

  public userForm: FormGroup | null = null;
  public isSubmitted: boolean = false;

  public addUser(): void {
    this.registerUser.emit();
  }

}
