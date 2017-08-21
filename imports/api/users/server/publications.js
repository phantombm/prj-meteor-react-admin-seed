import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('users', function() {
  // if (!Roles.userIsInRole(this.userId, ['owner'], Roles.GLOBAL_GROUP)) {
  //   return this.ready();
  // }

  return Meteor.users.find({
    'profile.isSsam': false
  });
});

Meteor.publish('ssams', function() {
  // if (!Roles.userIsInRole(this.userId, ['owner'], Roles.GLOBAL_GROUP)) {
  //   return this.ready();
  // }

  return Meteor.users.find({
    'profile.isSsam': true
  });
});
