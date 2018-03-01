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
        Step 1: Add Profile to Layout
      </h1>

      <p>
        In this step we're going to update the layout to include profile information about the current user.
      </p>

      <QuickstartBranch branch="authentication.1" />

      <h3>
        Create Profile Component
      </h3>
      <p>
        Create a <code>Profile</code> component to display profile information about the current user:
      </p>

      <Markdown type="sh" text={`
      lore generate component Profile
      `}/>

      <p>
        Update the component to look like this. Note that we're also adding a mock user in <code>getDefaultProps</code>. We'll replace
        this with real user information soon.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');

        module.exports = React.createClass({
          displayName: 'Profile',

          propTypes: {
            user: React.PropTypes.object.isRequired
          },

          getDefaultProps: function() {
            return {
              user: {
                id: 1,
                data: {
                  nickname: 'marle',
                  avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
                }
              }
            }
          },

          render: function() {
            var user = this.props.user;

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
                  <button className="btn btn-primary">
                    Logout
                  </button>
                </div>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';

        class Profile extends Component {

          render() {
            const user = this.props.user;

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
                  <button className="btn btn-primary">
                    Logout
                  </button>
                </div>
              </div>
            );
          }
        }

        Profile.propTypes = {
          user: PropTypes.object.isRequired
        };

        Profile.defaultProps = {
          user: {
            id: 1,
            data: {
              nickname: 'marle',
              avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
            }
          }
        };

        export default Profile;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';

        class Profile extends Component {

          static propTypes = {
            user: PropTypes.object.isRequired
          };

          static defaultProps = {
            user: {
              id: 1,
              data: {
                nickname: 'marle',
                avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
              }
            }
          };

          render() {
            const user = this.props.user;

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
                  <button className="btn btn-primary">
                    Logout
                  </button>
                </div>
              </div>
            );
          }
        }

        export default Profile;
        `}/>
      </CodeTabs>

      <h3>
        Add Profile to Layout
      </h3>
      <p>
        Now that we've created out Profile component, let's modify the Layout to display it. Open your <code>Layout</code> component,
        import the <code>Profile</code> component we just created, and update the render method to look like this (note that we have
        adjusted the <code>col-md-*</code> classes to make room for the Profile):
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        var Profile = require('./Profile');

        ...

          render: function() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import Profile from './Profile';

        ...

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import Profile from './Profile';

        ...

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        ...
        `}/>
      </CodeTabs>

      <p>
        Refresh the page and should now see the Profile component displayed on the left side of the screen.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/authentication/step-1.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Profile.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');

        module.exports = React.createClass({
          displayName: 'Profile',

          propTypes: {
            user: React.PropTypes.object.isRequired
          },

          getDefaultProps: function() {
            return {
              user: {
                id: 1,
                data: {
                  nickname: 'marle',
                  avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
                }
              }
            }
          },

          render: function() {
            var user = this.props.user;

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
                  <button className="btn btn-primary">
                    Logout
                  </button>
                </div>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';

        class Profile extends Component {

          render() {
            const user = this.props.user;

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
                  <button className="btn btn-primary">
                    Logout
                  </button>
                </div>
              </div>
            );
          }
        }

        Profile.propTypes = {
          user: PropTypes.object.isRequired
        };

        Profile.defaultProps = {
          user: {
            id: 1,
            data: {
              nickname: 'marle',
              avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
            }
          }
        };

        export default Profile;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';

        class Profile extends Component {

          static propTypes = {
            user: PropTypes.object.isRequired
          };

          static defaultProps = {
            user: {
              id: 1,
              data: {
                nickname: 'marle',
                avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
              }
            }
          };

          render() {
            const user = this.props.user;

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
                  <button className="btn btn-primary">
                    Logout
                  </button>
                </div>
              </div>
            );
          }
        }

        export default Profile;
        `}/>
      </CodeTabs>

      <h3>
        src/components/Layout.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        /**
         * This component is intended to reflect the high level structure of your application,
         * and render any components that are common across all views, such as the header or
         * top-level navigation. All other components should be rendered by route handlers.
         **/

        var React = require('react');
        var Header = require('./Header');
        var Profile = require('./Profile');

        module.exports = React.createClass({
          displayName: 'Layout',

          render: function() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import Header from './Header';
        import Profile from './Profile';

        class Layout extends Component {

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        }

        export default Layout;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component } from 'react';
        import Header from './Header';
        import Profile from './Profile';

        class Layout extends Component {

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        }

        export default Layout;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-2/">add a login experience</Link>.
      </p>
    </Template>
  )
};
