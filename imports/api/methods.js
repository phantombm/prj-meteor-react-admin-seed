import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Expo from 'expo-server-sdk';

new ValidatedMethod({
  name: 'sendRemoteNotifications',
  validate: new SimpleSchema({
    type: { type: String },
    to: { type: [String], optional: true },
    message: { type: Object },
    'message.title': { type: String },
    'message.body': { type: String }
  }).validator(),
  run({ type, to, message }) {
    const expo = new Expo();

    let notificationTokens = null;

    let users = [];

    if (type == 'all') {
      users = Meteor.users.find({}).fetch();
    }
    else if (type == 'partial') {
      users = Meteor.users.find({
        _id: {
          $in: to
        }
      }).fetch();
    }

    notificationTokens = _.reduce(users, (notificationTokens, user) => {
      return notificationTokens.concat(user.profile.notificationTokens);
    }, []);

    const messages = [];

    for (let notificationToken of notificationTokens) {
      if (!Expo.isExpoPushToken(notificationToken)) {
        continue;
      }

      messages.push({
        to: notificationToken,
        title: message.title,
        body: message.body
      })
    }

    const chunks = expo.chunkPushNotifications(messages);

    (async () => {
      for (let chunk of chunks) {
        await expo.sendPushNotificationsAsync(chunk);
      }
    })();
  }
});
