import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        reset
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
      // When you have more items than you want to add or remove individually,
      // you can reset the entire set with a new list of models, without firing
      // any granular \`add\` or \`remove\` events. Fires \`reset\` when finished.
      // Useful for bulk operations and optimizations.
      reset: function(models, options) {
        options = options ? _.clone(options) : {};
        this._reset();
        models = this.add(models, options);
        return models;
      },
      `}/>
    </Template>
  );
};
