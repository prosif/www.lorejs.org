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
          <h1>Collections</h1>
          <p>
            AJAX Abstraction for Lists of Resources
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/collections/" />

            <li className="doc-section">Basic Usage</li>
            <NavLink title="retrieve" url="/collections/actions/retrieve/" />

            <li className="doc-section">Methods</li>
            <NavLink title="fetch" url="/collections/properties/fetch/" />

            <li className="doc-section">Properties</li>
            <NavLink title="_prepareModel" url="/collections/properties/_prepareModel/" />
            <NavLink title="_reset" url="/collections/properties/_reset/" />
            <NavLink title="add" url="/collections/properties/add/" />
            <NavLink title="initialize" url="/collections/properties/initialize/" />
            <NavLink title="model" url="/collections/properties/model/" />
            <NavLink title="parse" url="/collections/properties/parse/" />
            <NavLink title="reset" url="/collections/properties/reset/" />
            <NavLink title="set" url="/collections/properties/set/" />
            <NavLink title="sync" url="/collections/properties/sync/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
