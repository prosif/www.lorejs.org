import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Anatomy';

export default (props) => {
  return (
    <Template>
      <h1>
        .babelrc
      </h1>
      <p>
        This file contains the settings for the preset and plugins that determine how your project is transpiled.
      </p>
      <p>
        To learn more about this file, see the <a href="https://babeljs.io/docs/usage/babelrc/">.babelrc
        documentation</a> on the Babel website.
      </p>
    </Template>
  );
};
