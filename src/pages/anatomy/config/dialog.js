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
      <h2>
        config/dialog.js
      </h2>

      <p>
        This file is connected to the <code>lore-hook-dialog</code> hook and overrides the default dialog behaviors.
      </p>

      <h3>
        Example Config
      </h3>

      <Markdown text={`
      {
        domElementId: 'dialog'
      }
      `}/>

      <h3>
        Configuration Options
      </h3>

      <h4>
        domElementId
      </h4>
      <p>
        The <code>id</code> of the DOM element that dialogs should be mounted to.
      </p>
    </Template>
  )
};
