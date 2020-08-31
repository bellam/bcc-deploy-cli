# bcc-deploy-cli

Command line interface to deploy Oracle ATG BCC projects with NodeJS and Puppeteer.

[![npm version](https://img.shields.io/npm/v/@bellam/bcc-deploy-cli.svg?style=flat)](https://www.npmjs.com/package/@bellam/bcc-deploy-cli)
[![Build Status](https://travis-ci.org/bellam/bcc-deploy-cli.svg?branch=master)](https://travis-ci.org/bellam/bcc-deploy-cli)

- Tested on Oracle Commerce 11.2.

## Installation

`npm install -g @bellam/bcc-deploy-cli`

This command installs puppeteer's local chromium browser as part of the package.

## Command line interface

To deploy a project, run _bcc-deploy_ command with required arguments.

`$ bcc-deploy --prj "project name" --url "http://127.0.0.1:8081"`

You can pass username and password as arguments but it is recommended to set ATG BCC login credentials in environment variables.

Set ATG BCC username in environment variable `BCC_USERNAME_<env>` and ATG BCC password in environment variable `BCC_PASSWORD_<env>`.
Example: if your --env argument is "prod", set `BCC_USERNAME_PROD` and `BCC_PASSWORD_PROD`. If you are not using --env, set `BCC_USERNAME` and `BCC_PASSWORD`.

### Deploying without --url argument

Optionally, you can also set the BCC URL (without trailing slash) in environment variable `BCC_URL_<env>`.

In this case, you can deploy a project with:

`$ bcc-deploy --prj "project name" --env prod`

## Arguments

```
Usage: --prj <project_name> --env <environment_name>

Options:
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
  --prj, --project  Project name                             [string] [required]
  --url             BCC URL endpoint. eg: http://x.x.x.x:xxxx.
                    Optionally, set environment variable BCC_URL_<env>
                                                             [string] [required]
  --env             Environment. eg: uat, prod                          [string]
  -u, --user        BCC username.
                    Optionally, set environment variable BCC_USERNAME_<env>
                    (Recommended).                           [string] [required]
  -p, --pass        BCC Password.
                    Optionally, set environment variable BCC_PASSWORD_<env>
                    (Recommended).                           [string] [required]
  --headless        Open browser process in background and hide browser window.
                                                       [boolean] [default: true]
  --xform           Optional transform function called on -prj argument[boolean]
```

![bcc-deploy](https://user-images.githubusercontent.com/1712809/91556676-bca7f200-e950-11ea-89ab-5c6062cdca46.png)

## Versions

1.1.1 - added logout function post-deployment

1.1.0 - pass environment as argument to pickup environment-specific URL, Username, Password

1.0.3 - xform argument to transform project name

1.0.1 - npm registry docs update

1.0.0 - Initial Commit
