# serverless-puresec-cli

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-puresec-cli.svg)](https://badge.fury.io/js/serverless-puresec-cli)

[Website](https://www.puresec.io/) • [Newsletter](http://eepurl.com/cPu0_b) • [Slack](http://slack-signup.puresec.io) • [Twitter](https://twitter.com/PureSecTeam/)

Serverless plugin for [PureSec CLI](https://github.com/puresec/puresec-cli).

## Features

* Saves you time - automatically creates IAM roles for you
* Reduces the attack surface of your AWS Lambda based application
* Helps creating least privileged roles with the minimum required permissions
* Currently supported runtimes: Node.js (more runtimes coming soon...)
* Currently supported services: DynamoDB, Kinesis, KMS, S3, SES, SNS & Step Functions
* Works with the [Serverless Framework](https://github.com/serverless/serverless)

## Quick Start

**1. Install via npm:**

```bash
npm install --save-dev serverless-puresec-cli
```

**2. Add serverless-puresec-cli to your serverless.yml:**

In your project's `serverless.yml` file add the following entry to the plugins section: `serverless-puresec-cli`. 
If there is no plugin section you will need to add it to the file.

It should look similar to this:
```yaml
plugins:
  - serverless-puresec-cli
```

**3. Validate:**

You can check wether you have successfully installed the plugin by running the serverless command line.

```bash
serverless
```

the console should display **puresec** as one of the plugins now available in your Serverless project.

**4. Start using serverless-puresec-cli:**

Generate roles for your entire project.

```bash
serverless puresec gen-roles
```

The tool will ask you a few questions and then do its best to generate least privileged IAM roles.

**5. You can try the tool by executing it on a single function**:

```bash
serverless puresec gen-roles --function myFunction
```

## Links

* [Website](https://www.puresec.io/) (Our main product is still in closed beta)
* [Newsletter](http://eepurl.com/cPu0_b)
* [Slack](http://slack-signup.puresec.io)
* [Twitter](https://twitter.com/PureSecTeam/)
