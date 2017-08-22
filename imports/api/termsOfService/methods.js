import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { TermsOfService } from './termsOfService';

new ValidatedMethod({
  name: 'termsOfService.update',
  validate: new SimpleSchema({
    content: { type: String }
  }).validator(),
  run({ content }) {
    const termsOfService = TermsOfService.findOne({});

    if (termsOfService) {
      TermsOfService.update({}, {
        $set: {
          content: content
        }
      });
    }
    else {
      TermsOfService.insert({
        content: content,
        createdAt: new Date()
      });
    }
  }
});
