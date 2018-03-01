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
        Normalization: Overview
      </h1>

      <p>
        In this section we'll enable normalization of API responses, to improve application performance and reduce the number
        of network request for data from the API.
      </p>

      <p>
        At the end of this section your application will look like this (visually identical):
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-1.png" />


      <h2>
        What's the issue?
      </h2>

      <p>
        If you open the browser developers tools and take a look at the network requests when the <code>Feed</code> page loads, you'll
        notice a series of AJAX calls being make to the API that read something like this:
      </p>

      <Markdown type="sh" text={`
      [1] XHR finished loading: GET "http://localhost:1337/user"
      [2] XHR finished loading: GET "http://localhost:1337/tweets?page=1"
      [3] XHR finished loading: GET "http://localhost:1337/users/1"
      [4] XHR finished loading: GET "http://localhost:1337/users/2"
      [5] XHR finished loading: GET "http://localhost:1337/users/3"
      [6] XHR finished loading: GET "http://localhost:1337/users/4"
      `}/>

      <p>
        The first API call is to retrieve the current user (Marle). The second API call is to retrieve the first page of
        tweets (to display in the feed) and the remaining API calls are to retrieve the user that created each tweet, so
        we can get their name and avatar. So that's basically 6 API calls to display 5 tweets.
      </p>

      <p>
        Now imagine you have a page that displays 20 tweets, and each tweet is by a different user. If we change nothing about
        how the application requests data, that would amount to 22 API calls just to display the first page of tweets (1 API
        call for the current user, 1 API call for the first page of tweets, and 20 API calls to get information about the user
        for each tweet).
      </p>

      <p>
        That's definitely cause for concern, as it's not hard to see that as a performance issue for both the browser and the
        server.
      </p>

      <p>
        For the browser, we need to wait for 22 network requests to return before the experience can be displayed as intended,
        and displaying page two might require *another* 21 network requests. But there's also a less obvious problem nested
        in the number of network requests; each browser limits the number of concurrent requests to a single domain. Some
        current request limits are listed below
      </p>

      <Markdown type="sh" text={`
      Concurrent Connections Per Hostname

      Chrome 57     6
      Firefox 46    6
      Safari 10     6
      IE 10         8
      IE 11         13
      `}/>

      <p>
        In this example, our <code>hostname</code> is <code>localhost:1337</code>. And <code>Concurrent Connections</code> means the browser will limit the
        number of requests to that domain at any single moment. For <code>Chrome 57</code>, that number is 6, which means if we make
        20 network requests to retrieve the users for 20 tweets, the browser will only send 6 requests, and then queue the
        other 14. Once one of the 6 comes back, the browser will send out one of the queued requests.
      </p>

      <h2>
        How do you solve the issue?
      </h2>

      <p>
        To address this problem, many APIs will return <strong>nested data</strong>. For example, if we made an
        API call to <code>http://localhost:1337/tweets</code> we'll get a response back that looks like this:
      </p>

      <Markdown text={`
      {
        data: [
          {
            id: 1,
            user: 418,
            text: "Ayla fight while alive! Win and live. Lose and die. Rule of life. No change rule.",
            createdAt: "2017-05-06T16:20:15.439Z",
            updatedAt: "2017-05-06T19:20:15.455Z"
          }
        ],
        meta: {
          paginate: {
            currentPage: 1,
            nextPage: null,
            prevPage: null,
            totalPages: 1,
            totalCount: 1,
            perPage: 5
          }
        }
      }
      `}/>

      <p>
        And then to find out the user, we need to make another request to <code>http://localhost:1337/users/1</code> to get this response:
      </p>

      <Markdown text={`
      {
        id: 418,
        nickname: "ayla",
        authId: "auth0|57f1e2ad68e2b55a013258cd",
        avatar: "https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png",
        createdAt: "2017-05-06T19:20:15.431Z",
        updatedAt: "2017-05-06T19:20:15.431Z"
      }
      `}/>

      <p>
        Alternatively, we can tell the API we want it to nest the user *INSIDE* each tweet, to save us a network request. To
        see this, make the same call to retrieve tweets but tell the API you want it to *populate* the <code>user</code> field. You can
        do that by making a request to <code>http://localhost:1337/tweets?populate=user</code>, and you'll see a response like this:
      </p>

      <Markdown text={`
      {
        data: [
          {
            id: 1,
            user: {
              id: 418,
              nickname: "ayla",
              authId: "auth0|57f1e2ad68e2b55a013258cd",
              avatar: "https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png",
              createdAt: "2017-05-06T19:20:15.431Z",
              updatedAt: "2017-05-06T19:20:15.431Z"
            },
            text: "Ayla fight while alive! Win and live. Lose and die. Rule of life. No change rule.",
            createdAt: "2017-05-06T16:20:15.439Z",
            updatedAt: "2017-05-06T19:20:15.455Z"
          }
        ],
        meta: {
          paginate: {
            currentPage: 1,
            nextPage: null,
            prevPage: null,
            totalPages: 1,
            totalCount: 1,
            perPage: 5
          }
        }
      }
      `}/>

      <p>
        By requesting that the API nest the user inside each tweet, we can reduce the number of API calls required to get
        all the data we need from 22 requests to 2 requests, and it's *always* going to be 2 requests regardless of the number
        of tweets we request per page.
      </p>


      <h2>
        What is normalization?
      </h2>

      <p>
        While the solution above solves (or heavily reduces) the issue of network requests, it also introduces a challenge;
        nested data is difficult to work with on the client side, and can easily get out of sync, especially in real-time
        applications. To prevent this from being an issue we want to break apart the <code>tweet</code> resource on the client side and
        store the <code>tweet</code> and embedded <code>user</code> data separately.
      </p>

      <p>
        This process is called <code>normalization</code> and is something Lore provides support for by default.
      </p>


      <h2>
        Next Steps
      </h2>

      <p>
        Ready? Let's <Link to="../step-1/">get started</Link>!
      </p>
    </Template>
  )
};
