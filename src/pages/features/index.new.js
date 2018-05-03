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
        using an architecture that's designed to incorporate common needs of applications as they evolve overtime to
        meet the growing needs of the user base.
      </p>

      <h3>
        Respectfully Opinionated
      </h3>
      <p>
        Lore describes itself as "respectfully opinionated". Lore's purpose is to <em>provide a solution for front-end
        application development</em>, and software can't provide a solution to a problem without having an opinion
        about what that solution looks like. Things that entirely unopinionated require you to inject your own
        opinions before you solve problems with it.
      </p>
      <p>
        The "opinionated" part is what gives Lore value, and allows it to fulfill it's purpose of providing a solution
        for front-end application development.
      </p>
      <p>
        The "opinionated" part is what gives Lore value, since software that has no opinions is not capable of solvign
        any problems. The opinions are required in order for Lore fulfill it's purpose of providing a solution
        for front-end application development.
      </p>
      <p>
        The "respectfully" part describes how Lore does that:
      </p>
      <ul>
        <li>
          Opinions allow it to generate convernsions that provide high value with low effort, and provide solutions
          out of the box
        </li>
        <li>
          If the opinions don't match your reality, you can override and shape them using config files
        </li>
        <li>
          If you <em>really</em> need something custom, the framework is constructed as a series of plugins, and you
          can simply replace any of plugins if you need something truly custom.
        </li>
      </ul>

      <h3>
        Core Libraries
      </h3>
      <p>
        While Lore generally strives to be flexible about it's opinions, there are certain libraries and concepts
        that are fairly foundational within those opinions, and may require a high level of effort in order to break
        away from.
      </p>
      <p>
        The libraries listed as "core" (React, Redux, React Router and Webpack) make up the foundation of Lore. If
        you're comfortable with these libraries, and enjoy working with them, then the framework should generally
        make sense, since it's largely just patterns and conventions built around them.
      </p>

      <h3>
        Data Structure
      </h3>
      <p>
        The data structure your application uses is important because React applications are simplest when
        they're data-driven, meaning the data based around your application is self-describing. It not only includes
        the attributes, but the context surround them, such as whether data is being updated, or retrieved or
        represents an operation that returned an error from the API.
      </p>
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
