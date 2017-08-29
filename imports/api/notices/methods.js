import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Notices } from './notices';

new ValidatedMethod({
  name: 'notices.insert',
  validate: new SimpleSchema({
    title: { type: String },
    content: { type: String }
  }).validator(),
  run({ title, content }) {
    Notices.insert({
      title: title,
      content: content,
      createdAt: new Date()
    });
  }
});

new ValidatedMethod({
  name: 'notices.update',
  validate: new SimpleSchema({
    id: { type: String },
    title: { type: String },
    content: { type: String }
  }).validator(),
  run({ id, title, content }) {
    Notices.update({
      _id: id
    }, {
      $set: {
        title: title,
        content: content
      }
    });
  }
});

new ValidatedMethod({
  name: 'notices.delete',
  validate: new SimpleSchema({
    noticeId: { type: String }
  }).validator(),
  run({ noticeId }) {
    Notices.remove({
      _id: noticeId
    });
  }
});
