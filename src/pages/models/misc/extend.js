import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        extend
      </h1>
      <p>
        // The .extend() method is something that allows you to define common functionality in
        // one model (like common parse methods or url buidling logic) and then build other
        // models from that so you don't have to duplicate the code.
      </p>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      Model.extend({...})
      `}/>
    </Template>
  );
};
