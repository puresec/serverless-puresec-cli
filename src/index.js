'use strict';

const BbPromise = require('bluebird');
const child_process = require('child_process');
const nopy = require('nopy');

class PureSecCli {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      puresec: {
        usage: 'Run PureSec CLI commands',
        commands: {
          'gen-roles': {
            usage: 'Generate roles for your Serverless project',
            lifecycleEvents: [
              'puresec-gen-roles',
            ],
            options: {
              function: {
                usage: 'Only generate roles for a specific function.',
                shortcut: 'f',
              }
            },
          }
        }
      },
    };

    this.hooks = {
      'puresec:gen-roles:puresec-gen-roles': this.runGenerateRoles.bind(this),
    };
  }

  packagePath() {
    return new BbPromise((resolve, reject) => {
      let pwd = child_process.spawn('npm', ['explore', 'serverless-puresec-cli', '--', 'pwd']);
      let packagePath = "";
      pwd.stdout.on('data', (data) => packagePath += data);
      pwd.stderr.on('data', (data) => this.serverless.cli.consoleLog(data.toString()));
      pwd.on('error', reject);
      pwd.on('close', (code) => code === 0 ? resolve(packagePath.trim()) : reject()); // removing newline
    });
  }

  runGenerateRoles() {
    // execute the 'puresec-gen-roles' executable
    return this.packagePath().then((packagePath) => {
      return new BbPromise((resolve, reject) => {
        let args = [
          '-m', 'puresec_cli', 'gen-roles',
          this.serverless.config.servicePath, '--framework', 'serverless', '--framework-path', require.main.filename
        ];
        if (this.options.function) {
          args.push('--function', this.options.function);
        }

        nopy.spawnPython(args, {
          package: new nopy.Package(packagePath),
          interop: "child",
          spawn: { stdio: [0, 1, 2] }
        }).then(puresec => {
          puresec.on('error', reject);
          puresec.on('close', (code) => (code === 0 || code === 1) ? resolve() : reject());
        });
      });
    });
  }
}

module.exports = PureSecCli;
