async function handler(req, res, next) {
    // TODO:
    // Log only non-automatical requests
    // In other words, ignore requests like favicon.ico
    if (!req.accepts('html') && !req.accepts('*')) {
        next();
        return;
    }
    req.session.prev = req.originalUrl;
    req.session.save();
    next();
}

module.exports = (router) => {
    router.use(handler);
}