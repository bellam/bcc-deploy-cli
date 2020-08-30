const yargs = require("yargs")(process.argv.slice(2));
const script = require("./index");
const env = (yargs.argv.env || "test").toUpperCase();

export function cli(args) {
  const options = yargs
    .usage("Usage: --prj <project_name> --env <environment_name>")
    .options({
      prj: {
        alias: "project",
        describe: "Project name",
        type: "string",
        demandOption: true,
      },
      url: {
        describe:
          "BCC URL endpoint. eg: http://x.x.x.x:xxxx. \n Optionally, set environment variable BCC_URL_<env>",
        type: "string",
        default: process.env[`BCC_URL_${env}`],
        demandOption: true,
      },
      env: {
        describe: "Environment. eg: uat, prod",
        type: "string",
      },
      u: {
        describe:
          "BCC username. \nOptionally, set environment variable BCC_USERNAME_<env> (Recommended).",
        alias: "user",
        type: "string",
        default: process.env[`BCC_USERNAME_${env}`],
        demandOption: true,
      },
      p: {
        describe:
          "BCC Password. \nOptionally, set environment variable BCC_PASSWORD_<env> (Recommended).",
        alias: "pass",
        type: "string",
        default: process.env[`BCC_PASSWORD_${env}`],
        demandOption: true,
      },
      headless: {
        describe: "Open browser process in background and hide browser window.",
        type: "boolean",
        default: true,
      },
      xform: {
        describe: "Optional transform function called on -prj argument",
        type: "boolean",
      },
    }).argv;

  const argv = {
    url: options.url,
    user: options.u,
    password: options.p,
    project: options.prj,
    headless: options.headless,
    xform: options.xform,
  };

  script.start(argv);
}
