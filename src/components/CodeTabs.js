import React from 'react';
import Markdown from './Markdown';
let count = 0;

export default class CodeTabs extends React.Component {
  // constructor() {
  //   super();
  //   // try {
  //   //   this.state = {
  //   //     language: localStorage ? localStorage.getItem('language') : 'ES6'
  //   //   }
  //   // } catch {
  //   //   this.state = {
  //   //     language: 'ES6'
  //   //   }
  //   // }
  //
  //   this.state = {
  //     language: 'ES6'
  //   }
  // }

  componentWillMount() {
    this.setState({
      language: localStorage ? localStorage.getItem('language') : 'ES6'
    })
  }

  setLanguage(language) {
    localStorage.setItem('language', language);
    this.setState({
      language: language
    });
  }

  render() {
    const { children } = this.props;
    const { language } = this.state;

    const tabs = [];
    const content = [];

    React.Children.map(children, function(child) {
      const {
        syntax,
        type,
        text
      } = child.props;
      count = count + 1;
      tabs.push(
        <li key={count} role="presentation" className={language === syntax ? 'active' : ''}>
          <a href={`#tab-${count}`} role="tab" data-toggle="tab" aria-expanded="false">
            {syntax}
          </a>
        </li>
      );

      content.push(
        <div key={count} role="tabpanel" className={'tab-pane' + (language === syntax ? ' active' : '')} id={`tab-${count}`}>
          <Markdown
            type={type}
            text={_.replace(text, /\n        /g, '\n      ')}
          />
        </div>
      );
    });

    return (
      <div className="code-tabs">
        <ul className="nav nav-tabs" role="tablist">
          {tabs}
        </ul>
        <div className="tab-content">
          {content}
        </div>
      </div>
    );

    return (
      <div>
        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="">
            <a href="#tab-101" role="tab" data-toggle="tab" aria-expanded="false">ES5</a>
          </li>

          <li role="presentation" className="">
            <a href="#tab-102" role="tab" data-toggle="tab">ES6</a>
          </li>

          <li role="presentation" className="active">
            <a href="#tab-103" role="tab" data-toggle="tab" aria-expanded="true">ESNext</a>
          </li>
        </ul>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane" id="tab-101">
            Test 101
          </div>
          <div role="tabpanel" className="tab-pane" id="tab-102">
            Test 102
          </div>
          <div role="tabpanel" className="tab-pane active" id="tab-103">
            Test 103
          </div>
        </div>
      </div>
    );
  }
};
