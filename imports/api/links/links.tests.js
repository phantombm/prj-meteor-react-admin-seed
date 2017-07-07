import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import { Links } from './links.js';

if (Meteor.isServer) {
  describe('links collection', () => {
    it('insert correctly', () => {
      const linkId = Links.insert({
        title: 'meteor homepage',
        url: 'https://www.meteor.com'
      });

      const addedLinks = Links.find({ _id: linkId });
      const collectionName = addedLinks._getCollectionName();
      const count = addedLinks.count();

      assert.equal(collectionName, 'links');
      assert.equal(count, 1);
    });
  });
}
