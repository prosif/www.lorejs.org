import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Example';
import Markdown from '../../components/Markdown';
import CodeTabs from '../../components/CodeTabs';
import CodeTab from '../../components/CodeTab';
import QuickstartBranch from '../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Authorization: Example
      </h1>
      <p>
        There is an auth example in the lore repo
        called <a href="https://github.com/lore/lore/tree/master/examples/auth">auth</a>. It looks like this:
      </p>

      <img src="/assets/images/examples/auth-example-login.png" alt="Auth Example: Login" />
      <img src="/assets/images/examples/auth-example-admin.png" alt="Auth Example: Admin" />
      <img src="/assets/images/examples/auth-example-user.png" alt="Auth Example: User" />

      <p>
        Depending on which user you login as changes what you can do in the application.
      </p>

      <h3>
        Video Walk-Through
      </h3>
      <p>
        This will be added in the future.
      </p>
    </Template>
  )
};
