# serverless-puresec-generate-roles

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-dumpconfig.svg)](https://badge.fury.io/js/serverless-dumpconfig)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

Serverless plugin for running [Puresec Generate Roles](https://github.com/puresec/puresec-generate-roles).

## Installation

First, add serverless-dumpconfig to your project:

```bash
npm install --save-dev serverless-puresec-generate-roles
```

Then inside your project's `serverless.yml` file add following entry to the plugins section: `serverless-puresec-generate-roles`. If there is no plugin section you will need to add it to the file.

It should look something like this:
```yaml
plugins:
  - serverless-puresec-generate-roles
```

You can check wether you have successfully installed the plugin by running the serverless command line:

`serverless`

the console should display *puresec-gen-roles* as one of the plugins now available in your Serverless project.


## Usage

In your project root run:

```bash
serverless puresec-gen-roles
```
