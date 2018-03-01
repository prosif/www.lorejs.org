import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Concepts';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Publishing to GitHub Pages
      </h1>
      <p>
        Instructions for publishing to <Link to="https://pages.github.com">GitHub Pages</Link>.
      </p>

      <blockquote>
        <p>
          At the moment, GitHub Pages is more complicated to publish to than Surge, so if you're not comfortable
          with Gulp or changing DNS settings to create a CNAME, it's recommended you don't use this approach until there
          is a more streamlined solution in place.
        </p>
      </blockquote>

      <h3>
        Video Demonstration
      </h3>
      <p>
        This will be added in the future.
      </p>

      <h3>
        Install the Gulp Task
      </h3>
      <p>
        To publish your project to GitHub Pages first install the gulp task to do so:
      </p>

      <Markdown type="sh" text={`
      lore generate github
      `}/>

      <p>
        This task will automatically install any dependencies and add them to the <code>devDependencies</code> in your
        <code>package.json</code>.
      </p>

      <h3>
        Publish Your Project
      </h3>
      <p>
        Next you'll need to run the gulp task to publish your project:
      </p>

      <Markdown type="sh" text={`
      gulp github
      `}/>

      <p>
        This task will build your project for production, create branch called <code>gh-pages</code>, and push your code
        into it.
      </p>

      <p>
        Once this completes your code will be available at <code>http://[username].github.io/[repository]</code>, where
        <code>username</code> is your GitHub username and <code>repository</code> is the name of your repository. For
        example, if your username was <code>fluffykittens</code> and you were creating an application called
        <code>furballs</code>, your application would be available at <code>http://fluffykittens.github.io/furballs</code>.
      </p>

      {/*<!--<h3>Publish Your Project to a User Repository</h3>-->*/}
      {/*<!--<p>-->*/}
      {/*<!--If you want to publish your project instead to a <Link to="https://help.github.com/articles/user-organization-and-project-pages/#user&#45;&#45;organization-pages">user or organization webpage</Link>,-->*/}
      {/*<!--like <code>http://fluffykittens.github.io</code> with no project extension (like /furballs) then you'll need to make-->*/}
      {/*<!--sure your repository is named <code>[username].github.io</code>. When you publish, you'll also need to add an-->*/}
      {/*<!--argument for the branch to set it to <code>master</code>.-->*/}
      {/*<!--</p>-->*/}

      {/*<!--{% highlight bash %}-->*/}
      {/*<!--gulp github &#45;&#45;branch=master-->*/}
      {/*<!--{% endhighlight %}-->*/}

      <h3>
        Why Can't I See My Application?
      </h3>
      <p>
        Once you publish, your application won't work on GitHub Pages because it doesn't get surged from the root of
        the domain. If you look at the <code>index.html</code> file at the root of your project, you'll see this script
        being loaded:
      </p>

      <Markdown type="html" text={`
      <script src="/dist/bundle.js"></script>
      `}/>

      <p>
        This script pulls in your code, but the url expects the code to be located at
        <code>http://fluffykittens.github.io/dist/bundle.js</code>. But since your project is being served from
        <code>/furballs/</code>, and not <code>/</code>, you'll need to change this file to look like this:
      </p>

      <Markdown type="html" text={`
      <script src="/furballs/dist/bundle.js"></script>
      `}/>

      <p>
        With that in place, your code will load, but you'll still see a blank page. This is because the app is now being
        served from <code>/furballs/</code>, and React-Router doesn't know that. Your <code>routes.js</code> expects the
        application to be served from <code>/</code>:
      </p>

      <Markdown text={`
      module.exports = (
        <Route component={Master}>
          <Route path="/" component={Layout} />
        </Route>
      );
      `}/>

      <p>
        To fix that, you'll also need to change your <code>routes.js</code> file so that the root route is the repository
        of your application, like this:
      </p>

      <Markdown text={`
      module.exports = (
        <Route component={Master}>
          <Route path="/furballs/" component={Layout} />
        </Route>
      );
      `}/>

      <p>
        With those changes in place, once you redeploy, your application should work on GitHub Pages.
      </p>

      <h3>
        Non-Modification Option
      </h3>

      <p>
        If you don't want to modify your files to be served from <code>/furballs/</code>, your other option is
        to <a href="https://help.github.com/articles/using-a-custom-domain-with-github-pages/">create a custom domain</a> so that your application
        can be served from <code>http://www.furballs.com</code>.
      </p>

      <p>
        If you want to go this approach and buy a custom domain, and don't already have a DNS provider (or want to switch
        from the one you currently have), I highly recommend <Link to="https://dnsimple.com">DNSimple</Link>.
      </p>
    </Template>
  )
};
