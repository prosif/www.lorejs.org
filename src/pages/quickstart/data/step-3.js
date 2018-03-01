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
        Step 3: Add Mock User Data
      </h1>

      <p>
        In this step we're going to add some mock user data to finish our Tweet component.
      </p>

      <QuickstartBranch branch="data.3" />

      <h3>
        Add a Mock User
      </h3>
      <p>
        Our Tweet is looking pretty good, we're just missing some data for the user's nickname and avatar. If you look at the
        data for our tweet, you'll notice it includes a property called <code>userId</code> that has a number for a value. This number
        represents the id of the user the tweet belongs to. Taking a look at the API endpoint for <code>/users</code> we can see that a
        user resource looks like this:
      </p>

      <Markdown text={`
      {
        id: 1,
        nickname: "lucca",
        avatar: "https://cloud.githubusercontent.com/assets/2637399/19027072/a36f0c7a-88e1-11e6-931e-7f67fe01367b.png",
        createdAt: "2016-10-25T04:24:46.207Z",
        updatedAt: "2016-10-25T04:24:46.207Z"
      }
      `}/>

      <p>
        So just like we did with the mock tweet, we're going to create a mock user. Open the <code>Tweet</code> component and add a
        propType for <code>user</code>. Then add a <code>getDefaultProps</code> method and populate it with some mock user data like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
          propTypes: {
            tweet: React.PropTypes.object.isRequired,
            user: React.PropTypes.object.isRequired
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
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        class Tweet extends Component {
          ...
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
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default class Tweet extends Component {

          static propTypes = {
            tweet: PropTypes.object.isRequired,
            user: PropTypes.object.isRequired
          };

          static defaultProps = {
            user: {
              id: 1,
              data: {
                id: 1,
                nickname: "lucca",
                avatar: "https://cloud.githubusercontent.com/assets/2637399/19027072/a36f0c7a-88e1-11e6-931e-7f67fe01367b.png"
              }
            }
          };

          ...
        }
        `}/>
      </CodeTabs>

      <p>
        Next, use that <code>user</code> prop to populate the nickname and avatar properties in the <code>render</code> method:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
          render: function() {
            var tweet = this.props.tweet;
            var user = this.props.user;
            var timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

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
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
          render() {
            const tweet = this.props.tweet;
            const user = this.props.user;
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
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
          render() {
            const tweet = this.props.tweet;
            const user = this.props.user;
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
        ...
        `}/>
      </CodeTabs>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/data/step-3.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Tweet.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var moment = require('moment');

        module.exports = React.createClass({
          displayName: 'Tweet',

          propTypes: {
            tweet: React.PropTypes.object.isRequired,
            user: React.PropTypes.object.isRequired
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
            var tweet = this.props.tweet;
            var user = this.props.user;
            var timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

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

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import moment from 'moment';

        class Tweet extends Component {

          render() {
            const tweet = this.props.tweet;
            const user = this.props.user;
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

        export default Tweet;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import moment from 'moment';

        class Tweet extends Component {

          static propTypes = {
            tweet: PropTypes.object.isRequired,
            user: PropTypes.object.isRequired
          };

          static defaultProps = {
            user: {
              id: 1,
              data: {
                id: 1,
                nickname: "lucca",
                avatar: "https://cloud.githubusercontent.com/assets/2637399/19027072/a36f0c7a-88e1-11e6-931e-7f67fe01367b.png"
              }
            }
          };

          render() {
            const tweet = this.props.tweet;
            const user = this.props.user;
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
        Next we're going to learn how to communicate with APIs and <Link to="../../fetching/overview/">replace our mock data with real data</Link>.
      </p>
    </Template>
  )
};