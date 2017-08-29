import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Brands } from './brands';

new ValidatedMethod({
  name: 'brands.insert',
  validate: new SimpleSchema({
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String }
  }).validator(),
  run({ name, email, phoneNumber }) {
    Brands.insert({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      phoneCallCount: 0,
      salesAmount: 0,
      isVisible: true,
      createdAt: new Date()
    });
  }
});

new ValidatedMethod({
  name: 'brands.update',
  validate: new SimpleSchema({
    id: { type: String },
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    isVisible: { type: Boolean }
  }).validator(),
  run({ id, name, email, phoneNumber, isVisible }) {
    Brands.update({
      _id: id
    }, {
      $set: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        isVisible: isVisible
      }
    });
  }
});

new ValidatedMethod({
  name: 'brands.delete',
  validate: new SimpleSchema({
    id: { type: String }
  }).validator(),
  run({ id }) {
    Brands.remove({
      _id: id
    });
  }
});
