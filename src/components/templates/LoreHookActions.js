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
          <h1>lore-hook-actions</h1>
          <p>
            Creates a set of actions for each model using blueprints
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/hooks/lore-hook-actions/" />

            <li className="doc-section">Config</li>
            <NavLink title="normalize" url="/hooks/lore-hook-actions/config/normalize/" />
            <NavLink title="blueprints" url="/hooks/lore-hook-actions/config/blueprints/" />
            <NavLink title="addCidToBody" url="/hooks/lore-hook-actions/config/addCidToBody/" />
            <NavLink title="cidBodyAttributeName" url="/hooks/lore-hook-actions/config/cidBodyAttributeName/" />

            <li className="doc-section">Blueprints</li>
            <NavLink title="create" url="/hooks/lore-hook-actions/blueprints/create/" />
            <NavLink title="destroy" url="/hooks/lore-hook-actions/blueprints/destroy/" />
            <NavLink title="find" url="/hooks/lore-hook-actions/blueprints/find/" />
            <NavLink title="get" url="/hooks/lore-hook-actions/blueprints/get/" />
            <NavLink title="update" url="/hooks/lore-hook-actions/blueprints/update/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
};
