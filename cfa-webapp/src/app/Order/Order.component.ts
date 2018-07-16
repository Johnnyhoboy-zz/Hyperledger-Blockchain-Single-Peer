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
import { OrderService } from './Order.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-order',
  templateUrl: './Order.component.html',
  styleUrls: ['./Order.component.css'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  orderID = new FormControl('', Validators.required);
  placed = new FormControl('', Validators.required);
  shipped = new FormControl('', Validators.required);
  received = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  merchantPayout = new FormControl('', Validators.required);
  merchantPenalty = new FormControl('', Validators.required);
  shipperPayout = new FormControl('', Validators.required);
  shipperPenalty = new FormControl('', Validators.required);
  pickup = new FormControl('', Validators.required);
  destination = new FormControl('', Validators.required);
  orderStatus = new FormControl('', Validators.required);
  merchant = new FormControl('', Validators.required);
  customer = new FormControl('', Validators.required);
  shipper = new FormControl('', Validators.required);
  contract = new FormControl('', Validators.required);
  cases = new FormControl('', Validators.required);

  constructor(private serviceOrder: OrderService, fb: FormBuilder) {
    this.myForm = fb.group({
      orderID: this.orderID,
      placed: this.placed,
      shipped: this.shipped,
      received: this.received,
      quantity: this.quantity,
      price: this.price,
      merchantPayout: this.merchantPayout,
      merchantPenalty: this.merchantPenalty,
      shipperPayout: this.shipperPayout,
      shipperPenalty: this.shipperPenalty,
      pickup: this.pickup,
      destination: this.destination,
      orderStatus: this.orderStatus,
      merchant: this.merchant,
      customer: this.customer,
      shipper: this.shipper,
      contract: this.contract,
      cases: this.cases
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceOrder.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.shipping.perishable.Order',
      'orderID': this.orderID.value,
      'placed': this.placed.value,
      'shipped': this.shipped.value,
      'received': this.received.value,
      'quantity': this.quantity.value,
      'price': this.price.value,
      'merchantPayout': this.merchantPayout.value,
      'merchantPenalty': this.merchantPenalty.value,
      'shipperPayout': this.shipperPayout.value,
      'shipperPenalty': this.shipperPenalty.value,
      'pickup': this.pickup.value,
      'destination': this.destination.value,
      'orderStatus': this.orderStatus.value,
      'merchant': this.merchant.value,
      'customer': this.customer.value,
      'shipper': this.shipper.value,
      'contract': this.contract.value,
      'cases': this.cases.value
    };

    this.myForm.setValue({
      'orderID': null,
      'placed': null,
      'shipped': null,
      'received': null,
      'quantity': null,
      'price': null,
      'merchantPayout': null,
      'merchantPenalty': null,
      'shipperPayout': null,
      'shipperPenalty': null,
      'pickup': null,
      'destination': null,
      'orderStatus': null,
      'merchant': null,
      'customer': null,
      'shipper': null,
      'contract': null,
      'cases': null
    });

    return this.serviceOrder.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'orderID': null,
        'placed': null,
        'shipped': null,
        'received': null,
        'quantity': null,
        'price': null,
        'merchantPayout': null,
        'merchantPenalty': null,
        'shipperPayout': null,
        'shipperPenalty': null,
        'pickup': null,
        'destination': null,
        'orderStatus': null,
        'merchant': null,
        'customer': null,
        'shipper': null,
        'contract': null,
        'cases': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.shipping.perishable.Order',
      'placed': this.placed.value,
      'shipped': this.shipped.value,
      'received': this.received.value,
      'quantity': this.quantity.value,
      'price': this.price.value,
      'merchantPayout': this.merchantPayout.value,
      'merchantPenalty': this.merchantPenalty.value,
      'shipperPayout': this.shipperPayout.value,
      'shipperPenalty': this.shipperPenalty.value,
      'pickup': this.pickup.value,
      'destination': this.destination.value,
      'orderStatus': this.orderStatus.value,
      'merchant': this.merchant.value,
      'customer': this.customer.value,
      'shipper': this.shipper.value,
      'contract': this.contract.value,
      'cases': this.cases.value
    };

    return this.serviceOrder.updateAsset(form.get('orderID').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceOrder.deleteAsset(this.currentId)
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

    return this.serviceOrder.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'orderID': null,
        'placed': null,
        'shipped': null,
        'received': null,
        'quantity': null,
        'price': null,
        'merchantPayout': null,
        'merchantPenalty': null,
        'shipperPayout': null,
        'shipperPenalty': null,
        'pickup': null,
        'destination': null,
        'orderStatus': null,
        'merchant': null,
        'customer': null,
        'shipper': null,
        'contract': null,
        'cases': null
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

      if (result.shipped) {
        formObject.shipped = result.shipped;
      } else {
        formObject.shipped = null;
      }

      if (result.received) {
        formObject.received = result.received;
      } else {
        formObject.received = null;
      }

      if (result.quantity) {
        formObject.quantity = result.quantity;
      } else {
        formObject.quantity = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.merchantPayout) {
        formObject.merchantPayout = result.merchantPayout;
      } else {
        formObject.merchantPayout = null;
      }

      if (result.merchantPenalty) {
        formObject.merchantPenalty = result.merchantPenalty;
      } else {
        formObject.merchantPenalty = null;
      }

      if (result.shipperPayout) {
        formObject.shipperPayout = result.shipperPayout;
      } else {
        formObject.shipperPayout = null;
      }

      if (result.shipperPenalty) {
        formObject.shipperPenalty = result.shipperPenalty;
      } else {
        formObject.shipperPenalty = null;
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

      if (result.orderStatus) {
        formObject.orderStatus = result.orderStatus;
      } else {
        formObject.orderStatus = null;
      }

      if (result.merchant) {
        formObject.merchant = result.merchant;
      } else {
        formObject.merchant = null;
      }

      if (result.customer) {
        formObject.customer = result.customer;
      } else {
        formObject.customer = null;
      }

      if (result.shipper) {
        formObject.shipper = result.shipper;
      } else {
        formObject.shipper = null;
      }

      if (result.contract) {
        formObject.contract = result.contract;
      } else {
        formObject.contract = null;
      }

      if (result.cases) {
        formObject.cases = result.cases;
      } else {
        formObject.cases = null;
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
      'shipped': null,
      'received': null,
      'quantity': null,
      'price': null,
      'merchantPayout': null,
      'merchantPenalty': null,
      'shipperPayout': null,
      'shipperPenalty': null,
      'pickup': null,
      'destination': null,
      'orderStatus': null,
      'merchant': null,
      'customer': null,
      'shipper': null,
      'contract': null,
      'cases': null
      });
  }

}
