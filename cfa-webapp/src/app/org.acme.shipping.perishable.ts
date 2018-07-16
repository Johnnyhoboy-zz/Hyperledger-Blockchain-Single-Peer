import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.shipping.perishable{
   export enum ProductType {
      STRAWBERRIES,
   }
   export enum BusinessType {
      PRODUCER,
      DISTRIBUTOR,
      RETAILER,
      SHIPPER,
   }
   export enum OrderStatus {
      PLACED,
      SHIPPED,
      ARRIVED,
      COMPLETED,
   }
   export enum CaseStatus {
      READY_FARM,
      PROCESSING_FARM,
      TO_WAREHOUSE,
      REJECTED_WAREHOUSE,
      READY_WAREHOUSE,
      PROCESSING_WAREHOUSE,
      TO_RETAILER,
      ACCEPTED_RETAILER,
      REJECTED_RETAILER,
   }
   export class Address {
      Address1: string;
      City: string;
      State: string;
      Zip: string;
   }
   export class TempReading {
      min: number;
      max: number;
   }
   export class OrderPlaced extends Transaction {
      orderID: string;
      placed: Date;
      quantity: number;
      pickup: Address;
      destination: Address;
      merchantID: string;
      customerID: string;
      shipperID: string;
   }
   export abstract class OrderTransaction extends Transaction {
      orderID: string;
   }
   export class OrderShipped extends OrderTransaction {
      tempReading: TempReading;
      locationReading: Address;
   }
   export class OrderDelivered extends OrderTransaction {
      tempReading: TempReading;
      locationReading: Address;
   }
   export class OrderComplete extends OrderTransaction {
   }
   export class TemperatureReading extends Transaction {
      tempReading: TempReading;
      box: Case;
   }
   export class LocationReading extends Transaction {
      locationReading: Address;
      box: Case;
   }
   export class Case extends Asset {
      caseID: string;
      fieldID: string;
      type: ProductType;
      caseStatus: CaseStatus;
      tempReadings: TempReading[];
      locationReadings: Address[];
      order: Order;
   }
   export class Order extends Asset {
      orderID: string;
      placed: Date;
      shipped: Date;
      received: Date;
      quantity: number;
      price: number;
      merchantPayout: number;
      merchantPenalty: number;
      shipperPayout: number;
      shipperPenalty: number;
      pickup: Address;
      destination: Address;
      orderStatus: OrderStatus;
      merchant: Business;
      customer: Business;
      shipper: Business;
      contract: Contract;
      cases: Case[];
   }
   export class Business extends Participant {
      businessID: string;
      email: string;
      accountBalance: number;
      businessType: BusinessType;
   }
   export class Contract extends Asset {
      contractID: string;
      producer: Business;
      distributor: Business;
      retailer: Business;
      shipper: Business;
      unitPrice: number;
      minTempLimit: number;
      maxTempLimit: number;
      merchantPenaltyFactor: number;
      shipperPenaltyFactor: number;
      shipperCut: number;
   }
   export class SetupDemo extends Transaction {
   }
// }
