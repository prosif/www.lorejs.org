import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        cidPrefix
      </h1>
      <p>
        This property stands for "client id prefix", and is used to generate the client ids required when
        performing optimistic updates, or detecting when a resource has been created.
      </p>
      <p>
        To understand how it's used, see <code>generateCid</code>.
      </p>

      <h3>
        Default Implementation
      </h3>
      <p>
        The default implementation looks like this:
      </p>
      <Markdown type="jsx" text={`
      cidPrefix: 'c',
      `}/>
    </Template>
  );
};
