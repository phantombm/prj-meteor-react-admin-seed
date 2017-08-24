import { Meteor } from 'meteor/meteor';

import { Chats } from '../chats';

Meteor.publish('chats', function() {
  return Chats.find({});
});
