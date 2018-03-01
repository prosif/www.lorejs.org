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
        Step 1: Hide Edit Link
      </h1>

      <p>
        In this step we're going to wrap our <code>EditLink</code> with a decorator that will only display it for the user who created
        the tweet.
      </p>

      <QuickstartBranch branch="authorization.1" />


      <h3>
        The Authorization Decorator
      </h3>
      <p>
        If you look inside <code>src/decorators</code> you'll see one called <code>UserIsAuthorized</code> that looks like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var AuthorizationGenerator = require('lore-auth').AuthorizationGenerator;

        module.exports = AuthorizationGenerator({
          wrapperDisplayName: 'UserIsAuthorized',

          isAuthorized: function(storeState) {
            return true;
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import { AuthorizationGenerator } from 'lore-auth';

        export default AuthorizationGenerator({
          wrapperDisplayName: 'UserIsAuthorized',

          isAuthorized(storeState) {
            return true;
          }
        })
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import { AuthorizationGenerator } from 'lore-auth';

        export default AuthorizationGenerator({
          wrapperDisplayName: 'UserIsAuthorized',

          isAuthorized(storeState) {
            return true;
          }
        })
        `}/>
      </CodeTabs>

      <p>
        This decorator is designed to wrap a component, and will only render that component if the <code>isAuthorized</code> function
        returns true. The <code>isAuthorized</code> function receives a copy of the current store state as a convenience, in case you need
        to inspect it for the current user, the user's permissions, or anything else necessary to determine authorization.
      </p>

      <p>
        We're going to be using this decorator to hide the edit link from any users who were not the author of the tweet.
      </p>


      <h3>
        Create the UserCanEditTweet Decorator
      </h3>
      <p>
        Create a copy of the <code>UserIsAuthorized</code> decorator and rename it to <code>UserCanEditTweet</code>. Then update the code to look
        like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var AuthorizationGenerator = require('lore-auth').AuthorizationGenerator;

        module.exports = AuthorizationGenerator({
          wrapperDisplayName: 'UserCanEditTweet',

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
          wrapperDisplayName: 'UserCanEditTweet',

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
          wrapperDisplayName: 'UserCanEditTweet',

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

      <p>
        In the code above we're declaring that the decorator expects to receive a tweet. And since we've stored the current
        user in the context, we're going to retrieve it from there instead of from the store's state directly. In the
        <code>isAuthorized</code> function we are then going to check whether the current user was the author of the tweet.
      </p>


      <h3>
        Wrap the Edit Link
      </h3>
      <p>
        To use this decorator, open the <code>EditLink</code> component and decorate the component just like you would when using
        <code>lore.connect</code>.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var UserCanEditTweet = require('../decorators/UserCanEditTweet');

        module.exports = UserCanEditTweet(React.createClass({
          ...
        }));
        `}/>
        <CodeTab syntax="ES6" text={`
        import UserCanEditTweet from '../decorators/UserCanEditTweet';

        class EditLink extends Component {
          ...
        }

        export default UserCanEditTweet(EditLink);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import UserCanEditTweet from '../decorators/UserCanEditTweet';

        @UserCanEditTweet
        class EditLink extends Component {
          ...
        }
        `}/>
      </CodeTabs>

      <p>
        Now refresh the page and the edit links should disappear from any tweets not created by Ayla.
      </p>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/authorization/step-1.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/decorators/UserCanEditTweet.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var AuthorizationGenerator = require('lore-auth').AuthorizationGenerator;

        module.exports = AuthorizationGenerator({
          wrapperDisplayName: 'UserCanEditTweet',

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
          wrapperDisplayName: 'UserCanEditTweet',

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
          wrapperDisplayName: 'UserCanEditTweet',

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
        src/components/EditLink.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var UserCanEditTweet = require('../decorators/UserCanEditTweet');

        module.exports = UserCanEditTweet(React.createClass({
          displayName: 'EditLink',

          propTypes: {
            tweet: React.PropTypes.object.isRequired
          },

          onEdit: function() {
            var tweet = this.props.tweet;

            function updateTweet(params) {
              lore.actions.tweet.update(tweet, params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.update({
                model: tweet,
                onSubmit: updateTweet
              });
            });
          },

          render: function() {
            return (
              <a className="link" onClick={this.onEdit}>
                edit
              </a>
            );
          }

        }));
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import UserCanEditTweet from '../decorators/UserCanEditTweet';

        @UserCanEditTweet
        class EditLink extends Component {

          constructor(props) {
            super(props);
            this.onEdit = this.onEdit.bind(this);
          }

          onEdit() {
            var tweet = this.props.tweet;

            function updateTweet(params) {
              lore.actions.tweet.update(tweet, params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.update({
                model: tweet,
                onSubmit: updateTweet
              });
            });
          }

          render() {
            return (
              <a className="link" onClick={this.onEdit}>
                edit
              </a>
            );
          }

        }

        EditLink.propTypes = {
          tweet: PropTypes.object.isRequired
        };

        export default UserCanEditTweet(EditLink);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import UserCanEditTweet from '../decorators/UserCanEditTweet';

        @UserCanEditTweet
        class EditLink extends Component {

          constructor(props) {
            super(props);
            this.onEdit = this.onEdit.bind(this);
          }

          static propTypes = {
            tweet: PropTypes.object.isRequired
          };

          onEdit() {
            var tweet = this.props.tweet;

            function updateTweet(params) {
              lore.actions.tweet.update(tweet, params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.update({
                model: tweet,
                onSubmit: updateTweet
              });
            });
          }

          render() {
            return (
              <a className="link" onClick={this.onEdit}>
                edit
              </a>
            );
          }

        }

        export default EditLink;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-2/">hide the delete link</Link>.
      </p>
    </Template>
  )
};
