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
        Lore is an opinionated convention-driven framework, designed to make it easier to build React applications
        and evolve them over time.
      </p>
      <p>
        It's designed to be approachable for less experienced developers, while using an architecture that supports
        the feature set and concerns that applications often need as grow to become larger and more complex.
      </p>
      <p>
        Lore's goal is to make it easier to build applications, by reducing the time and knowledge required, and
        using an architecture that's designed to incorporate common needs of applications as they evolve overtime to
        meet the growing needs of the user base.
      </p>
      <p>
        Lore's goal is to provide a solid and easy-to-use architectural foundation that you can spend more of your
        time building features that provide unique user value, and less time trying to "just get things to work".
      </p>

      <h3>
        Respectfully Opinionated
      </h3>
      <p>
        Lore describes itself as "respectfully opinionated".
      </p>
      <p>
        Lore's purpose is to <em>provide a solution for front-end
        application development</em>, and software can't provide a solution to a problem without having an opinion
        about what that solution looks like. Things that entirely unopinionated require you to inject your own
        opinions before you solve problems with it.
      </p>
      <p>
        The "opinionated" part is what gives Lore value, and allows it to fulfill its purpose of providing a solution
        for front-end application development. While "unopinionated software" can provide a great foundation to build
        on (and largely describes the types of libraries that Lore is composed of), at some point software has to have opinions before it can solve problems.
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
        The two main data structures Lore uses are called <strong>models</strong>, which represent a single resource,
        and a <strong>collection</strong>, which represents a collection of resources of the same type.
      </p>

      <h3>
        UI Patterns
      </h3>
      <p>
        Lore's focus is the development of browser-based web applications, and one of the metrics by which it measures
        its success is the number and type of experiences it can easily accommodate. It's also the easiest way to
        demonstrate what the framework is capable of, by showcasing how to construct or solve common application
        needs.
      </p>

      <h3>
        Extensibility
      </h3>
      <p>
        Lore is designed to be extensible, not as an add-on, but as a foundational element of it's architecture.
        Nearly everything the framework does is provided as a customizable plugin, and you can create, add, or remove
        those plugins as you'd like.
      </p>
      <p>
        Lore also includes a CLI that provides a number of commands that make certain aspects of development more
        convenient, and the CLI follows that same principle. Not only is the CLI implemented as a series of plugins,
        but you can create, add and remove commands to tailor the behavior of the CLI to your project, and all
        without needing to fork the repo.
      </p>
    </Template>
  )
};
