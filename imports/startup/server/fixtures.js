import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (Links.find().count() == 0) {
    const links = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try',
        createdAt: new Date()
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com',
        createdAt: new Date()
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com',
        createdAt: new Date()
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com',
        createdAt: new Date()
      }
    ];

    links.forEach((link) => {
      Links.insert(link);
    });
  }

  // for (let i = 0; i < 100; i++) {
  //   Accounts.createUser({
  //     username: 'test_' + i,
  //     email: 'test_' + i + '@teset.com',
  //     password: 'test',
  //     profile: {
  //       name: 'test',
  //       cellPhoneNumber: '010111122' + i,
  //       purchaseNumber: i,
  //       purchaseAmount: i * 50000
  //     }
  //   });
  // }
});
