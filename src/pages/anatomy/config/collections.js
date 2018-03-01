import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Anatomy';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        config/collections.js
      </h1>

      <p>
        This file is connected to the <code>lore-hook-collections</code>.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        While this file can influence the behavior of collections, there is currently no clear reason why you would
        ever need to use it.
      </p>

      <p>
        If you need to define collection specific behavior (such as parsing server responses or defining headers to add
        to requests) you should do that in <Link to="/features/config/connections/">'config/connections.js'</Link>.
      </p>

      <p>
        If you have multiple connections, and need to define which collections use each connection, you should do that
        in 'config/models.js' as this file inherits that behavior.
      </p>
    </Template>
  )
};
