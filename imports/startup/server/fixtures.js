import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links';

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
});
