import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Feature';
import Markdown from '../../components/Markdown';
import CodeTabs from '../../components/CodeTabs';
import CodeTab from '../../components/CodeTab';
import QuickstartBranch from '../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Purpose
      </h1>

      <p>
        There are a lot of demands on front-end applications as they continuously evolve to support the growing needs of
        the user base. Lore's goal is to build support for as many of those common needs into the architecture as possible.
      </p>

      <p>
        This section will describe what Lore does to improve the experience related to:
      </p>
      <ul>
        <li>the foundational libraries that make up the framework</li>
        <li>the UI features the framework supports</li>
        <li>and discussion about the architecture and extensibility of the framework itself</li>
      </ul>

      <h3>
        Foundation
      </h3>
      <p>
        The video below provides an overview of how Lore simplifies React development, as well as how it integrates
        support for Webpack, Redux, React-Router and Publishing,
      </p>

      {/*<!--<div className="video">-->*/}
      {/*<!--<div className="embed-responsive embed-responsive-16by9 drop-shadow pretty-embed" data-pe-videoid="Y-VLSaUJv_8">-->*/}
      {/*<!--</div>-->*/}
      {/*<!--</div>-->*/}

      <h3>
        Supported Features
      </h3>
      <p>
        A list of features that Lore supports, each with an explanation of how it's supported and an example
        demonstrating usage.
      </p>

      {/*<!--<div className="video">-->*/}
      {/*<!--<div className="embed-responsive embed-responsive-16by9 drop-shadow pretty-embed" data-pe-videoid="HHj1aAtifso">-->*/}
      {/*<!--</div>-->*/}
      {/*<!--</div>-->*/}

      <h3>
        Architecture
      </h3>
      <p>
        This section discusses principles or aspects of Lore that apply to multiple features, or make up the foundation
        of the architecture. This section will be expanded in the future to demonstrate how to extend Lore with your
        own plugins and behavior.
      </p>
    </Template>
  )
};
