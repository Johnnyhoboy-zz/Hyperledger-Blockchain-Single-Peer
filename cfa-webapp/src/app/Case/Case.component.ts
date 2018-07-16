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
import { CaseService } from './Case.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-case',
  templateUrl: './Case.component.html',
  styleUrls: ['./Case.component.css'],
  providers: [CaseService]
})
export class CaseComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  caseID = new FormControl('', Validators.required);
  fieldID = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  caseStatus = new FormControl('', Validators.required);
  tempReadings = new FormControl('', Validators.required);
  locationReadings = new FormControl('', Validators.required);
  order = new FormControl('', Validators.required);

  constructor(private serviceCase: CaseService, fb: FormBuilder) {
    this.myForm = fb.group({
      caseID: this.caseID,
      fieldID: this.fieldID,
      type: this.type,
      caseStatus: this.caseStatus,
      tempReadings: this.tempReadings,
      locationReadings: this.locationReadings,
      order: this.order
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCase.getAll()
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
      $class: 'org.acme.shipping.perishable.Case',
      'caseID': this.caseID.value,
      'fieldID': this.fieldID.value,
      'type': this.type.value,
      'caseStatus': this.caseStatus.value,
      'tempReadings': this.tempReadings.value,
      'locationReadings': this.locationReadings.value,
      'order': this.order.value
    };

    this.myForm.setValue({
      'caseID': null,
      'fieldID': null,
      'type': null,
      'caseStatus': null,
      'tempReadings': null,
      'locationReadings': null,
      'order': null
    });

    return this.serviceCase.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'caseID': null,
        'fieldID': null,
        'type': null,
        'caseStatus': null,
        'tempReadings': null,
        'locationReadings': null,
        'order': null
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
      $class: 'org.acme.shipping.perishable.Case',
      'fieldID': this.fieldID.value,
      'type': this.type.value,
      'caseStatus': this.caseStatus.value,
      'tempReadings': this.tempReadings.value,
      'locationReadings': this.locationReadings.value,
      'order': this.order.value
    };

    return this.serviceCase.updateAsset(form.get('caseID').value, this.asset)
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

    return this.serviceCase.deleteAsset(this.currentId)
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

    return this.serviceCase.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'caseID': null,
        'fieldID': null,
        'type': null,
        'caseStatus': null,
        'tempReadings': null,
        'locationReadings': null,
        'order': null
      };

      if (result.caseID) {
        formObject.caseID = result.caseID;
      } else {
        formObject.caseID = null;
      }

      if (result.fieldID) {
        formObject.fieldID = result.fieldID;
      } else {
        formObject.fieldID = null;
      }

      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
      }

      if (result.caseStatus) {
        formObject.caseStatus = result.caseStatus;
      } else {
        formObject.caseStatus = null;
      }

      if (result.tempReadings) {
        formObject.tempReadings = result.tempReadings;
      } else {
        formObject.tempReadings = null;
      }

      if (result.locationReadings) {
        formObject.locationReadings = result.locationReadings;
      } else {
        formObject.locationReadings = null;
      }

      if (result.order) {
        formObject.order = result.order;
      } else {
        formObject.order = null;
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
      'caseID': null,
      'fieldID': null,
      'type': null,
      'caseStatus': null,
      'tempReadings': null,
      'locationReadings': null,
      'order': null
      });
  }

}
