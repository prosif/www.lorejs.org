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
        Step 1: Remove Unnecessary Code
      </h1>

      <p>
        In this step we'll remove the code that we added to "hack expected behavior" prior to having a real API. Since we now
        have one, we no longer need this code.
      </p>

      <QuickstartBranch branch="cleanup.1" />

      <h3>
        Remove Custom Parse Method for Tweet Model
      </h3>
      <p>
        When we first integrated the API server, we added a custom <code>parse()</code> method to our <code>tweet</code> model that looks like this:
      </p>

      <Markdown text={`
      {
        ...
        properties: {

          parse: function(response, options) {
            response.userId = response.user;
            return response;
          }

        }

      }
      `}/>

      <p>
        This method added the <code>userId</code> attribute to all <code>tweet</code> resources (an attribute
        that doesn't exist in the API server response) and prevented us from having to refactor our component
        code. But now we <em>are</em> going to refactor our component code to simplify some of the next steps
        in the Quickstart.
      </p>
      <p>
        Open <code>src/models/tweet.js</code> and reset that parse method to the commented out default:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {
          ...
          // parse: function(response, options) {
          //   return response;
          // }
          ...
        };
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {
          ...
          // parse: function(response, options) {
          //   return response;
          // }
          ...
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {
          ...
          // parse: function(response, options) {
          //   return response;
          // }
          ...
        }
        `}/>
      </CodeTabs>

      <h3>
        Update Tweet Component
      </h3>
      <p>
        By resetting the <code>parse()</code> method, we no longer have a <code>userId</code> attribute
        on <code>tweet</code> resources. So update the <code>connect</code> call in the <code>Tweet</code> to
        use <code>tweet.data.user</code> instead of <code>tweet.data.userId</code>:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default connect(function(getState, props) {
          const { tweet } = props;

          return {
            user: getState('user.byId', {
              id: tweet.data.user
            })
          };
        })(
          ...
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        export default connect(function(getState, props) {
          const tweet = props.tweet;

          return {
            user: getState('user.byId', {
              id: tweet.data.user
            })
          };
        })(Tweet);
        `}/>
        <CodeTab syntax="ESNext" text={`
        @connect(function(getState, props) {
          const tweet = props.tweet;

          return {
            user: getState('user.byId', {
              id: tweet.data.user
            })
          };
        })
        `}/>
      </CodeTabs>

      <h3>
        Remove Extra Params from CreateButton Action
      </h3>
      <p>
        Lastly, before we had a real API server, when we created a tweet we had to manually provide the <code>userId</code> of the user
        that created it and the <code>createdAt</code> date of when the tweet was created. That led to us setting up a call to
        <code>lore.actions.tweet.create</code> that looked like this:
      </p>

      <Markdown text={`
      lore.actions.tweet.create(_.extend(params, {
        userId: 1,
        createdAt: new Date().toISOString()
      }));
      `}/>

      <p>
        But now those values are automatically set by the API server, so we can remove them. Open your <code>CreateButton</code>
        component and modify the <code>onClick()</code> method to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          },
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          }
        ...
        `}/>
      </CodeTabs>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should still work and should once again look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-1.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/models/tweet.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {

          attributes: {
            text: {
              type: 'text',
              displayName: 'Message',
              placeholder: "What's happening?"
            }
          }

        };
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {

          attributes: {
            text: {
              type: 'text',
              displayName: 'Message',
              placeholder: "What's happening?"
            }
          }

        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {

          attributes: {
            text: {
              type: 'text',
              displayName: 'Message',
              placeholder: "What's happening?"
            }
          }

        }
        `}/>
      </CodeTabs>

      <h3>
        src/components/Tweet.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import moment from 'moment';
        import EditLink from './EditLink';
        import DeleteLink from './DeleteLink';

        export default connect(function(getState, props) {
          const { tweet } = props;

          return {
            user: getState('user.byId', {
              id: tweet.data.user
            })
          };
        })(
        createReactClass({
          displayName: 'Tweet',

          propTypes: {
            tweet: PropTypes.object.isRequired,
            user: PropTypes.object.isRequired
          },

          render() {
            const {
              tweet,
              user
            } = this.props;
            const timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

            return (
              <li className="list-group-item tweet">
                <div className="image-container">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                </div>
                <div className="content-container">
                  <h4 className="list-group-item-heading title">
                    {user.data.nickname}
                  </h4>
                  <h4 className="list-group-item-heading timestamp">
                    {'- ' + timestamp}
                  </h4>
                  <p className="list-group-item-text text">
                    {tweet.data.text}
                  </p>
                  <div>
                    <EditLink tweet={tweet} />
                    <DeleteLink tweet={tweet} />
                  </div>
                </div>
              </li>
            );
          }

        })
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import moment from 'moment';
        import EditLink from './EditLink';
        import DeleteLink from './DeleteLink';

        class Tweet extends React.Component {

          render() {
            const {
              tweet,
              user
            } = this.props;
            const timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

            return (
              <li className="list-group-item tweet">
                <div className="image-container">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                </div>
                <div className="content-container">
                  <h4 className="list-group-item-heading title">
                    {user.data.nickname}
                  </h4>
                  <h4 className="list-group-item-heading timestamp">
                    {'- ' + timestamp}
                  </h4>
                  <p className="list-group-item-text text">
                    {tweet.data.text}
                  </p>
                  <div>
                    <EditLink tweet={tweet} />
                    <DeleteLink tweet={tweet} />
                  </div>
                </div>
              </li>
            );
          }
        }

        Tweet.propTypes = {
          tweet: PropTypes.object.isRequired,
          user: PropTypes.object.isRequired
        };

        export default connect(function(getState, props) {
          const tweet = props.tweet;

          return {
            user: getState('user.byId', {
              id: tweet.data.user
            })
          };
        })(Tweet);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import moment from 'moment';
        import EditLink from './EditLink';
        import DeleteLink from './DeleteLink';

        @connect(function(getState, props) {
          const tweet = props.tweet;

          return {
            user: getState('user.byId', {
              id: tweet.data.user
            })
          };
        })
        class Tweet extends React.Component {

          static propTypes = {
            tweet: PropTypes.object.isRequired,
            user: PropTypes.object.isRequired
          };

          render() {
            const {
              tweet,
              user
            } = this.props;
            const timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

            return (
              <li className="list-group-item tweet">
                <div className="image-container">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                </div>
                <div className="content-container">
                  <h4 className="list-group-item-heading title">
                    {user.data.nickname}
                  </h4>
                  <h4 className="list-group-item-heading timestamp">
                    {'- ' + timestamp}
                  </h4>
                  <p className="list-group-item-text text">
                    {tweet.data.text}
                  </p>
                  <div>
                    <EditLink tweet={tweet} />
                    <DeleteLink tweet={tweet} />
                  </div>
                </div>
              </li>
            );
          }
        }

        export default Tweet;
        `}/>
      </CodeTabs>

      <h3>
        src/components/CreateButton.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';

        export default createReactClass({
          displayName: 'CreateButton',

          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          },

          render() {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import _ from 'lodash';

        class CreateButton extends React.Component {

          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          }

          render () {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        }

        export default CreateButton;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import _ from 'lodash';

        class CreateButton extends React.Component {

          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          }

          render () {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        }

        export default CreateButton;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        In the next section <Link to="../../normalization/overview/">we'll add support for normalization of API responses</Link>.
      </p>
    </Template>
  )
};
