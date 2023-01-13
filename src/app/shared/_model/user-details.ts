export class UserDetails {
  userId: number;
  firstName: string;
  lastName: string;
  address: string;
  zipcode: string;
  country: string;


  constructor(userId: number, firstName: string, lastName: string, address: string, zipcode: string, country: string) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.zipcode = zipcode;
    this.country = country;
  }
}
