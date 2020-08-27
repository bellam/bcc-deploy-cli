const yargs = require("yargs")(process.argv.slice(2));
const script = require("./index");

export function cli(args) {
  const options = yargs
    .usage("Usage: -project <project_name> -url <bcc_url>")
    .options({
      prj: {
        alias: "project",
        describe: "Project name",
        type: "string",
        demandOption: true,
      },
      url: {
        describe:
          "BCC URL endpoint. eg: http://x.x.x.x:xxxx. \n Optionally, set environment variable BCC_URL",
        type: "string",
        demandOption: true,
      },
      u: {
        describe:
          "BCC username. \nOptionally, set environment variable BCC_USERNAME (Recommended).",
        alias: "user",
        type: "string",
        default: process.env.BCC_USERNAME,
        demandOption: true,
      },
      p: {
        describe:
          "BCC Password. \nOptionally, set environment variable BCC_PASSWORD (Recommended).",
        alias: "pass",
        type: "string",
        default: process.env.BCC_PASSWORD,
        demandOption: true,
      },
      headless: {
        describe: "Open browser process in background and hide browser window.",
        type: "boolean",
        default: true,
      },
    }).argv;

  const argv = {
    url: options.url,
    user: options.u,
    password: options.p,
    project: options.prj,
    headless: options.headless,
  };

  script.start(argv);
}
