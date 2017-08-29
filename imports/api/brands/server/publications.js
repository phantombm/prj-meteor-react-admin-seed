import { Meteor } from 'meteor/meteor';
import { Brands } from '../brands';

Meteor.publish('brands', function() {
  return Brands.find({});
});
