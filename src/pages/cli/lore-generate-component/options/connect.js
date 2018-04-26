import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../../components/templates/LoreGenerateComponent';
import Markdown from '../../../../components/Markdown';
import CodeTabs from '../../../../components/CodeTabs';
import CodeTab from '../../../../components/CodeTab';

export default (props) => {
  return (
    <Template>
      <h1>
        --connect
      </h1>
      <p>
        Providing <code>--connect</code> as an argument will generate a component wrapped in
        the <code>lore.connect</code> decorator.
      </p>

      <h3>
        Usage
      </h3>
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

            render: function() {
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
    </Template>
  )
};
