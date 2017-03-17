'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import bodyParser from 'body-parser';
import session from 'express-session';

// Express.js server instance
const app = new Express();
const server = new Server(app);

// Setting view engine - ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global application middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Session stored in memory. Times out in 1hour.
app.use(session({
  cookie: {
    maxAge: 3600000,
    httpOnly: false
  },
  secret: '4f9BuUu6yeuDV4qK'
}));

// Folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// API routes setup
let apiRouter = require('./api-routes');
app.use('/api', apiRouter);

//Global error handler middleware
app.use(require('./errorHandler'));

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
