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
          <h1>Models</h1>
          <p>
            AJAX Abstraction for Single Resource
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/models/" />

            <li className="doc-section">???</li>
            {/*<NavLink title="create" url="/actions/create/" />*/}
            {/*<NavLink title="update" url="/actions/update/" />*/}
            {/*<NavLink title="destroy" url="/actions/destroy/" />*/}
            {/*<NavLink title="find" url="/actions/find/" />*/}
            {/*<NavLink title="get" url="/actions/get/" />*/}
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
