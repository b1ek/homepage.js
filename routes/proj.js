const handler = require('express-async-handler');
const Helpers = require('../helpers');

async function project(req, res) {
    res.template(
        'project.pug',
        {
            current_route: '/project'
        }
    );
    return;
}

async function viewer(req, res) {
    const id = req.params.id;
    const view = 'projects/' + id + '.pug';
    if (!(await Helpers.ViewLoader.exists(view))) {
        res.status(404).template(
            'error.pug',
            {
                current_route: req.originalUrl,
                error: '404 Not Found',
                message: 'Requested project does not exists. Are you sure this is the valid link?'
            }
        
        );
        return;
    }
    res.template(
        view,
        {
            current_route: req.originalUrl
        }        
    )
}

module.exports = (router) => {
    router.get('/project', handler(project));
    router.get('/project/:id', handler(viewer));
}