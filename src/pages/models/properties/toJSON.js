import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        toJSON
      </h1>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      // Return a copy of the model's \`attributes\` object.
      toJSON: function(options) {
        return _.clone(this.attributes);
      },
      `}/>
    </Template>
  );
};
