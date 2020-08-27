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

![bcc-deploy](https://user-images.githubusercontent.com/1712809/91489128-eec44000-e8cd-11ea-968a-cef9cc81677a.png)
