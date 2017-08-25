import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

Accounts.validateLoginAttempt((attempt) => {
  if (!attempt.allowed) {
    return false;
  }

  if (!Roles.userIsInRole(attempt.user._id, ['owner','manager'], Roles.GLOBAL_GROUP)) {
    return false;
  }

  return true;
});

Meteor.startup(() => {
  const user = Accounts.findUserByEmail(Meteor.settings.ownerEmail);

  Roles.addUsersToRoles(user._id, 'owner', Roles.GLOBAL_GROUP);
});
