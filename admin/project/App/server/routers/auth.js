import getDefaultFavicon from 'helpers/default-favicon';
import getMarkup from 'helpers/get-markup';
import routeHandler from 'helpers/route-handler';
import routes from 'routers/auth';
import { Router } from 'express';

const authRouter = new Router();

function injectScript (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        res.locals.header.push({
            tag: 'link',
            props: {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/assets/auth.css',
            },
        });
        res.locals.header.push({
            tag: 'link',
            props: {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/assets/common.js.css',
            },
        });
    }
    res.locals.header.push(getDefaultFavicon(res));
    res.locals.footer.push({
        tag: 'script',
        props: {
            src: `${res.baseScriptsURL}/assets/auth.js`,
        },
    });
    next();
}

authRouter.get('/admin/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin');
    } else {
        routeHandler(routes, req, res, next);
    }
});

authRouter.get('/admin/logout', (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});

authRouter.get(/^\/admin\/(register|forgotPwd)$/, (req, res, next) => {
    routeHandler(routes, req, res, next);
});

// Register | ForgotPwd
authRouter.get(/^\/admin\/(register|forgotPwd)$/, injectScript, async (req, res, next) => {
    res.status(200).send(getMarkup(req, res));
});

// Login
authRouter.get('/admin/login', injectScript, (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin');
    } else {
        res.status(200).send(getMarkup(req, res));
    }
});

export default authRouter;
