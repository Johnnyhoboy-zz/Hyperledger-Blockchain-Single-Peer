/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OrderPlacedService } from './OrderPlaced.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './OrderPlaced.component.html',
  styleUrls: ['./OrderPlaced.component.css'],
  providers: [OrderPlacedService]
})
export class OrderPlacedComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  orderID = new FormControl('', Validators.required);
  placed = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  pickup = new FormControl('', Validators.required);
  destination = new FormControl('', Validators.required);
  merchantID = new FormControl('', Validators.required);
  customerID = new FormControl('', Validators.required);
  shipperID = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceOrderPlaced: OrderPlacedService, fb: FormBuilder) {
    this.myForm = fb.group({
      orderID: this.orderID,
      placed: this.placed,
      quantity: this.quantity,
      pickup: this.pickup,
      destination: this.destination,
      merchantID: this.merchantID,
      customerID: this.customerID,
      shipperID: this.shipperID,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceOrderPlaced.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.acme.shipping.perishable.OrderPlaced',
      'orderID': this.orderID.value,
      'placed': this.placed.value,
      'quantity': this.quantity.value,
      'pickup': this.pickup.value,
      'destination': this.destination.value,
      'merchantID': this.merchantID.value,
      'customerID': this.customerID.value,
      'shipperID': this.shipperID.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'orderID': null,
      'placed': null,
      'quantity': null,
      'pickup': null,
      'destination': null,
      'merchantID': null,
      'customerID': null,
      'shipperID': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceOrderPlaced.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'orderID': null,
        'placed': null,
        'quantity': null,
        'pickup': null,
        'destination': null,
        'merchantID': null,
        'customerID': null,
        'shipperID': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.acme.shipping.perishable.OrderPlaced',
      'orderID': this.orderID.value,
      'placed': this.placed.value,
      'quantity': this.quantity.value,
      'pickup': this.pickup.value,
      'destination': this.destination.value,
      'merchantID': this.merchantID.value,
      'customerID': this.customerID.value,
      'shipperID': this.shipperID.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceOrderPlaced.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  deleteTransaction(): Promise<any> {

    return this.serviceOrderPlaced.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceOrderPlaced.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'orderID': null,
        'placed': null,
        'quantity': null,
        'pickup': null,
        'destination': null,
        'merchantID': null,
        'customerID': null,
        'shipperID': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.orderID) {
        formObject.orderID = result.orderID;
      } else {
        formObject.orderID = null;
      }

      if (result.placed) {
        formObject.placed = result.placed;
      } else {
        formObject.placed = null;
      }

      if (result.quantity) {
        formObject.quantity = result.quantity;
      } else {
        formObject.quantity = null;
      }

      if (result.pickup) {
        formObject.pickup = result.pickup;
      } else {
        formObject.pickup = null;
      }

      if (result.destination) {
        formObject.destination = result.destination;
      } else {
        formObject.destination = null;
      }

      if (result.merchantID) {
        formObject.merchantID = result.merchantID;
      } else {
        formObject.merchantID = null;
      }

      if (result.customerID) {
        formObject.customerID = result.customerID;
      } else {
        formObject.customerID = null;
      }

      if (result.shipperID) {
        formObject.shipperID = result.shipperID;
      } else {
        formObject.shipperID = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'orderID': null,
      'placed': null,
      'quantity': null,
      'pickup': null,
      'destination': null,
      'merchantID': null,
      'customerID': null,
      'shipperID': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
