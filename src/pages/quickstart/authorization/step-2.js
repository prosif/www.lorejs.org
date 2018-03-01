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
        Step 2: Hide Delete Link
      </h1>

      <p>
        In this step we're going to wrap our <code>DeleteLink</code> with a decorator that will only display it for the user who created
        the tweet.
      </p>

      <QuickstartBranch branch="authorization.2" />

      <h3>
        Create the UserCanDeleteTweet Decorator
      </h3>
      <p>
        Create a copy of the <code>UserIsAuthorized</code> decorator once again and rename it to <code>UserCanDeleteTweet</code>. Then update the
        code to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var AuthorizationGenerator = require('lore-auth').AuthorizationGenerator;

        module.exports = AuthorizationGenerator({
          wrapperDisplayName: 'UserCanDeleteTweet',

          propTypes: {
            tweet: React.PropTypes.object.isRequired
          },

          contextTypes: {
            user: React.PropTypes.object.isRequired
          },

          isAuthorized: function(storeState) {
            var tweet = this.props.tweet;
            var user = this.context.user;

            return tweet.data.userId === user.id;
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { PropTypes } from 'react';
        import { AuthorizationGenerator } from 'lore-auth';

        export default AuthorizationGenerator({
          wrapperDisplayName: 'UserCanDeleteTweet',

          propTypes: {
            tweet: PropTypes.object.isRequired
          },

          contextTypes: {
            user: React.PropTypes.object.isRequired
          },

          isAuthorized(storeState) {
            var tweet = this.props.tweet;
            var user = this.context.user;

            return tweet.data.userId === user.id;
          }
        })
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { PropTypes } from 'react';
        import { AuthorizationGenerator } from 'lore-auth';

        export default AuthorizationGenerator({
          wrapperDisplayName: 'UserCanDeleteTweet',

          propTypes: {
            tweet: PropTypes.object.isRequired
          },

          contextTypes: {
            user: React.PropTypes.object.isRequired
          },

          isAuthorized(storeState) {
            var tweet = this.props.tweet;
            var user = this.context.user;

            return tweet.data.userId === user.id;
          }
        })
        `}/>
      </CodeTabs>

      <h3>
        Wrap the Delete Link
      </h3>
      <p>
        To use this decorator, open the <code>DeleteLink</code> component and decorate the component just like you would when using
        <code>lore.connect</code>.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var UserCanDeleteTweet = require('../decorators/UserCanDeleteTweet');

        module.exports = UserCanDeleteTweet(React.createClass({
          ...
        }));
        `}/>
        <CodeTab syntax="ES6" text={`
        import UserCanDeleteTweet from '../decorators/UserCanDeleteTweet';

        class DeleteLink extends Component {
          ...
        }

        export default UserCanDeleteTweet(DeleteLink);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import UserCanDeleteTweet from '../decorators/UserCanDeleteTweet';

        @UserCanDeleteTweet
        class DeleteLink extends Component {
          ...
        }
        `}/>
      </CodeTabs>

      <p>
        Now refresh the page and the delete links should disappear from any tweets not created by Ayla.
      </p>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/authorization/step-2.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/decorators/UserCanDeleteTweet.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var AuthorizationGenerator = require('lore-auth').AuthorizationGenerator;

        module.exports = AuthorizationGenerator({
          wrapperDisplayName: 'UserCanDeleteTweet',

          propTypes: {
            tweet: PropTypes.object.isRequired
          },

          contextTypes: {
            user: React.PropTypes.object.isRequired
          },

          isAuthorized(storeState) {
            var tweet = this.props.tweet;
            var user = this.context.user;

            return tweet.data.userId === user.id;
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { PropTypes } from 'react';
        import { AuthorizationGenerator } from 'lore-auth';

        export default AuthorizationGenerator({
          wrapperDisplayName: 'UserCanDeleteTweet',

          propTypes: {
            tweet: PropTypes.object.isRequired
          },

          contextTypes: {
            user: React.PropTypes.object.isRequired
          },

          isAuthorized(storeState) {
            var tweet = this.props.tweet;
            var user = this.context.user;

            return tweet.data.userId === user.id;
          }
        })
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { PropTypes } from 'react';
        import { AuthorizationGenerator } from 'lore-auth';

        export default AuthorizationGenerator({
          wrapperDisplayName: 'UserCanDeleteTweet',

          propTypes: {
            tweet: PropTypes.object.isRequired
          },

          contextTypes: {
            user: React.PropTypes.object.isRequired
          },

          isAuthorized(storeState) {
            var tweet = this.props.tweet;
            var user = this.context.user;

            return tweet.data.userId === user.id;
          }
        })
        `}/>
      </CodeTabs>

      <h3>
        src/components/DeleteLink.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var UserCanDeleteTweet = require('../decorators/UserCanDeleteTweet');

        module.exports = UserCanDeleteTweet(React.createClass({
          displayName: 'DeleteLink',

          propTypes: {
            tweet: React.PropTypes.object.isRequired
          },

          onDestroy: function() {
            var tweet = this.props.tweet;

            function destroyTweet() {
              lore.actions.tweet.destroy(tweet);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.destroy({
                model: tweet,
                onSubmit: destroyTweet
              });
            });
          },

          render: function() {
            return (
              <a className="link" onClick={this.onDestroy}>
                delete
              </a>
            );
          }

        }));
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import UserCanDeleteTweet from '../decorators/UserCanDeleteTweet';

        class DeleteLink extends Component {

          constructor(props) {
            super(props);
            this.onDestroy = this.onDestroy.bind(this);
          }

          onDestroy() {
            var tweet = this.props.tweet;

            function destroyTweet() {
              lore.actions.tweet.destroy(tweet);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.destroy({
                model: tweet,
                onSubmit: destroyTweet
              });
            });
          }

          render() {
            return (
              <a className="link" onClick={this.onDestroy}>
                delete
              </a>
            );
          }

        }

        DeleteLink.propTypes = {
          tweet: PropTypes.object.isRequired
        };

        export default UserCanDeleteTweet(DeleteLink);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import UserCanDeleteTweet from '../decorators/UserCanDeleteTweet';

        @UserCanDeleteTweet
        class DeleteLink extends Component {

          static propTypes = {
            tweet: PropTypes.object.isRequired
          };

          constructor(props) {
            super(props);
            this.onDestroy = this.onDestroy.bind(this);
          }

          onDestroy() {
            var tweet = this.props.tweet;

            function destroyTweet() {
              lore.actions.tweet.destroy(tweet);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.destroy({
                model: tweet,
                onSubmit: destroyTweet
              });
            });
          }

          render() {
            return (
              <a className="link" onClick={this.onDestroy}>
                delete
              </a>
            );
          }

        }

        export default DeleteLink;
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
