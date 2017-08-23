import { Meteor } from 'meteor/meteor';
import { PrivacyPolicy } from '../privacyPolicy';

Meteor.publish('privacyPolicy', function() {
  return PrivacyPolicy.find({});
});
