##bkmrkr
A simple tool to share and view bookmarks with your friends, colleagues, robots. This is just a fun side project to learn koa, node, etc.

###Requirments
- npm
- Node version >=0.11.x
- harmony flag

###Run
`npm install && node --harmony server.js`

###Usage

####Add bookmark
`curl -d '{"url":"http://xkcd.com/", "label": "xkcd"}' -v localhost:3000/api/v1/bookmark`
