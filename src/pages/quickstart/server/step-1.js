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
        Step 1: Download API Server
      </h1>

      <p>
        In this step we’ll clone and run the API server needed for the rest of this quickstart.
      </p>


      <h3>
        Clone the Server
      </h3>
      <p>
        The server we'll need is in a repository on GitHub under <Link to="https://github.com/lore/lore-tutorial-api">lore/lore-tutorial-api</Link>.
        Run this command to clone the server into your local environment:
      </p>

      <CodeTabs>
        <CodeTab title="SSH" syntax="ES5" text={`
        $ git clone git@github.com:lore/lore-tutorial-api.git
        `}/>
        <CodeTab title="HTTPS" syntax="ES5" text={`
        $ git clone https://github.com/lore/lore-tutorial-api.git
        `}/>
      </CodeTabs>

      <h3>
        Install Dependencies
      </h3>
      <p>
        Once the server is cloned, navigate into the directory and install the dependencies:
      </p>

      <Markdown type="sh" text={`
      $ cd lore-tutorial-api
      $ npm install
      `}/>

      <h3>
        Stop the Mock API Server
      </h3>
      <p>
        Once the dependencies are installed, **stop the mock server**. We'll need the port it's currently running on.
      </p>

      <h3>
        Start the Real API Server
      </h3>
      <p>
        Once the mock server is stopped, and port 1337 is free again, start the <code>lore-tutorial-api</code> server
        using <code>npm start</code>. A successful startup will produce console output similar to this:
      </p>

      <Markdown text={`
      $ npm start

      info:
      info:                .-..-.
      info:
      info:    Sails              <|    .-..-.
      info:    v0.12.6             |\\
      info:                       /|.\\
      info:                      / || \\
      info:                    ,'  |'  \\
      info:                 .-'.-==|/_--'
      info:                 \`--'-------'
      info:    __---___--___---___--___---___--___
      info:  ____---___--___---___--___---___--___-__
      info:
      info: Server lifted in \`/Users/jchansen/lore/lore-tutorial-api\`
      info: To see your app, visit http://localhost:1337
      info: To shut down Sails, press CTRL + C at any time.

        debug: -------------------------------------------------------
        debug: :: Sat Dec 31 2016 13:19:04 GMT-0700 (MST)

        debug: Environment : development
        debug: Port        : 1337
        debug: -------------------------------------------------------

      `}/>

      <p>
        If you now navigate to <code>http://localhost:1337</code> you will see a webpage showing the API routes:
      </p>

      <Markdown text={`
      {
        tweets: "http://localhost:1337/tweets",
        users: "http://localhost:1337/users",
        user: "http://localhost:1337/user"
      }
      `}/>

      <h3>
        Visual Check-in
      </h3>

      <p>
        At this point our application no longer works - this is epected. If you refresh your browser, you should see this
        error in the console:
      </p>

      <Markdown text={`
      Expected models to be an array but got [Object {data: Array[5], meta: Object}].
      Did you forget to override parse to extract the models?
      `}/>

      <p>
        We'll resolve that issue in the next step and restore our application's functionality.
      </p>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-2/">update our application to work with the new API</Link>.
      </p>
    </Template>
  )
};