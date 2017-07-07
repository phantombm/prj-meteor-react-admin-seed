import { assert } from 'meteor/practicalmeteor:chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import './publications';
import { Links } from '../links';

describe('links publications', () => {
  beforeEach(() => {
    Links.remove({});

    Links.insert({
      title: 'meteor homepage',
      url: 'https://www.meteor.com'
    });
  });

  describe('links.all', () => {
    it('sends all links', (done) => {
      const publicationCollector = new PublicationCollector();

      publicationCollector.collect('links.all', (collections) => {
        assert.equal(collections.links.length, 1);

        done();
      });
    });
  });
});
