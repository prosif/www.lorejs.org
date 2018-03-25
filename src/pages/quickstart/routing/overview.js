import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Quickstart';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Routing: Overview
      </h1>
      <p>
        In this section we'll learn about routing, which is a way to control what gets rendered based on the URL
        the user navigates to.
      </p>

      <p>
        At the end of this section your application will look like this:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/routing/step-2.png" />

      <h3>
        React Router & Routes.js
      </h3>

      <p>
        At the root of your project is a file called <code>routes.js</code> that looks like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import Master from './src/components/Master';
        import Layout from './src/components/Layout';
        import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

        export default (
          <Route component={UserIsAuthenticated(Master)}>
            <Route path="/" component={Layout} />
          </Route>
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import Master from './src/components/Master';
        import Layout from './src/components/Layout';
        import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

        export default (
          <Route component={UserIsAuthenticated(Master)}>
            <Route path="/" component={Layout} />
          </Route>
        );
        `}/>
        <CodeTab syntax="ESNext" text={`
        import Master from './src/components/Master';
        import Layout from './src/components/Layout';
        import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

        export default (
          <Route component={UserIsAuthenticated(Master)}>
            <Route path="/" component={Layout} />
          </Route>
        );
        `}/>
      </CodeTabs>

      <p>
        If you're familiar with <a href="https://github.com/ReactTraining/react-router">react-router</a> this file
        should look very familiar. React Router is one of the core libraries that Lore is built on, and this file
        exposes the routes that are passed to <code>react-router</code>.
      </p>

      <blockquote>
        <p>
          Lore makes no modifications to these routes or to the behavior of React Router, so if you have any
          questions about the syntax, or specific routing-related needs, all of React
          Router's <a href="https://github.com/ReactTraining/react-router/tree/v3/docs">
          documentation</a> and <a href="https://github.com/ReactTraining/react-router/tree/v3/examples">
          examples</a> will be directly applicable to Lore.
        </p>
        <p>
          It's also important to mention that <strong>new Lore projects include react-router v3</strong>,
          and <strong>NOT</strong> v4. The links above go to the v3 documentation. By modifying some of
          configuration files in your project, it's possible to replace v3 with v4, but there's no formal guide
          explaining how to do it yet. Once there is, a link will be provided here.
        </p>
        <p>
          In the future, Lore will <em>probably</em> switch to v4 as the default, but it needs to be explored
          more.
        </p>
        <p>

        </p>
      </blockquote>

      <h2>
        Next Steps
      </h2>
      <p>
        Ready? Let's <Link to="../step-1/">get started</Link>!
      </p>
    </Template>
  )
};
