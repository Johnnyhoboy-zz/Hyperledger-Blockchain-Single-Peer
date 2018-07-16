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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CaseComponent } from './Case/Case.component';
import { OrderComponent } from './Order/Order.component';
import { ContractComponent } from './Contract/Contract.component';

import { BusinessComponent } from './Business/Business.component';

import { OrderPlacedComponent } from './OrderPlaced/OrderPlaced.component';
import { OrderShippedComponent } from './OrderShipped/OrderShipped.component';
import { OrderDeliveredComponent } from './OrderDelivered/OrderDelivered.component';
import { OrderCompleteComponent } from './OrderComplete/OrderComplete.component';
import { TemperatureReadingComponent } from './TemperatureReading/TemperatureReading.component';
import { LocationReadingComponent } from './LocationReading/LocationReading.component';
import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Case', component: CaseComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'Contract', component: ContractComponent },
  { path: 'Business', component: BusinessComponent },
  { path: 'OrderPlaced', component: OrderPlacedComponent },
  { path: 'OrderShipped', component: OrderShippedComponent },
  { path: 'OrderDelivered', component: OrderDeliveredComponent },
  { path: 'OrderComplete', component: OrderCompleteComponent },
  { path: 'TemperatureReading', component: TemperatureReadingComponent },
  { path: 'LocationReading', component: LocationReadingComponent },
  { path: 'SetupDemo', component: SetupDemoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
