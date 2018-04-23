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
          <h1>lore-generate-reducer</h1>
          <p>
            Creates a set of actions for each model using blueprints
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/cli/lore-generate-reducer/" />

            <li className="doc-section">???</li>
            {/*<NavLink title="normalize" url="/hooks/lore-hook-actions/config/normalize/" />*/}
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
};
