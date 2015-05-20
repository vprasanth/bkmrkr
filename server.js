var koa = require('koa'),
    router = require('koa-router'),
    body = require('koa-parse-json'),
    hbs = require('koa-hbs'),
    serve = require('koa-static'),
    r = require('rethinkdbdash')({db: 'bkmrkr'}),
    app = koa(),
    port = 3000,
    db = 'bkmrkr',
    table = 'bookmarks';

// Configuration
// @TODO: Move this elseware
app.use(serve(__dirname + '/css'));
app.use(body());
app.use(hbs.middleware({
    viewPath: __dirname + '/views'
}));

// Handlebar helper
// @TODO: Move this elseware
hbs.registerHelper('list', function(items, options) {
    var out = '<ul>';
    for(var i=0, l=items.length; i<l; i++) {
        out = out + '<li>' + options.fn(items[i]) + '</li>';
    }
    return out + '</ul>';
});

// Routing
// @TODO: Move this out to another file
app
    .use(router(app))
    .get('/', function *(){
        console.log(this.method, this.url);
        try {
            var list = yield r.table(table).run();
            yield this.render('index', {db: list});
        } catch (err){
            console.log(err);
            this.status = 500;
            this.body = 'There was an error';
        }
    })
    .get('/about', function *(){
        console.log(this.method, this.url);
        this.status = 200;
        this.body = 'About';
    })
    .post('/api/v1/bookmark', function *(){
        //@TODO: Return id of created resource
        console.log(this.method, this.url);
        var data = this.request.body;
        var status = yield r.table(table).insert(data).run();
        this.status = 200;
    });

app.listen(port);
console.log('Server listening on port', port);
