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
        --es*
      </h1>
      <p>
        You can change which version of ES the component is generated in by passing in a language flag. By default,
        components are generated in <code>ES5</code> syntax.
      </p>

      <h3>
        Usage
      </h3>
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

          render: function() {
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
    </Template>
  )
};
