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
        Step 2: Display User Tweets
      </h1>

      <p>
        In this step we'll finish our support for filtering and add a component to view the user's tweets.
      </p>

      <QuickstartBranch branch="filtering.2" />


      <h3>
        Add User Tweets Component
      </h3>
      <p>
        First we need a component to display the user's tweets. The behavior of this component is identical to the Feed, with
        one exception; we only want to display tweets the <em>current user created</em>. So start off by copying the <code>Feed</code> component
        and renaming it <code>UserTweets</code>. Then update the <em>lore.connect</em> call to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        module.exports = lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              where: {
                user: props.params.userId
              },
              pagination: {
                page: '1'
              }
            })
          }
        })
        `}/>
        <CodeTab syntax="ES6" text={`
        export default lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              where: {
                user: props.params.userId
              },
              pagination: {
                page: '1'
              }
            })
          }
        })(UserTweets);
        `}/>
        <CodeTab syntax="ESNext" text={`
        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              where: {
                user: props.params.userId
              },
              pagination: {
                page: '1'
              }
            })
          }
        })
        `}/>
      </CodeTabs>

      <p>
        The second argument of the <code>getState</code> call actually supports two properties: the <code>pagination</code> property we used
        previously, and a <code>where</code> property that describes filtering criteria. Since we only want to view tweets by a specific
        user, we've passed in a <code>where</code> clause that provides an id for the user we are interested in.
      </p>

      <p>
        The id for this user is going to come from a query parameter called <code>userId</code> which will be provided by React Router.
      </p>

      <h3>
        Update Routes
      </h3>
      <p>
        Next, open <code>routes.js</code> and import the <code>UserTweets</code> component. Then register a new route for <code>/users/:userId</code> that will
        display that component.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        var UserTweets = require('./src/components/UserTweets');

        module.exports = (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
                <Route path="users/:userId" component={UserTweets} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import UserTweets from './src/components/UserTweets';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
                <Route path="users/:userId" component={UserTweets} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import UserTweets from './src/components/UserTweets';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
                <Route path="users/:userId" component={UserTweets} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
      </CodeTabs>

      <p>
        With that change in place, refresh the browser and you'll now be able to view all the tweets or just the tweets
        created by the current user.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-2.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/UserTweets.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Tweet = require('./Tweet');
        var PayloadStates = require('../constants/PayloadStates');
        var InfiniteScrolling = require('../decorators/InfiniteScrolling');
        var LoadMoreButton = require('./LoadMoreButton');

        module.exports = lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              where: {
                user: props.params.userId
              },
              pagination: {
                page: '1'
              }
            })
          }
        })(
        InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })(
        React.createClass({
          displayName: 'UserTweets',

          propTypes: {
            pages: React.PropTypes.array.isRequired,
            onLoadMore: React.PropTypes.func.isRequired
          },

          renderTweet: function(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          },

          render: function() {
            var pages = this.props.pages;
            var numberOfPages = pages.length;
            var firstPage = pages[0];
            var lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              );
            }

            var tweetListItems = _.flatten(pages.map(function(tweets) {
              return tweets.data.map(this.renderTweet);
            }.bind(this)));

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweetListItems}
                </ul>
                <LoadMoreButton
                  lastPage={lastPage}
                  onLoadMore={this.props.onLoadMore}
                  nextPageMetaField="nextPage" />
              </div>
            );
          }

        })
        )
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import InfiniteScrolling from '../decorators/InfiniteScrolling';
        import LoadMoreButton from './LoadMoreButton';

        class UserTweets extends Component {

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          render() {
            var pages = this.props.pages;
            var numberOfPages = pages.length;
            var firstPage = pages[0];
            var lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              );
            }

            var tweetListItems = _.flatten(pages.map(function(tweets) {
              return tweets.data.map(this.renderTweet);
            }.bind(this)));

            return (
              <div className="feed">
                <h2 className="title">
                  My Tweets
                </h2>
                <ul className="media-list tweets">
                  {tweetListItems}
                </ul>
                <LoadMoreButton lastPage={lastPage} onLoadMore={this.props.onLoadMore} nextPageMetaField="nextPage" />
              </div>
            );
          }

        }

        UserTweets.propTypes = {
          pages: PropTypes.array.isRequired,
          onLoadMore: PropTypes.func.isRequired
        };

        export default lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              where: {
                user: props.params.userId
              },
              pagination: {
                page: '1'
              }
            })
          }
        })(
          InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })
        )(UserTweets);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import InfiniteScrolling from '../decorators/InfiniteScrolling';
        import LoadMoreButton from './LoadMoreButton';

        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              where: {
                user: props.params.userId
              },
              pagination: {
                page: '1'
              }
            })
          }
        })
        @InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })
        class UserTweets extends Component {

          static propTypes = {
            pages: PropTypes.array.isRequired,
            onLoadMore: PropTypes.func.isRequired
          };

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          render() {
            var pages = this.props.pages;
            var numberOfPages = pages.length;
            var firstPage = pages[0];
            var lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              );
            }

            var tweetListItems = _.flatten(pages.map(function(tweets) {
              return tweets.data.map(this.renderTweet);
            }.bind(this)));

            return (
              <div className="feed">
                <h2 className="title">
                  My Tweets
                </h2>
                <ul className="media-list tweets">
                  {tweetListItems}
                </ul>
                <LoadMoreButton lastPage={lastPage} onLoadMore={this.props.onLoadMore} nextPageMetaField="nextPage" />
              </div>
            );
          }

        }

        export default UserTweets;
        `}/>
      </CodeTabs>

      <h3>
        routes.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Route = require('react-router').Route;
        var IndexRoute = require('react-router').IndexRoute;
        var UserIsAuthenticated = require('./src/decorators/UserIsAuthenticated');

        /**
         * Routes
         */
        var Master = require('./src/components/Master');
        var Layout = require('./src/components/Layout');
        var Feed = require('./src/components/Feed');
        var Login = require('./src/components/Login');
        var Logout = require('./src/components/Logout');
        var UserTweets = require('./src/components/UserTweets');

        module.exports = (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
                <Route path="users/:userId" component={UserTweets} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import { Route, IndexRoute, Redirect } from 'react-router';
        import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

        /**
         * Routes
         */
        import Master from './src/components/Master';
        import Layout from './src/components/Layout';
        import Feed from './src/components/Feed';
        import Login from './src/components/Login';
        import Logout from './src/components/Logout';
        import UserTweets from './src/components/UserTweets';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
                <Route path="users/:userId" component={UserTweets} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import { Route, IndexRoute, Redirect } from 'react-router';
        import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

        /**
         * Routes
         */
        import Master from './src/components/Master';
        import Layout from './src/components/Layout';
        import Feed from './src/components/Feed';
        import Login from './src/components/Login';
        import Logout from './src/components/Logout';
        import UserTweets from './src/components/UserTweets';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
                <Route path="users/:userId" component={UserTweets} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        In the next section <Link to="../../cleanup/overview/">we'll cleanup our code a bit</Link>.
      </p>
    </Template>
  )
};
