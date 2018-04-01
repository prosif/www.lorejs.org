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
        Step 2: Improve the User Experience
      </h1>

      <p>
        In this step we're going to improve the user experience for pagination.
      </p>

      <QuickstartBranch branch="pagination.2" />

      <h3>
        Why is this happening?
      </h3>
      <p>
        This is happening because we're throwing out the previous tweets everytime the URL changes.
      </p>

      <h3>
        How do we fix this?
      </h3>
      <p>
        To provide a better experience, we need to <strong>hold onto the previous tweets</strong> until the new
        page is render to display to the user.
      </p>
      <p>
        To do that, add a <code>getInitialState()</code> method and a <code>componentWillRecieveProps()</code> method
        to you Feed component that look like this:
      </p>

      <Markdown type="jsx" text={`
      ...
      getInitialState() {
        const { tweets } = this.props;

        return {
          tweets: tweets,
          nextTweets: tweets
        };
      },

      componentWillReceiveProps(nextProps) {
        const nextTweets = nextProps.tweets;

        if (nextTweets.state === PayloadStates.FETCHING) {
          this.setState({
            nextTweets: nextTweets,
            isFetching: true
          });
        } else {
          this.setState({
            tweets: nextTweets,
            nextTweets: nextTweets,
            isFetching: false
          });
        }
      },
      ...
      `}/>

      <p>
        Next update the <code>render()</code> method to look like this:
      </p>

      <Markdown type="jsx" text={`
      render: function() {
        const { tweets, nextTweets } = this.state;
        const currentPage = nextTweets.query.pagination.page;
        const paginationLinks = [];

        // check if we're fetching the next page of tweets
        const isFetchingNextTweets = nextTweets.state === PayloadStates.FETCHING;

        ...

        return (
          <div className="feed">
            <h2 className="title">
              Feed
            </h2>
            <ul className={\`media-list tweets ${isFetchingNextTweets ? 'transition' : ''}\`}>
              {tweets.data.map(this.renderTweet)}
            </ul>
            <nav>
              <ul className="pagination">
                {paginationLinks}
              </ul>
            </nav>
          </div>
        );
      }
      `}/>

      <p>
        Here we're now using <code>state</code> instead of <code>props</code> to determine what to render, and
        if we're fetching a new page of tweets, we're going to apply the <code>transition</code> class to our
        list, which will cause it to visually fade, to let the user know something is happening.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/pagination/step-1.png" />


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
        import { Link } from 'react-router';
        import PayloadStates from '../constants/PayloadStates';
        import Tweet from './Tweet';

        export default connect(function(getState, props) {
          const { location } = props;

          return {
            tweets: getState('tweet.find', {
              pagination: {
                sort: 'createdAt DESC',
                page: location.query.page || '1'
              }
            })
          }
        })(
        createReactClass({
          displayName: 'Feed',

          propTypes: {
            tweets: PropTypes.object.isRequired
          },

          getInitialState() {
            const { tweets } = this.props;

            return {
              tweets: tweets,
              nextTweets: tweets
            };
          },

          componentWillReceiveProps(nextProps) {
            const nextTweets = nextProps.tweets;

            if (nextTweets.state === PayloadStates.FETCHING) {
              this.setState({
                nextTweets: nextTweets,
                isFetching: true
              });
            } else {
              this.setState({
                tweets: nextTweets,
                nextTweets: nextTweets,
                isFetching: false
              });
            }
          },

          renderTweet: function(tweet) {
            return (
              <Tweet key={tweet.id} tweet={tweet} />
            );
          },

          renderPaginationLink: function(page, currentPage) {
            return (
              <li key={page} className={currentPage === String(page) ? 'active' : ''}>
                <Link to={{ pathname: '/', query: { page: page } }}>
                  {page}
                </Link>
              </li>
            );
          },

          render: function() {
            const { tweets, nextTweets } = this.state;
            const currentPage = nextTweets.query.pagination.page;
            const paginationLinks = [];

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <div className="feed">
                  <h2 className="title">
                    Feed
                  </h2>
                  <div className="loader"/>
                </div>
              );
            }

            // check if we're fetching the next page of tweets
            const isFetchingNextTweets = nextTweets.state === PayloadStates.FETCHING;

            // calculate the number of pagination links from our metadata, then
            // generate an array of pagination links
            const numberOfPages = Math.ceil(tweets.meta.totalCount / tweets.meta.perPage);
            for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
              paginationLinks.push(this.renderPaginationLink(pageNumber, currentPage));
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className={\`media-list tweets ${isFetchingNextTweets ? 'transition' : ''}\`}>
                  {tweets.data.map(this.renderTweet)}
                </ul>
                <nav>
                  <ul className="pagination">
                    {paginationLinks}
                  </ul>
                </nav>
              </div>
            );
          }
        })
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        TODO
        `}/>
        <CodeTab syntax="ESNext" text={`
        TODO
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        In the next section we're going to <Link to="../../infinite-scrolling/overview/">replace our pagination links with infinite scrolling behavior</Link>.
      </p>
    </Template>
  )
};
