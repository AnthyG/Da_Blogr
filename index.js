"use strict";

var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var compress = require('compression');
app.use(compress());
var fs = require('fs');



var qs = require('querystring');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var crypto = require('crypto');

app.use(session({
    store: new FileStore,
    secret: 'bebi kahtsze', // keyboard cat
    resave: false,
    saveUninitialized: false
}));



var port = process.env.PORT || 3002; // In Windows 'set PORT=3000&&node index.js'; In Linux 'PORT=3000 node index.js'

var server = require('http').createServer(app);

server.listen(port, function() {
    console.log("\n" + Date().toString() + ":\n" + "\n" + Date().toString() + ":\n" + 'Server listening at port %d', port);
});

var dir = __dirname + '/';
var dirA = dir + 'pages_a/';
var dirB = dir + 'pages_b/';
var dirP = dir + 'pages/';

// 2592000000 ms
// 2592000 s
app.use(serveStatic(dir + 'assets/', {
    maxAge: 30 * 86400000,
    setHeaders: assetsCacheControl
}));

function assetsCacheControl(res, path) {
    console.log(path);
    if (serveStatic.mime.lookup(path) === 'text/html' || path === 'style.min.css') {
        // Custom Cache-Control for HTML files
        res.setHeader('Cache-Control', 'public, max-age=0')
    }
}

