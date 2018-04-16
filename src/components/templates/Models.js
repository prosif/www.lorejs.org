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
            AJAX Abstraction for a Single Resource
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/models/" />

            <li className="doc-section">Basic Usage</li>
            <NavLink title="create" url="/models/actions/create/" />
            <NavLink title="delete" url="/models/actions/delete/" />
            <NavLink title="retrieve" url="/models/actions/retrieve/" />
            <NavLink title="update" url="/models/actions/update/" />

            <li className="doc-section">Methods</li>
            <NavLink title="destroy" url="/models/methods/destroy/" />
            <NavLink title="fetch" url="/models/methods/fetch/" />
            <NavLink title="save" url="/models/methods/save/" />

            <li className="doc-section">Key Properties</li>
            <NavLink title="idAttribute" url="/models/properties/idAttribute/" />
            <NavLink title="initialize" url="/models/properties/initialize/" />
            <NavLink title="parse" url="/models/properties/parse/" />
            <NavLink title="sync" url="/models/properties/sync/" />
            <NavLink title="toJSON" url="/models/properties/toJSON/" />
            <NavLink title="url" url="/models/properties/url/" />
            <NavLink title="urlRoot" url="/models/properties/urlRoot/" />

            <li className="doc-section">Other Properties</li>
            <NavLink title="_validate" url="/models/properties/_validate/" />
            <NavLink title="cidPrefix" url="/models/properties/cidPrefix/" />
            <NavLink title="generateCid" url="/models/properties/generateCid/" />
            <NavLink title="has" url="/models/properties/has/" />
            <NavLink title="isNew" url="/models/properties/isNew/" />
            <NavLink title="set" url="/models/properties/set/" />
            <NavLink title="validationError" url="/models/properties/validationError/" />

            <li className="doc-section">Misc</li>
            <NavLink title="Custom Properties" url="/models/misc/custom/" />
            <NavLink title="Extending" url="/models/misc/extend/" />
            <NavLink title="History" url="/models/misc/history/" />

          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
