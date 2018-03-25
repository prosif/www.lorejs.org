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
        Step 1: Add Mock Data to Feed
      </h1>

      <p>
        In this step we'll be adding some mock data to our feed.
      </p>

      <QuickstartBranch branch="data.1" />

      <blockquote>
        <p>
          The practice of using fake data to populate components while you're building out your application can be quite
          helpful for supporting rapid development. Sometimes it will also be necessary, as the API to support your
          application may not exist when you start building it.
        </p>
      </blockquote>


      <h3>
        Declare Tweets as a Prop
      </h3>
      <p>
        First, open your <code>Feed</code> component and declare that it is going to require <code>tweets</code> as a <code>prop</code>:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default createReactClass({
          displayName: 'Feed',

          propTypes: {
            tweets: PropTypes.object.isRequired
          },
          ...
        })
        `}/>
        <CodeTab syntax="ES6" text={`
        class Feed extends React.Component {
          ...
        }

        Feed.propTypes ={
          tweets: PropTypes.object.isRequired
        };
        `}/>
        <CodeTab syntax="ESNext" text={`
        class Feed extends React.Component {

          static propTypes = {
            tweets: PropTypes.object.isRequired
          };
          ...
        }
        `}/>
      </CodeTabs>

      <h3>
        Create Mock Tweets
      </h3>
      <p>
        Next insert some mock data using <code>getDefaultProps</code>. This is a great method to use for mock data, as it will only
        populate the <code>tweets</code> prop if no data is passed in. So if you use this method for your mock data, it will automatically
        be overwritten once real data starts being passed in. Pretty handy!
      </p>

      <p>
        Add a <code>getDefaultProps</code> method to your <code>Feed</code> component and use it to populate <code>tweets</code> with mock data:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        const Feed = createReactClass({
          ...
          getDefaultProps: function() {
            const tweet = {
              id: 1,
              cid: 'c1',
              state: 'RESOLVED',
              data: {
                id: 1,
                userId: 1,
                text: 'Nothing can beat science!',
                createdAt: '2016-10-04T05:10:49.382Z'
              }
            };

            return {
              tweets: {
                state: 'RESOLVED',
                data: [tweet]
              }
            }
          },
          ...
        })
        `}/>
        <CodeTab syntax="ES6" text={`
        class Feed extends React.Component {
          ...
        }

        ...

        Feed.defaultProps = (function() {
          const tweet = {
            id: 1,
            cid: 'c1',
            state: 'RESOLVED',
            data: {
              id: 1,
              userId: 1,
              text: 'Nothing can beat science!',
              createdAt: '2016-10-04T05:10:49.382Z'
            }
          };

          return {
            tweets: {
              state: 'RESOLVED',
              data: [tweet]
            }
          }
        })();
        `}/>
        <CodeTab syntax="ESNext" text={`
        class Feed extends React.Component {
          ...
          static defaultProps = (function() {
            const tweet = {
              id: 1,
              cid: 'c1',
              state: 'RESOLVED',
              data: {
                id: 1,
                userId: 1,
                text: 'Nothing can beat science!',
                createdAt: '2016-10-04T05:10:49.382Z'
              }
            };

            return {
              tweets: {
                state: 'RESOLVED',
                data: [tweet]
              }
            }
          })();
          ...
        }
        `}/>
      </CodeTabs>

      <p>
        In the function above, we're declaring a single tweet, with the text <em>"Nothing can beat science!"</em> and
        adding it to an array of tweets. In both cases the state has been set to <code>RESOLVED</code> to indicate
        that nothing is happening to the data.
      </p>

      <blockquote>
        <p>
          When adding mock data to real applications, it's not necessary to include all these fields - only the
          ones the component will actually need. For this example, the following data set is perfectly sufficient,
          and has been collapsed into a single data structure:
        </p>
      <Markdown text={`
      ...
        getDefaultProps: function() {
          return {
            tweets: {
              data: [
                {
                  id: 1,
                  data: {
                    userId: 1,
                    text: 'Nothing can beat science!',
                    createdAt: '2016-10-04T05:10:49.382Z'
                  }
                }
              ]
            }
          }
        },
      ...
      `}/>
      </blockquote>

      <h3>
        Render the Tweets
      </h3>
      <p>
        With some mock data created, let's pull it into our render method and display it on screen. To do that,
        we're going to create a method called <code>renderTweet</code> that will contain the code to render
        each tweet. Then we'll iterate through our mock tweets and map them into HTML to display on screen.
      </p>

      <p>
        Add the following code to your <code>Feed</code> component.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
          renderTweet: function(tweet) {
            return (
              <li key={tweet.id}>
                {tweet.data.text}
              </li>
            );
          },

          render: function() {
            const { tweets } = this.props;

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweets.data.map(this.renderTweet)}
                </ul>
              </div>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
          renderTweet(tweet) {
            return (
              <li key={tweet.id}>
                {tweet.data.text}
              </li>
            );
          }

          render() {
            const { tweets } = this.props;

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweets.data.map(this.renderTweet)}
                </ul>
              </div>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
          renderTweet(tweet) {
            return (
              <li key={tweet.id}>
                {tweet.data.text}
              </li>
            );
          }

          render() {
            const { tweets } = this.props;

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweets.data.map(this.renderTweet)}
                </ul>
              </div>
            );
          }
        ...
        `}/>
      </CodeTabs>

      <p>
        With this code in place, you should now see the text of your mock tweet displayed to the screen.
      </p>

      <blockquote>
        <p>
          As a reminder, anytime you render a list of items in React, you need to add a <code>key</code> property
          that contains a unique id that no other item in that list will share. In this example, we're using
          the <code>id</code> of our tweet, which is a perfect solution for many situations.
        </p>
        <p>
          The only time you won't be able to use the <code>id</code> as the key is when you're dealing with
          optimistic updates, a use case we'll address later in this tutorial. Optimistic updates involve
          displaying data to the user before it actually exists on the server, which means it won't have
          an <code>id</code> assigned to it yet.
        </p>
      </blockquote>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/data/step-1.png" />

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

        export default createReactClass({
          displayName: 'Feed',

          propTypes: {
            tweets: PropTypes.object.isRequired
          },

          getDefaultProps: function() {
            const tweet = {
              id: 1,
              cid: 'c1',
              state: 'RESOLVED',
              data: {
                id: 1,
                userId: 1,
                text: 'Nothing can beat science!',
                createdAt: '2016-10-04T05:10:49.382Z'
              }
            };

            return {
              tweets: {
                state: 'RESOLVED',
                data: [tweet]
              }
            }
          },

          renderTweet: function(tweet) {
            return (
              <li key={tweet.id}>
                {tweet.data.text}
              </li>
            );
          },

          render: function() {
            const { tweets } = this.props;

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweets.data.map(this.renderTweet)}
                </ul>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class Feed extends React.Component {

          renderTweet(tweet) {
            return (
              <li key={tweet.id}>
                {tweet.data.text}
              </li>
            );
          }

          render() {
            const { tweets } = this.props;

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweets.data.map(this.renderTweet)}
                </ul>
              </div>
            );
          }

        }

        Feed.propTypes = {
          tweets: PropTypes.object.isRequired
        };

        Feed.defaultProps = (function() {
          const tweet = {
            id: 1,
            cid: 'c1',
            state: 'RESOLVED',
            data: {
              id: 1,
              userId: 1,
              text: 'Nothing can beat science!',
              createdAt: '2016-10-04T05:10:49.382Z'
            }
          };

          return {
            tweets: {
              state: 'RESOLVED',
              data: [tweet]
            }
          }
        })();

        export default Feed;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class Feed extends React.Component {

          static propTypes = {
            tweets: PropTypes.object.isRequired
          };

          static defaultProps = (function() {
            const tweet = {
              id: 1,
              cid: 'c1',
              state: 'RESOLVED',
              data: {
                id: 1,
                userId: 1,
                text: 'Nothing can beat science!',
                createdAt: '2016-10-04T05:10:49.382Z'
              }
            };

            return {
              tweets: {
                state: 'RESOLVED',
                data: [tweet]
              }
            }
          })();

          renderTweet(tweet) {
            return (
              <li key={tweet.id}>
                {tweet.data.text}
              </li>
            );
          }

          render() {
            const { tweets } = this.props;

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweets.data.map(this.renderTweet)}
                </ul>
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
        Next we're going to <Link to="../step-2/">create our Tweet component</Link>.
      </p>
    </Template>
  )
};
