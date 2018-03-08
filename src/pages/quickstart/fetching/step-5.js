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
        Step 5: Fetch User for Tweet
      </h1>

      <p>
        In this step we're going to fetch the user for each tweet so we can display the proper nickname and avatar.
      </p>

      <QuickstartBranch branch="fetching" />

      <h3>
        Create the User Model
      </h3>
      <p>
        Before we can fetch users, we need to create a model to represent the resource. Run this command to create a user model:
      </p>

      <Markdown type="sh" text={`
      lore generate model user
      `}/>

      <p>
        This will place a file called <code>user.js</code> in <code>src/models</code> and, similar to when you created the <code>tweet</code> model, you will
        now have access to a set of actions and reducers for interacting with the <code>/users</code> endpoint.
      </p>

      <h3>
        Fetch the Tweeter
      </h3>
      <p>
        Next we need to fetch the user who said the tweet. Open up the <code>Tweet</code> component and wrap it with <code>connect</code>. But this
        time we're going to use a different string in <code>getState</code>:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import { connect } from 'lore-hook-connect';

        export default connect(function(getState, props){
          const { tweet } = props;

          return {
            user: getState('user.byId', {
              id: tweet.data.userId
            })
          };
        })(
        createReactClass({
          displayName: 'Tweet',

          ...
        })
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import { connect } from 'lore-hook-connect';

        class Tweet extends React.Component {
          ...
        }

        export default connect(function(getState, props){
          const tweet = props.tweet;

          return {
            user: getState('user.byId', {
              id: tweet.data.userId
            })
          };
        })(Tweet);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import { connect } from 'lore-hook-connect';

        @connect(function(getState, props){
          const tweet = props.tweet;

          return {
            user: getState('user.byId', {
              id: tweet.data.userId
            })
          };
        })
        export default class Tweet extends React.Component {
          ...
        }
        `}/>
      </CodeTabs>

      <p>
        The string we're passing to <code>getState</code> this time is <code>user.byId</code>. This reducer stores users by their id, and if that user
        doesn't exist in the store, it will make a server call to retrieve them. Unlike when we invoked <code>tweet.find</code> however,
        this reducer requires an argument; the <code>id</code> of the user you want to fetch.
      </p>

      <p>
        Which this change in place, refresh the browser and you see the tweets attributed to the proper user.
      </p>

      <blockquote>
        <p>
          At this point both our <code>Feed</code> and <code>Tweet</code> components are fetching real data, which means you can safely delete the
          <code>getDefaultProps</code> method from both components if you'd like. Seeing as we are no longer using them to insert mock
          data, they no longer serve a purpose.
        </p>
      </blockquote>

      <img className="drop-shadow" src="/assets/images/quickstart/fetching/step-5.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/models/user.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {

        };
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {

        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {

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
        import moment from 'moment';
        import { connect } from 'lore-hook-connect';

        export default connect(function(getState, props){
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

          getDefaultProps: function() {
            return {
              user: {
                id: 1,
                data: {
                  id: 1,
                  nickname: "lucca",
                  avatar: "https://cloud.githubusercontent.com/assets/2637399/19027072/a36f0c7a-88e1-11e6-931e-7f67fe01367b.png"
                }
              }
            }
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
        import moment from 'moment';
        import { connect } from 'lore-hook-connect';

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
                </div>
              </li>
            );
          }
        }

        Tweet.propTypes = {
          tweet: PropTypes.object.isRequired,
          user: PropTypes.object.isRequired
        };

        export default connect(function(getState, props){
          const tweet = props.tweet;

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
        import moment from 'moment';
        import { connect } from 'lore-hook-connect';

        @connect(function(getState, props){
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
        Next we're going to add dialogs to our application <Link to="../../dialogs/overview/">so we can create, update and delete tweets</Link>.
      </p>

    </Template>
  )
};
