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
        First we need a component to display the user's tweets. The behavior of this component is identical to the
        Feed, with one exception; we only want to display tweets the <em>current user created</em>. So start off
        by copying the <code>Feed</code> component and renaming it <code>UserTweets</code>.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import _ from 'lodash';
        import InfiniteScrollingList from './InfiniteScrollingList';
        import Tweet from './Tweet';

        export default createReactClass({
          displayName: 'UserTweets',

          render: function() {
            const { params } = this.props;

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <InfiniteScrollingList
                  select={(getState) => {
                    return getState('tweet.find', {
                      pagination: {
                        sort: 'createdAt DESC',
                        page: 1
                      }
                    });
                  }}
                  selectNextPage={(lastPage, getState) => {
                    const lastPageNumber = lastPage.query.pagination.page;

                    return getState('tweet.find', _.defaultsDeep({
                      pagination: {
                        page: lastPageNumber + 1
                      }
                    }, lastPage.query));
                  }}
                  refresh={(page, getState) => {
                    return getState('tweet.find', page.query);
                  }}
                  row={(tweet) => {
                    return (
                      <Tweet key={tweet.id} tweet={tweet} />
                    );
                  }}
                />
              </div>
            );
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        TODO
        `}/>
        <CodeTab syntax="ESNext" text={`
        TODO
        `}/>
      </CodeTabs>

      <p>
        Then update the <code>render()</code> method to include the changes below:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        render: function() {
          const { params } = this.props;

          return (
            <div className="feed">
              // ...
              <InfiniteScrollingList
                select={(getState) => {
                  return getState('tweet.find', {
                    where: {
                      user: params.userId
                    }
                    pagination: {
                      sort: 'createdAt DESC',
                      page: 1
                    }
                  });
                }}
                // ...
              />
            </div>
          );
        }
        `}/>
        <CodeTab syntax="ES6" text={`
        render() {
          const { params } = this.props;

          return (
            <div className="feed">
              // ...
              <InfiniteScrollingList
                select={(getState) => {
                  return getState('tweet.find', {
                    where: {
                      user: params.userId
                    }
                    pagination: {
                      sort: 'createdAt DESC',
                      page: 1
                    }
                  });
                }}
                // ...
              />
            </div>
          );
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        render() {
          const { params } = this.props;

          return (
            <div className="feed">
              // ...
              <InfiniteScrollingList
                select={(getState) => {
                  return getState('tweet.find', {
                    where: {
                      user: params.userId
                    }
                    pagination: {
                      sort: 'createdAt DESC',
                      page: 1
                    }
                  });
                }}
                // ...
              />
            </div>
          );
        }
        `}/>
      </CodeTabs>

      <p>
        Here we've extracted <code>params</code> from <code>props</code>, which is automatically provided
        by <code>react-router</code>, and modified our <code>getState</code> call.
      </p>

      <p>
        The second argument of the <code>getState</code> call actually supports multiple properties. We introduced
        the <code>pagination</code> property previously, and now we're introducing the <code>where</code> property,
        which is intended to be used to describe filtering criteria. Since we only want to view tweets by a specific
        user, we've passed in a <code>where</code> clause that provides an id for the user we are interested in.
      </p>

      <p>
        That user id is going to come from a query parameter called <code>userId</code>, which React Router provides
        through the <code>params</code> prop.
      </p>

      <h3>
        Update Routes
      </h3>
      <p>
        Next, open <code>routes.js</code> and import the <code>UserTweets</code> component. Then register a new
        route for <code>/users/:userId</code> that will display that component.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
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
        With that change in place, refresh the browser and you'll now be able to view all the tweets or just the
        tweets created by the current user.
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
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import InfiniteScrolling from '../decorators/InfiniteScrolling';
        import LoadMoreButton from './LoadMoreButton';

        export default connect(function(getState, props) {
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
        createReactClass({
          displayName: 'UserTweets',

          propTypes: {
            pages: PropTypes.array.isRequired,
            onLoadMore: PropTypes.func.isRequired
          },

          renderTweet: function(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          },

          render: function() {
            const { pages } = this.props;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="loader" />
              );
            }

            const tweetListItems = _.flatten(pages.map(function(tweets) {
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
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import InfiniteScrolling from '../decorators/InfiniteScrolling';
        import LoadMoreButton from './LoadMoreButton';

        class UserTweets extends React.Component {

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          render() {
            const { pages } = this.props;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="loader" />
              );
            }

            const tweetListItems = _.flatten(pages.map(function(tweets) {
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

        export default connect(function(getState, props) {
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
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import InfiniteScrolling from '../decorators/InfiniteScrolling';
        import LoadMoreButton from './LoadMoreButton';

        @connect(function(getState, props) {
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
        class UserTweets extends React.Component {

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
            const { pages } = this.props;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="loader" />
              );
            }

            const tweetListItems = _.flatten(pages.map(function(tweets) {
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
        import React from 'react';
        import { Route, IndexRoute, Redirect } from 'react-router';
        import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

        /**
         * Routes
         */
        import Master from './src/components/Master');
        import Layout from './src/components/Layout');
        import Feed from './src/components/Feed');
        import Login from './src/components/Login');
        import Logout from './src/components/Logout');
        import UserTweets from './src/components/UserTweets');

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
        In the next section we'll <Link to="../../websockets/overview/">we'll add support for WebSockets</Link>.
      </p>
    </Template>
  )
};
