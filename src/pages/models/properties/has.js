import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        has
      </h1>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      // Returns \`true\` if the attribute contains a value that is not null
      // or undefined.
      has: function(attr) {
        return this.get(attr) != null;
      },
      `}/>
    </Template>
  );
};
