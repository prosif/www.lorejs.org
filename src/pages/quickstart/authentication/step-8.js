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
        Step 8: Save User in Context
      </h1>

      <p>
        In this step we're going to save the current user to context, so any component in the application can
        access it.
      </p>

      <QuickstartBranch branch="authentication.8" />

      <h3>
        The Master Component
      </h3>
      <p>
        You may have noticed a component called <code>Master</code> in your components folder. This component is
        intended to serve as a non-visual wrapper around your application, and has three main functions:
      </p>

      <ol>
        <li>Subscribe to the Redux store, so the application will re-render when the store changes</li>
        <li>Fetch any data that needs to be retrieved before the application renders</li>
        <li>Remove the loading screen once the application is ready to display to the user</li>
      </ol>

      <p>
        In this step, we'll be focusing on the second function, and fetching the profile for the current user
        before we load the rest of the application.
      </p>

      <h3>
        Fetch the Current User in Master
      </h3>
      <p>
        Now let's fetch the current user when the application loads. Update the <code>Master</code> component to look
        like this. We're going to request the <code>currentUser</code> in the <code>connect</code> wrapper, and
        we're going to check the <code>state</code> in <code>render()</code>, and display a loading experience until
        the current user has returned.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import { connect } from 'lore-hook-connect';
        import PayloadStates from '../constants/PayloadStates';
        import '../../assets/css/main.css';

        export default connect(function(getState, props) {
          return {
            user: getState('currentUser')
          };
        }, { subscribe: true })(
          createReactClass({
            displayName: 'Master',

            render: function() {
              const { user } = this.props;

              if (user.state === PayloadStates.FETCHING) {
                return (
                  <div className="loader" />
                );
              }

              return (
                <div>
                  {React.cloneElement(this.props.children)}
                </div>
              );
            }
          })
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import PayloadStates from '../constants/PayloadStates';
        import '../../assets/css/main.css';

        class Master extends React.Component {

          render() {
            const { user } = this.props;

            if (user.state === PayloadStates.FETCHING) {
              return (
                <div className="loader" />
              );
            }

            return (
              <div>
                {React.cloneElement(this.props.children)}
              </div>
            );
          }

        }

        Master.propTypes = {
          user: PropTypes.object.isRequired
        };

        export default connect(function(getState, props) {
          return {
            user: getState('currentUser')
          };
        }, { subscribe: true })(Master);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import PayloadStates from '../constants/PayloadStates';
        import '../../assets/css/main.css';

        @connect(function(getState, props) {
          return {
            user: getState('currentUser')
          };
        }, { subscribe: true })
        class Master extends React.Component {

          static propTypes = {
            user: PropTypes.object.isRequired
          };

          render() {
            const { user } = this.props;

            if (user.state === PayloadStates.FETCHING) {
              return (
                <div className="loader" />
              );
            }

            return (
              <div>
                {React.cloneElement(this.props.children)}
              </div>
            );
          }

        }

        export default Master;
        `}/>
      </CodeTabs>

      <h3>
        Save the User in Context
      </h3>
      <p>
        Next we're going to save the current user to the application's context, so any component that needs it can
        access it. This is a good use of context because we're always going to have a user, and it could be used by
        any component in the application. Update your <code>Master</code> component to include methods for saving
        the user to context:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        createReactClass({
          ...

          propTypes: {
            user: PropTypes.object.isRequired
          },

          childContextTypes: {
            user: PropTypes.object
          },

          getChildContext: function() {
            return {
              user: this.props.user
            };
          },

          render: function() {
            ...
          }

        })
        `}/>
        <CodeTab syntax="ES6" text={`
        ...

        class Master extends React.Component {

          getChildContext() {
            return {
              user: this.props.user
            };
          }

          ...

        }

        Master.propTypes = {
          user: PropTypes.object.isRequired
        };

        Master.childContextTypes = {
          user: PropTypes.object
        };

        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        class Master extends React.Component {

          static propTypes = {
            user: PropTypes.object.isRequired
          };

          static childContextTypes = {
            user: PropTypes.object
          };

          getChildContext() {
            return {
              user: this.props.user
            };
          }

          ...

        }
        ...
        `}/>
      </CodeTabs>

      <h3>
        Retrieve the user from context in Profile
      </h3>
      <p>
        Finally, update your <code>Profile</code> component so that instead of retrieving the current user from props,
        we retrieve it from <code>context</code>. Once you do, feel free to delete the <code>getDefaultProps()</code> method,
        as we no longer need it.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...

        export default createReactClass({
          ...

          contextTypes: {
            user: PropTypes.object.isRequired
          },

          ...

          render: function() {
            const { user } = this.context;
            ...
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        class Profile extends React.Component {
          ...
          render: function() {
            const { user } = this.context;
            ...
          }
        }

        Profile.contextTypes = {
          user: PropTypes.object.isRequired
        };

        export default Profile;
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        class Profile extends React.Component {

          static contextTypes = {
            user: PropTypes.object.isRequired
          };

          ...

          render: function() {
            const { user } = this.context;
            ...
          }
        }

        export default Profile;
        \`\`\`
        `}/>
      </CodeTabs>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/authentication/step-6.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Master.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import PayloadStates from '../constants/PayloadStates';
        import '../../assets/css/main.css';

        export default connect(function(getState, props) {
          return {
            user: getState('currentUser')
          };
        }, { subscribe: true })(
          createReactClass({
            displayName: 'Master',

            propTypes: {
              user: PropTypes.object.isRequired
            },

            childContextTypes: {
              user: PropTypes.object
            },

            getChildContext: function() {
              return {
                user: this.props.user
              };
            },

            render: function() {
              const { user } = this.props;

              if (user.state === PayloadStates.FETCHING) {
                return (
                  <div className="loader" />
                );
              }

              return (
                <div>
                  {React.cloneElement(this.props.children)}
                </div>
              );
            }
          })
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import PayloadStates from '../constants/PayloadStates';
        import '../../assets/css/main.css';

        class Master extends React.Component {

          getChildContext() {
            return {
              user: this.props.user
            };
          }

          render() {
            const { user } = this.props;

            if (user.state === PayloadStates.FETCHING) {
              return (
                <div className="loader" />
              );
            }

            return (
              <div>
                {React.cloneElement(this.props.children)}
              </div>
            );
          }

        }

        Master.propTypes = {
          user: PropTypes.object.isRequired
        };

        Master.childContextTypes = {
          user: PropTypes.object
        };

        export default connect(function(getState, props) {
          return {
            user: getState('currentUser')
          };
        }, { subscribe: true })(Master);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import PayloadStates from '../constants/PayloadStates';
        import '../../assets/css/main.css';

        @connect(function(getState, props) {
          return {
            user: getState('currentUser')
          };
        }, { subscribe: true })
        class Master extends React.Component {

          static propTypes = {
            user: PropTypes.object.isRequired
          };

          static childContextTypes = {
            user: PropTypes.object
          };

          getChildContext() {
            return {
              user: this.props.user
            };
          }

          render() {
            const { user } = this.props;

            if (user.state === PayloadStates.FETCHING) {
              return (
                <div className="loader" />
              );
            }

            return (
              <div>
                {React.cloneElement(this.props.children)}
              </div>
            );
          }

        }

        export default Master;
        `}/>
      </CodeTabs>

      <h3>
        src/components/Profile.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';

        export default createReactClass({
          displayName: 'Profile',

          contextTypes: {
            user: PropTypes.object.isRequired
          },

          render: function() {
            const { user } = this.context;

            return (
              <div className="card profile">
                <div className="card-block">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                  <h4 className="card-title">
                    Hi {user.data.nickname}!
                  </h4>
                  <div className="card-text">
                    <p>You have permission to perform the following:</p>
                    <ul className="permissions">
                      <li>Create Tweets</li>
                      <li>Edit your own tweets</li>
                      <li>Delete your own tweets</li>
                    </ul>
                  </div>
                  <Link className="btn btn-primary" to="/logout">
                    Logout
                  </Link>
                </div>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';

        class Profile extends React.Component {

          render() {
            const { user } = this.context;

            return (
              <div className="card profile">
                <div className="card-block">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                  <h4 className="card-title">
                    Hi {user.data.nickname}!
                  </h4>
                  <div className="card-text">
                    <p>You have permission to perform the following:</p>
                    <ul className="permissions">
                      <li>Create Tweets</li>
                      <li>Edit your own tweets</li>
                      <li>Delete your own tweets</li>
                    </ul>
                  </div>
                  <Link className="btn btn-primary" to="/logout">
                    Logout
                  </Link>
                </div>
              </div>
            );
          }
        }

        Profile.contextTypes = {
          user: PropTypes.object.isRequired
        };

        export default Profile;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';

        class Profile extends React.Component {

          static contextTypes = {
            user: PropTypes.object.isRequired
          };

          render() {
            const { user } = this.context;

            return (
              <div className="card profile">
                <div className="card-block">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                  <h4 className="card-title">
                    Hi {user.data.nickname}!
                  </h4>
                  <div className="card-text">
                    <p>You have permission to perform the following:</p>
                    <ul className="permissions">
                      <li>Create Tweets</li>
                      <li>Edit your own tweets</li>
                      <li>Delete your own tweets</li>
                    </ul>
                  </div>
                  <Link className="btn btn-primary" to="/logout">
                    Logout
                  </Link>
                </div>
              </div>
            );
          }
        }

        export default Profile;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        In the next section we're going to <Link to="../../server/overview/">replace the mock server with a real server</Link>.
      </p>
    </Template>
  )
};
