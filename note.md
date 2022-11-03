# PWA

By completing this module, you'll learn how to do the following:

- Implement the client-server model.
- Explain how performance can be measured in web applications using Lighthouse.
- Set up webpack in the client directory.
- Optimize CSS and JavaScript files for performance using webpack.
- Use IndexedDB to store structured data directly in the browser.
- Use service workers to cache assets for offline functionality.
- Convert an existing web application to a PWA.

You’ll use the following tools in this module:

[1. Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)

[2. Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

[3. Concurrently](https://www.npmjs.com/package/concurrently)

[4. webpack](https://webpack.js.org/)<br/>
[4. webpack-npm](https://www.npmjs.com/package/webpack)<br/>
[4. webpack-cli](https://www.npmjs.com/package/webpack-cli)

[5. Babel](https://babeljs.io/docs/en/)

[6. IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

[7. idb](https://www.npmjs.com/package/idb)

[8. Workbox](https://developer.chrome.com/docs/workbox/)

[9. HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

[10. webpack-pwa-manifest](https://www.npmjs.com/package/webpack-pwa-manifest)

[11. heroku-prebuild](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process)

## Step-1 (client-server architecture / Lighthouse test)

- create the basic files /assets

  - js //all `<head>` tags
  - images
  - css //all css links within the `<head>` tag
  - html

- install [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en)

//client folder

- create index.css within /src/css
- use src folder instead of assets
- create client folder and place src and html inside of it.
- `npm init` within client folder to create package.json (1st)
  //folders and files tree
  |-- client
  | |-- src
  | | |--css
  | | |--images
  | | |--js
  | |-- index.html
  | |-- package.json
  | |-- webpack.config.js

//server folder

- create server directory
- `npm init` inside of it to create package.json (2nd)
  - - create script "start": "node server.js"
- `npm i express` in the server folder
- create server.js in server folder
- create routes directory in the server
  - - create htmlRoutes.js in the routes, add `GET` route that uses `PATH` to allow HTML
  - - connect client folder in server/server.js
  - - require HTML route in server.js
- `npm start` and test it server is working correctly
  //folders and files tree
  |-- client
  | |-- src
  | | |--css
  | | |--images
  | | |--js
  | |-- index.html
  | |-- package.json
  |-- server
  |-- routes
  |-- server.js
  |-- package.json

//

- `npm init` at the root directory to create package.json (3rd)
- `npm i concurrently` at the root
- add scripts property in package.json at the root
- create install script
- `npm install` at the root and `npm start` test it

## Step-2 (webpack client directory)

Webpack is used to bundle static assets. For the assets to be bundled, they should be included in the src directory: the directory that holds our raw, static files.

- `npm install webpack webpack-cli --save-dev`
- remove `"main": "index.js"` and add there `"private": "true",`

//import js using webpack

- add entry point to index.js as follow:
  - import "./cards.js";
  - import "./form.js";
  - import "./submit.js"; etc.
- create webpack.config.js
  - const path = require("path"); etc
- add new script "build": "webpack" and
- `npm run build` or `npx webpack` //see dist folder

- Webpack is both flexible and configurable, and relies on five core concepts: entry, output, mode, plugins, and loaders.

- add script
  - `"build": "webpack --mode development"`,
  - `"dev": "webpack-dev-server"`,
  - `"start": "webpack --watch"`
- change `main.js` to `bundle.js` in the client/webpack.config.js

//import images using webpack

- add images to client/src/js/index.js
- delete `dist` and run `npm install` and `npm run build`
- copy index.html from client to build directory and change script src to `bundle.js`
- add image code to client/src/js/index.js
- delete `dist` and run `npm install` and `npm run build`
- copy index.html from client to build directory and change script src to `bundle.js`

//import css using webpack

- `npm install --save-dev style-loader css-loader`
  - - add a loader to preprocess CSS files and import them into the index.js entry point.
- `npm install -D babel-loader @babel/core @babel/preset-env webpack`
  - - review client/package.json for the files
  - - style-loader,
  - - css-loader,
  - - babel-loader,
  - - @babel/core,
  - - @babel/preset-env,
  - - babel-polyfill
