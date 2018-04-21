import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Publishing';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';
import Video from '../../../components/Video';

export default (props) => {
  return (
    <Template>
      <h1>
        Build System
      </h1>

      <blockquote>
        <p>
          This section is COMPLETELY out of date as of <code>v0.12</code>.
        </p>
        <p>
          <code>v0.12</code> replaced Webpack 1 with Webpack 2, hugely simplified the webpack config setup, and introduced a formal
          production build. This page will be updated soon to reflect those changes.
        </p>
      </blockquote>

      <p>
        This section documents the parts of Lore that are directly relevant to Webpack. For now that means the development
        server and the Webpack configuration.
      </p>

      <p>
        The video below is an excerpt from the full <Link to="/audience/introduction-to-lore/">Introduction to Lore</Link>
        video and provides a summary of how Lore helps with Webpack.
      </p>

      <br/>

      <Video videoId="BniePdc79gI" />
    </Template>
  )
};
