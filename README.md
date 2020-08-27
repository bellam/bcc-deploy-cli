# bcc-deploy-cli

Command line interface to deploy Oracle ATG BCC projects with NodeJS and Puppeteer.

- Tested with Oracle Commerce 11.2.

## Installation

To install, run
`npm install`

To use cli, from project directory, run

`npm link`

## Command line interface

To deploy project, set ATG BCC username in environment variable `BCC_USERNAME` and ATG BCC password in environment variable `BCC_PASSWORD`

Run _bcc-deploy_ to deploy BCC project.

`$ bcc-deploy --prj "project name" --url "http://127.0.0.1:8081"`
