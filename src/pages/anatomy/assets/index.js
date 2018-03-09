import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Anatomy';

export default (props) => {
  return (
    <Template>
      <h1>
        /assets
      </h1>
      <p>
        This folder is a suggested location to place your project assets like images, styles and fonts. Deleting or renaming
        this folder will have no effect on the framework, so feel to customize it to your liking.
      </p>
      <p>
        Lore supports both LESS and Sass out-of-the-box, which is why you see folders for each of those preprocessors. Feel
        free to delete the folder for whichever you won't be using, or both folders if you'd rather use vanilla CSS.
      </p>
    </Template>
  );
};
