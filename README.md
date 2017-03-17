# Wave Software Development Challenge

# Introduction

This is an isomorphic webapp with session based authentication. I have used react for crafting my web components . Node.js API endpoints written using Express.js to serve the frontend.
I used my personal isomorphic boilerplate code that I generally use for simple CRUD apps.

# Software dependencies
* node version:  > 6.9
* npm  version:  > 3.10
* mysql version:  > 5.5

# Infrastructure installation 
* On a Mac machine, please install node using either [nvm](https://github.com/creationix/nvm) or [node.js homepage](https://nodejs.org/en/download/) 
* Use brew to install mysql [locally](https://blog.joefallon.net/2013/10/install-mysql-on-mac-osx-using-homebrew/).

# Software installation
To start the application, run the following commands.

The following command installs all open source dependencies for this project defined in `package.json` file.
```
$ npm install
```
`build` command runs webpack to generate compiled js files.
```
$ npm run build
```

set environment variables for database connection. See `src/models/index.js` for more details.
```
export SE_DATABASE=se_payroll; export SE_USERNAME=root;export SE_PASSWORD=root
```

This starts the server on port `3000`
```
$ npm start
```

# Gotchas

* Use any username/password combination to get past the login page.
* Mysql connects to localhost always.

# Contact

Please drop me a message at selvam.palanimalai@gmail.com or Call me at 9022106336.
