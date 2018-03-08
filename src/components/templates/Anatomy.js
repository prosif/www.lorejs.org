import React from 'react';
import NavLink from '../NavLink';
import NavLinkPlaceholder from '../NavLinkPlaceholder';
import '../../assets/less/docs.less';

export default (props) => {
  const { children } = props;

  return (
    <div>
      <div className="docs-header" id="content">
        <div className="container">
          <h1>Anatomy</h1>
          <p>
            The structure of a Lore application
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/features/" />

            <li className="doc-section">Config</li>
            <NavLink title="actions" url="/anatomy/config/actions/" />
            <NavLink title="auth" url="/anatomy/config/auth/" />
            <NavLink title="collections" url="/anatomy/config/collections/" />
            <NavLink title="connect" url="/anatomy/config/connect/" />
            <NavLink title="connections" url="/anatomy/config/connections/" />
            <NavLink title="dialog" url="/anatomy/config/dialog/" />
            <NavLink title="local" url="/anatomy/config/local/" />
            <NavLink title="models" url="/anatomy/config/models/" />
            <NavLink title="reducers" url="/anatomy/config/reducers/" />
            <NavLink title="redux" url="/anatomy/config/redux/" />
            <NavLink title="router" url="/anatomy/config/router/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
