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
          <h1>Libraries</h1>
          <p>
            The core libraries that Lore is built on.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/libraries/" />

            <li className="doc-section">Core Libraries</li>
            <NavLink title="React" url="/libraries/react/" />
            <NavLink title="Webpack" url="/libraries/webpack/" />
            <NavLink title="Redux" url="/libraries/redux/" />
            <NavLink title="React-Router" url="/libraries/react-router/" />
            <NavLinkPlaceholder title="Axios (todo)" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
