# serverless-puresec-cli

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-puresec-cli.svg)](https://badge.fury.io/js/serverless-puresec-cli)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

Serverless plugin for [PureSec CLI](https://github.com/puresec/puresec-cli).

## Installation

First, add serverless-puresec-cli to your project:

```bash
npm install --save-dev serverless-puresec-cli
```

Then inside your project's `serverless.yml` file add following entry to the plugins section: `serverless-puresec-cli`. If there is no plugin section you will need to add it to the file.

It should look something like this:
```yaml
plugins:
  - serverless-puresec-cli
```

You can check wether you have successfully installed the plugin by running the serverless command line:

```bash
serverless
```

the console should display *puresec* as one of the plugins now available in your Serverless project.


## Usage

In your project root run:

```bash
serverless puresec
serverless puresec gen-roles
```
