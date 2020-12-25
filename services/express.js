const express = require('express');
const webpack = require('webpack');
const inquirer = require('inquirer');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackDevConfig = require('../webpack.dev.js');
const webpackProdConfig = require('../webpack.dev.js');
const app = express();

inquirer
    .prompt([
        {
            name: 'type',
            type: 'list',
            message: 'Select webpack build configuration:',
            choices: ['DEVELOPMENT', 'PRODUCTION'],
        },
    ])
    .then(({ type }) => {
        let config;
        let compiler;

        switch (type) {
            case 'DEVELOPMENT':
                compiler = webpack(webpackDevConfig);
                config = webpackDevConfig;
                break;
            case 'PRODUCTION':
                compiler = webpack(webpackProdConfig);
                config = webpackProdConfig;
                break;
            default:
                compiler = webpack(webpackDevConfig);
                config = webpackDevConfig;
        }

        // Tell express to use the webpack-dev-middleware and use the webpack.dev.js
        // configuration file as a base.
        app.use(
            webpackDevMiddleware(compiler, {
                publicPath: config.output.publicPath,
                hot: true,
            })
        );

        // Serve the files on port 3000.
        app.listen(3000, function () {
            console.log('Server is listening on port 3000!\n');
        });
    })
    .catch((error) => {
        console.error('Something went wrong, contact Tomer...', error);
    });
