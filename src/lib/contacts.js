import ngFaker from 'ng-faker';

const genContacts = () => {
  const contacts = Array(9).fill(null);
  return contacts.map(() => {
    const name = ngFaker.name.fullName();
    const phoneNumber = ngFaker.phone.phoneNumber();
    const email = 'john.doe@gmail.com';
    const address = `${ngFaker.address.localGovernment},
     ${ngFaker.address.state()}`;
    return {
      name,
      phoneNumber,
      email,
      address,
    };
  });
};

export default genContacts;
