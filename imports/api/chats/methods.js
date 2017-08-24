import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Chats } from './chats';

new ValidatedMethod({
  name: 'chats.insert',
  validate: new SimpleSchema({
    type: { type: String },
    to: { type: [String] },
    message: { type: String },
    imageUrl: { type: String, optional: true }
  }).validator(),
  run({ type, to, message, imageUrl }) {
    to.forEach((to) => {
      const formUser = Meteor.users.findOne({
        _id: this.userId
      });

      const toUser = Meteor.users.findOne({
        _id: to
      });

      Chats.insert({
        type: type,
        from: {
          userId: 'asdfadsf',
          name: '관리자'
        },
        to: {
          userId: to,
          name: toUser.profile.name
        },
        message: message,
        imageUrl: imageUrl || '',
        createdAt: new Date()
      });
    });
  }
});
