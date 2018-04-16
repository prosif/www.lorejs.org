import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        generateCid
      </h1>
      <p>
        This method is used to generate the <code>cid</code> value for a model. By default these values are strings
        that look like <code>c1</code>, <code>c2</code>, etc.
      </p>
      <p>
        You should override this method if you need to replace the <code>cid</code> with a UUID for optimistic
        websocket updates.
      </p>

      <h3>
        Default Implementation
      </h3>
      <p>
        The default implementation looks like this:
      </p>
      <Markdown type="jsx" text={`
      generateCid: function() {
        return _.uniqueId(this.cidPrefix);
      },
      `}/>
      <p>
        The <code>uniqueId()</code> method is lodash, and you can find documentation for
        it <a href="https://lodash.com/docs/4.17.5#uniqueId">here</a>.
      </p>

      <h3>
        Usage
      </h3>
      <p>
        Whenever you create a model, it is assigned a <code>cid</code>, which is generated using
        the <code>cidPrefix</code> followed by an integer.
      </p>
      <p>
        Let's use this code to illustrate:
      </p>
      <Markdown type="jsx" text={`
      import { Model } from 'lore-models';

      const Tweet = Model.extend();

      const t1 = new Tweet();
      const t2 = new Tweet();
      `}/>
      <p>
        In the example above, <code>t1</code> will have a <code>cid</code> of <code>c1</code>, and <code>t2</code> will
        have a <code>cid</code> of <code>c2</code>.
      </p>
      <p>
        If we provide a custom <code>cidPrefix</code>, like this:
      </p>
      <Markdown type="jsx" text={`
      import { Model } from 'lore-models';

      const Tweet = Model.extend({
        cidPrefix: 'tweet'
      });

      const t1 = new Tweet();
      const t2 = new Tweet();
      `}/>
      <p>
        Then no now <code>t1</code> will have a <code>cid</code> of <code>tweet1</code>, and <code>t2</code> will
        have a <code>cid</code> of <code>tweet2</code>.
      </p>
    </Template>
  );
};
