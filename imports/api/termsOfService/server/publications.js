import { Meteor } from 'meteor/meteor';
import { TermsOfService } from '../termsOfService';

Meteor.publish('termsOfService', function() {
  return TermsOfService.find({});
});
