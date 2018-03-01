import React from 'react';
import QuickstartNavigation from './QuickstartNavigation';
import '../assets/less/docs.less';

export default (props) => {
  const { children } = props;

  return (
    <div>
      <div className="docs-header" id="content">
        <div className="container">
          <h1>Quickstart</h1>
          <p>
            A quick dive into getting started with Lore
          </p>
        </div>
      </div>
      <div className="container docs-content">
        <QuickstartNavigation />
        {children}
      </div>
    </div>
  )
};
