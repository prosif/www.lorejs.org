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
        Step 1: Add Infinite Scrolling
      </h1>

      <p>
        In this step we'll add infinite scrolling to our Feed.
      </p>

      <QuickstartBranch branch="infinite-scrolling.1" />

      <h3>
        Approach
      </h3>
      <p>
        Infinite Scrolling is similar to pagination except for two key points:
      </p>

      <ol>
        <li>Instead of letting the user select a page, they can only load the next page</li>
        <li>Instead of displaying one page at a time, the results are all appended to single running array</li>
      </ol>

      <p>
        It's important to point out that these are <em>view specific concerns</em>; meaning nothing about them requires changes to
        infrastructure or to the API. They're all about how a user interacts with data, and have nothing to do with how data
        is fetched or stored.
      </p>

      <p>
        To that end, this section will be focusing on how to implement infinite scrolling in a simple and reusable way.
      </p>

      <h3>
        Add NextPage to Meta Property
      </h3>
      <p>
        Unlike traditional pagination links, where we need to calculate the number of links early on, infinite scrolling only
        cares about whether there is a "next" page. So we're going to provide that information by adding another property
        to the <code>meta</code> field of the <code>tweets</code> collection.
      </p>

      <p>
        Open up <code>config/connections.js</code> and update the collection's <code>parse</code> method to add the <code>nextPage</code> property from the API
        response to to the <code>meta</code> data. This field will either contain the number of the next page of data or be null if there
        are no more pages to display.
      </p>

      <Markdown text={`
      ...
        parse(attributes) {
          this.meta = {
            totalCount: attributes.meta.paginate.totalCount,
            perPage: attributes.meta.paginate.perPage,
            nextPage: attributes.meta.paginate.nextPage
          };
          return attributes.data;
        }
      ...
      `}/>

      <h3>
        Add InfiniteScrolling Decorator
      </h3>
      <p>
        InfiniteScrolling has _a lot_ of boilerplate associated with it. Components that implement it need to:
      </p>

      <ul>
        <li>fetch the first page of data</li>
        <li>fetch the next page if the user requests it</li>
        <li>provide some kind of data that signals a new page is being fetched</li>
        <li>combine all of the data into a single array containing all pages of data</li>
      </ul>

      <p>
        The logic for that can also be a little tricky, but luckily it's easy enough to encapsulate into a decorator that can
        be applied to any component.
      </p>

      <p>
        Create a new JavaScript file called <code>InfiniteScrolling</code> and place it in <code>src/decorators/InfiniteScrolling.js</code>. Then
        update the contents of that file to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var _ = require('lodash');

        function getDisplayName(Component) {
          return Component.displayName || Component.name || 'Component';
        }

        module.exports = function(options = {}) {
          var propName = options.propName;
          var modelName = options.modelName;

          if (!propName) {
            throw new Error('propName is required');
          }

          if (!modelName) {
            throw new Error('modelName is required');
          }

          return function(DecoratedComponent) {
            var displayName = 'InfiniteScrolling(' + getDisplayName(DecoratedComponent) + ')';

            return React.createClass({
              displayName: displayName,

              contextTypes: {
                store: React.PropTypes.object.isRequired
              },

              getInitialState: function() {
                return {
                  pages: [
                    this.props[propName]
                  ]
                };
              },

              componentWillReceiveProps: function(nextProps) {
                var storeState = this.context.store.getState();
                var pages = this.state.pages;

                // Whenever the component re-renders, we need to rebuild our collection of pages
                // by fetching them back out of the Store. If we don't do this, our state data
                // will always be stale - we'll never know when data finishes being fetched, and
                // in the cases where some of the data is being modified, such as being updated
                // or deleted, we won't get a change to react to those changes and inform the user.
                var nextPages = pages.map(function(page) {
                  var query = JSON.stringify(page.query);
                  return storeState[modelName].find[query];
                });

                var currentQuery = JSON.stringify(this.props[propName].query.where);
                var nextQuery = JSON.stringify(nextProps[propName].query.where);

                if (currentQuery !== nextQuery) {
                  nextPages = [
                    nextProps[propName]
                  ];
                }

                this.setState({
                  pages: nextPages
                });
              },

              onLoadMore: function() {
                var storeState = this.context.store.getState();
                var pages = this.state.pages;
                var lastPage = pages[pages.length - 1];
                var nextPageNumber = Number(lastPage.query.pagination.page) + 1;
                var query = lastPage.query;

                // Build the next page's query from the previous page. The only
                // thing we're changing is the page of data we want to fetch
                var nextQuery = {
                  where: query.where,
                  pagination: _.defaults({
                    page: nextPageNumber
                  }, query.pagination)
                };

                // See if the next page has already been fetched, and used the cached page
                // if available
                var nextPage = storeState[modelName].find[JSON.stringify(nextQuery)];

                if (!nextPage) {
                  // The 'find' action has a slightly different interface than the 'getState' call
                  // in 'lore.connect'. When calling the 'find' action directly, you need to pass
                  // in the 'where' clause and the 'pagination' information as different arguments,
                  // like 'lore.actions.tweet.find(where, pagination)'
                  nextPage = lore.actions[modelName].find(nextQuery.where, nextQuery.pagination).payload;
                }

                pages.push(nextPage);

                this.setState({
                  pages: pages
                });
              },

              render: function() {
                return React.createElement(
                  DecoratedComponent,
                  _.assign({ref: 'decoratedComponent'}, this.state, this.props, { onLoadMore: this.onLoadMore })
                );
              }
            });
          }
        };
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { PropTypes } from 'react';
        import _ from 'lodash';

        function getDisplayName(Component) {
          return Component.displayName || Component.name || 'Component';
        }

        export default function(options = {}) {
          const propName = options.propName;
          const modelName = options.modelName;

          if (!propName) {
            throw new Error('propName is required');
          }

          if (!modelName) {
            throw new Error('modelName is required');
          }

          return function(DecoratedComponent) {
            const displayName = 'InfiniteScrolling(' + getDisplayName(DecoratedComponent) + ')';

            return React.createClass({
              displayName: displayName,

              contextTypes: {
                store: PropTypes.object.isRequired
              },

              getInitialState: function() {
                return {
                  pages: [
                    this.props[propName]
                  ]
                };
              },

              componentWillReceiveProps: function(nextProps) {
                const storeState = this.context.store.getState();
                const pages = this.state.pages;

                // Whenever the component re-renders, we need to rebuild our collection of pages
                // by fetching them back out of the Store. If we don't do this, our state data
                // will always be stale - we'll never know when data finishes being fetched, and
                // in the cases where some of the data is being modified, such as being updated
                // or deleted, we won't get a change to react to those changes and inform the user.
                let nextPages = pages.map(function(page) {
                  const query = JSON.stringify(page.query);
                  return storeState[modelName].find[query];
                });

                const currentQuery = JSON.stringify(this.props[propName].query.where);
                const nextQuery = JSON.stringify(nextProps[propName].query.where);

                if (currentQuery !== nextQuery) {
                  nextPages = [
                    nextProps[propName]
                  ];
                }

                this.setState({
                  pages: nextPages
                });
              },

              onLoadMore: function() {
                const storeState = this.context.store.getState();
                const pages = this.state.pages;
                const lastPage = pages[pages.length - 1];
                const nextPageNumber = Number(lastPage.query.pagination.page) + 1;
                const query = lastPage.query;

                // Build the next page's query from the previous page. The only
                // thing we're changing is the page of data we want to fetch
                const nextQuery = {
                  where: query.where,
                  pagination: _.defaults({
                    page: nextPageNumber
                  }, query.pagination)
                };

                // See if the next page has already been fetched, and used the cached page
                // if available
                let nextPage = storeState[modelName].find[JSON.stringify(nextQuery)];

                if (!nextPage) {
                  // The 'find' action has a slightly different interface than the 'getState' call
                  // in 'lore.connect'. When calling the 'find' action directly, you need to pass
                  // in the 'where' clause and the 'pagination' information as different arguments,
                  // like 'lore.actions.tweet.find(where, pagination)'
                  nextPage = lore.actions[modelName].find(nextQuery.where, nextQuery.pagination).payload;
                }

                pages.push(nextPage);

                this.setState({
                  pages: pages
                });
              },

              render: function() {
                return React.createElement(
                  DecoratedComponent,
                  _.assign({ref: 'decoratedComponent'}, this.state, this.props, { onLoadMore: this.onLoadMore })
                );
              }
            });
          }
        };
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { PropTypes } from 'react';
        import _ from 'lodash';

        function getDisplayName(Component) {
          return Component.displayName || Component.name || 'Component';
        }

        export default function(options = {}) {
          const propName = options.propName;
          const modelName = options.modelName;

          if (!propName) {
            throw new Error('propName is required');
          }

          if (!modelName) {
            throw new Error('modelName is required');
          }

          return function(DecoratedComponent) {
            const displayName = 'InfiniteScrolling(' + getDisplayName(DecoratedComponent) + ')';

            return React.createClass({
              displayName: displayName,

              contextTypes: {
                store: PropTypes.object.isRequired
              },

              getInitialState: function() {
                return {
                  pages: [
                    this.props[propName]
                  ]
                };
              },

              componentWillReceiveProps: function(nextProps) {
                const storeState = this.context.store.getState();
                const pages = this.state.pages;

                // Whenever the component re-renders, we need to rebuild our collection of pages
                // by fetching them back out of the Store. If we don't do this, our state data
                // will always be stale - we'll never know when data finishes being fetched, and
                // in the cases where some of the data is being modified, such as being updated
                // or deleted, we won't get a change to react to those changes and inform the user.
                let nextPages = pages.map(function(page) {
                  const query = JSON.stringify(page.query);
                  return storeState[modelName].find[query];
                });

                const currentQuery = JSON.stringify(this.props[propName].query.where);
                const nextQuery = JSON.stringify(nextProps[propName].query.where);

                if (currentQuery !== nextQuery) {
                  nextPages = [
                    nextProps[propName]
                  ];
                }

                this.setState({
                  pages: nextPages
                });
              },

              onLoadMore: function() {
                const storeState = this.context.store.getState();
                const pages = this.state.pages;
                const lastPage = pages[pages.length - 1];
                const nextPageNumber = Number(lastPage.query.pagination.page) + 1;
                const query = lastPage.query;

                // Build the next page's query from the previous page. The only
                // thing we're changing is the page of data we want to fetch
                const nextQuery = {
                  where: query.where,
                  pagination: _.defaults({
                    page: nextPageNumber
                  }, query.pagination)
                };

                // See if the next page has already been fetched, and used the cached page
                // if available
                let nextPage = storeState[modelName].find[JSON.stringify(nextQuery)];

                if (!nextPage) {
                  // The 'find' action has a slightly different interface than the 'getState' call
                  // in 'lore.connect'. When calling the 'find' action directly, you need to pass
                  // in the 'where' clause and the 'pagination' information as different arguments,
                  // like 'lore.actions.tweet.find(where, pagination)'
                  nextPage = lore.actions[modelName].find(nextQuery.where, nextQuery.pagination).payload;
                }

                pages.push(nextPage);

                this.setState({
                  pages: pages
                });
              },

              render: function() {
                return React.createElement(
                  DecoratedComponent,
                  _.assign({ref: 'decoratedComponent'}, this.state, this.props, { onLoadMore: this.onLoadMore })
                );
              }
            });
          }
        };
        `}/>
      </CodeTabs>

      <p>
        We won't spend anytime explaining the code above, but it reflects the boilerplate described previously.
      </p>

      <h3>
        Create Button to Load More Tweets
      </h3>
      <p>
        Next we're going to create a button for the user to click to load more tweets. This button will will have three
        responsibilities:
      </p>

      <ol>
        <li>Display the text "Load More" if there are more tweets to load</li>
        <li>Display the next "Loading..." if more tweets are being fetched</li>
        <li>Disappear from view if there are no more tweets to fetch.</li>
      </ol>

      <p>
        Run this command to create the <code>LoadMoreButton</code> component:
      </p>

      <Markdown type="sh" text={`
      lore generate component LoadMoreButton
      `}/>

      <p>
        Then paste the following code into that file:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var PayloadStates = require('../constants/PayloadStates');

        module.exports = React.createClass({
          displayName: 'LoadMoreButton',

          propTypes: {
            lastPage: React.PropTypes.object.isRequired,
            onLoadMore: React.PropTypes.func.isRequired,
            nextPageMetaField: React.PropTypes.string.isRequired
          },

          render: function() {
            var lastPage = this.props.lastPage;
            var nextPageMetaField = this.props.nextPageMetaField;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <button className="btn btn-default btn-lg disabled">
                    Loading...
                  </button>
                </div>
              );
            }

            if (!lastPage.meta[nextPageMetaField]) {
              return (
                <div className="footer"></div>
              );
            }

            return (
              <div className="footer">
                <button className="btn btn-default btn-lg" onClick={this.props.onLoadMore}>
                  Load More
                </button>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import PayloadStates from '../constants/PayloadStates';

        class LoadMoreButton extends Component {

          render() {
            const lastPage = this.props.lastPage;
            const nextPageMetaField = this.props.nextPageMetaField;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <button className="btn btn-default btn-lg disabled">
                    Loading...
                  </button>
                </div>
              );
            }

            if (!lastPage.meta[nextPageMetaField]) {
              return (
                <div className="footer"></div>
              );
            }

            return (
              <div className="footer">
                <button className="btn btn-default btn-lg" onClick={this.props.onLoadMore}>
                  Load More
                </button>
              </div>
            );
          }

        }

        LoadMoreButton.propTypes = {
          lastPage: PropTypes.object.isRequired,
          onLoadMore: PropTypes.func.isRequired,
          nextPageMetaField: PropTypes.string.isRequired
        };

        export default LoadMoreButton;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import PayloadStates from '../constants/PayloadStates';

        class LoadMoreButton extends Component {

          static propTypes = {
            lastPage: PropTypes.object.isRequired,
            onLoadMore: PropTypes.func.isRequired,
            nextPageMetaField: PropTypes.string.isRequired
          };

          render() {
            const lastPage = this.props.lastPage;
            const nextPageMetaField = this.props.nextPageMetaField;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <button className="btn btn-default btn-lg disabled">
                    Loading...
                  </button>
                </div>
              );
            }

            if (!lastPage.meta[nextPageMetaField]) {
              return (
                <div className="footer"></div>
              );
            }

            return (
              <div className="footer">
                <button className="btn btn-default btn-lg" onClick={this.props.onLoadMore}>
                  Load More
                </button>
              </div>
            );
          }

        }

        export default LoadMoreButton;
        `}/>
      </CodeTabs>

      <h3>
        Decorate the Feed Component
      </h3>
      <p>
        With these pieces in place we now update our <code>Feed</code> component to support Infinite Scrolling. We're going to start
        by importing our InfiniteScrolling decorator and using it to wrap our Feed component like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        var InfiniteScrolling = require('../decorators/InfiniteScrolling');

        module.exports = lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: '1'
              }
            })
          }
        })(
          InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })(
            React.createClass({
              displayName: 'Feed',
              ...
            })
          )
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import InfiniteScrolling from '../decorators/InfiniteScrolling';

        class Feed extends Component {
          ...
        }

        export default lore.connect(function(getState, props){
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
        ...
        import InfiniteScrolling from '../decorators/InfiniteScrolling';

        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: '1'
              }
            })
          }
        })
        @InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })
        class Feed extends Component {
          ...
        }
        `}/>
      </CodeTabs>

      <blockquote>
        <p>
          While decorators can be very powerful, they can be visually difficult to understand, especially when using ES5 and
          ES6 syntax. In layman's terms, they're just functions that wrap other functions, and get a chance to modify or
          react to the input before invoking the child function.
        </p>
        <p>
          In the code above, <code>lore.connect</code> wraps <code>InfiniteScrolling</code> which in turn wraps <code>Feed</code>. You can also think of them
          as components (since they are), which would then mean <code>lore.connect</code> renders <code>InfiniteScrolling</code> which in turn
          renders <code>Feed</code>.
        </p>
      </blockquote>

      <p>
        The ESNext implementation is the easiest to visually understand. First, we're using <code>lore.connect</code> to declare (and
        fetch) the first page of tweets. The resulting <code>tweets</code> property is passed to the <code>InfiniteScrolling</code> decorator. This
        decorator requires two properties, <code>propName</code> and <code>modelName</code>. The first, <code>propName</code>, is the name of the property
        being passed in that we want to implement infinite scrolling for. The second property, <code>modelName</code>, is the name
        of the model associated with the data. The <code>InfiniteScrolling</code> decorator needs this in order to know which action
        to invoke to fetch more data. Finally, the Feed component is rendered, and our list of Tweets displays to the page.
      </p>

      <p>
        If you refresh the browser, you'll notice the application still works, though we don't have infinite scrolling yet. All
        this decorator did was provide support for it - we still have to tap into that support to use it.
      </p>

      <h3>
        Implement Infinite Scrolling
      </h3>
      <p>
        To finish integrating support for infinite scrolling, import the <code>LoadMoreButton</code> and modify your <code>propTypes</code> and
        <code>render</code> method to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        var LoadMoreButton = require('./LoadMoreButton');

        ...
        React.createClass({
          displayName: 'Feed',

          propTypes: {
            pages: React.PropTypes.array.isRequired,
            onLoadMore: React.PropTypes.func.isRequired
          },

          ...

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
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import LoadMoreButton from './LoadMoreButton';
        ...
        class Feed extends Component {
          ...

          render() {
            const pages = this.props.pages;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
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
        }

        Feed.propTypes = {
          pages: PropTypes.array.isRequired,
          onLoadMore: PropTypes.func.isRequired
        };

        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import LoadMoreButton from './LoadMoreButton';
        ...
        class Feed extends Component {

          static propTypes = {
            pages: PropTypes.array.isRequired,
            onLoadMore: PropTypes.func.isRequired
          };

          ...

          render() {
            const pages = this.props.pages;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
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
        }
        `}/>
      </CodeTabs>

      <p>
        The key difference between this code and the code for pagination links is that instead of receiving <code>tweets</code> as a
        prop, we receive a prop called <code>pages</code>. This property comes from the <code>InfiniteScrolling</code> decorator, and is an array
        or pages of tweets. So we need to interate through each page in the array, convert them to a array <code>Tweet</code> list items,
        and then flatten the results array-of-arrays into a single array of list items to render.
      </p>

      <p>
        Finally, the <code>LoadMoreButton</code> requires the last page of the array, which it will inspect to see if there's a next page
        of data to load. The <code>nextPageMetaField</code> is the name of the property on the <code>meta</code> data that determines whether there
        is a next page. And the <code>onLoadMore</code> function is the function that should be invoked to load more tweets. This function
        is provided by the <code>InfiniteScrolling</code> decorator.
      </p>

      <p>
        Refresh the browser, and you should now have a button says "LoadMore" at the bottom of the tweets. Clicking this button
        will cause the next page to load. It you continue to click it until there are no more pages of data, the button will
        disappear.
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
                    perPage: attributes.meta.paginate.perPage,
                    nextPage: attributes.meta.paginate.nextPage
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
                    perPage: attributes.meta.paginate.perPage,
                    nextPage: attributes.meta.paginate.nextPage
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
                    perPage: attributes.meta.paginate.perPage,
                    nextPage: attributes.meta.paginate.nextPage
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
        src/components/LoadMoreButton.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var PayloadStates = require('../constants/PayloadStates');

        module.exports = React.createClass({
          displayName: 'LoadMoreButton',

          propTypes: {
            lastPage: React.PropTypes.object.isRequired,
            onLoadMore: React.PropTypes.func.isRequired,
            nextPageMetaField: React.PropTypes.string.isRequired
          },

          render: function() {
            var lastPage = this.props.lastPage;
            var nextPageMetaField = this.props.nextPageMetaField;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <button className="btn btn-default btn-lg disabled">
                    Loading...
                  </button>
                </div>
              );
            }

            if (!lastPage.meta[nextPageMetaField]) {
              return (
                <div className="footer"></div>
              );
            }

            return (
              <div className="footer">
                <button className="btn btn-default btn-lg" onClick={this.props.onLoadMore}>
                  Load More
                </button>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import PayloadStates from '../constants/PayloadStates';

        class LoadMoreButton extends Component {

          render() {
            const lastPage = this.props.lastPage;
            const nextPageMetaField = this.props.nextPageMetaField;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <button className="btn btn-default btn-lg disabled">
                    Loading...
                  </button>
                </div>
              );
            }

            if (!lastPage.meta[nextPageMetaField]) {
              return (
                <div className="footer"></div>
              );
            }

            return (
              <div className="footer">
                <button className="btn btn-default btn-lg" onClick={this.props.onLoadMore}>
                  Load More
                </button>
              </div>
            );
          }

        }

        LoadMoreButton.propTypes = {
          lastPage: PropTypes.object.isRequired,
          onLoadMore: PropTypes.func.isRequired,
          nextPageMetaField: PropTypes.string.isRequired
        };

        export default LoadMoreButton;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import PayloadStates from '../constants/PayloadStates';

        class LoadMoreButton extends Component {

          static propTypes = {
            lastPage: PropTypes.object.isRequired,
            onLoadMore: PropTypes.func.isRequired,
            nextPageMetaField: PropTypes.string.isRequired
          };

          render() {
            const lastPage = this.props.lastPage;
            const nextPageMetaField = this.props.nextPageMetaField;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <button className="btn btn-default btn-lg disabled">
                    Loading...
                  </button>
                </div>
              );
            }

            if (!lastPage.meta[nextPageMetaField]) {
              return (
                <div className="footer"></div>
              );
            }

            return (
              <div className="footer">
                <button className="btn btn-default btn-lg" onClick={this.props.onLoadMore}>
                  Load More
                </button>
              </div>
            );
          }

        }

        export default LoadMoreButton;
        `}/>
      </CodeTabs>

      <h3>
        src/decorators/InfiniteScrolling.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var _ = require('lodash');

        function getDisplayName(Component) {
          return Component.displayName || Component.name || 'Component';
        }

        module.exports = function(options = {}) {
          var propName = options.propName;
          var modelName = options.modelName;

          if (!propName) {
            throw new Error('propName is required');
          }

          if (!modelName) {
            throw new Error('modelName is required');
          }

          return function(DecoratedComponent) {
            var displayName = 'InfiniteScrolling(' + getDisplayName(DecoratedComponent) + ')';

            return React.createClass({
              displayName: displayName,

              contextTypes: {
                store: React.PropTypes.object.isRequired
              },

              getInitialState: function() {
                return {
                  pages: [
                    this.props[propName]
                  ]
                };
              },

              componentWillReceiveProps: function(nextProps) {
                var storeState = this.context.store.getState();
                var pages = this.state.pages;

                // Whenever the component re-renders, we need to rebuild our collection of pages
                // by fetching them back out of the Store. If we don't do this, our state data
                // will always be stale - we'll never know when data finishes being fetched, and
                // in the cases where some of the data is being modified, such as being updated
                // or deleted, we won't get a change to react to those changes and inform the user.
                var nextPages = pages.map(function(page) {
                  var query = JSON.stringify(page.query);
                  return storeState[modelName].find[query];
                });

                var currentQuery = JSON.stringify(this.props[propName].query.where);
                var nextQuery = JSON.stringify(nextProps[propName].query.where);

                if (currentQuery !== nextQuery) {
                  nextPages = [
                    nextProps[propName]
                  ];
                }

                this.setState({
                  pages: nextPages
                });
              },

              onLoadMore: function() {
                var storeState = this.context.store.getState();
                var pages = this.state.pages;
                var lastPage = pages[pages.length - 1];
                var nextPageNumber = Number(lastPage.query.pagination.page) + 1;
                var query = lastPage.query;

                // Build the next page's query from the previous page. The only
                // thing we're changing is the page of data we want to fetch
                var nextQuery = {
                  where: query.where,
                  pagination: _.defaults({
                    page: nextPageNumber
                  }, query.pagination)
                };

                // See if the next page has already been fetched, and used the cached page
                // if available
                var nextPage = storeState[modelName].find[JSON.stringify(nextQuery)];

                if (!nextPage) {
                  // The 'find' action has a slightly different interface than the 'getState' call
                  // in 'lore.connect'. When calling the 'find' action directly, you need to pass
                  // in the 'where' clause and the 'pagination' information as different arguments,
                  // like 'lore.actions.tweet.find(where, pagination)'
                  nextPage = lore.actions[modelName].find(nextQuery.where, nextQuery.pagination).payload;
                }

                pages.push(nextPage);

                this.setState({
                  pages: pages
                });
              },

              render: function() {
                return React.createElement(
                  DecoratedComponent,
                  _.assign({ref: 'decoratedComponent'}, this.state, this.props, { onLoadMore: this.onLoadMore })
                );
              }
            });
          }
        };
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { PropTypes } from 'react';
        import _ from 'lodash';

        function getDisplayName(Component) {
          return Component.displayName || Component.name || 'Component';
        }

        export default function(options = {}) {
          const propName = options.propName;
          const modelName = options.modelName;

          if (!propName) {
            throw new Error('propName is required');
          }

          if (!modelName) {
            throw new Error('modelName is required');
          }

          return function(DecoratedComponent) {
            const displayName = 'InfiniteScrolling(' + getDisplayName(DecoratedComponent) + ')';

            return React.createClass({
              displayName: displayName,

              contextTypes: {
                store: PropTypes.object.isRequired
              },

              getInitialState: function() {
                return {
                  pages: [
                    this.props[propName]
                  ]
                };
              },

              componentWillReceiveProps: function(nextProps) {
                const storeState = this.context.store.getState();
                const pages = this.state.pages;

                // Whenever the component re-renders, we need to rebuild our collection of pages
                // by fetching them back out of the Store. If we don't do this, our state data
                // will always be stale - we'll never know when data finishes being fetched, and
                // in the cases where some of the data is being modified, such as being updated
                // or deleted, we won't get a change to react to those changes and inform the user.
                let nextPages = pages.map(function(page) {
                  const query = JSON.stringify(page.query);
                  return storeState[modelName].find[query];
                });

                const currentQuery = JSON.stringify(this.props[propName].query.where);
                const nextQuery = JSON.stringify(nextProps[propName].query.where);

                if (currentQuery !== nextQuery) {
                  nextPages = [
                    nextProps[propName]
                  ];
                }

                this.setState({
                  pages: nextPages
                });
              },

              onLoadMore: function() {
                const storeState = this.context.store.getState();
                const pages = this.state.pages;
                const lastPage = pages[pages.length - 1];
                const nextPageNumber = Number(lastPage.query.pagination.page) + 1;
                const query = lastPage.query;

                // Build the next page's query from the previous page. The only
                // thing we're changing is the page of data we want to fetch
                const nextQuery = {
                  where: query.where,
                  pagination: _.defaults({
                    page: nextPageNumber
                  }, query.pagination)
                };

                // See if the next page has already been fetched, and used the cached page
                // if available
                let nextPage = storeState[modelName].find[JSON.stringify(nextQuery)];

                if (!nextPage) {
                  // The 'find' action has a slightly different interface than the 'getState' call
                  // in 'lore.connect'. When calling the 'find' action directly, you need to pass
                  // in the 'where' clause and the 'pagination' information as different arguments,
                  // like 'lore.actions.tweet.find(where, pagination)'
                  nextPage = lore.actions[modelName].find(nextQuery.where, nextQuery.pagination).payload;
                }

                pages.push(nextPage);

                this.setState({
                  pages: pages
                });
              },

              render: function() {
                return React.createElement(
                  DecoratedComponent,
                  _.assign({ref: 'decoratedComponent'}, this.state, this.props, { onLoadMore: this.onLoadMore })
                );
              }
            });
          }
        };
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { PropTypes } from 'react';
        import _ from 'lodash';

        function getDisplayName(Component) {
          return Component.displayName || Component.name || 'Component';
        }

        export default function(options = {}) {
          const propName = options.propName;
          const modelName = options.modelName;

          if (!propName) {
            throw new Error('propName is required');
          }

          if (!modelName) {
            throw new Error('modelName is required');
          }

          return function(DecoratedComponent) {
            const displayName = 'InfiniteScrolling(' + getDisplayName(DecoratedComponent) + ')';

            return React.createClass({
              displayName: displayName,

              contextTypes: {
                store: PropTypes.object.isRequired
              },

              getInitialState: function() {
                return {
                  pages: [
                    this.props[propName]
                  ]
                };
              },

              componentWillReceiveProps: function(nextProps) {
                const storeState = this.context.store.getState();
                const pages = this.state.pages;

                // Whenever the component re-renders, we need to rebuild our collection of pages
                // by fetching them back out of the Store. If we don't do this, our state data
                // will always be stale - we'll never know when data finishes being fetched, and
                // in the cases where some of the data is being modified, such as being updated
                // or deleted, we won't get a change to react to those changes and inform the user.
                let nextPages = pages.map(function(page) {
                  const query = JSON.stringify(page.query);
                  return storeState[modelName].find[query];
                });

                const currentQuery = JSON.stringify(this.props[propName].query.where);
                const nextQuery = JSON.stringify(nextProps[propName].query.where);

                if (currentQuery !== nextQuery) {
                  nextPages = [
                    nextProps[propName]
                  ];
                }

                this.setState({
                  pages: nextPages
                });
              },

              onLoadMore: function() {
                const storeState = this.context.store.getState();
                const pages = this.state.pages;
                const lastPage = pages[pages.length - 1];
                const nextPageNumber = Number(lastPage.query.pagination.page) + 1;
                const query = lastPage.query;

                // Build the next page's query from the previous page. The only
                // thing we're changing is the page of data we want to fetch
                const nextQuery = {
                  where: query.where,
                  pagination: _.defaults({
                    page: nextPageNumber
                  }, query.pagination)
                };

                // See if the next page has already been fetched, and used the cached page
                // if available
                let nextPage = storeState[modelName].find[JSON.stringify(nextQuery)];

                if (!nextPage) {
                  // The 'find' action has a slightly different interface than the 'getState' call
                  // in 'lore.connect'. When calling the 'find' action directly, you need to pass
                  // in the 'where' clause and the 'pagination' information as different arguments,
                  // like 'lore.actions.tweet.find(where, pagination)'
                  nextPage = lore.actions[modelName].find(nextQuery.where, nextQuery.pagination).payload;
                }

                pages.push(nextPage);

                this.setState({
                  pages: pages
                });
              },

              render: function() {
                return React.createElement(
                  DecoratedComponent,
                  _.assign({ref: 'decoratedComponent'}, this.state, this.props, { onLoadMore: this.onLoadMore })
                );
              }
            });
          }
        };
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
        var InfiniteScrolling = require('../decorators/InfiniteScrolling');
        var LoadMoreButton = require('./LoadMoreButton');

        module.exports = lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: '1'
              }
            })
          }
        })(
        InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })(
        React.createClass({
          displayName: 'Feed',

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

        class Feed extends Component {

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          render() {
            const pages = this.props.pages;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
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

        export default lore.connect(function(getState, props){
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
        import React, { Component, PropTypes } from 'react';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import InfiniteScrolling from '../decorators/InfiniteScrolling';
        import LoadMoreButton from './LoadMoreButton';

        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: '1'
              }
            })
          }
        })
        @InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })
        class Feed extends Component {

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
            const pages = this.props.pages;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
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
        In the next section we'll add the ability to <Link to="../../filtering/overview">view all tweets or just the ones you created</Link>.
      </p>
    </Template>
  )
};
