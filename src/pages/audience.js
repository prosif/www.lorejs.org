import React from 'react';
import Link from 'gatsby-link';
import Template from '../components/templates/Audience';
import TocLink from '../components/TocLink';
import Markdown from '../components/Markdown';
import '../assets/less/docs.less';

export default (props) => {
  const {
    children,
    location
  } = props;

  return (
    <Template>
      <h1>
        Why discuss the audience?
      </h1>

      <p>
        Evaluating any framework or library can be a daunting task, especially when it’s not clear what problem (or set of
        problems) that framework or library was really created to solve, let alone whether that set includes the problems
        <em>you’re</em> trying to solve for.
      </p>
      <p>
        If you've spent any time developing in Node.js for example, you may have stumbled upon
        the <a href="http://nodeframework.com/">Node Frameworks website</a>, where there are literally dozens of
        libraries and frameworks all competing for your attention. And while the site is helpful for improving
        discoverability and distilling them into categories, attempting to choose one from within any single category
        is still an incredibly non-trivial and time consuming task, that requires a large personal investment of
        your time in order to find a tool with the "right fit".
      </p>
      <p>
        This page is an attempt to shortcut that process, by clearly stating the motivations for building Lore, and how
        those motivations are intended to manifest into value for people with different levels of comfort in React-based
        development.
      </p>

      <h3>
        1. React Beginners
      </h3>

      <p>
        If you're new to React, welcome; it's an amazing library with a fantastic ecosystem. But as powerful, flexible, and
        elegant as React is, it can also be <Link to="/videos/building-your-first-react-app/">incredibly daunting to get started</Link>. There
        are a lot of libraries you need to learn to get started, and if it's your first time building a web application, it's
        not going to be obvious how to connect those libraries into a solid, stable, and flexible architecture. That's where
        Lore comes in.
      </p>

      <p>
        Lore is a framework for building web applications, built on top of some of the most popular libraries in
        the React ecosystem, such as Redux, React-Router and Webpack. Lore then applies a series of patterns and
        conventions on top of those libraries that automatically solve for common application needs like API
        communication, pagination and error handling (among others).
      </p>

      <p>
        Lore has two core goals for React beginners;
      </p>

      <ol>
        <li>
          The first is to provide a <strong>safe environment</strong> for you to become comfortable building
          React applications, by letting you focus on learning React, and not getting bogged down by all the
          challenges associated with architecture.
        </li>
        <li>
          The second goal is to <strong>teach good architectural practices</strong>. The patterns and conventions
          Lore uses come from years of building diverse web applications, and in many cases incorporate the
          lessons learned from very costly mistakes.
        </li>
      </ol>

      <p>
        So the value Lore provides to React beginners is that it makes it easy to get started, provides a safe
        environment to learn React, and provides exposure to architectural patterns that have been proven to work
        for both small and large applications alike.
      </p>

      <p>
        Then, as you become more comfortable with React, and feel ready to dive in and learn more about the
        underlying libraries and architectural patterns, you can check out the <Link to="/architecture/">architecture
        documentation</Link> for an explanation and demystification of the framework.
      </p>


      <h3>
        2. The In-Betweeners
      </h3>
      <p>
        This section is for people who are somewhat comfortable with React and Redux, and have some experience
        building web applications.
      </p>

      <p>
        If that's you, then you know application architecture can be quite challenging, and there are <em>a LOT
        of problems</em> you have to solve for in a real application, many of which are not obvious up front. You
        may also know that Redux applications can contain a lot of boilerplate.
      </p>

      <p>
        Unfortunately, it can also be a little difficult to find discussion and examples about how to address
        these challenges in real-world applications, especially since the code for most applications (that we
        could learn from) is kept in private repositories.
      </p>

      <p>
        Lore has two core goals for in-betweeners;
      </p>

      <ol>
        <li>
          The first is to <strong>demonstrate what's possible with Redux</strong>. At it's core, Lore is not "some
          new way of developing web apps". Lore <strong>IS</strong> Redux. But it was developed from the perspective
          of looking at every one of the dozen plus applications I've built over the years, and asking the
          question <em>"Is there a set of patterns that can be applied to Redux that can solve every problem
          across every application I've built over the years?"</em>. And once the answer became clear the
          answer was <em>"yes"</em>, the followup was was <em>"Is there also a set of conventions can be applied
          to completely eliminate the boilerplate, and place the entire development focus on React?"</em>. The
          result of those two questions is Lore.
        </li>

        <li>
          The second goal is to <strong>demonstrate a cohesive and holistic architecture</strong> that
          is <strong>able to solve for all common application concerns</strong>. The fact is, most web applications
          are incredibly similar with respect the problems the application architecture needs to solve for; things
          like pagination, error handling, caching, and API communication. The real differences (and the real
          value) like in the specific UI/UX concerns each application needs to solve for. But too often we bogged
          down in the architecture, just <em>trying to get something to work</em>, and it takes away precious time
          from creating a better product. Lore is intended as a proof of concept to demonstrate that most web
          applications are not unique snowflakes; they're the exact same set of concerns, just dressed up in
          different clothes.
        </li>

        <p>
          With people, it may be what's on the inside that matters the most. But with web apps, it's very much
          the opposite. User's don't care about your architecture; they care about the features and user experience
          you provide, and how quickly you can add new features to improve the value your product provides to
          them. Good architectures can be immense enablers for rapid development, especially ones that solve for
          problems <em>you don't yet have but likely will</em> (needs like cache invalidation or websocket
          integration to sync data across browsers in real-time).
        </p>
      </ol>

      <p>
        So if you want to see what's possible with Redux, Lore might be of interest to you. And if you want to
        learn how it all works, and about the reasoning behind the patterns Lore uses, you can check out
        the <Link to="/architecture/">architecture documentation</Link> for an explanation and demystification
        of the framework.
      </p>


      <h3>
        3. Super Comfortable with Redux
      </h3>
      <p>
        If you've been developing web applications for a while, and are already quite comfortable with Redux,
        you've probably got your own set of libraries and patterns to solve the challenges Lore is built to
        address. And from that perspective Lore probably doesn't provide as much value to you as it would to a
        developer just starting out; you've already got the battle scars and learned the hard lessons that Lore
        is trying to help newer developers avoid.
      </p>

      <p>
        But what might be useful is a comparison of the architectural patterns you've settled on with the ones
        Lore uses, to see if any of those patterns are something you might want to adopt in your own Redux
        applications. Lore recognizes that supporting and growing an application is fraught with challenges,
        some which only come later in development cycle; challenges like consuming multiple APIs, unconventional
        APIs, inconsistent APIs, API versioning, and sometimes just some really quirky behaviors and data flows.
      </p>

      <p>
        The <Link to="/architecture/">architecture documentation</Link> is intended to completely demystify how the
        framework works, by explaining how it solves for each challenge, and talking directly to the underlying
        Redux patterns and reasoning behind why the framework uses that approach.
      </p>

      <p>
        Additionally, while Lore <strong>is</strong> a framework, and <strong>does</strong> express opinions
        about how to architect applications through those, the framework itself is actually designed as one massive
        escape hatch. All the functionality in Lore is implemented as a series of hooks (or plugins), and every
        part of lore can be overridden, which makes the framework extremely customizable.
      </p>

      <p>
        This means if you don't like the blueprints the framework uses for actions, you write your own hook and
        replace the default behavior. Additionally, every hook has a configuration file that let's you overwrite
        or modify it's behavior.
      </p>

      <p>
        So if you do decide to try out Lore, you'll never be "locked in". If you know Redux, you know Lore. And
        if there's something about your application that falls outside Lore's conventions and configuration
        options, you can easily override or replace the framework's behavior to suite that specific need.
      </p>


      <h3>
        4. Non-Redux Developers
      </h3>
      <p>
        Lastly, for developers who don't want to use Redux, Lore has very little <strong>direct value</strong>.
        Redux is a central component of the framework, and there's no getting away from it. Replacing it would
        require rewriting just about everything.
      </p>

      <p>
        But the framework might provide some <strong>indirect value</strong> in it's effort to capture common
        application concerns that a framework (or architecture) <em>should</em> solve for, as well as small examples
        that demonstrate and test each of those concerns.
      </p>

      <p>
        So if you're looking to build your own framework, or evaluating a non-Redux solution, it might be
        worthwhile to browse through the examples and use cases Lore is solving as a way of comparing solutions
        or thinking through common application concerns.
      </p>

    </Template>
  )
};
