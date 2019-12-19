import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;

  customer = new Customer();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      sendCatalog: true
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestdata() {
    this.customerForm.patchValue({
      firstName: 'Tatiana',
      lastName: 'Shapovalova'
    });
  }
}
