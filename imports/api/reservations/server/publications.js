import { Meteor } from 'meteor/meteor';
import { Reservations } from '../reservations';

Meteor.publish('reservations', function(id) {
  return Reservations.find({
    'user.userId': id
  });
});
