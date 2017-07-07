import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import './methods';
import { Links } from './links';

if (Meteor.isServer) {
  describe('links methods', () => {
    beforeEach(() => {
      Links.remove({});
    });

    it('can add a new link', () => {
      const insertLink = Meteor.server.method_handlers['links.insert'];

      insertLink.apply({}, ['meteor.com', 'https://www.meteor.com']);

      assert.equal(Links.find({}).count(), 1);
    });
  });
}
