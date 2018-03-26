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
        <li>Instead of displaying one page at a time, the results are all appended to single growing array</li>
      </ol>

      <p>
        It's important to point out that these are <em>view specific concerns</em>; meaning nothing about them
        requires changes to infrastructure or to the API. They're all about how a user interacts with data, and
        have nothing to do with how data is fetched or stored.
      </p>

      <p>
        To that end, this section will be focusing on how to implement infinite scrolling in a simple and
        reusable way.
      </p>

      <h3>
        Add NextPage to Meta Property
      </h3>
      <p>
        Unlike traditional pagination links, where we need to calculate the number of links early on, infinite
        scrolling only cares about whether there is a "next" page. So we're going to provide that information by
        adding another property to the <code>meta</code> field of the <code>tweets</code> collection.
      </p>

      <p>
        Open up <code>config/connections.js</code> and update the collection's <code>parse</code> method to add
        the <code>nextPage</code> property from the API response to to the <code>meta</code> data. This field will
        either contain the number of the next page of data or be null if there are no more pages to display.
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
        Infinite Scrolling Setup
      </h3>
      <p>
        InfiniteScrolling has <em>a lot</em> of boilerplate associated with it. Components that implement it need to:
      </p>

      <ul>
        <li>fetch the first page of data</li>
        <li>fetch the next page if the user requests it</li>
        <li>provide some kind of data that signals a new page is being fetched</li>
        <li>combine all of the data into a single array containing all pages of data</li>
      </ul>

      <p>
        The logic for that can also be a little tricky, but luckily it's easy enough to encapsulate into a couple
        reusable components.
      </p>

      <h3>
        Component #1: LoadMoreButton
      </h3>

      <p>
        The first component we're going to create is going to be the <code>LoadMoreButton</code>, and it will be
        a button that the user to click to load more tweets. This button will will have three responsibilities:
      </p>

      <ol>
        <li>Display the text "Load More" if there are more tweets to load</li>
        <li>Display a loading experience if more tweets are being fetched</li>
        <li>Disappear from view if there are no more tweets to fetch.</li>
      </ol>

      <p>
        Create the button component by running the following command:
      </p>

      <Markdown text={`
      lore generate component LoadMoreButton
      `}/>

      <p>
        Then replace the contents of the file with this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import PayloadStates from '../constants/PayloadStates';

        export default createReactClass({
          displayName: 'LoadMoreButton',

          propTypes: {
            lastPage: PropTypes.object.isRequired,
            onLoadMore: PropTypes.func.isRequired,
            nextPageMetaField: PropTypes.string.isRequired
          },

          render: function() {
            const {
              lastPage,
              onLoadMore,
              nextPageMetaField
            } = this.props;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <div className="loader"/>
                </div>
              );
            }

            if (!lastPage.meta[nextPageMetaField]) {
              return (
                <div className="footer"/>
              );
            }

            return (
              <div className="footer">
                <button className="btn btn-default btn-lg" onClick={onLoadMore}>
                  Load More
                </button>
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

      <h3>
        Component #2: InfiniteScrollingLIst
      </h3>

      <p>
        The second component we're going to create is going to be called <code>InfiniteScrollingList</code>,
        and it will be responsible for displaying our list of tweets, as well as fetching the next page, and
        merging all the data into a single array.
      </p>

      <p>
        Create the list component by running the following command:
      </p>

      <Markdown text={`
      lore generate component InfiniteScrollingList
      `}/>

      <p>
        Then replace the contents of the file with this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import _ from 'lodash';
        import { getState } from 'lore-hook-connect';
        import PayloadStates from '../constants/PayloadStates';
        import LoadMoreButton from './LoadMoreButton';

        export default createReactClass({
          displayName: 'InfiniteScrollingList',

          propTypes: {
            row: PropTypes.func.isRequired,
            select: PropTypes.func.isRequired,
            selectNextPage: PropTypes.func.isRequired,
            refresh: PropTypes.func.isRequired,
            selectOther: PropTypes.func.isRequired,
            exclude: PropTypes.func
          },

          getDefaultProps() {
            return {
              exclude: function(model) {
                return false;
              }
            }
          },

          getInitialState: function() {
            return {
              other: null,
              pages: []
            };
          },

          // fetch first page
          componentWillMount() {
            const { select, selectOther } = this.props;
            const nextState = this.state;

            nextState.pages.push(select(getState));

            if (selectOther) {
              nextState.other = selectOther(getState);
            }

            this.setState(nextState);
          },

          // refresh data in all pages
          componentWillReceiveProps(nextProps) {
            const { refresh, selectOther } = this.props;
            const { pages } = this.state;
            const nextState = {};

            nextState.pages = pages.map(function(page) {
              return refresh(page, getState);
            });

            if (selectOther) {
              nextState.other = selectOther(getState);
            }

            this.setState(nextState);
          },

          onLoadMore() {
            const { selectNextPage } = this.props;
            const { pages } = this.state;
            const lastPage = pages[pages.length - 1];

            pages.push(selectNextPage(lastPage, getState));

            this.setState({
              pages: pages
            });
          },

          render: function() {
            const { row, exclude } = this.props;
            const { pages, other } = this.state;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            // if we only have one page, and it's fetching, then it's the initial
            // page load so let the user know we're loading the data
            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="loader" />
              );
            }

            return (
              <div>
                <ul className="media-list tweets">
                  {other ? other.data.map(row) : null}
                  {_.flatten(pages.map((models) => {
                    return _.filter(models.data, (model) => {
                      return !exclude(model);
                    }).map(row);
                  }))}
                </ul>
                <LoadMoreButton
                  lastPage={lastPage}
                  onLoadMore={this.onLoadMore}
                  nextPageMetaField="nextPage"
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
        We won't spend any time explaining the code above, but it reflects the boilerplate described previously.
      </p>

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
        the <code>getState</code> method so we can fetch more data. The <code>lastPage</code> is provided
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
        config/connections.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import auth from '../src/utils/auth';

        export default {

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
                Authorization: \`Bearer \${auth.getToken()}\`
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
                Authorization: \`Bearer \${auth.getToken()}\`
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
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import PayloadStates from '../constants/PayloadStates';

        export default createReactClass({
          displayName: 'LoadMoreButton',

          propTypes: {
            lastPage: PropTypes.object.isRequired,
            onLoadMore: PropTypes.func.isRequired,
            nextPageMetaField: PropTypes.string.isRequired
          },

          render: function() {
            const {
              lastPage,
              nextPageMetaField
            } = this.props;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <div className="loader" />
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
        import React from 'react';
        import PropTypes from 'prop-types';
        import PayloadStates from '../constants/PayloadStates';

        class LoadMoreButton extends React.Component {

          render() {
            const {
              lastPage,
              nextPageMetaField
            } = this.props;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <div className="loader" />
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
        import React from 'react';
        import PropTypes from 'prop-types';
        import PayloadStates from '../constants/PayloadStates';

        class LoadMoreButton extends React.Component {

          static propTypes = {
            lastPage: PropTypes.object.isRequired,
            onLoadMore: PropTypes.func.isRequired,
            nextPageMetaField: PropTypes.string.isRequired
          };

          render() {
            const {
              lastPage,
              nextPageMetaField
            } = this.props;

            if(lastPage.state === PayloadStates.FETCHING) {
              return (
                <div className="footer">
                  <div className="loader" />
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
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import _ from 'lodash';

        function getDisplayName(Component) {
          return Component.displayName || Component.name || 'Component';
        }

        export default function(options = {}) {
          const {
            propName,
            modelName
          } = options;

          if (!propName) {
            throw new Error('propName is required');
          }

          if (!modelName) {
            throw new Error('modelName is required');
          }

          return function(DecoratedComponent) {
            const displayName = 'InfiniteScrolling(' + getDisplayName(DecoratedComponent) + ')';

            return createReactClass({
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
                const { pages } = this.state;

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
                const { pages } = this.state;
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
                  // in 'connect'. When calling the 'find' action directly, you need to pass
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
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import _ from 'lodash';

        function getDisplayName(Component) {
          return Component.displayName || Component.name || 'Component';
        }

        export default function(options = {}) {
          const {
            propName,
            modelName
          } = options;

          if (!propName) {
            throw new Error('propName is required');
          }

          if (!modelName) {
            throw new Error('modelName is required');
          }

          return function(DecoratedComponent) {
            const displayName = 'InfiniteScrolling(' + getDisplayName(DecoratedComponent) + ')';

            return createReactClass({
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
                const { pages } = this.state;

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
                const { pages } = this.state;
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
                  // in 'connect'. When calling the 'find' action directly, you need to pass
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
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import _ from 'lodash';

        function getDisplayName(Component) {
          return Component.displayName || Component.name || 'Component';
        }

        export default function(options = {}) {
          const {
            propName,
            modelName
          } = options;

          if (!propName) {
            throw new Error('propName is required');
          }

          if (!modelName) {
            throw new Error('modelName is required');
          }

          return function(DecoratedComponent) {
            const displayName = 'InfiniteScrolling(' + getDisplayName(DecoratedComponent) + ')';

            return createReactClass({
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
                const { pages } = this.state;

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
                const { pages } = this.state;
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
                  // in 'connect'. When calling the 'find' action directly, you need to pass
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
        In the next section we'll add the ability to <Link to="../../filtering/overview/">view all tweets or just the ones you created</Link>.
      </p>
    </Template>
  )
};
