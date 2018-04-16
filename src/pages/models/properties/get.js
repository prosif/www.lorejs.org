import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        get
      </h1>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      // Get the value of an attribute.
      get: function(attr) {
        return this.attributes[attr];
      },
      `}/>
    </Template>
  );
};
