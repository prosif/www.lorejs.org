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
        config/local.js
      </h1>

      <p>
        This file allows you to override any of the other config settings in a way that will <em>only</em> affect your development
        machine. This file is added to the <code>.gitignore</code> by default and will never be checked in.
      </p>

      <h3>
        Example Configuration
      </h3>
      <p>
        To use this file, simply provide a key named after the file you want to override. So if you wanted to override
        the default headers sent to the <code>default</code> API connection, so that it always sends a specific JWT token, you just
        need to provide a key named <code>connections</code> and then describe the config modifications you want to make.
      </p>

      <Markdown text={`
      module.exports = {

        connections: {
          default: {
            headers: function() {
              return {
                Authorization: 'JWT super-secret-hard-coded-auth-token'
              }
            }
          }
        }

      }
      `}/>
    </Template>
  )
};
