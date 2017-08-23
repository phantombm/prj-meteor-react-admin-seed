import { Meteor } from 'meteor/meteor';
import { RemoteNotifications } from '../remoteNotifications';

Meteor.publish('remoteNotifications', function() {
  return RemoteNotifications.find({});
});
