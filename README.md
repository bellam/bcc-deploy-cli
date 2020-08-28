# bcc-deploy-cli

Command line interface to deploy Oracle ATG BCC projects with NodeJS and Puppeteer.

- Tested on Oracle Commerce 11.2.

## Installation

`npm install @bellam/bcc-deploy-cli`

This command installs puppeteer's chromium browser as part of the package.

## Command line interface

Set ATG BCC login credentials in environment variables. Set ATG BCC username in environment variable `BCC_USERNAME` and ATG BCC password in environment variable `BCC_PASSWORD`

To deploy a project, run _bcc-deploy_ command with required arguments.

`$ bcc-deploy --prj "project name" --url "http://127.0.0.1:8081"`

## Arguments

```
Usage: -project <project_name> -url <bcc_url>

Options:
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
  --prj, --project  Project name                             [string] [required]
  --url             BCC URL endpoint. eg: http://x.x.x.x:xxxx.
                    Optionally, set environment variable BCC_URL
                                                             [string] [required]
  -u, --user        BCC username.
                    Optionally, set environment variable BCC_USERNAME
                    (Recommended).                          [string] [required]
  -p, --pass        BCC Password.
                    Optionally, set environment variable BCC_PASSWORD
                    (Recommended).                          [string] [required]
  --headless        Open browser process in background and hide browser window.
                                                       [boolean] [default: true
```

![bcc-deploy](https://user-images.githubusercontent.com/1712809/91556676-bca7f200-e950-11ea-89ab-5c6062cdca46.png)
