import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { RemoteNotifications } from './remoteNotifications';

new ValidatedMethod({
  name: 'remoteNotifications.insert',
  validate: new SimpleSchema({
    type: { type: String },
    title: { type: String },
    content: { type: String }
  }).validator(),
  run({ type, title, content }) {
    RemoteNotifications.insert({
      type: type,
      title: title,
      content: content,
      createdAt: new Date()
    });
  }
});
