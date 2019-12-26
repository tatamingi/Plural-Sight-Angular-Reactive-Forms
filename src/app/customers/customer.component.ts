import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

function emailMatcher(control: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = control.get('email');
  const confirmControl = control.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }

  return {match: true};
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== null && (isNaN(control.value) || control.value < min || control.value > max)) {
      return {range: true};
    }

    return null;
  };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;

  customer = new Customer();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      phone: [],
      notifications: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true
    });
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestdata(): void {
    this.customerForm.patchValue({
      firstName: 'Tatiana',
      lastName: 'Shapovalova'
    });
  }

  setNotification(radioButtonName: string): void {
    const phoneControl = this.customerForm.get('phone');
    const emailControl = this.customerForm.get('email');

    if (radioButtonName === 'text') {
      phoneControl.setValidators(Validators.required);
      emailControl.clearValidators();
    } else {
      emailControl.setValidators([Validators.required, Validators.email]);
      phoneControl.clearValidators();
    }

    phoneControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
  }
}
