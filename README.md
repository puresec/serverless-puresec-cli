# serverless-puresec-cli

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-puresec-cli.svg)](https://badge.fury.io/js/serverless-puresec-cli)

[Website](https://www.puresec.io/) • [Newsletter](http://eepurl.com/cPu0_b) • [Twitter](https://twitter.com/PureSecTeam/)

Serverless plugin for [PureSec CLI](https://github.com/puresec/puresec-cli).

## Features

* Saves you time - magically creates IAM roles for you
* Reduces the attack surface of your AWS Lambda based application
* Helps create least privileged roles with the minimum required permissions
* Currently supported runtimes: Node.js, Python (more runtimes coming soon...)
* Currently supported services: DynamoDB, Kinesis, KMS, Lambda, S3, SES, SNS & Step Functions
* Works with the [Serverless Framework](https://github.com/serverless/serverless)

## Requirements

* Python 3.4+
* NodeJS 6+

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

**4. Start using the tool:**

Generate the IAM role for your function.

```bash
serverless puresec gen-roles --function myFunction
```

After receiving the IAM role in the output of the tool:

1. Validate the role. Make sure you have all the required permissions and only them.
2. Copy-paste it to the Resources section in your serverless.yml file.
3. Connect the generated Role by adding the **role** property to your function in the serverless.yml.

**5. You can also execute the tool on the entire project:**

```bash
serverless puresec gen-roles
```


## Links

* [Website](https://www.puresec.io/)
* [Newsletter](http://eepurl.com/cPu0_b)
* [Twitter](https://twitter.com/PureSecTeam/)
