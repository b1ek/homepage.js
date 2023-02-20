const gulp = require('gulp');
const spawn = require('child_process').spawn;

/*function clean(cb) {
    cb();
}

function js(cb) {
    cb();
}

function css(cb) {
    cb();
}*/


gulp.task("serve_dev", (cb) => {
    console.log('Running in dev mode');
    console.log('Launching node...');
    let node = spawn('node', ['--inspect=0.0.0.0', 'index.js'], {stdio: 'inherit'})

    function files(cb) {
        console.log('Restarting node...');
        node.kill('SIGTERM');
        node = spawn('node', ['--inspect=0.0.0.0', 'index.js'], {stdio: 'inherit'})
        cb();
    }

    gulp.watch("**", { events: 'all' }, files);
    cb();
});

gulp.task("serve", (cb) => {
    console.log('Launching node...');
    spawn('node', ['index.js'], {stdio: 'inherit'})
    cb();
});

exports.default = function() {
    gulp.watch("**", files); 
}