import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Quickstart';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';
import image from '../../../assets/images/quickstart/filtering/final.png';

export default (props) => {
  return (
    <Template>
      <h1>
        Step 1: Add WebSocket Support
      </h1>

      <p>
        In this step we'll update our application to include support for WebSockets, so we can automatically
        display changes made by users without having to refresh the page.
      </p>

      <QuickstartBranch branch="websockets.1" />

      <h2>
        Add the WebSockets Hook
      </h2>
      <p>
        First install the <code>lore-hook-websockets-sails</code> hook:
      </p>

      <Markdown text={`
      npm install lore-hook-websockets-sails sails.io.js@~0.13.8 socket.io-client@^1.4.8 --save
      `}/>

      <p>
        Next register the hook in your <code>index.js</code> file:
      </p>

      <Markdown text={`
      // index.js
      ...
      import websockets from 'lore-hook-websockets-sails';

      lore.summon({
        hooks: {
          // ...
          router,
          websockets
        }
      });
      `}/>


      <h2>
        Add the WebSockets Config File
      </h2>
      <p>
        Next add the config file that controls the hook:
      </p>

      <Markdown text={`
      // config/websockets.js
      export default {
        serverUrl: 'http://localhost:1337'
      };
      `}/>

      <p>
        While the hook exposes more config options, the only one we need for this example is the location
        of the socket.io server, which runs on the same port as the Sails API.
      </p>

      <h2>
        Subscribe to Data
      </h2>
      <p>
        Next, initialize the hook by subscribing to data for <code>tweets</code> in the <code>Master</code> component
        when the application mounts, and unsubscribe to the data when the application unmounts:
      </p>

      <Markdown text={`
      // src/components/Master.js
      componentDidMount() {
        lore.websockets.tweet.connect();
        lore.websockets.tweet.subscribe();
      },

      componentWillUnmount() {
        lore.websockets.tweet.unsubscribe();
      },
      `}/>

      <p>
        That's it! With that change in place, the application will start listening for new data when it mounts,
        and tweets created by other users will immediately show up at the top of the feed, just like tweets you
        create yourself.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this (the same as before) but you should no
        longer see an error in the console when you paginate after creating a tweet.
      </p>

      <img className="drop-shadow" src={image} />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        index.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        TODO
        `}/>
        <CodeTab syntax="ES6" text={`
        TODO
        `}/>
        <CodeTab syntax="ESNext" text={`
        TODO
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        In the next section we'll learn how to <Link to="../../publishing/overview/">build and deploy the
        application for production</Link>.
      </p>
    </Template>
  )
};
