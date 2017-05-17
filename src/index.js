'use strict';

const BbPromise = require('bluebird');
const spawn = require('child_process').spawn;

class PureSecGenerateRoles {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      'puresec-gen-roles': {
        usage: 'Generates roles for your Serverless project',
        lifecycleEvents: [
          'puresec-gen-roles',
        ]
      },
    };

    this.hooks = {
      'puresec-gen-roles:puresec-gen-roles': this.runGenerateRoles.bind(this),
    };
  }

  runGenerateRoles() {
    // execute the 'puresec-gen-roles' executable
    return new BbPromise(resolve => {
      const genroles = spawn('npm', ['explore', 'puresec-generate-roles', '--', 'npm', 'run', 'gen-roles', '--',
        this.serverless.config.servicePath, '--framework', 'serverless',
      ], { env: process.env });
      genroles.stdout.on('data', (buf) => this.serverless.cli.consoleLog(buf.toString()));
      genroles.stderr.on('data', (buf) => this.serverless.cli.consoleLog(buf.toString()));
      genroles.on('close', () => resolve());
    });
  }
}

module.exports = PureSecGenerateRoles;
