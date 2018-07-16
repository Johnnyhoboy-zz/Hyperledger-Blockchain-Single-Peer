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
import { ContractService } from './Contract.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contract',
  templateUrl: './Contract.component.html',
  styleUrls: ['./Contract.component.css'],
  providers: [ContractService]
})
export class ContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  contractID = new FormControl('', Validators.required);
  producer = new FormControl('', Validators.required);
  distributor = new FormControl('', Validators.required);
  retailer = new FormControl('', Validators.required);
  shipper = new FormControl('', Validators.required);
  unitPrice = new FormControl('', Validators.required);
  minTempLimit = new FormControl('', Validators.required);
  maxTempLimit = new FormControl('', Validators.required);
  merchantPenaltyFactor = new FormControl('', Validators.required);
  shipperPenaltyFactor = new FormControl('', Validators.required);
  shipperCut = new FormControl('', Validators.required);

  constructor(private serviceContract: ContractService, fb: FormBuilder) {
    this.myForm = fb.group({
      contractID: this.contractID,
      producer: this.producer,
      distributor: this.distributor,
      retailer: this.retailer,
      shipper: this.shipper,
      unitPrice: this.unitPrice,
      minTempLimit: this.minTempLimit,
      maxTempLimit: this.maxTempLimit,
      merchantPenaltyFactor: this.merchantPenaltyFactor,
      shipperPenaltyFactor: this.shipperPenaltyFactor,
      shipperCut: this.shipperCut
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceContract.getAll()
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
      $class: 'org.acme.shipping.perishable.Contract',
      'contractID': this.contractID.value,
      'producer': this.producer.value,
      'distributor': this.distributor.value,
      'retailer': this.retailer.value,
      'shipper': this.shipper.value,
      'unitPrice': this.unitPrice.value,
      'minTempLimit': this.minTempLimit.value,
      'maxTempLimit': this.maxTempLimit.value,
      'merchantPenaltyFactor': this.merchantPenaltyFactor.value,
      'shipperPenaltyFactor': this.shipperPenaltyFactor.value,
      'shipperCut': this.shipperCut.value
    };

    this.myForm.setValue({
      'contractID': null,
      'producer': null,
      'distributor': null,
      'retailer': null,
      'shipper': null,
      'unitPrice': null,
      'minTempLimit': null,
      'maxTempLimit': null,
      'merchantPenaltyFactor': null,
      'shipperPenaltyFactor': null,
      'shipperCut': null
    });

    return this.serviceContract.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractID': null,
        'producer': null,
        'distributor': null,
        'retailer': null,
        'shipper': null,
        'unitPrice': null,
        'minTempLimit': null,
        'maxTempLimit': null,
        'merchantPenaltyFactor': null,
        'shipperPenaltyFactor': null,
        'shipperCut': null
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
      $class: 'org.acme.shipping.perishable.Contract',
      'producer': this.producer.value,
      'distributor': this.distributor.value,
      'retailer': this.retailer.value,
      'shipper': this.shipper.value,
      'unitPrice': this.unitPrice.value,
      'minTempLimit': this.minTempLimit.value,
      'maxTempLimit': this.maxTempLimit.value,
      'merchantPenaltyFactor': this.merchantPenaltyFactor.value,
      'shipperPenaltyFactor': this.shipperPenaltyFactor.value,
      'shipperCut': this.shipperCut.value
    };

    return this.serviceContract.updateAsset(form.get('contractID').value, this.asset)
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

    return this.serviceContract.deleteAsset(this.currentId)
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

    return this.serviceContract.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'contractID': null,
        'producer': null,
        'distributor': null,
        'retailer': null,
        'shipper': null,
        'unitPrice': null,
        'minTempLimit': null,
        'maxTempLimit': null,
        'merchantPenaltyFactor': null,
        'shipperPenaltyFactor': null,
        'shipperCut': null
      };

      if (result.contractID) {
        formObject.contractID = result.contractID;
      } else {
        formObject.contractID = null;
      }

      if (result.producer) {
        formObject.producer = result.producer;
      } else {
        formObject.producer = null;
      }

      if (result.distributor) {
        formObject.distributor = result.distributor;
      } else {
        formObject.distributor = null;
      }

      if (result.retailer) {
        formObject.retailer = result.retailer;
      } else {
        formObject.retailer = null;
      }

      if (result.shipper) {
        formObject.shipper = result.shipper;
      } else {
        formObject.shipper = null;
      }

      if (result.unitPrice) {
        formObject.unitPrice = result.unitPrice;
      } else {
        formObject.unitPrice = null;
      }

      if (result.minTempLimit) {
        formObject.minTempLimit = result.minTempLimit;
      } else {
        formObject.minTempLimit = null;
      }

      if (result.maxTempLimit) {
        formObject.maxTempLimit = result.maxTempLimit;
      } else {
        formObject.maxTempLimit = null;
      }

      if (result.merchantPenaltyFactor) {
        formObject.merchantPenaltyFactor = result.merchantPenaltyFactor;
      } else {
        formObject.merchantPenaltyFactor = null;
      }

      if (result.shipperPenaltyFactor) {
        formObject.shipperPenaltyFactor = result.shipperPenaltyFactor;
      } else {
        formObject.shipperPenaltyFactor = null;
      }

      if (result.shipperCut) {
        formObject.shipperCut = result.shipperCut;
      } else {
        formObject.shipperCut = null;
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
      'contractID': null,
      'producer': null,
      'distributor': null,
      'retailer': null,
      'shipper': null,
      'unitPrice': null,
      'minTempLimit': null,
      'maxTempLimit': null,
      'merchantPenaltyFactor': null,
      'shipperPenaltyFactor': null,
      'shipperCut': null
      });
  }

}
