export class ShippingDetails {
  orderId: number;
  firstName: string;
  lastName: string;
  address: string;
  zipcode: string;
  country: string;


  constructor(orderId: number, firstName: string, lastName: string, address: string, zipcode: string, country: string) {
    this.orderId = orderId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.zipcode = zipcode;
    this.country = country;
  }
}
