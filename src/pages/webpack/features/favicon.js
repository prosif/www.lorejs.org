import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Webpack';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        Favicon
      </h1>
      <p>
        The webpack config generates a set of favicons from the image located at <code>assets/images/logo.png</code>.
      </p>
    </Template>
  );
};