function escapeHtml(text, rNndR) {
    var rNndR = rNndR || false;
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    text.replace(/[&<>"']/g, function(m) { return map[m]; });
    if (rNndR) {
        text = text.replace(/(?:\r?\n|\r)/gm, '\n');
    }

    return text
}



function isLI(req) {
    var loggedin = false;
    if (req && req.session) {
        if (typeof req.session.loggedin !== 'undefined' && typeof req.session.loggedin !== 'null') {
            loggedin = true;
        }
    }
    return loggedin;
}

function isA(req) {
    var isadmin = false;
    if (typeof req.session.isadmin !== 'undefined' && typeof req.session.isadmin !== 'null' && req.session.isadmin === true) {
        isadmin = true;
    }
    return isadmin;
}



function HTMLcmbnr(shtml, req) {
    var LIA_HTML = '',
        rMATSCH = (/\{NAVBAR_MENU_lo\{((?:.|\s)*)\}\/NAVBAR_MENU_lo\}/gm),
        user_name_HTML = '';
    if (isLI(req)) {
        var IA_HTML = '';
        if (isA(req)) {
            IA_HTML = '(admin)';
        }
        LIA_HTML = '<p>Logged in as <b>{USER_NAME}</b> :) ' + IA_HTML + '</p>';
        rMATSCH = (/\{NAVBAR_MENU_li\{((?:.|\s)*)\}\/NAVBAR_MENU_li\}/gm);
        // MATSCH = HTML_NAVBAr().match(/\{NAVBAR_MENU_li\{((?:.|\s)*)\}\/NAVBAR_MENU_li\}/gm);
        user_name_HTML = req.session.user_name;
    }
    var NBM_HTML = rMATSCH.exec(HTML_NAVBAr())[1];

    return HTML_HEADEr()
        .replace(/\{\{\{CNTNTS\}\}\}/gm, HTML_NAVBAr()
            .replace(/\{NAVBAR_MENU{((?:.|\s)*)\/NAVBAR_MENU\}/gm, NBM_HTML) + shtml + HTML_FOOTEr())
        .replace(/\{NAVBARLEFT_LINK\}/gm, shtml.match(/\{NAVBARLEFT_LINK\{((?:.|\n)*)\}\/NAVBARLEFT_LINK\}/)[1])
        .replace(/\{NAVBARLEFT_ICON\}/gm, shtml.match(/\{NAVBARLEFT_ICON\{((?:.|\n)*)\}\/NAVBARLEFT_ICON\}/)[1])
        .replace(/\{NAVBAR_LINKS\}/gm, shtml.match(/\{NAVBAR_LINKS\{((?:.|\n)*)\}\/NAVBAR_LINKS\}/)[1].replace(/(<li class="menu-item">|<\/li>)/gm, ''))
        .replace(/\{NAVBAR_LINKS_LI\}/gm, shtml.match(/\{NAVBAR_LINKS\{((?:.|\n)*)\}\/NAVBAR_LINKS\}/)[1].replace(/(?:\ |(\"))btn(?:\-link)?/gm, '$1'))
        .replace(/\{NAVBAR\{((?:.|\n)*)\}\/NAVBAR\}/gm, '')
        .replace(/\{LOGGEDINAS\}/gm, LIA_HTML)
        .replace(/\{USER_NAME\}/gm, user_name_HTML);
}




function LP(res) {
    console.log("\n" + Date().toString() + ":\n" + "LOGINPAGE");
    var sHTML = HTML_login();

    res.send(HTML_HEADEr()
        .replace(/\{\{\{CNTNTS\}\}\}/gm, sHTML + HTML_FOOTEr()));
}

function rBP(req, res) {
    var psss = [];
    psss[0] = undefined;
    if (typeof req.params[0] !== 'undefined') {
        psss = req.params[0].split('/');
    }
    console.log("\n" + Date().toString() + ":\n" + "rBP");
    var b = '/b/';
    if (typeof psss[0] !== 'undefined' && typeof psss[0] !== 'null') {
        b += '' + psss[0];
        if (typeof psss[1] !== 'undefined' && typeof psss[1] !== 'null') {
            b += '/' + psss[1];
        }
    }
    res.redirect(b);
}

function MBS(req, res) {
    var psss = [];
    psss[0] = undefined;
    if (typeof req.params[0] !== 'undefined') {
        psss = req.params[0].split('/');
    }
    console.log("\n" + Date().toString() + ":\n" + "MBS");
    var user_name = req.session.user_name;

    var jsonF_L = jsonF_Ls;

    var blogrslistalready_HTML = '<dl>';
    for (var Ux in jsonF_L) {
        var Uy = jsonF_L[Ux];
        blogrslistalready_HTML += '<dt><a href="/b/' + Ux + '">' + Ux + '</a></dt><dd><ul>';
        var html2 = '';
        if (typeof Uy["blogs"][0] !== 'undefined') {
            for (var Bx in Uy["blogs"]) {
                var By = Uy["blogs"][Bx];
                blogslist_HTML += '<li><a href="/b/' + blogr + '/' + Bx + '">' + Bx + '</a></li>';
            };
            blogrslistalready_HTML += html2;
        }
        blogrslistalready_HTML += '</ul></dd>';
    };
    blogrslistalready_HTML += '</dl>';

    var sHTML = HTML_blogrsmanager();
    res.send(HTMLcmbnr(sHTML
        .replace(/\{BLOGRS_LIST_ALREADY\}/gm, blogrslistalready_HTML), req));
}

function doLogout(req, res) {
    console.log("\n" + Date().toString() + ":\n" + "LOGOUT");
    req.session.destroy(function(err) {
        // cannot access session here
        console.log("\n" + Date().toString() + ":\n" + "Session-Destroy: " + err);
    });
    res.redirect('/');
}



app.get(/^(.*)$/, function(req, res, next) {
    console.log("\n" + Date().toString() + ":\n" + "GET *");
    var prms = [];
    prms[0] = undefined;
    if (typeof req.params[0] !== 'undefined') {
        prms = req.params[0].split('/');
    }
    prms.shift();

    if (req.query.logout) {
        console.log("\n" + Date().toString() + ":\n" + "Gf* logout");
        doLogout(req, res);
    }
    if (isLI(req)) {
        if (prms[0] === 'login') {
            res.redirect('/');
        } else if (isA(req)) {
            if (prms[0] === 'mbs') {
                MBS(req, res);
            } else {
                next();
            }
        } else {
            next();
        }
    } else if (prms[0] === 'login') {
        LP(res);
    } else {
        next();
    }
});

function defaultB(req, res) {
    console.log("\n" + Date().toString() + ":\n" + "/b");
    var sHTML = HTML_blogpanel();

    var A_topcntnt_HTML = '',
        B_topcntnt_HTML = '',
        A_bottomcntnt_HTML = '',
        B_bottomcntnt_HTML = '';

    if (isLI(req)) {
        if (isA(req)) {
            A_topcntnt_HTML = HTML_A_topcntnt_1();
            // A_bottomcntnt_HTML = HTML_A_bottomcntnt_1();
        }
        B_topcntnt_HTML = HTML_B_topcntnt_1();
        // B_bottomcntnt_HTML = HTML_B_bottomcntnt_1();
    }

    var jsonF_L = jsonF_Ls;

    var bloglist_HTML = '<ul>';
    for (var BRx in jsonF_L) {
        var BRy = jsonF_L[BRx]["blogs"];
        bloglist_HTML += '<li><a href="/b/' + BRx + '">' + BRx + '</a><ul>';
        for (var Bx in BRy) {
            var By = BRy[Bx];
            bloglist_HTML += '<li><a href="/b/' + BRx + '/' + Bx + '">' + Bx + '</a><ul>';
            for (var Ex in By["entries"]) {
                var Ey = By["entries"][Ex];
                bloglist_HTML += '<li><a href="/b/' + BRx + '/' + Bx + '/' + Ex + '">' + Ey["created"]["year"] + '-' + Ey["created"]["month"] + '-' + Ey["created"]["day"] + ' - ' + Ey["title"] + '</a>';
            }
            bloglist_HTML += '</ul></li>';
        }
        bloglist_HTML += '</ul></li>';
    }
    bloglist_HTML += '</ul>';

    res.send(HTMLcmbnr(sHTML
        .replace(/\{A_topcntnt\}/, A_topcntnt_HTML)
        .replace(/\{B_topcntnt\}/, B_topcntnt_HTML)
        .replace(/\{A_bottomcntnt\}/, A_bottomcntnt_HTML)
        .replace(/\{B_bottomcntnt\}/, B_bottomcntnt_HTML)
        .replace(/\{BLOG_LIST\}/gm, bloglist_HTML), req));
}

// Get all blogr's blogs and entries
app.get('/', defaultB);
app.get('/b', defaultB);

// Get blogr's complete list of blogs and entries
app.get('/b/:blogr', function(req, res) {
    var blogr = req.params.blogr;

    var jsonF_L = jsonF_Ls;

    if (jsonF_L.hasOwnProperty(blogr)) {
        var sHTML = HTML_blogrs_blogs();

        var A_topcntnt_HTML = '',
            B_topcntnt_HTML = '',
            A_bottomcntnt_HTML = '',
            B_bottomcntnt_HTML = '';

        if (isLI(req)) {
            var user_name = req.session.user_name;
            if (isA(req)) {
                // A_topcntnt_HTML = HTML_A_topcntnt_2();
                // A_bottomcntnt_HTML = HTML_A_bottomcntnt_2();
            }
            B_topcntnt_HTML = HTML_B_topcntnt_2();
            B_bottomcntnt_HTML = HTML_B_bottomcntnt_2();

            if (user_name === blogr) {

            }
        }

        var jsonF_L = jsonF_Ls;

        var blogslist_HTML = '<ul>';
        for (var Bx in jsonF_L[blogr]["blogs"]) {
            var By = jsonF_L[blogr]["blogs"][Bx];
            blogslist_HTML += '<li><a href="/b/' + blogr + '/' + Bx + '">' + Bx + '</a></li>';
        };
        blogslist_HTML += '</ul>';

        res.send(HTMLcmbnr(sHTML
            .replace(/\{A_topcntnt\}/, A_topcntnt_HTML)
            .replace(/\{B_topcntnt\}/, B_topcntnt_HTML)
            .replace(/\{A_bottomcntnt\}/, A_bottomcntnt_HTML)
            .replace(/\{B_bottomcntnt\}/, B_bottomcntnt_HTML)
            .replace(/\{BLOGS_LIST\}/gm, blogslist_HTML)
            .replace(/\{BLOGR_NAME\}/gm, blogr), req));
    } else {
        res.send('No blogr <i>' + blogr + '</i>');
    }
});

// Get blogr's blogs, complete list of entries
app.get('/b/:blogr/:blogid', function(req, res) {
    var blogr = req.params.blogr,
        blogid = req.params.blogid;

    var jsonF_L = jsonF_Ls;

    if (jsonF_L.hasOwnProperty(blogr)) {
        if (jsonF_L[blogr]["blogs"].hasOwnProperty(blogid)) {
            var sHTML = HTML_blogrs_blogs_entries();

            var A_topcntnt_HTML = '',
                B_topcntnt_HTML = '',
                A_bottomcntnt_HTML = '',
                B_bottomcntnt_HTML = '';

            if (isLI(req)) {
                var user_name = req.session.user_name;
                if (isA(req)) {
                    // A_topcntnt_HTML = HTML_A_topcntnt_3();
                    // A_bottomcntnt_HTML = HTML_A_bottomcntnt_3();
                }
                // B_topcntnt_HTML = HTML_B_topcntnt_3();
                // B_bottomcntnt_HTML = HTML_B_bottomcntnt_3();
            }

            var entrieslist_HTML = '<ul>';
            for (var Ex in jsonF_L[blogr]["blogs"][blogid]["entries"]) {
                var Ey = jsonF_L[blogr]["blogs"][blogid]["entries"][Ex];
                entrieslist_HTML += '<li><a href="/b/' + blogr + '/' + blogid + '/' + Ex + '">' + Ey.title + '</a></li>';
            }
            entrieslist_HTML += '</ul>';

            res.send(HTMLcmbnr(sHTML
                .replace(/\{A_topcntnt\}/, A_topcntnt_HTML)
                .replace(/\{B_topcntnt\}/, B_topcntnt_HTML)
                .replace(/\{A_bottomcntnt\}/, A_bottomcntnt_HTML)
                .replace(/\{B_bottomcntnt\}/, B_bottomcntnt_HTML)
                .replace(/\{ENTRYCREATOR\}/gm, HTML_entrycreator())
                .replace(/\{ENTRIES_LIST\}/gm, entrieslist_HTML)
                .replace(/\{BLOGR_NAME\}/gm, blogr)
                .replace(/\{BLOG_NAME\}/gm, blogid), req));
            // res.send({
            //     "blogr": blogr,
            //     "blogid": blogid,
            //     "entries": jsonF_L[blogr]["blogs"][blogid]["entries"]
            // });
        } else {
            res.send('Blogr <i>' + blogr + '</i> has no blog <i>' + blogid + '</i>');
        }
    } else {
        res.send('No blogr <i>' + blogr + '</i>');
    }
});

// Get blogr's blogs specific entry
app.get('/b/:blogr/:blogid/:entryid', function(req, res) {
    var blogr = req.params.blogr,
        blogid = req.params.blogid,
        entryid = req.params.entryid;

    var jsonF_L = jsonF_Ls;

    if (jsonF_L.hasOwnProperty(blogr)) {
        if (jsonF_L[blogr]["blogs"].hasOwnProperty(blogid)) {
            if (typeof jsonF_L[blogr]["blogs"][blogid]["entries"][entryid] !== 'undefined') {
                var entry = jsonF_L[blogr]["blogs"][blogid]["entries"][entryid];

                var title = entry["title"];
                var rpath = dir + 'DB/Blogs/' + blogr + '/' + blogid + '/' + entry["created"]["year"] + '-' + entry["created"]["month"] + '-' + entry["created"]["day"] + '-' + title;
                var cntnts = fs.readFileSync(rpath, 'utf8');

                var sHTML = HTML_blogrs_blogs_entry();
                res.send(HTMLcmbnr(sHTML
                    .replace(/\{CONTENT\}/gm, cntnts)
                    .replace(/\{BLOGR_NAME\}/gm, blogr)
                    .replace(/\{BLOG_NAME\}/gm, blogid)
                    .replace(/\{ENTRY_ID\}/gm, entryid)
                    .replace(/\{ENTRY_TITLE\}/gm, title), req));
                // res.send({
                //     "blogr": blogr,
                //     "blogid": blogid,
                //     "entryid": entryid
                // });
            } else {
                res.send('Blog <i>' + blogid + '</i> by Blogr <i>' + blogr + '</i> has no Entry <i>' + entryid + '</i>');
            }
        } else {
            res.send('Blogr <i>' + blogr + '</i> has no blog <i>' + blogid + '</i>');
        }
    } else {
        res.send('No blogr <i>' + blogr + '</i>');
    }
});

// Post new entry to blog
app.post('/mb/ecreate/:blogid', function(req, res) {
    if (isLI(req)) {
        // is logged in
        var body = '';

        req.on('data', function(data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });
        req.on('end', function() {
            var post = qs.parse(body);

            var jsonF_L = jsonF_Ls;

            var unameL = req.session.user_name,
                blogid = req.params.blogid;

            // Verify post
            var entry_title = post.entry_title || '',
                entry_cntnts = post.entry_cntnts || '';

            if (entry_title !== '' && entry_cntnts !== '') {
                var dt = new Date();
                var y = dt.getFullYear(),
                    m = dt.getMonth() + 1,
                    d = dt.getDate();

                var wpath = dir + 'DB/Blogs/' + unameL + '/' + blogid + '/' + y + '-' + m + '-' + d + '-' + entry_title;
                fs.writeFileSync(wpath, entry_cntnts, 'utf8');

                jsonF_L[unameL]["blogs"][blogid]["entries"].push({
                    "title": entry_title,
                    "created": {
                        "year": y,
                        "month": m,
                        "day": d
                    }
                });

                var wpath2 = dir + 'DB/Login.json';
                console.log("\n" + Date().toString() + ":\n" + JSON.stringify(jsonF_L));
                fs.writeFileSync(wpath2, JSON.stringify(jsonF_L), 'utf8');

                res.redirect('/b/' + unameL + '/' + blogid + '?posted');

                // res.send({
                //     "blogr": unameL,
                //     "blogid": blogid
                // });
            } else {
                res.send('invalid input!');
            }
        });
    } else {
        res.status(400);
    }
});

// Create new blog
app.post('/mb/create', function(req, res) {
    if (isLI(req)) {
        // is logged in
        var body = '';

        req.on('data', function(data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });
        req.on('end', function() {
            var post = qs.parse(body);

            var jsonF_L = jsonF_Ls;

            // Verify post
            var blog_name = post.blog_name || '';

            if (blog_name !== '') {
                // var unameL = req.session.user_name.toLowerCase();
                var unameL = req.session.user_name;
                if (!jsonF_L[unameL]["blogs"].hasOwnProperty(blog_name)) {
                    // var hash2 = crypto.createHash('sha256').update(unameL + blog_name).digest('base64').replace(/[^a-z0-9]+/gi, '_');

                    var dt = new Date();
                    var y = dt.getFullYear(),
                        m = dt.getMonth() + 1,
                        d = dt.getDate();

                    var wpath = dir + 'DB/Blogs/' + unameL + '/' + blog_name + '/';

                    fs.mkdir(wpath, function(err) {
                        if (err) console.log("\n" + Date().toString() + ":\n" + err);
                        console.log("\n" + Date().toString() + ":\n" + 'Created ' + wpath);

                        jsonF_L[unameL]["blogs"][blog_name] = {
                            "created": {
                                "year": y,
                                "month": m,
                                "day": d
                            },
                            "entries": []
                        };

                        var wpath2 = dir + 'DB/Login.json';
                        console.log("\n" + Date().toString() + ":\n" + JSON.stringify(jsonF_L));
                        fs.writeFileSync(wpath2, JSON.stringify(jsonF_L), 'utf8');

                        res.redirect('/b/' + unameL + '/' + blog_name + '?created');
                    });
                } else {
                    res.send('blog <i>' + blog_name + '</i> does already exist!');
                }
            } else {
                res.send('invalid input!');
            }
        });
    } else {
        res.status(400);
    }
});

// Add new blogr
app.post('/mbs', function(req, res) {
    if (isA(req)) {
        // is admin
        var body = '';

        req.on('data', function(data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });
        req.on('end', function() {
            var post = qs.parse(body);

            var jsonF_L = jsonF_Ls;

            // Verify post
            var user_name = post.user_name || '',
                user_pass = post.user_pass || '',
                isadmin = post.isadmin || false;
            if (isadmin === 'on' || isadmin === true) {
                isadmin = true;
            } else {
                isadmin = false;
            }

            if (user_pass !== '' && user_name !== '') {
                // var unameL = user_name.toLowerCase();
                var unameL = user_name;
                if (!jsonF_L.hasOwnProperty(unameL)) {
                    jsonF_L[unameL] = {
                        "pass": crypto.createHash('sha256').update(user_pass).digest('base64'),
                        "blogs": {},
                        "isadmin": isadmin
                    };

                    var wpath = dir + 'DB/Login.json';
                    console.log("\n" + Date().toString() + ":\n" + JSON.stringify(jsonF_L));
                    fs.writeFile(wpath, JSON.stringify(jsonF_L), 'utf8');
                    fs.mkdir(dir + 'DB/Blogs/' + unameL);

                    res.redirect('/mbs?success');
                } else {
                    res.send('blogr <i>' + user_name + '</i> does already exist!');
                }
            } else {
                res.send('invalid input!');
            }
        });
    } else {
        res.status(400);
    }
});



// Login
app.post('/login', function(req, res) {
    console.log("\n" + Date().toString() + ":\n" + "POST-Login /");
    if (isLI(req)) {
        rBP(req, res);
    } else {
        // Not logged in
        var body = '';

        req.on('data', function(data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });
        req.on('end', function() {
            var post = qs.parse(body);

            // Verify Login
            var user_name = post.user_name || '',
                user_pass = post.user_pass || '',
                tryadmin = post.tryadmin || false;
            if (tryadmin === 'on' || tryadmin === true) {
                tryadmin = true;
            } else {
                tryadmin = false;
            }
            if (user_name !== '' && user_pass !== '') {
                // var unameL = user_name.toLowerCase();
                var unameL = user_name;
                var hash2 = crypto.createHash('sha256').update(user_pass).digest('base64');

                var jsonF_L = jsonF_Ls;

                if (jsonF_L.hasOwnProperty(unameL) && jsonF_L[unameL].pass === hash2 && (jsonF_L[unameL].isadmin === tryadmin || (jsonF_L[unameL].isadmin === true && tryadmin === false))) {
                    req.session.loggedin = true,
                        req.session.isadmin = tryadmin,
                        req.session.user_name = user_name;

                    rBP(req, res);
                } else {
                    res.send(HTML_HEADEr()
                        .replace(/\{\{\{CNTNTS\}\}\}/gm, '<div class="container grid-960">Invalid Credentials: <pre>{' +
                            '\n&nbsp&nbsp&nbsp&nbspuser_name: ' + post.user_name +
                            '\n&nbsp&nbsp&nbsp&nbsptryadmin: ' + tryadmin +
                            '\n}</pre><br><a class="btn btn-primary" href="">Back</a><div>'));
                }
            } else {
                res.send(HTML_HEADEr()
                    .replace(/\{\{\{CNTNTS\}\}\}/gm, '<div class="container grid-960">Invalid Credentials: <pre>{' +
                        '\n&nbsp&nbsp&nbsp&nbspuser_name: ' + post.user_name +
                        '\n&nbsp&nbsp&nbsp&nbsptryadmin: ' + tryadmin +
                        '\n}</pre><br><a class="btn btn-primary" href="">Back</a><div>'));
            }
        });
    }
});



var HTMLSSs = {
    "HEADEr": dir + 'Cntnts/Header',
    "FOOTEr": dir + 'Cntnts/Footer',
    "NAVBAr": dir + 'Cntnts/Navbar',
    "login": dirP + 'login',
    "A_topcntnt_1": dirA + 'A_topcntnt_1',
    "blogrsmanager": dirA + 'blogrsmanager',
    "B_topcntnt_1": dirB + 'B_topcntnt_1',
    "B_topcntnt_2": dirB + 'B_topcntnt_2',
    "B_topcntnt_3": dirB + 'B_topcntnt_3',
    "B_bottomcntnt_2": dirB + 'B_bottomcntnt_2',
    "entrycreator": dirB + 'entrycreator',
    "blogpanel": dirP + 'blogpanel',
    "blogrs_blogs": dirP + 'blogrs_blogs',
    "blogrs_blogs_entries": dirP + 'blogrs_blogs_entries',
    "blogrs_blogs_entry": dirP + 'blogrs_blogs_entry'
};
var HTML_HEADEr,
    HTML_FOOTEr,
    HTML_NAVBAr,
    HTML_login,
    HTML_A_topcntnt_1,
    HTML_blogrsmanager,
    HTML_B_topcntnt_1,
    HTML_B_topcntnt_2,
    HTML_B_topcntnt_3,
    HTML_B_bottomcntnt_2,
    HTML_entrycreator,
    HTML_blogpanel,
    HTML_blogrs_blogs,
    HTML_blogrs_blogs_entries,
    HTML_blogrs_blogs_entry;

function HTMLgen(htmlSxP, htmlSyP) {
    eval('HTML_' + htmlSxP + ' = function() { return fs.readFileSync(htmlSyP + ".min.html").toString(); }');
}

for (var htmlSx in HTMLSSs) {
    var htmlSy = HTMLSSs[htmlSx];
    HTMLgen(htmlSx, htmlSy);
};

var jsonF_Ls = JSON.parse(fs.readFileSync(dir + 'DB/Login.json', 'utf8'));

fs.watchFile(dir + 'DB/Login.json', function(curr, prev) {
    jsonF_Ls = JSON.parse(fs.readFileSync(dir + 'DB/Login.json', 'utf8'));
});

setInterval(function() {
    for (var htmlSx in HTMLSSs) {
        var htmlSy = HTMLSSs[htmlSx];
        HTMLgen(htmlSx, htmlSy);
    }

    // fs.readFile(dir + 'DB/Login.json', 'utf8', function(err, data) {
    //     if (err) console.log("\n" + Date().toString() + ":\n" + err);
    //     jsonF_Ls = JSON.parse(data);
    // });
});