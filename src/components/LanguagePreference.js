import React from 'react';

export default class LanguagePreference extends React.Component {
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
    const { language } = this.state;

    return (
      <div id="language-selector" className="panel panel-default" style={{ marginTop: '32px' }}>
        <div style={{ padding: '15px' }}>
          <h3 style={{ marginTop: '0px', marginBottom: '8px' }}>
            Language Preference
          </h3>
          <div style={{ paddingBottom: '16px' }}>
            The code in this quickstart can be displayed in one of three versions of JavaScript. Which version would you like to see?
          </div>
          <div className="list-group" style={{ marginBottom: 0 }}>
            <button className={'list-group-item' + (language === 'ES5' ? ' active' : '')} style={{ outline: 'none' }} onClick={() => {
              this.setLanguage('ES5')
            }}>
              <h4 className="list-group-item-heading">ES5</h4>
              <p className="list-group-item-text">
                I prefer to use <strong>React.createClass</strong>, import code using <strong>require</strong>, and use <strong>none of the syntax introduced in ES6</strong>.</p>
            </button>
            <button className={'list-group-item' + (language === 'ES6' ? ' active' : '')} style={{ outline: 'none' }} onClick={() => {
              this.setLanguage('ES6')
            }}>
              <h4 className="list-group-item-heading">ES6</h4>
              <p className="list-group-item-text">
                I prefer to use <strong>classes</strong> with <strong>React.Component</strong>, load modules using <strong>import</strong> and <strong>export</strong>, enjoy using syntax like <strong>const</strong>, <strong>let</strong>, and <strong>default parameters</strong>.
              </p>
            </button>
            <button className={'list-group-item' + (language === 'ESNext' ? ' active' : '')} style={{ outline: 'none' }} onClick={() => {
              this.setLanguage('ESNext')
            }}>
              <h4 className="list-group-item-heading">ESNext</h4>
              <p className="list-group-item-text">
                I prefer to use <strong>ES6 syntax</strong>, but also want to use next-gen features like <strong>static property types</strong> and <strong>decorators</strong>.
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }
};
