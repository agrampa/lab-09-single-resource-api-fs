# Lab 9: Single Resource API with Simple Persistence

## Description
* For this lab we...
[class 8](https://github.com/codefellows/seattle-javascript-401d15/tree/master/class-08-vanilla-REST-api) and [lab 8](https://github.com/codefellows-seattle-javascript-401d15/lab-08-single-resource-api).

## Version
* 0.1.0

## Installation
Please visit the following pages for how to install your project locally.

* [Cloning A Repository](https://help.github.com/articles/cloning-a-repository/)
* [Fork A Repo](https://help.github.com/articles/fork-a-repo/)
* [Forking](https://guides.github.com/activities/forking/)

In [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) (Terminal)

### NPM Packages
* [NPM Docs](https://docs.npmjs.com)
* [NPM package.json](https://docs.npmjs.com/files/package.json)

```npm init
npm install -D mocha chai chai-http
npm install -D debug
npm install -S uuid
npm install -S bluebird
```
### Dependencies
The result of installation above.

```"devDependencies": {
  "chai": "^3.5.0",
  "chai-http": "^3.0.0",
  "debug": "^2.6.4",
  "mocha": "^3.3.0"
},
"dependencies": {
  "uuid": "^3.0.1"
}
```

### Optional Helper

To use `npm run watch`

* Open package.json
* In the "scripts" section, add "watch": "nodemon server.js"

## Running the Tests
In [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) (Terminal)

```npm run test
DEBUG=http* nodemon server.js
http POST :3000/api/note name=get+chocolate date=“04-26-2017”
```

## Resources
* [File System](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html)
* [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
* [Node HTTP](https://nodejs.org/api/http.html)
* [HTTP Header Fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields)
* [Chai HTTP](https://github.com/chaijs/chai-http)
* [Super Agent](https://visionmedia.github.io/superagent/)
* [Status Dogs](https://httpstatusdogs.com)

## License

This project is licensed under the MIT License - see the license file for details

## Acknowledgments
* Code Fellows
* Scott Schmidt, Instructor.
* Judy Vue, Lead Teaching Assistant.
* Thomas Martinez, Teaching Assistant.
