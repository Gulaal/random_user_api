import { User, FullName, Address } from '../../domain/entities/User.js';
import { generateUUID } from '../../shared/helpers.js';

export const userMapper = {
  toDomain(rawUser) {
    const { name, location, picture, dob, email, phone, login, nat } = rawUser;
    
    const fullName = new FullName(name.title, name.first, name.last);
    const street = `${location.street.number} ${location.street.name}`;
    const address = new Address(
      street,
      location.city,
      location.state,
      location.country,
      location.postcode
    );
    const id = login?.uuid || generateUUID();
    const birthDate = new Date(dob.date).toLocaleDateString();

    return new User(
      id,
      fullName,
      email,
      phone,
      picture.large || picture.medium,
      address,
      birthDate,
      nat
    );
  }
};