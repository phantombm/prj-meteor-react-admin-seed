import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Brands } from './brands';

new ValidatedMethod({
  name: 'brands.insert',
  validate: new SimpleSchema({
    name: { type: String },
    comment: { type: String },
    logoUrl: { type: String },
    imageUrls: { type: [String] },
    detail: { type: String },
    serviceDetail: { type: String },
    phoneNumber: { type: String },
    email: { type: String }
  }).validator(),
  run({ name, comment, logoUrl, imageUrls, detail, serviceDetail, phoneNumber, email }) {
    Brands.insert({
      name: name,
      comment: comment,
      logoUrl: logoUrl,
      imageUrls: imageUrls,
      detail: detail,
      serviceDetail: serviceDetail,
      phoneNumber: phoneNumber,
      email: email,
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
  name: 'brands.setIsVisible',
  validate: new SimpleSchema({
    ids: { type: [String] },
    isVisible: { type: Boolean }
  }).validator(),
  run({ ids, isVisible }) {
    Brands.update({
      _id: {
        $in: ids
      }
    }, {
      $set: {
        isVisible: isVisible
      }
    }, {
      multi: true
    });
  }
});

new ValidatedMethod({
  name: 'brands.delete',
  validate: new SimpleSchema({
    ids: { type: [String] }
  }).validator(),
  run({ ids }) {
    Brands.remove({
      _id: {
        $in: ids
      }
    });
  }
});
