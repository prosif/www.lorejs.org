import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        custom
      </h1>
      <p>
        // this interface allows you to create and refernce your own methods.  Not very
        // useful considering this interface is now meant solely to be an AJAX abstraction
        // teir (not answer questions about the internal data) but this quality could still
        // be useful if you need to build a url string or make some calculation or pull
        // something out of local storage or whatever before sending a request or parsing
        // data in a response
      </p>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      yourOwnCustomMethod: function(){}
      `}/>
    </Template>
  );
};
