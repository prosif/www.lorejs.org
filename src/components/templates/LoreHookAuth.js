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
          <h1>lore-hook-auth</h1>
          <p>
            Provides an action and reducer dedicated to fetching the current user
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/hooks/lore-hook-auth/" />

            <li className="doc-section">Config</li>
            <NavLink title="modelName" url="/hooks/lore-hook-auth/config/modelName/" />
            <NavLink title="reducerName" url="/hooks/lore-hook-auth/config/reducerName/" />
            <NavLink title="actionName" url="/hooks/lore-hook-auth/config/actionName/" />

            <li className="doc-section">Actions</li>
            <NavLink title="get" url="/hooks/lore-hook-auth/actions/get/" />
            <NavLink title="update" url="/hooks/lore-hook-auth/actions/update/" />

            <li className="doc-section">Reducers</li>
            <NavLink title="reducer" url="/hooks/lore-hook-auth/reducers/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
};
