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
        Step 4: Convert the Feed
      </h1>

      <p>
        In this step we'll convert our Feed component to use Infinite Scrolling.
      </p>

      <QuickstartBranch branch="infinite-scrolling.4" />

      <h3>
        Update the Feed Component
      </h3>
      <p>
        There are a lot of things that need to coordinate to get Infinite Scrolling to behave correctly, so we're
        going to be building our view up slowly, and explain a bit along the way.
      </p>
      <p>
        To start, open the <code>Feed</code> component and modify it to look like this:
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
        In the code above, we're providing two props to <code>InfiniteScrollingList</code>.
      </p>
      <ul>
        <li>
          <p>
            The first prop is called <code>select</code>, and we're using it to tell the list <em>what data to render</em>.
            It's essentially a version of <code>connect</code>, but exposed as a prop instead of a decorator. In this
            case, we're fetching the first page of tweets, sorted in descending order by their <code>createdAt</code> date.
          </p>
        </li>
        <li>
          <p>
            The second prop is called <code>row</code>, and we're using it to tell the list <em>how to render the
            data</em>. It will be invoked for each tweet in the list, and whatever that it returns is what will be
            rendered.
          </p>
        </li>
      </ul>
      <p>
        If you refresh the browser, you'll see the application renders, but it's stuck at a loading screen.
      </p>

      <h3>
        Why is this happening?
      </h3>
      <p>
        The reason the application is stuck at a loading screen is because the data being rendering is out of
        date. Even though the data has returned from the API, the list is still rendering the <em>original</em> data,
        back when the state was <code>FETCHING</code>.
      </p>
      <p>
        We don't see this issue when using the <code>connect</code> decorator because that data is automatically
        refreshed every time the application re-renders. But that kind of always-up-to-date behavior is only
        possible because when we're <strong>explicit</strong> about what data we want.
      </p>
      <p>
        In this case, the only thing we're explicit about is the <em>first</em> page of data, which we
        provide via the <code>select</code> prop; the other pages are all derived, and since this component will be
        managing <strong>many pages of data</strong>, we're going to need to give it some help to know how
        to refresh the data for each of those pages.
      </p>

      <h3>
        Refresh the Data
      </h3>
      <p>
        To fix this, provide a prop to <code>InfiniteScrollingList</code> called <code>refresh</code> that looks
        like this:
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
        This method will invoked each time the application re-renders, for each page of data the list has. And
        because the <code>query</code> is automatically attached to every collection, we can simply re-use it,
        and fetch the latest version of that page.
      </p>
      <p>
        With that change in place, the application is now rendering the first page of tweets.
      </p>

      <h3>
        Load More Pages
      </h3>
      <p>
        To load more tweets, import <code>lodash</code> and provide another prop
        called <code>selectNextPage</code> that will describe how to fetch the next page of tweets:
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
        This method will be invoked when the user presses the "Load More" button, and will be provided the last page
        of data. We then inspect the <code>query</code> for the <code>lastPage</code> to get the latest page number,
        and then iterate it by one to request the next page of tweets.
      </p>
      <p>
        Refresh the browser, and you should now have a button says "LoadMore" at the bottom of the tweets. Clicking
        this button will cause the next page to load, and if you continue to click it until there are no more pages
        of data, the button will disappear.
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
