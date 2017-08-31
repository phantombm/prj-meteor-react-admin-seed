import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  'users.setIsManager'({ ids, isManager }) {
    if (isManager) {
      Roles.addUsersToRoles(ids, 'manager', Roles.GLOBAL_GROUP);
    }
    else {
      Roles.removeUsersFromRoles(ids, 'manager', Roles.GLOBAL_GROUP);
    }

    Meteor.users.update({
      _id: {
        $in: ids
      }
    }, {
      $set: {
        'profile.isManager': isManager
      }
    }, {
      multi: true
    });
  }
});
