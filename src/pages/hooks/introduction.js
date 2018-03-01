import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Hooks';
import Markdown from '../../components/Markdown';
import CodeTabs from '../../components/CodeTabs';
import CodeTab from '../../components/CodeTab';
import QuickstartBranch from '../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Hooks
      </h1>
      <p>
        The vast majority of functionality in Lore is implemented as a series of plugins calls hooks. This is done to make
        it easier to modify and extend the functionality of the framework.
      </p>

      <p>
        New projects include a set of default hooks, which you can see if you open up the <code>index.js</code> file at the root
        of your project:
      </p>

      <Markdown text={`
      lore.summon({
        hooks: {
          auth: require('lore-hook-auth'),
          actions: require('lore-hook-actions'),
          bindActions: require('lore-hook-bind-actions'),
          collections: require('lore-hook-collections'),
          connections: require('lore-hook-connections'),
          connect: require('lore-hook-connect'),
          dialog: require('lore-hook-dialog'),
          dialogs: require('lore-hook-dialogs-bootstrap'),
          models: require('lore-hook-models'),
          react: require('lore-hook-react'),
          reducers: require('lore-hook-reducers'),
          redux: _.extend(require('lore-hook-redux'), {
            dependencies: ['reducers', 'auth']
          }),
          router: require('lore-hook-router')
        }
      });
      `}/>

      <h3>
        List of Default Hooks
      </h3>
      <p>
        The following is a short description of what each of the default hooks do.
      </p>

      <ul>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-actions">lore-hook-actions</Link>: creates a set of actions for each model from blueprints</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-auth">lore-hook-auth</Link>: provides an action and reducer dedicated to fetching the current user</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-bind-actions">lore-hook-bind-actions</Link>: binds all actions to the dispatch method of the Redux store to make them simpler to invoke</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-collections">lore-hook-collections</Link>: creates a Collection for each model in the application, using information in <code>connections</code> config</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-connect">lore-hook-connect</Link>: generates the lore.connect decorator to simplify data retrieval</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-connections">lore-hook-connections</Link>: allows you to describe the APIs your application will be consuming</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-dialog">lore-hook-dialog</Link>: provides a utility for mounting dialogs</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-models">lore-hook-models</Link>: creates a Model for each model in the application, using information in <code>connections</code> config</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-react">lore-hook-react</Link>: hook responsible for building and mounting the application to the DOM</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-reducers">lore-hook-reducers</Link>: creates a set of reducers for each model from blueprints</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-redux">lore-hook-redux</Link>: generates the Redux Store from all the reducers</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-router">lore-hook-router</Link>: loads the react-router routes and history type</li>
      </ul>


      <h3>
        Additional Hooks
      </h3>
      <p>
        In additional to the default actions, there are other actions you can install on an as-needed basis.
      </p>

      <ul>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-dialogs-bootstrap">lore-hook-dialogs-bootstrap</Link>: automatically generates <a href="http://getbootstrap.com/javascript/#modals">Bootstrap dialogs</a> for each model in the application</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-dialogs-material-ui">lore-hook-dialogs-material-ui</Link>: automatically generates <a href="http://www.material-ui.com/#/components/dialog">Material UI dialogs</a> for each model in the application</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-polling">lore-hook-polling</Link>: provides the ability to poll actions on an interval</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-websockets-actioncable">lore-hook-websockets-actioncable</Link>: provides an implementation of lore-websockets designed to work with the ActionCable implementation introduced in Rails 5</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-websockets-sails">lore-hook-websockets-sails</Link>: provides an implementation of lore-websockets designed to work with Sail.js</li>
        <li><Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-websockets-socketio">lore-hook-websockets-socketio</Link>: provides an implementation of lore-websockets designed to work with socket.io</li>
      </ul>
    </Template>
  )
};
