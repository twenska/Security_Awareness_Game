const bodyParser = require('body-parser');
const content = require('../custom_modules/content_types');
const constructors = require('../custom_modules/custom_constructors');
const util = require('../custom_modules/custom_util');

const URLencodedParser = bodyParser.urlencoded({ extended: false });
const maxScoresIndex = 20;

var gameId = -1;
util.promise.get('init').then(function (post_res) {
    gameId = post_res.body;
    gameId++;
    console.log('Next GameId is: ' + gameId);
}).catch(function (err) {
    console.log(err);
});

module.exports = function (app) {
    //--GET-REQUESTS-----------------------------------------------------------
    //game
    app.get('/game', function (req, res) {
        /*If a cookie containig a username exists the game-page will
          be rendered otherwise he will be redirected to '/register'
          and receive a message */
        var data = constructors.json.else;
        data.header_text = util.fun.getHeader(req.cookies.user);

        if (util.fun.usernameIsSet(req.cookies.user)) {
            res.redirect('https://game.twenska.de/game.html');
        } else {
            var cookieData = constructors.cookie.msg;
            cookieData.content = 'Du musst zuerst einen Benutzernamen eingeben';
            cookieData.type = 'error';
            res.cookie('msg', cookieData, { maxAge: 5000 })
            res.redirect('https://game.twenska.de/fe/register');
        };
    });

    //register
    app.get('/register', function (req, res) {
        /*The register-page is rendered displaying any message
          given in the msg-cookie */
        var data = constructors.json.index;
        var post_json = constructors.service.scores;

        data.header_text = util.fun.getHeader(req.cookies.user);
        data.msg = util.fun.getMsg(req.cookies.msg);

        post_json.max = maxScoresIndex;

        util.promise.post('scores', post_json).then(function (post_res) {
            data.scores = post_res.body.scores;
	console.log(data.scores);
            end();
        }).catch(function (err) {
            console.log(err);
            data.scores[0].user = 'Statistiken können nicht abgerufen werden';
            end();
        });

        function end() {
            res.clearCookie('msg');
            res.render('index', data);
        };
    });

    app.get('/create-user', function (req, res) {
        const gameId = req.cookies.user.gameId;
        const username = req.cookies.user.username;
        var post_json = constructors.service.startGame;

        post_json.gameId = gameId;
        post_json.username = username;

        util.promise.post('start-game', post_json).then(function (post_res) {
            console.log('User "%s" started the Game %s. User created: %s', username, gameId, post_res.body.success);
        }).catch(function (err) {
            console.log(err);
            console.log('User "%s" started the Game %s. User created: %s', username, gameId, false);
        });
        res.redirect('https://game.twenska.de/game.html');
    });

    //--POST-REQUESTS----------------------------------------------------------
    //register
    app.post('/register', URLencodedParser, function (req, res) {
        const username = new String(req.body.username);

        if (username.length > 30) {
            var cookieData = constructors.cookie.msg;
            cookieData.content = 'Der Benutzername darf maximal 30 Zeichen haben';
            cookieData.type = 'error';
            res.cookie('msg', cookieData, { maxAge: 5000 });
            res.redirect('https://game.twenska.de/fe/register');
        } else if (username.length == 0) {
            var cookieData = constructors.cookie.msg;
            cookieData.content = 'Du musst zuerst einen Benutzernamen eingeben';
            cookieData.type = 'error';
            res.cookie('msg', cookieData, { maxAge: 5000 });
            res.redirect('https://game.twenska.de/fe/register');
        } else {
            var cookieData = constructors.cookie.user;
            cookieData.username = username;
            cookieData.gameId = gameId;
            res.cookie('user', cookieData);
            gameId++;
            res.redirect('https://game.twenska.de/fe/create-user');
        };
    });



    /*--TESTS----------------------------------------------------------------------
    app.get('/test/:service', function (req, res) {
        if (req.params.service == 'answer') {
            //test/answer
            const gameId = util.fun.getGameId(req.cookies.user);
            if (gameId >= 0) {
                var post_json = constructors.service.answer;
                post_json.gameId = gameId;
                post_json.questionId = 1;
                post_json.answer = false;

                
                util.promise.post('answer', post_json).then(function (post_res) {
                    console.log(post_res.body);
                    res.setHeader("200", content.json);
                    res.end(JSON.stringify(post_res.body));
                }).catch(function (err) {
                    console.log(err);
                    res.end();
                });
            } else {
                res.end();
            };





        } else if (req.params.service == 'end') {
            //test/end
            const gameId = util.fun.getGameId(req.cookies.user);
            if (gameId >= 0) {
                var post_json = constructors.service.endGame;
                post_json.gameId = gameId;
                post_json.score = '999';
                post_json.time = '00:12:45';

                util.promise.post('end-game', post_json).then(function (post_res) {
                    console.log(post_res.body);
                    res.setHeader("200", content.json);
                    res.end(JSON.stringify(post_res.body));
                }).catch(function (err) {
                    console.log(err);
                    res.end()
                });
            } else {
                res.end();
            };





        } else {
            res.end();
        };
    });*/

};

//--FUNCTIONS------------------------------------------------------------------

