import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../../components/templates/Anatomy';

export default (props) => {
  return (
    <Template>
      <h1>
        /assets/less/main.less
      </h1>
      <p>
        The default LESS file.
      </p>
      <p>
        For new projects, this imports the styles from <code>../css/main.css</code>
      </p>
    </Template>
  );
};
