const bodyParser = require('body-parser');
const content = require('../custom_modules/content_types');
const array = require('../custom_modules/array_modules');
const constructors = require('../custom_modules/custom_constructors');
const util = require('../custom_modules/custom_util');

const URLencodedParser = bodyParser.urlencoded({ extended: false });
//all routes that correspond to a .ejs-file with the same name
//and do not require additional data to be displayed
const routeMatchesView = ['game', 'about', 'developers', 'impressum'];

module.exports = function (app) {

    //--GET-REQUESTS-----------------------------------------------------------
    //verify that Server is online
    app.get('/', function (req, res) {
        res.writeHead(200, content.plain);
        res.end('This is the Front-End-Server.\n"Fired up and ready to serve."\n\t-Blitzcrank');
    });

    //favicon.ico
    app.get('/favicon.ico', function (req, res) {
        res.end();
    });

    //home
    app.get('/home', function (req, res) {
        /*If a cookie containig a username exists the user will be 
          redirected to '/game' otherwise to '/register' */
        if (util.fun.usernameIsSet(req.cookies.user)) {
            res.redirect('https://game.twenska.de/game.html');
        } else {
            res.redirect('https://game.twenska.de/fe/register');
        };
    });

    //change_username
    app.get('/change_username', function (req, res) {
        res.clearCookie('user');
        res.redirect('https://game.twenska.de/fe/register');
    });

    //analyse
    app.get('/analyse', function(req, res){
        var data = constructors.json.analyse;
        data.header_text = util.fun.getHeader(req.cookies.user);

        util.promise.get('analyse').then(function(get_res){
            data.data = JSON.parse(get_res.body);            
            res.render('analyse', data);
        }).catch(function(err){
            console.log(err);
            res.render('analyse', data);
        });


        /*
        data = constructors.json.analyse;
        data.header_text = util.fun.getHeader(req.cookies.user);
        res.render('analyse', data);*/
    });

    //--POST-REQUESTS----------------------------------------------------------

    //--ALL-REQUESTS-----------------------------------------------------------
    //Dynamic Routing for everything that doesn't use one of the above
app.get('/:file', function (req, res) {
    if (array.xInArray(routeMatchesView, req.params.file)) {
        var data = constructors.json.else;
        data.header_text = util.fun.getHeader(req.cookies.user);
        res.render(req.params.file, data);
    } else {
        var data = constructors.json.notFound;
        data.header_text = util.fun.getHeader(req.cookies.user);
        data.file = req.params.file;
        res.render('404', data);
    }
});

};