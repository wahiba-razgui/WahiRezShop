import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  @Input()
  public set form(formGroup: FormGroup | null) {
    this.productForm = formGroup;
  }

  @Input()
  public set isActionLaunched(isSubmitted: boolean) {
    this.isSubmitted = isSubmitted;
  }

  @Input() action: string | undefined;

  @Output() registerHotel: EventEmitter<void> = new EventEmitter();

  public productForm: FormGroup | null = null;
  public isSubmitted: boolean = false;

  public saveTool(): void {
    this.registerHotel.emit();
  }

}
