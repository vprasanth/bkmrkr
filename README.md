##bkmrkr
A simple tool to share and view bookmarks with your friends, colleagues, and robots. This is just a side project to learn koa, node, etc.

###Requirments
- npm
- node version >= 0.11.x
- harmony flag
- local rethinkdb instance
  - update `db` and `table` variables with whatever db and table you have defined
  - current scheme for table: `{url: string,label: string}`

###Run
`npm install && node --harmony server.js`

##Usage

####Add bookmark
`curl -d '{"url":"http://xkcd.com/", "label": "xkcd"}' -v localhost:3000/api/v1/bookmark`
