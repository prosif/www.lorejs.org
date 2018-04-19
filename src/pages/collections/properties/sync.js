import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        sync
      </h1>
      <p>
        This ...
      </p>

      <h3>
        Default Implementation
      </h3>
      <p>
        The default implementation looks like this:
      </p>
      <Markdown type="jsx" text={`
      // Proxy \`Backbone.sync\` by default.
      sync: function() {
        return sync.apply(this, arguments);
      },
      `}/>
    </Template>
  );
};
