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
        Step 3: Convert the Feed
      </h1>

      <p>
        In this step we'll convert our Feed component to use Infinite Scrolling.
      </p>

      <QuickstartBranch branch="infinite-scrolling.3" />

      <h3>
        Update the Feed Component
      </h3>
      <p>
        With these components created we can now update our <code>Feed</code> component to support Infinite
        Scrolling. Replace the contents of <code>Feed</code> with this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import InfiniteScrollingList from './InfiniteScrollingList';
        import Tweet from './Tweet';

        export default createReactClass({
          displayName: 'Feed',

          render: function() {
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
        There's a lot of things that need to coodinate to get Infinite Scrolling to behave correctly, so we're going
        to be building our view up slowly, and explaining a bit along the way.
      </p>
      <p>
        The first thing the <code>InfiniteScrollingList</code> component needs to know is <strong>what data to
        render</strong>. We do that through the <code>select</code> prop, which similar to the interface used by
        the <code>connect</code> decorator. The only difference is that instead of returning an object of
        data you want passed to the child component, you only return <strong>one data collection</strong>.
      </p>
      <p>
        In this example, we want the <code>InfiniteScrollingList</code> component to render the first page of tweets,
        sorted in descending order by their <code>createdAt</code> date.
      </p>
      <p>
        The second thing we need to provide is <strong>what should be rendered</strong>. We do this through
        the <code>row</code> prop, which is a function that will be called for each tweet in the collection,
        and whatever that function returns will be rendered for that tweet.
      </p>
      <p>
        If you refresh the browser, you'll see the application renders, but it's stuck at a loading screen.
      </p>

      <h3>
        Refresh the Data
      </h3>
      <p>
        The reason the application is stuck is because it never gets updated data from the store.
        The <code>connect</code> decorator doesn't have this problem, because it's (in a sense) part of the natural
        render cycle. Meaning that everytime data changes, the application re-renders, and the connect decorator (as
        part of the lifecycle callbacks in that process) will request it's data from the store, and get the most
        up-to-date version.
      </p>
      <p>
        In this case, that's not happening. The <code>select</code> prop is NOT called every time the component
        updates, only once, when the component is about to be mounted. This is intentional, because
        unlike <code>connect</code>, this component needs to manage <strong>many pages of data</strong>. So
        let's teach it how to refresh a page of data.
      </p>
      <p>
        To do that, add a new prop to your <code>InfiniteScrollingList</code> component called <code>refresh</code>,
        that looks like this:
      </p>

      <Markdown text={`
      <InfiniteScrollingList
        select={(getState) => {
          return getState('tweet.find', {
            pagination: {
              sort: 'createdAt DESC',
              page: 1
            }
          });
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
      `}/>

      <p>
        With that change in place, our application is now rendering the first page of tweets. Also note that because
        the <code>query</code> for a collection is attached to the data, we can simply reuse it to fetch the
        data it's populated with.
      </p>

      <h3>
        Load More Pages
      </h3>
      <p>
        To load more pages of tweets, we need to provide another prop called <code>selectNextPage</code> that
        will know how to fetch the next page of tweets. Updating your <code>InfiniteScrollingList</code> component
        to look like this, and make sure to import <code>lodash</code>:
      </p>

      <Markdown text={`
      import _ from 'lodash';
      ...
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
      `}/>

      <p>
        The <code>selectNextPage</code> prop is a function that provides the last page of data, as well as
        the <code>getState()</code> method so we can fetch more data. The <code>lastPage</code> is provided
        because we need to inspect it for the current page number, and then iterate to get the next page.
      </p>
      <p>
        Also note that once again, we're reusing the <code>query</code> from the first page.
      </p>
      <p>
        Refresh the browser, and you should now have a button says "LoadMore" at the bottom of the tweets. Clicking
        this button will cause the next page to load. It you continue to click it until there are no more pages of
        data, the button will disappear.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/infinite-scrolling/step-1.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Feed.js
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
              pagination: {
                page: '1'
              }
            })
          }
        })(
        InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })(
        createReactClass({
          displayName: 'Feed',

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
                <div className="feed">
                  <h2 className="title">
                    Feed
                  </h2>
                  <div className="loader"/>
                </div>
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

        class Feed extends React.Component {

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
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweetListItems}
                </ul>
                <LoadMoreButton lastPage={lastPage} onLoadMore={this.props.onLoadMore} nextPageMetaField="nextPage" />
              </div>
            );
          }
        }

        Feed.propTypes = {
          pages: PropTypes.array.isRequired,
          onLoadMore: PropTypes.func.isRequired
        };

        export default connect(function(getState, props) {
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: '1'
              }
            })
          }
        })(
        InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })(
        Feed
        )
        );
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
              pagination: {
                page: '1'
              }
            })
          }
        })
        @InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })
        class Feed extends React.Component {

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
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweetListItems}
                </ul>
                <LoadMoreButton lastPage={lastPage} onLoadMore={this.props.onLoadMore} nextPageMetaField="nextPage" />
              </div>
            );
          }
        }

        export default Feed;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to add dialogs to our application <Link to="../../dialogs/overview/">so we can create,
        update and delete tweets</Link>.
      </p>
    </Template>
  )
};
