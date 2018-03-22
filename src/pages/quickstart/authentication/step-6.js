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
        Step 6: Save CurrentUser in Context
      </h1>

      <p>
        In this step we're going to save the current user to context, so any component in the application can
        access it.
      </p>

      <QuickstartBranch branch="authentication.6" />

      <h3>
        The Master Component
      </h3>
      <p>
        You may have noticed a component called <code>Master</code> in your components folder. This component is
        intended to serve as a non-visual wrapper around your application, and has two main functions:
      </p>

      <ol>
        <li>Subscribe to the Redux store, so the application will re-render when the store changes</li>
        <li>Fetch any data that needs to be retrieved before the application loads</li>
      </ol>

      <p>
        In this step, we'll be focusing on the second function, and fetching the profile for the current user
        before we load the rest of the application.
      </p>

      <h3>
        Add /user route to mock API
      </h3>
      <p>
        Currently we don't have an API we can use to exchange the token from Auth0 for a proper user object. So
        let's create one (reminder: we'll be replacing the mock API with a real one later).
      </p>

      <p>
        Open up <code>db.json</code> and add a new endpoint called <code>/user</code> by adding this JSON to the
        bottom of the file:
      </p>

      <Markdown type="json" text={`
      {
        "users": [
          ...
        ],
        "tweets": [
          ...
        ],
        "user": {
          "id": 1,
          "nickname": "ayla",
          "avatar": "https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png"
        }
      }
      `}/>

      <p>
        With this change in place, if you navigate to <code>/user</code> the API will return an object telling us
        we are Ayla.
      </p>

      <h3>
        Set the endpoint for the currentUser model
      </h3>
      <p>
        Next, we need to tell Lore where it can fetch the current user. Open up the <code>currentUser</code> model
        and find the property for <code>endpoint</code>. Change it from <code>currentUser</code> to <code>user</code> like
        this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {
          endpoint: 'user'
        }
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {
          endpoint: 'user'
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {
          endpoint: 'user'
        }
        `}/>
      </CodeTabs>

      <h3>
        Fetch the Current User in Master
      </h3>
      <p>
        Now let's fetch the current user when the application loads. Update the <code>Master</code> component to look
        like this. We're going to request the <code>currentUser</code> in the <code>connect</code> wrapper, and
        we're doing to check the state in render and display a loading experience until the current user is returned.
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
                  <h1 className="loading-text">
                    Loading...
                  </h1>
                )
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
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
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
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
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
        Finally, we're going to retrieve the user from context in the <code>Profile</code> component, instead of
        expecting it to come from props:
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
        db.json
      </h3>

      <Markdown type="json" text={`
      {
        "users": [
          {
            "id": 1,
            "nickname": "ayla",
            "avatar": "https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png"
          },
          {
            "id": 2,
            "nickname": "crono",
            "avatar": "https://cloud.githubusercontent.com/assets/2637399/19027070/a3659c76-88e1-11e6-8434-5d66c70956c7.png"
          },
          {
            "id": 3,
            "nickname": "frog",
            "avatar": "https://cloud.githubusercontent.com/assets/2637399/19027071/a36ef028-88e1-11e6-9756-5e35b6fed834.png"
          },
          {
            "id": 4,
            "nickname": "lucca",
            "avatar": "https://cloud.githubusercontent.com/assets/2637399/19027072/a36f0c7a-88e1-11e6-931e-7f67fe01367b.png"
          },
          {
            "id": 5,
            "nickname": "magus",
            "avatar": "https://cloud.githubusercontent.com/assets/2637399/19027073/a36f67f6-88e1-11e6-9168-7687083cb994.png"
          },
          {
            "id": 6,
            "nickname": "marle",
            "avatar": "https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png"
          },
          {
            "id": 7,
            "nickname": "robo",
            "avatar": "https://cloud.githubusercontent.com/assets/2637399/19027075/a3719e2c-88e1-11e6-9abe-5186abc4b04d.png"
          }
        ],
        "tweets": [
          {
            "id": 1,
            "userId": 1,
            "text": "Ayla fight while alive! Win and live. Lose and die. Rule of life. No change rule.",
            "createdAt": "2016-11-26T04:03:25.546Z"
          },
          {
            "id": 2,
            "userId": 2,
            "text": "What ARE you two doing? I thought you said something about a nice little slideshow?",
            "createdAt": "2016-11-26T04:03:25.546Z"
          },
          {
            "id": 3,
            "userId": 3,
            "text": "Ma'am, you're mistaken, I'm not a pet, I'm a Knight and master swordsman.",
            "createdAt": "2016-11-26T04:03:25.546Z"
          },
          {
            "id": 4,
            "userId": 4,
            "text": "Nothing can beat science!",
            "createdAt": "2016-11-26T04:03:25.546Z"
          },
          {
            "id": 5,
            "userId": 5,
            "text": "I never imagined that we would settle our score in this dusty old era. Come, let us finish this charade!",
            "createdAt": "2016-11-26T04:03:25.546Z"
          },
          {
            "id": 6,
            "userId": 6,
            "text": "Crono!! We can't keep sponging off my dad! Go and get a job!!",
            "createdAt": "2016-11-26T04:03:25.546Z"
          },
          {
            "id": 7,
            "userId": 7,
            "text": "Something is written in archaic script. I will translate... R...o...i...h...c...l...e...m? Roihclem? System error! I reversed it! It says \\"Melchior!\\".",
            "createdAt": "2016-11-26T04:03:25.546Z"
          }
        ],
        "user": {
          "id": 1,
          "nickname": "ayla",
          "avatar": "https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png"
        }
      }
      `} />

      <h3>
        src/models/currentUser.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {
          endpoint: 'user'
        }
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {
          endpoint: 'user'
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {
          endpoint: 'user'
        }
        `}/>
      </CodeTabs>

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
                  <h1 className="loading-text">
                    Loading...
                  </h1>
                )
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
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
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
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
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
        In the next section we'll be <Link to="../../authorization/overview/">hiding the edit and delete
        links</Link> to reflect the application's user permissions.
      </p>
    </Template>
  )
};
