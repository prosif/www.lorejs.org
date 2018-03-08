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
        In this section we'll learn about routing, and modify our application to change the content displayed as the URL
        changes.
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
