import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Features';
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
        Lore is an opinionated convention-driven framework, focused on making it easier to build React applications.
      </p>
      <p>
        Lore is an opinionated convention-driven framework, designed to make it easier to build and evolve React applications on making it easier to build React applications.
      </p>
      <p>
        It's designed to be approachable for less experienced developers, while using an architecture that supports
        the feature set and concerns of large complex applications.
      </p>
      <p>
        Lore's goal is to make it easier to build applications, by reducing the time and knowledge required, and
        using an architecture that's designed to incorporate common needs as applications evolve overtime to meet
        the growing needs of the user base.
      </p>

      <p>
        Creating single page applications is hard
      </p>

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
        Core Libraries
      </h3>
      <p>
        While Lore generally strives to be flexible about it's opinions (allowing you to override them or
        add and replace behaviors via hooks) there are certain libraries and concepts that are fairly
        foundational within those opinions, and may require a high level of effort in order to break away from.
      </p>
      <p>
        The libraries listed here make up the foundation of Lore, and represent the core concepts the
        framework is built around. If you're comfortable with these libraries, and enjoy working with
        them, then the framework should generally make sense, since it's largely just patterns and
        conventions built around them.
      </p>

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
