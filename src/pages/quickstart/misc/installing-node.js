import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Quickstart';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Installing Node
      </h1>

      <p>
        Before you can use Lore you will first need to install Node.  If you don't already have it installed, you can obtain
        it from http://nodejs.org.
      </p>

      <p>
        As an alternative to downloading Node directly, you can also use one of the available Node Version Managers (NVMs). The
        advantage of using these over installing Node directly is that they allow you to easily change which version of
        Node you are using, which is especially helpful when you want to try see how code runs on a different version of Node,
        or trying to discover if a bug you are seeing is related to a specific version of Node and/or NPM.
      </p>

      <p>
        If you are on a Mac, you can use <a href="https://github.com/creationix/nvm">nvm</a>.
      </p>

      <p>
        If you are on a Windows machine, you can use <a href="https://github.com/coreybutler/nvm-windows">nvm-windows</a>.
      </p>
    </Template>
  )
};
