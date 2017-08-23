import { Meteor } from 'meteor/meteor';
import { Faqs } from '../faqs';

Meteor.publish('faqs', function() {
  return Faqs.find({});
});
