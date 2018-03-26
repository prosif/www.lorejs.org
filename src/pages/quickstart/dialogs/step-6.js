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
        Step 6: Add Edit Dialog
      </h1>

      <p>
        In this step we're going to add an "edit" link to tweets that will launch a dialog to edit the text.
      </p>

      <QuickstartBranch branch="dialogs.5" />

      <h3>
        Create Edit Link
      </h3>
      <p>
        Run this command to create a component for our edit link:
      </p>

      <Markdown type="sh" text={`
      lore generate component EditLink
      `}/>

      <p>
        Next update the content of the component to look like this. We're going to integrate an <code>onClick</code>
        handler that will launch and edit dialog when the link is clicked. Unlike the create dialog, we also need to pass
        in a <code>model</code> that contains the current data. This is required in order to populate the dialog with the existing data
        we want to edit.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';

        export default createReactClass({
          displayName: 'EditLink',

          propTypes: {
            tweet: PropTypes.object.isRequired
          },

          onEdit: function() {
            const { tweet } = this.props;

            function updateTweet(params) {
              lore.actions.tweet.update(tweet, params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.update(tweet, {
                blueprint: 'optimistic',
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

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class EditLink extends React.Component {

          constructor(props) {
            super(props);
            this.onEdit = this.onEdit.bind(this);
          }

          onEdit() {
            const { tweet } = this.props;

            function updateTweet(params) {
              lore.actions.tweet.update(tweet, params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.update(tweet, {
                blueprint: 'optimistic',
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

        export default EditLink;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class EditLink extends React.Component {

          constructor(props) {
            super(props);
            this.onEdit = this.onEdit.bind(this);
          }

          static propTypes = {
            tweet: PropTypes.object.isRequired
          };

          onEdit() {
            const { tweet } = this.props;

            function updateTweet(params) {
              lore.actions.tweet.update(tweet, params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.update(tweet, {
                blueprint: 'optimistic',
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

      <h3>
        Add an Edit Link to the Tweet
      </h3>
      <p>
        Next we want to add the edit link to each tweet. Open up the <code>Tweet</code> component and modify the render method to look
        like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        import EditLink from './EditLink';

        ...
          render: function() {
            ...
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
                  </div>
                </div>
              </li>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import EditLink from './EditLink';

        ...
          render() {
            ...
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
                  </div>
                </div>
              </li>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import EditLink from './EditLink';

        ...
          render() {
            ...
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
                  </div>
                </div>
              </li>
            );
          }
        ...
        `}/>
      </CodeTabs>

      <p>
        With this change in place, refresh the browser and you should see an <em>"edit"</em> link on each of the tweets. Click this
        link to edit the text. Once you submit it, if you look at the network requests, you'll see a PUT request is sent to
        the API to update the tweet.
      </p>

      <blockquote>
        <p>
          The <code>state</code> of the tweet is also changed to <code>UPDATING</code>, so if this were a real application we could add an if
          statement to detect when data was being changed and modify our UI to communicate that to the user.
        </p>
      </blockquote>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/dialogs/step-5.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/EditLink.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';

        export default createReactClass({
          displayName: 'EditLink',

          propTypes: {
            tweet: PropTypes.object.isRequired
          },

          onEdit: function() {
            const { tweet } = this.props;

            function updateTweet(params) {
              lore.actions.tweet.update(tweet, params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.update(tweet, {
                blueprint: 'optimistic',
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

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class EditLink extends React.Component {

          constructor(props) {
            super(props);
            this.onEdit = this.onEdit.bind(this);
          }

          onEdit() {
            const { tweet } = this.props;

            function updateTweet(params) {
              lore.actions.tweet.update(tweet, params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.update(tweet, {
                blueprint: 'optimistic',
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

        export default EditLink;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class EditLink extends React.Component {

          constructor(props) {
            super(props);
            this.onEdit = this.onEdit.bind(this);
          }

          static propTypes = {
            tweet: PropTypes.object.isRequired
          };

          onEdit() {
            const { tweet } = this.props;

            function updateTweet(params) {
              lore.actions.tweet.update(tweet, params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.update(tweet, {
                blueprint: 'optimistic',
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

        export default connect(function(getState, props) {
          const { tweet } = props;

          return {
            user: getState('user.byId', {
              id: tweet.data.userId
            })
          };
        })(
        createReactClass({
          displayName: 'Tweet',

          propTypes: {
            tweet: PropTypes.object.isRequired,
            user: PropTypes.object.isRequired
          },

          render: function() {
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

        Tweet.defaultProps = {
          user: {
            id: 1,
            data: {
              id: 1,
              nickname: "lucca",
              avatar: "https://cloud.githubusercontent.com/assets/2637399/19027072/a36f0c7a-88e1-11e6-931e-7f67fe01367b.png"
            }
          }
        };

        export default connect(function(getState, props) {
          const { tweet } = props;

          return {
            user: getState('user.byId', {
              id: tweet.data.userId
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

        @connect(function(getState, props) {
          const tweet = props.tweet;

          return {
            user: getState('user.byId', {
              id: tweet.data.userId
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
                  </div>
                </div>
              </li>
            );
          }

        }

        export default Tweet;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-7/">create a way to delete tweets</Link>.
      </p>

    </Template>
  )
};
