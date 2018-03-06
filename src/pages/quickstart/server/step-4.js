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
        Step 4: Reset Store on Logout
      </h1>

      <p>
        In this step we'll reset the store on logout, so the application loads correctly when switching between users.
      </p>

      <QuickstartBranch branch="server.4" />

      <h3>
        What's the issue?
      </h3>
      <p>
        We currently have a problem if you try to switch between users. To see the issue, follow these steps:
      </p>

      <ol>
        <li>Click the Logout button</li>
        <li>Refresh the browser</li>
        <li>Login as Marle</li>
        <li>Click the Logout button</li>
        <li>Login as Ayla</li>
      </ol>

      <p>
        Once you login as Ayla, you'll see the Profile <em>still</em> display information about Marle. This is because logging out
        only deleted the user token, but it didn't actually flush the Redux store.
      </p>

      <p>
        This is an issue because Lore's default behavior is to only fetch data if it doesn't already exist. Since the data
        already existed (like the current user and list of tweets) it was never refetched, and so we rendered data for the
        old user.
      </p>

      <blockquote>
        <p>
          As a reminder, you can login as any of the characters below:
        </p>
        <ul>
          <li>ayla</li>
          <li>crono</li>
          <li>frog</li>
          <li>lucca</li>
          <li>magus</li>
          <li>marle</li>
          <li>robo</li>
        </ul>
        <p>
          The email format is <code>{"{name}@example.com"}</code>, and the password for all of them
          is <code>password</code>. So if you wanted to login as marle, you would
          enter <code>marle@example.com</code> for the email and <code>password</code> for the password.
        </p>
      </blockquote>

      <h3>
        Reset the Store on Logout
      </h3>
      <p>
        The fix for this is pretty simple. When we logout, we just need to emit an action telling the Redux store to reset.
      </p>

      <p>
        To do this open up the <code>Logout</code> component and import <code>ActionTypes</code>. Then emit the <code>RESET_STORE</code> action when the <code>Logout</code>
        component is mounted.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        import { ActionTypes } from 'lore-utils';

        export default createReactClass({

          ...

          componentDidMount: function(){
            auth.deleteToken();
            lore.store.dispatch({
              type: ActionTypes.RESET_STORE,
              payload: {}
            });
            this.props.router.push('/');
          }

          ...
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import { ActionTypes } from 'lore-utils';

        class Logout extends React.Component {

          ...

          componentDidMount(){
            auth.deleteToken();
            lore.store.dispatch({
              type: ActionTypes.RESET_STORE,
              payload: {}
            });
            this.props.router.push('/');
          }

          ...
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import { ActionTypes } from 'lore-utils';

        class Logout extends React.Component {

          ...

          componentDidMount(){
            auth.deleteToken();
            lore.store.dispatch({
              type: ActionTypes.RESET_STORE,
              payload: {}
            });
            this.props.router.push('/');
          }

          ...
        }
        `}/>
      </CodeTabs>

      <p>
        With this change in place, swapping between users will now also cause the application to refetch all the data.
      </p>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/server/step-4.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Logout.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import auth from '../utils/auth';
        import { ActionTypes } from 'lore-utils';

        export default createReactClass({
          displayName: 'Logout',

          propTypes: {
            router: PropTypes.object.isRequired
          },

          componentDidMount: function(){
            auth.deleteToken();
            lore.store.dispatch({
              type: ActionTypes.RESET_STORE,
              payload: {}
            });
            this.props.router.push('/');
          },

          render: function() {
            return (
              <h1 className="loading-text">
                Logging out...
              </h1>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import auth from '../utils/auth';
        import { ActionTypes } from 'lore-utils';

        class Logout extends React.Component {

          static propTypes = {
            router: PropTypes.object.isRequired
          };

          componentDidMount(){
            auth.deleteToken();
            lore.store.dispatch({
              type: ActionTypes.RESET_STORE,
              payload: {}
            });
            this.props.router.push('/');
          }

          render() {
            return (
              <h1 className="loading-text">
                Logging out...
              </h1>
            );
          }
        }

        export default Logout;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import auth from '../utils/auth';
        import { ActionTypes } from 'lore-utils';

        class Logout extends React.Component {

          static propTypes = {
            router: PropTypes.object.isRequired
          };

          componentDidMount(){
            auth.deleteToken();
            lore.store.dispatch({
              type: ActionTypes.RESET_STORE,
              payload: {}
            });
            this.props.router.push('/');
          }

          render() {
            return (
              <h1 className="loading-text">
                Logging out...
              </h1>
            );
          }
        }

        export default Logout;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        In the next section we'll <Link to="../../pagination/overview">add support for pagination</Link>.
      </p>
    </Template>
  )
};
