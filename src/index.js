'use strict';

const BbPromise = require('bluebird');
const child_process = require('child_process');
const nopy = require('nopy');
const path = require('path');

class PureSecCLI {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      puresec: {
        usage: "PureSec CLI tools for improving the security of your serverless applications",
        lifecycleEvents: [
          'puresec',
        ],

        commands: {
          'gen-roles': {
            usage: "Generate roles for your Serverless project",
            lifecycleEvents: [
              'puresec-gen-roles',
            ],
            options: {
              function: {
                usage: "Only generate roles for a specific function.",
                shortcut: 'f'
              },

              overwrite: { usage: "Overwrite puresec-roles.yml if already exists." },
              'no-overwrite': { usage: "Don't overwrite puresec-roles.yml if already exists." },

              reference: { usage: "Reference functions to newly created roles." },
              'no-reference': { usage: "Don't reference functions to newly created roles." },

              'remove-obsolete': { usage: "Remove obsolete roles that are no longer needed." },
              'no-remove-obsolete': { usage: "Don't remove obsolete roles that are no longer needed." },

              yes: {
                usage: "Yes for all - overwrite files, remove old roles, etc.",
                shortcut: 'y'
              },
            },
          }
        }
      },
    };

    this.hooks = {
      'puresec:puresec': this.runPureSec.bind(this),
      'puresec:gen-roles:puresec-gen-roles': this.runGenerateRoles.bind(this),
    };
  }

  runPureSec() {
    this.serverless.cli.consoleLog('* PureSec github: https://github.com/puresec/serverless-puresec-cli');
    this.serverless.cli.consoleLog('* Pass "--help" after any <command> for contextual help');
    this.serverless.cli.consoleLog('* Run "puresec gen-roles" to generate roles for your Serverless project');
    return BbPromise.resolve();
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
      return this.serverless.pluginManager.spawn('package').then(() => {
        return new BbPromise((resolve, reject) => {
          let args = [
            '-m', 'puresec_cli', 'gen-roles',
            this.serverless.config.servicePath || '.',
            '--framework', 'serverless',
            '--framework-output', path.join(this.serverless.config.servicePath || '.', '.serverless'),
          ];
          if (this.options.function) args.push('--function', this.options.function);
          if (this.options.overwrite) args.push('--overwrite');
          if (this.options['no-overwrite']) args.push('--no-overwrite');
          if (this.options.reference) args.push('--reference');
          if (this.options['no-reference']) args.push('--no-reference');
          if (this.options['remove-obsolete']) args.push('--remove-obsolete');
          if (this.options['no-remove-obsolete']) args.push('--no-remove-obsolete');
          if (this.options.yes) args.push('--yes');

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
    });
  }
}

module.exports = PureSecCLI;
