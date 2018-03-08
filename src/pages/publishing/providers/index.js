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
        Publishing
      </h1>
      <p>
        Lore provides built-in support for publishing your project to two popular platforms; Surge and GitHub Pages.
      </p>

      <p>
        The video below is an excerpt from the full <Link to="/audience/introduction-to-lore/">Introduction to Lore</Link>
        video and provides a summary of how Lore helps.
      </p>

      <br/>

      <Video videoId="PzUrfgdU690" />

      <h3>
        Feature Comparison
      </h3>
      <p>
        The video below provides a feature comparison of both platforms in order to help you choose between them. Surge
        basically includes everything GitHub Pages offers and more (for a small fee) and is also generally easier to
        publish to. The advantage of GitHub pages is that it provides a way to view and edit your code without having
        to download the files and republish.
      </p>

      <Video videoId="VLFlpqhSby8" />

      <h3>
        Usage
      </h3>
      <p>
        For more detailed instructions about how to publish to each platform please see their respective pages:
      </p>

      <ul>
        <li><Link to="/publishing/providers/surge/">Surge</Link></li>
        <li><Link to="/publishing/providers/github-pages/">GitHub Pages</Link></li>
      </ul>
    </Template>
  )
};
