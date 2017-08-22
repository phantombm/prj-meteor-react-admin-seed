import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { PrivacyPolicy } from './privacyPolicy';

new ValidatedMethod({
  name: 'privacyPolicy.update',
  validate: new SimpleSchema({
    content: { type: String }
  }).validator(),
  run({ content }) {
    const privacyPolicy = PrivacyPolicy.findOne({});

    if (privacyPolicy) {
      PrivacyPolicy.update({}, {
        $set: {
          content: content
        }
      });
    }
    else {
      PrivacyPolicy.insert({
        content: content,
        createdAt: new Date()
      });
    }
  }
});
