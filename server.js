var koa = require('koa');
var router = require('koa-router');
var body = require('koa-parse-json');
var hbs = require('koa-hbs');
var serve = require('koa-static');

var app = koa();
var port = 3000;

// Configuration
// @TODO: Move this elseware
app.use(serve(__dirname + '/css'));
app.use(body());
app.use(hbs.middleware({
    viewPath: __dirname + '/views'
}));

hbs.registerHelper('list', function(items, options) {
    var out = '<ul>';
    for(var i=0, l=items.length; i<l; i++) {
        out = out + '<li>' + options.fn(items[i]) + '</li>';
    }
    return out + '</ul>';
});

var db = [{url: 'http://futurama.wikia.com/wiki/Morbo', label: 'Morbo!'},{url: 'http://www.vprasanth.com', label: 'Prasanth'}];
// Routing
// @TODO: Move this out to another file
app
    .use(router(app))
    .get('/', function *(){
        console.log(this.method, this.url);
        yield this.render('index', {db:db});
    })
    .get('/about', function *(){
        console.log(this.method, this.url);
        this.status = 200;
        this.body = 'About';
    })
    .post('/api/v1/bookmark', function *(){
        //@TODO: Return id of created resource
        db.push(this.request.body);
        console.log(db[db.length-1]);
        console.log('All:', db);
        this.status = 200;
    });

app.listen(port);
console.log('Server listening on port', port);
