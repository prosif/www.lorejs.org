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
        Step 2: Add Custom Styles
      </h1>
      <p>
        In this step we're going to add some custom styles we'll need for the rest of the Quickstart.
      </p>

      <QuickstartBranch branch="layout.2" />

      <h3>
        Styling Support in Lore
      </h3>

      <p>
        Lore includes support for CSS, LESS and SASS by default. If you open up the <code>/assets</code> folder at
        the root of your project you'll see a folder named for each style.
      </p>

      <Markdown type="sh" text={`
      -assets
        |-css
        |-less
        |-sass
      `}/>

      <p>
        For this Quickstart, we're going to be using vanilla CSS.
      </p>

      <blockquote>
        <p>
          In a real project, you can simply delete the folders of the styles you don't want to use, or use inline styles or
          your favorite JSS library (JavaScript Style Sheets). Lore has no opinions about how you style your application, it
          simply includes Webpack loaders for LESS and SASS by default.
        </p>
        <p>
          That being said, one advantage of using CSS, LESS, or SASS for your project is that Webpack can hot-reload changes
          without the need to refresh your application, which adds a convenience to that aspect of development.
        </p>
      </blockquote>

      <h3>
        Add Custom Styles
      </h3>

      <p>
        Open up <code>/assets/css/main.css</code>. Delete the existing styles and replace them with this code:
      </p>

      <Markdown type="css" text={`
      /*
       * Create Tweet Button
       */

      .create-button {
        position: absolute;
        top: 25px;
        right: 15px;
        z-index: 1000;
        border-radius: 100px;
        outline: none;
      }

      /*
       * Edit and Delete Links
       */

      .link {
        cursor: pointer;
        margin-right: 16px;
      }

      /*
       * Feed
       */

      .feed .title {
        text-align: center;
      }

      .feed .tweets {
        margin-top: 32px;
      }

      .feed .pagination {
        text-align: center;
      }

      .feed nav {
        text-align: center;
      }

      /*
       * Filter
       */

      .filter {
        marginTop: 20px;
      }


      /*
       * Header
       */

      .header .container {
        position: relative;
      }

      /*
       * Footer
       */

      .footer {
        text-align: center;
        margin-top: 32px;
        margin-bottom: 64px;
      }

      .footer button {
        outline: none;
      }

      /*
       * Profile
       */

      .profile {
        position: relative;
        display: block;
        margin-bottom: .75rem;
        background-color: #fff;
        border-radius: .25rem;
        border: 1px solid rgba(0,0,0,.125);
        margin-top: 20px;
      }

      .profile .card-block {
        padding: 1.25rem
      }

      .profile .avatar {
        width: 48px;
        position: absolute;
        top: -24px;
        left: calc(50% - 24px);
        border: 1px solid gray
      }

      .profile .permissions {
        margin-left: -12px;
      }

      /*
       * Tweet
       */

      .tweet .avatar {
        width: 32px;
        border: 1px solid gray
      }

      .tweet .image-container {
        display: inline-block;
        vertical-align: top;
        width: 32px
      }

      .tweet .content-container {
        display: inline-block;
        margin-left: 8px;
        max-width: 85%
      }

      .tweet .title {
        line-height: 32px;
        display: inline-block
      }

      .tweet .text {
        margin-bottom: 5px
      }

      .tweet .timestamp {
        display: inline-block;
        margin-left: 8px;
        color: #999;
        font-size: 14px
      }
      `}/>

      <p>
        Once you replace the styles, the application will rebuild and the browser will automatically update to reflect the changes.
      </p>

      <blockquote>
        <p>
          You may have noticed that this file is not included in <code>index.html</code>, but still controls the styling of the application.
          This is because it's required by the <code>Master</code> component that lives at <code>src/components/Master.js</code> and serves as the
          root of the application. You will interact with this component more later on.
        </p>
      </blockquote>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/layout/step-2.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        assets/css/main.css
      </h3>

      <Markdown type="css" text={`
      /*
       * Create Tweet Button
       */

      .create-button {
        position: absolute;
        top: 25px;
        right: 15px;
        z-index: 1000;
        border-radius: 100px;
        outline: none;
      }

      /*
       * Edit and Delete Links
       */

      .link {
        cursor: pointer;
        margin-right: 16px;
      }

      /*
       * Feed
       */

      .feed .title {
        text-align: center;
      }

      .feed .tweets {
        margin-top: 32px;
      }

      .feed .pagination {
        text-align: center;
      }

      .feed nav {
        text-align: center;
      }

      /*
       * Filter
       */

      .filter {
        marginTop: 20px;
      }


      /*
       * Header
       */

      .header .container {
        position: relative;
      }

      /*
       * Footer
       */

      .footer {
        text-align: center;
        margin-top: 32px;
        margin-bottom: 64px;
      }

      .footer button {
        outline: none;
      }

      /*
       * Profile
       */

      .profile {
        position: relative;
        display: block;
        margin-bottom: .75rem;
        background-color: #fff;
        border-radius: .25rem;
        border: 1px solid rgba(0,0,0,.125);
        margin-top: 20px;
      }

      .profile .card-block {
        padding: 1.25rem
      }

      .profile .avatar {
        width: 48px;
        position: absolute;
        top: -24px;
        left: calc(50% - 24px);
        border: 1px solid gray
      }

      .profile .permissions {
        margin-left: -12px;
      }

      /*
       * Tweet
       */

      .tweet .avatar {
        width: 32px;
        border: 1px solid gray
      }

      .tweet .image-container {
        display: inline-block;
        vertical-align: top;
        width: 32px
      }

      .tweet .content-container {
        display: inline-block;
        margin-left: 8px;
        max-width: 85%
      }

      .tweet .title {
        line-height: 32px;
        display: inline-block
      }

      .tweet .text {
        margin-bottom: 5px
      }

      .tweet .timestamp {
        display: inline-block;
        margin-left: 8px;
        color: #999;
        font-size: 14px
      }
      `}/>


      <h2>
        Next Steps
      </h2>
      <p>
        Next we're going to <Link to="../step-3/">add the header</Link>.
      </p>
    </Template>
  )
};
