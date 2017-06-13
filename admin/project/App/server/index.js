import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import morgan from 'morgan';
import path from 'path';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import connectMongo from 'connect-mongo';
import session from 'express-session';

import { post, urls } from 'helpers/api';
import config from '../../config';
import routers from './routers';
import schema from './schema';

const app = express();

app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: 100000000 }));

// session
const MongoStore = connectMongo(session);
app.use(session({
    secret: '88164657xhrtxhrt_task', // session的密码
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        url: config.dbServer,
        collection: 'sessions_task',
    }),
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy({
    usernameField: 'phone',
}, async (phone, password, done) => {
    const user = { phone, password };
    console.log('[login]: LocalStrategy', user);
    const data = await post(urls.login, user) || { msg: '服务器错误' };
    if (!data.success) {
        return done({ message: data.msg });
    }

    return done(null, Object.assign({}, data.context));
}));
passport.serializeUser((user, done) => { // 保存 user 到 sessoon
    console.log('[login]: serializeUser', user, done);
    done(null, user);// 可以通过数据库方式操作
});
passport.deserializeUser((user, done) => { // 通过保存的 user 信息到 sessoon 获取 user
    console.log('[login]: deserializeUser', user, done);
    done(null, user);// 可以通过数据库方式操作
});

// Static files
app.use(express.static(path.resolve('public')));
app.use(['favicon.ico', '/images*', '/media*', '/css*', '/fonts*', '/assets*'], (req, res) => {
    res.status(404).end();
});

// GraphqQL server
app.use('/graphql', graphqlHTTP(req => ({
    schema: schema.getSchema(),
    rootValue: {
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        req: req,
    },
    graphiql: true,
})));

app.use(async (req, res, next) => {
    res.locals.header = [
        {
            tag: 'title',
            content: '经开区任务根据提醒管理平台',
        },
        {
            tag: 'link',
            props: {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/css/antd.min.css',
            },
        },
    ];

    if (process.env.NODE_ENV !== 'production') {
        res.baseScriptsURL = `http://localhost:${config.devPort}`;
        res.locals.header.push({
            tag: 'script',
            props: {
                src: `${res.baseScriptsURL}/webpack-dev-server.js`,
            },
        });
    } else {
        res.baseScriptsURL = '';
    }

    // footer
    res.locals.footer = [{
        tag: 'script',
        props: {
            src: `${res.baseScriptsURL}/assets/common.js`,
        },
    }];

    next();
});

app.use(routers.authRouter);
app.use(routers.adminRouter);
app.use(routers.publicRouter);

app.use((req, res) => {
    res.status(404).end();
});

app.use((error, req, res) => {
    const statusCode = error.statusCode || 500;
    const err = {
        error: statusCode,
        message: error.message,
    };
    if (!res.headersSent) {
        res.status(statusCode).send(err);
    }
});

export default app;
