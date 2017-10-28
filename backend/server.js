import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import wrap from 'express-async-wrap';
import fs from 'fs-promise';
import compress from 'compression';
import bodyParser from 'body-parser';

import webpackConfig from './webpack.config.babel';

const app = express();

// gzip the output
app.use(compress()); 

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Prevent being in an iFrame.
app.use(function (req, res, next) {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (process.env.PROD) {
    // Assets are cached for a day. 
    // This time interval was chosen because the scrapers are ran daily, so there is no point for the browser to update the cache more often that this. 
    // These Cache-control headers are far from perfect though haha
    res.setHeader('Cache-Control', 'public, max-age=86400');
  }
  else {

    // Don't cache in DEV
    // Could also use no-store which would prevent the browser from storing it all.
    // This no-cache header requires the browser to revalidate the cache with the server before serving it.
    res.setHeader('Cache-Control', 'no-cache');
  }
  next()
}.bind(this))



app.post('/newUser', function (req, res) {
  
})



let middleware;

if (!process.env.DEV) {

  const compiler = webpack(webpackConfig);
  middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      timings: true,
      hash: false,
      chunksM: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}


app.use(express.static('public'));

app.get('*', (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  if (process.env.PROD) {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
  }
  else {
    res.write(middleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, 'index.html')));
    res.end();
  }
});


// your express error handler
app.use(function(err, req, res, next) {
    // in case of specific URIError
    if (err instanceof URIError) {
        console.log("Warning, could not process malformed url: ", req.url)
        res.send("Invalid url.");
    } else {
      console.error(err)
      res.send(err);
    }
});


const port = 5000;

app.listen(port, '0.0.0.0', (err) => {
  if (err) { 
    console.log(err); 
  }
  console.info(`Listening on port ${port}.`);
});
