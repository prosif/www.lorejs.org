import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/CLI';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        generate component
      </h1>
      <p>
        CLI command to add a Component to your project.
      </p>

      <h3>
        Usage
      </h3>

      <Markdown type="sh" text={`
      lore generate component [component-name] [options]
      `}/>

      <h2>
        Options
      </h2>

      <h3>
        Option: ES Version
      </h3>
      <p>
        You can change which version of ES the component is generated in by passing in a language flag. By default,
        components are generated in <code>ES5</code> syntax.
      </p>

      <Markdown type="sh" text={`
      lore generate component MyComponent --es5
      lore generate component MyComponent --es6
      lore generate component MyComponent --esnext
      `}/>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');

        module.exports = React.createClass({
          displayName: 'MyComponent',

          propTypes: {},

          render: function () {
            return (
              <div></div>
            );
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';

        class MyComponent extends Component {

          constructor(props) {
            super(props);

            // Set your initial state here
            // this.setState = {};

            // Bind your custom methods so you can access the expected 'this'
            // this.myCustomMethod = this.myCustomMethod.bind(this);
          }

          render() {
            return (
              <div></div>
            )
          }
        }

        MyComponent.propTypes = {};

        // NOTE: Please see https://github.com/lore/lore/issues/71 for a discussion
        // about why this template is not yet using the ES6 'export' syntax.
        module.exports = MyComponent;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';

        class MyComponent extends Component {

          static propTypes = {}

          constructor(props) {
            super(props);

            // Set your initial state here
            // this.setState = {};

            // Bind your custom methods so you can access the expected 'this'
            // this.myCustomMethod = this.myCustomMethod.bind(this);
          }

          render() {
            return (
              <div></div>
            )
          }
        }

        // NOTE: Please see https://github.com/lore/lore/issues/71 for a discussion
        // about why this template is not yet using the ES6 'export' syntax.
        module.exports = MyComponent;
        `}/>
      </CodeTabs>

      <h3>
        Option: Router
      </h3>

      <p>
        Providing <code>--router</code> as an argument will generate a component configured for use with React-Router.
      </p>

      <Markdown type="sh" text={`
      lore generate component MyComponent --router
      `}/>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Router = require('react-router');

        module.exports = React.createClass({
          displayName: 'MyComponent',

          /**
           * This mixin provides a 'history' object on 'this'.
           * To navigate to a new route, call it like this:
           * this.history.pushState(null, '/the/new/url');
           *
           * Learn more at:
           * https://github.com/reactjs/react-router/blob/v1.0.3/docs/API.md#history-mixin
           */
          mixins: [Router.History],

          propTypes: {},

          render: function () {
            return (
              <div></div>
            );
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';

        /**
         * IMPORTANT!!
         *
         * The template for ES6 components does not currently support react-router integration.
         * This template will be updated as soon a solution is in place.
         */
        class MyComponent extends Component {

          constructor(props) {
            super(props);

            // Set your initial state here
            // this.setState = {};

            // Bind your custom methods so you can access the expected 'this'
            // this.myCustomMethod = this.myCustomMethod.bind(this);
          }

          render() {
            return (
              <div></div>
            )
          }
        }

        MyComponent.propTypes = {};

        // NOTE: Please see https://github.com/lore/lore/issues/71 for a discussion
        // about why this template is not yet using the ES6 'export' syntax.
        module.exports = MyComponent;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';

        /**
         * IMPORTANT!!
         *
         * The template for ESNext components does not currently support react-router integration.
         * This template will be updated as soon a solution is in place.
         */
        class MyComponent extends Component {

          static propTypes = {}

          constructor(props) {
            super(props);

            // Set your initial state here
            // this.setState = {};

            // Bind your custom methods so you can access the expected 'this'
            // this.myCustomMethod = this.myCustomMethod.bind(this);
          }

          render() {
            return (
              <div></div>
            )
          }
        }

        // NOTE: Please see https://github.com/lore/lore/issues/71 for a discussion
        // about why this template is not yet using the ES6 'export' syntax.
        module.exports = MyComponent;
        `}/>
      </CodeTabs>

      <h3>
        Option: Connect
      </h3>
      <p>
        Providing <code>--connect</code> as an argument will generate a component wrapped in
        the <code>lore.connect</code> decorator.
      </p>

      <Markdown type="sh" text={`
      lore generate component MyComponent --connect
      `}/>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React, { Component, PropTypes } from 'react';

        class MyComponent extends Component {

          constructor(props) {
            super(props);

            // Set your initial state here
            // this.setState = {};

            // Bind your custom methods so you can access the expected 'this'
            // this.myCustomMethod = this.myCustomMethod.bind(this);
          }

          render() {
            return (
              <div></div>
            )
          }
        }

        MyComponent.propTypes = {
          //models: React.PropTypes.object.isRequired
        };

        // NOTE: Please see https://github.com/lore/lore/issues/71 for a discussion
        // about why this template is not yet using the ES6 'export' syntax.
        module.exports = lore.connect((getState, props) => {
          return {
            //models: getState('model.find')
          };
        })(MyComponent;
        `}/>
        <CodeTab syntax="ES6" text={`
        var React = require('react');

        module.exports = lore.connect(function(getState, props) {
            return {
              //models: getState('model.find')
            }
          })(
          React.createClass({
            displayName: 'MyComponent',

            propTypes: {
              //models: React.PropTypes.object.isRequired
            },

            render: function () {
              return (
                <div></div>
              );
            }
          })
        );
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';

        @lore.connect((getState, props) => {
          return {
            //models: getState('model.find')
          };
        })
        class MyComponent extends Component {

          static propTypes = {
            //models: React.PropTypes.object.isRequired
          }

          constructor(props) {
            super(props);

            // Set your initial state here
            // this.setState = {};

            // Bind your custom methods so you can access the expected 'this'
            // this.myCustomMethod = this.myCustomMethod.bind(this);
          }

          render() {
            return (
              <div></div>
            )
          }
        }

        // NOTE: Please see https://github.com/lore/lore/issues/71 for a discussion
        // about why this template is not yet using the ES6 'export' syntax.
        module.exports = MyComponent;
        `}/>
      </CodeTabs>

      <h3>
        Combining Options
      </h3>
      <p>
        Options can also be combined to generate a component containing each of those characteristics.
      </p>

      <Markdown type="sh" text={`
      lore generate component MyComponent --es6 --router --connect
      `}/>
    </Template>
  )
};
