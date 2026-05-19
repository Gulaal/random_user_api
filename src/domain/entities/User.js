export class FullName {
  constructor(title, first, last) {
    this.title = title;
    this.first = first;
    this.last = last;
  }

  get formatted() {
    return `${this.title ? this.title + '. ' : ''}${this.first} ${this.last}`;
  }
}

export class Address {
  constructor(street, city, state, country, postcode) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.postcode = postcode;
  }

  get formatted() {
    return `${this.street}, ${this.city}, ${this.state} ${this.postcode}, ${this.country}`;
  }

  get short() {
    return `${this.city}, ${this.country}`;
  }
}

export class User {
  constructor(id, name, email, phone, picture, location, dob, nat) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.picture = picture;
    this.location = location;
    this.dob = dob;
    this.nat = nat;
  }

  getAgeGroup() {
    if (!this.dob) return 'unknown';
    const year = parseInt(this.dob.split('.')[2] || this.dob.split('/')[2]);
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    if (age < 18) return 'Young';
    if (age < 65) return 'Adult';
    return 'Senior';
  }

  static fromPlain(plain) {
  if (!plain) return null;
  const name = new FullName(plain.name.title, plain.name.first, plain.name.last);
  const address = new Address(
    plain.location.street,
    plain.location.city,
    plain.location.state,
    plain.location.country,
    plain.location.postcode
  );
  return new User(
    plain.id,
    name,
    plain.email,
    plain.phone,
    plain.picture,
    address,
    plain.dob,
    plain.nat
  );
}
}