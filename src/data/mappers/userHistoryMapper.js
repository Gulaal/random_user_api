export const toPersistence = (user) => ({
  id: user.id,
  name: {
    title: user.name.title,
    first: user.name.first,
    last: user.name.last,
    formatted: user.name.formatted
  },
  email: user.email,
  phone: user.phone,
  picture: user.picture,
  location: {
    street: user.location.street,
    city: user.location.city,
    state: user.location.state,
    country: user.location.country,
    postcode: user.location.postcode,
    formatted: user.location.formatted,
    short: user.location.short
  },
  dob: user.dob,
  nat: user.nat
});