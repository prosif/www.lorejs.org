import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        validationError
      </h1>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      // The value returned during the last failed validation.
      validationError: null,
      `}/>
    </Template>
  );
};
