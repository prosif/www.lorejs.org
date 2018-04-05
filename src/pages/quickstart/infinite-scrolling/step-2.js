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
        Step 2: Setup Infinite Scrolling
      </h1>

      <p>
        In this step we'll create the components we'll need for infinite scrolling.
      </p>

      <QuickstartBranch branch="infinite-scrolling.2" />

      <h3>
        Infinite Scrolling Setup
      </h3>
      <p>
        Infinite Scrolling has <em>a lot</em> of boilerplate associated with it. Components that implement it need to:
      </p>

      <ul>
        <li>fetch the first page of data</li>
        <li>fetch the next page if the user requests it</li>
        <li>provide some kind of signal to show when a new page is being fetched</li>
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
            selectNextPage: PropTypes.func,
            refresh: PropTypes.func,
            selectOther: PropTypes.func,
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

            if (refresh) {
              nextState.pages = pages.map(function(page) {
                return refresh(page, getState);
              });
            }

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
            const { row, exclude, selectNextPage } = this.props;
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
                {selectNextPage ? (
                  <LoadMoreButton
                    lastPage={lastPage}
                    onLoadMore={this.onLoadMore}
                    nextPageMetaField="nextPage"
                  />
                ) : null}
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
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this. Still exactly the same :)
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/infinite-scrolling/step-1.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

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

      <h2>
        Next Steps
      </h2>

      <p>
        Next we'll <Link to="../step-3/">convert the Feed to use Infinite Scrolling</Link>.
      </p>
    </Template>
  )
};
