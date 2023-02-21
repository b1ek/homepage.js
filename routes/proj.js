const Helpers = require('../helpers');

async function handler(req, res) {
    res.send(
        await Helpers.ViewLoader.load(
            'project.pug',
            {
                current_route: '/project'
            }
        )
    );
    return;
}

async function viewer(req, res) {
    const id = req.params.id;
    const view = 'projects/' + id + '.pug';
    if (!(await Helpers.ViewLoader.exists(view))) {
        res.status(404).send(
            await Helpers.ViewLoader.load(
                'error.pug',
                {
                    current_route: req.originalUrl,
                    error: '404 Not Found',
                    message: 'Requested project does not exists. Are you sure this is the valid link?'
                }
            )
        );
        return;
    }
    res.send(
        await Helpers.ViewLoader.load(
            view,
            {
                current_route: req.originalUrl
            }
        )
    )
}

module.exports = (router) => {
    router.get('/project', handler);
    router.get('/project/:id', viewer);
}