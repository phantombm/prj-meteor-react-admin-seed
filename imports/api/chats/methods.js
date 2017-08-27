import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Chats } from './chats';

new ValidatedMethod({
  name: 'chats.insert',
  validate: new SimpleSchema({
    type: { type: String },
    userIds: { type: [String] },
    message: { type: String, optional: true },
    imageUrl: { type: String, optional: true }
  }).validator(),
  run({ type, userIds, message, imageUrl }) {
    userIds.forEach((userId) => {
      const user = Meteor.users.findOne({
        _id: userId
      });

      Chats.insert({
        type: type,
        user: {
          id: userId,
          name: user.profile.name
        },
        message: message || '',
        imageUrl: imageUrl || '',
        isSent: false,
        isRead: false,
        createdAt: new Date()
      });
    });
  }
});

new ValidatedMethod({
  name: 'chats.setIsRead',
  validate: new SimpleSchema({
    userId: { type: String }
  }).validator(),
  run({ userId }) {
    Chats.update({
      'user.id': userId,
      isSent: true
    }, {
      $set: {
        isRead: true
      }
    }, {
      multi: true
    });
  }
});
