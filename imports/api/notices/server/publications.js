import { Meteor } from 'meteor/meteor';
import { Notices } from '../notices';

Meteor.publish('notices', function() {
  return Notices.find({});
});
