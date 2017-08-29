import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Faqs } from './faqs';

new ValidatedMethod({
  name: 'faqs.insert',
  validate: new SimpleSchema({
    title: { type: String },
    content: { type: String },
    order: { type: String }
  }).validator(),
  run({ title, content, order }) {
    Faqs.insert({
      title: title,
      content: content,
      order: order,
      createdAt: new Date()
    });
  }
});

new ValidatedMethod({
  name: 'faqs.update',
  validate: new SimpleSchema({
    id: { type: String },
    title: { type: String },
    content: { type: String },
    order: { type: String }
  }).validator(),
  run({ id, title, content, order }) {
    Faqs.update({
      _id: id
    }, {
      $set: {
        title: title,
        content: content,
        order: order
      }
    });
  }
});

new ValidatedMethod({
  name: 'faqs.delete',
  validate: new SimpleSchema({
    faqId: { type: String }
  }).validator(),
  run({ faqId }) {
    Faqs.remove({
      _id: faqId
    });
  }
});
