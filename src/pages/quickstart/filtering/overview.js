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
        Filtering: Overview
      </h1>

      <p>
        In this section adds support for filtering, and update the UI so you can view all tweets or just those you created.
      </p>

      <p>
        At the end of this section your application will look like this:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-2.png" />

      <h2>
        Next Steps
      </h2>

      <p>
        Ready? Let's <Link to="../step-1/">get started</Link>!
      </p>

      <h1>
        Step 1: Add Filter Component
      </h1>

      <p>
        In this step we'll add a Filter component to our interface.
      </p>

      <QuickstartBranch branch="filtering.1" />

      <h3>
        Add Filter Component
      </h3>
      <p>
        Create a component called <code>Filter</code>. We'll be using this component to display a list of links the user can click to
        filter the data being displayed.
      </p>

      <Markdown type="sh" text={`
      lore generate component Filter
      `}/>

      <p>
        Update the code to look like this. We're going to add two links; one to display all tweets (the Feed) and one to
        display only the tweets belonging to a specific user. In this case, we're going to call that link "My Tweets" and use
        it to display the current user's tweets.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Router = require('react-router');

        module.exports = React.createClass({
          displayName: 'Filter',

          contextTypes: {
            user: React.PropTypes.object.isRequired
          },

          render: function() {
            var user = this.context.user;

            return (
              <div className="filter">
                <ul className="list-group">
                  <Router.IndexLink className="list-group-item" activeClassName="active" to="/">
                    Feed
                  </Router.IndexLink>
                  <Router.Link className="list-group-item" activeClassName="active" to={"/users/" + user.id}>
                    My Tweets
                  </Router.Link>
                </ul>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import { Link, IndexLink } from 'react-router';

        class Filter extends Component {

          render() {
            const user = this.context.user;

            return (
              <div className="filter">
                <ul className="list-group">
                  <IndexLink className="list-group-item" activeClassName="active" to="/">
                    Feed
                  </IndexLink>
                  <Link className="list-group-item" activeClassName="active" to={"/users/" + user.id}>
                    My Tweets
                  </Link>
                </ul>
              </div>
            );
          }

        }

        Filter.contextTypes = {
          user: PropTypes.object.isRequired
        };

        export default Filter;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import { Link, IndexLink } from 'react-router';

        class Filter extends Component {

          static contextTypes = {
            user: PropTypes.object.isRequired
          };

          render() {
            const user = this.context.user;

            return (
              <div className="filter">
                <ul className="list-group">
                  <IndexLink className="list-group-item" activeClassName="active" to="/">
                    Feed
                  </IndexLink>
                  <Link className="list-group-item" activeClassName="active" to={"/users/" + user.id}>
                    My Tweets
                  </Link>
                </ul>
              </div>
            );
          }

        }

        export default Filter;
        `}/>
      </CodeTabs>

      <h3>
        Update Layout
      </h3>
      <p>
        With our <code>Feed</code> component created, import it into the <code>Layout</code> component and insert it right below the <code>Profile</code>:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        var Filter = require('./Filter');

        module.exports = React.createClass({
          displayName: 'Layout',

          render: function() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                      <Filter />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import Filter from './Filter';

        class Layout extends Component {

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                      <Filter />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import Filter from './Filter';

        class Layout extends Component {

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                      <Filter />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        }
        ...
        `}/>
      </CodeTabs>

      <p>
        If you refresh the page you should now see the Filter displayed right below the Profile. Clicking on a link will
        generate a console error however, as the <code>/users/:userId</code> route doesn't exist yet. We'll fix that next.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-1.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Filter.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Router = require('react-router');

        module.exports = React.createClass({
          displayName: 'Filter',

          contextTypes: {
            user: React.PropTypes.object.isRequired
          },

          render: function() {
            var user = this.context.user;

            return (
              <div className="filter">
                <ul className="list-group">
                  <Router.IndexLink className="list-group-item" activeClassName="active" to="/">
                    Feed
                  </Router.IndexLink>
                  <Router.Link className="list-group-item" activeClassName="active" to={"/users/" + user.id}>
                    My Tweets
                  </Router.Link>
                </ul>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import { Link, IndexLink } from 'react-router';

        class Filter extends Component {

          render() {
            const user = this.context.user;

            return (
              <div className="filter">
                <ul className="list-group">
                  <IndexLink className="list-group-item" activeClassName="active" to="/">
                    Feed
                  </IndexLink>
                  <Link className="list-group-item" activeClassName="active" to={"/users/" + user.id}>
                    My Tweets
                  </Link>
                </ul>
              </div>
            );
          }

        }

        Filter.contextTypes = {
          user: PropTypes.object.isRequired
        };

        export default Filter;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import { Link, IndexLink } from 'react-router';

        class Filter extends Component {

          static contextTypes = {
            user: PropTypes.object.isRequired
          };

          render() {
            const user = this.context.user;

            return (
              <div className="filter">
                <ul className="list-group">
                  <IndexLink className="list-group-item" activeClassName="active" to="/">
                    Feed
                  </IndexLink>
                  <Link className="list-group-item" activeClassName="active" to={"/users/" + user.id}>
                    My Tweets
                  </Link>
                </ul>
              </div>
            );
          }

        }

        export default Filter;
        `}/>
      </CodeTabs>

      <h3>
        src/components/Layout.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var logo = require('../../assets/images/logo.png');
        var Header = require('./Header');
        var Profile = require('./Profile');
        var Filter = require('./Filter');

        module.exports = React.createClass({
          displayName: 'Layout',

          render: function() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                      <Filter />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component } from 'react';
        import Header from './Header';
        import Profile from './Profile';
        import Filter from './Filter';

        class Layout extends Component {

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                      <Filter />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        }

        export default Layout;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component } from 'react';
        import Header from './Header';
        import Profile from './Profile';
        import Filter from './Filter';

        class Layout extends Component {

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <Profile />
                      <Filter />
                    </div>
                    <div className="col-md-offset-1 col-md-6">
                      {React.cloneElement(this.props.children)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        }

        export default Layout;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        In the next section we'll add the ability to <Link to="../step-2/">view just the user's tweets</Link>.
      </p>
    </Template>
  )
};
