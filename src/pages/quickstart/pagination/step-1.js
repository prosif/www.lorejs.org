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
        Step 1: Add Pagination
      </h1>

      <p>
        In this step we'll add pagination links to our Feed.
      </p>

      <QuickstartBranch branch="pagination.1" />

      <h3>
        Add Pagination Info to Tweets
      </h3>
      <p>
        In order to implement pagination, we need to know some information about the tweets we're viewing, such as:
      </p>

      <ol>
        <li>How many tweets exist</li>
        <li>How many tweets are provided on each page</li>
      </ol>

      <p>
        If we look at the API response from the server, we can see that information provided among the data in<code>meta.paginate</code>:
      </p>

      <Markdown text={`
      {
        data: [
          {...tweet...},
          {...tweet...}
        ],
        meta: {
          paginate: {
            currentPage: 1,
            nextPage: 2,
            prevPage: null,
            totalPages: 11,
            totalCount: 51,
            perPage: 5
          }
        }
      }
      `}/>

      <p>
        What we want to do is make that information available to the application, so we can calculate the number of pages to
        display. To do that open up <code>config/connections.js</code> and find the <code>parse</code> method for Collections. Update that method
        to look like this:
      </p>

      <Markdown text={`
      ...
        collections: {
          properties: {

            parse(attributes) {
              this.meta = {
                totalCount: attributes.meta.paginate.totalCount,
                perPage: attributes.meta.paginate.perPage
              };
              return attributes.data;
            }

          }
        }
      ...
      `}/>

      <p>
        Collections in Lore have a special property called <code>meta</code>. It defaults to an empty object, and anything you add to it
        will show up in the <code>meta</code> property of the data structure for collections. By adding <code>totalCount</code> and <code>perPage</code> to meta,
        we've now made that data available to any component receives a collection.
      </p>

      <h3>
        Request Paginated Data in Feed
      </h3>
      <p>
        To implement pagination we're going to be using a query parameter in our applications route to determine which page
        of data to display. We're going to call that query parameter <code>page</code>.
      </p>

      <p>
        For example, if you navigate to a URL like <code>http://localhost:1337/?page=1</code> we want to see the
        first page of tweets, and the URL <code>http://localhost:1337/?page=2</code> would display the second page
        of tweets.
      </p>

      <p>
        Currently our <code>Feed</code> component provides no pagination information when requesting a set of tweets. The call looks
        like this:
      </p>

      <Markdown text={`
      lore.connect(function(getState, props) {
        return {
          tweets: getState('tweet.find')
        }
      })
      `}/>

      <p>
        Since we didn't provide any information aside from <code>tweet.find</code>, the API call created simply makes a
        network request to <code>/tweets</code>. But if we're going to use paginated data, we need network calls
        that look like <code>/tweets?page=1</code>. To do that, we need to provide a second argument to
        the <code>getState</code> call that describes what we want.
      </p>

      <p>
        Update the <code>lore.connect</code> call in your <code>Feed</code> component to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        module.exports = lore.connect(function(getState, props) {
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1'
              }
            })
          }
        })(
        React.createClass({
          ...
        })
        )
        `}/>
        <CodeTab syntax="ES6" text={`
        class Feed extends Component {
         ...
        }

        export default lore.connect(function(getState, props) {
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1'
              }
            })
          }
        })(Feed);
        `}/>
        <CodeTab syntax="ESNext" text={`
        @lore.connect(function(getState, props) {
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1'
              }
            })
          }
        })
        class Feed extends Component {
         ...
        }
        `}/>
      </CodeTabs>

      <p>
        The second argument we passed to <code>getState</code> contains a <code>pagination</code> key that you can use to list query parameters that
        relate to pagination, such as page number, page size, ordering preferences, etc. To be clear there's no magic here;
        Lore simply takes these parameters and converts them to query parameters in the request.
      </p>

      <p>
        The second callout here is that we're going to be using React Router to trigger pagination, which is where the
        <code>props.location.query.page</code> value comes from (location is passed to the component by React Router).
      </p>

      <h3>
        Add Pagination Links
      </h3>
      <p>
        Now that we're fetching data based on the route, we need to add a list of pagination links the user can click on to
        navigate between pages of tweets. For that, update the render method of your <code>Feed</code> component to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        var Router = require('react-router');

        ...
        React.createClass({
          ...

          renderPaginationLink: function(page, currentPage) {
            return (
              <li key={page} className={currentPage === String(page) ? 'active' : ''}>
                <Router.Link to={{ pathname: '/', query: { page: page } }}>
                  {page}
                </Router.Link>
              </li>
            );
          },

          render: function() {
            var tweets = this.props.tweets;
            var currentPage = tweets.query.pagination.page;
            var paginationLinks = [];

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

            // calculate the number of pagination links from our metadata, then
            // generate an array of pagination links
            var numberOfPages = Math.ceil(tweets.meta.totalCount / tweets.meta.perPage);
            for (var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
              paginationLinks.push(this.renderPaginationLink(pageNumber, currentPage));
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
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
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import { Link } from 'react-router';

        ...
        class Feed extends Component {

          ...

          renderPaginationLink(page, currentPage) {
            return (
              <li key={page} className={currentPage === String(page) ? 'active' : ''}>
                <Link to={{ pathname: '/', query: { page: page } }}>
                  {page}
                </Link>
              </li>
            );
          }

          render() {
            const tweets = this.props.tweets;
            const currentPage = tweets.query.pagination.page;
            const paginationLinks = [];

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

            // calculate the number of pagination links from our metadata, then
            // generate an array of pagination links
            let numberOfPages = Math.ceil(tweets.meta.totalCount / tweets.meta.perPage);
            for (var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
              paginationLinks.push(this.renderPaginationLink(pageNumber, currentPage));
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
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
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import { Link } from 'react-router';

        ...
        class Feed extends Component {

          ...

          renderPaginationLink(page, currentPage) {
            return (
              <li key={page} className={currentPage === String(page) ? 'active' : ''}>
                <Link to={{ pathname: '/', query: { page: page } }}>
                  {page}
                </Link>
              </li>
            );
          }

          render() {
            const tweets = this.props.tweets;
            const currentPage = tweets.query.pagination.page;
            const paginationLinks = [];

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

            // calculate the number of pagination links from our metadata, then
            // generate an array of pagination links
            let numberOfPages = Math.ceil(tweets.meta.totalCount / tweets.meta.perPage);
            for (var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
              paginationLinks.push(this.renderPaginationLink(pageNumber, currentPage));
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
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
        }
        `}/>
      </CodeTabs>

      <p>
        With this change in place, refresh the browser and you should see pagination links displayed below the tweets. Click
        on the links to navigate through each page of tweets.
      </p>

      <blockquote>
        <p>
          If you look at the network requests, you'll notice requests only go out for pages you haven't clicked on. If
          you navigate back to a page you'll already viewed, the data loads immediately, without issuing a network request.
          Lore's default behavior is to cache data for any API call it's already made.
        </p>
      </blockquote>


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
        config/connections.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var auth = require('../src/utils/auth');

        module.exports = {

          default: {

            apiRoot: 'http://localhost:1337',

            headers: function() {
              return {
                Authorization: 'Bearer ' + auth.getToken()
              };
            },

            collections: {
              properties: {

                parse: function(attributes) {
                  this.meta = {
                    totalCount: attributes.meta.paginate.totalCount,
                    perPage: attributes.meta.paginate.perPage
                  };
                  return attributes.data;
                }

              }
            }

          }
        };
        `}/>
        <CodeTab syntax="ES6" text={`
        import auth from '../src/utils/auth';

        export default {

          default: {

            apiRoot: 'http://localhost:1337',

            headers() {
              return {
                Authorization: \\\`Bearer ${auth.getToken()}\\\`
              };
            },

            collections: {
              properties: {

                parse(attributes) {
                  this.meta = {
                    totalCount: attributes.meta.paginate.totalCount,
                    perPage: attributes.meta.paginate.perPage
                  };
                  return attributes.data;
                }

              }
            }

          }
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        import auth from '../src/utils/auth';

        export default {

          default: {

            apiRoot: 'http://localhost:1337',

            headers() {
              return {
                Authorization: \`Bearer ${auth.getToken()}\`
              };
            },

            collections: {
              properties: {

                parse(attributes) {
                  this.meta = {
                    totalCount: attributes.meta.paginate.totalCount,
                    perPage: attributes.meta.paginate.perPage
                  };
                  return attributes.data;
                }

              }
            }

          }
        }
        `}/>
      </CodeTabs>

      <h3>
        src/components/Feed.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Tweet = require('./Tweet');
        var PayloadStates = require('../constants/PayloadStates');
        var Router = require('react-router');

        module.exports = lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1'
              }
            })
          }
        })(
        React.createClass({
          displayName: 'Feed',

          propTypes: {
            tweets: React.PropTypes.object.isRequired
          },

          renderTweet: function(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          },

          renderPaginationLink: function(page, currentPage) {
            return (
              <li key={page} className={currentPage === String(page) ? 'active' : ''}>
                <Router.Link to={{ pathname: '/', query: { page: page } }}>
                  {page}
                </Router.Link>
              </li>
            );
          },

          render: function() {
            var tweets = this.props.tweets;
            var currentPage = tweets.query.pagination.page;
            var paginationLinks = [];

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

            // calculate the number of pagination links from our metadata, then
            // generate an array of pagination links
            var numberOfPages = Math.ceil(tweets.meta.totalCount / tweets.meta.perPage);
            for (var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
              paginationLinks.push(this.renderPaginationLink(pageNumber, currentPage));
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
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
        import React, { Component, PropTypes } from 'react';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import { Link } from 'react-router';

        class Feed extends Component {

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          renderPaginationLink(page, currentPage) {
            return (
              <li key={page} className={currentPage === String(page) ? 'active' : ''}>
                <Link to={{ pathname: '/', query: { page: page } }}>
                  {page}
                </Link>
              </li>
            );
          }

          render() {
            const tweets = this.props.tweets;
            const currentPage = tweets.query.pagination.page;
            const paginationLinks = [];

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

            // calculate the number of pagination links from our metadata, then
            // generate an array of pagination links
            let numberOfPages = Math.ceil(tweets.meta.totalCount / tweets.meta.perPage);
            for (var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
              paginationLinks.push(this.renderPaginationLink(pageNumber, currentPage));
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
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
        }

        Feed.propTypes = {
          tweets: PropTypes.object.isRequired
        };

        export default lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1'
              }
            })
          }
        })(Feed);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import { Link } from 'react-router';

        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1'
              }
            })
          }
        })
        class Feed extends Component {

          static propTypes = {
            tweets: PropTypes.object.isRequired
          };

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          renderPaginationLink(page, currentPage) {
            return (
              <li key={page} className={currentPage === String(page) ? 'active' : ''}>
                <Link to={{ pathname: '/', query: { page: page } }}>
                  {page}
                </Link>
              </li>
            );
          }

          render() {
            const tweets = this.props.tweets;
            const currentPage = tweets.query.pagination.page;
            const paginationLinks = [];

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

            // calculate the number of pagination links from our metadata, then
            // generate an array of pagination links
            let numberOfPages = Math.ceil(tweets.meta.totalCount / tweets.meta.perPage);
            for (var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
              paginationLinks.push(this.renderPaginationLink(pageNumber, currentPage));
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
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
        }

        export default Feed;
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
