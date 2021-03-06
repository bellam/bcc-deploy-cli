const puppeteer = require("puppeteer");
const workflow = require("./workflow");
const config = require("./config");

/**
 * ***********************
 * START PUPPETEER SCRIPT
 * ***********************
 */
const start = async (args) => {
  // get and validate command arguments
  // validate(args);

  console.log("BCC URL: ", args.url);

  // get project name
  const xform = args.xform;
  const project = xform ? config.xformFn(args.project) : args.project;

  // launch browser
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    devtools: false,
    defaultViewport: null,
    headless: args.headless,
  });
  // open a new page
  const page = await browser.newPage();
  try {
    // navigate to BCC
    await page.goto(`${args.url}/atg/bcc`);

    // login
    await workflow.login(page, args.user, args.password);

    // perform search to find project
    const result = await workflow.search(
      page,
      `${args.url}/atg/bcc/process`,
      project
    );

    // error out if project doesn't exist
    if (!result) {
      throw `❌ The project "${project}" doesn't exist in the list of Active projects. It may have already been deployed.`;
    }
    console.log(`🚀 Starting deployment of project ${project}. \n|`);

    // if project found, navigate to project workflow page
    await workflow.openProject(page);

    // start deployment workflow
    const entries = Object.entries(config.actionTextMapping);
    for (const [index, [key, value]] of Object.entries(entries)) {
      const elem = await page.$("#" + key);
      if (!elem) {
        console.log(`"${value}" may have already completed. Check next step.`);
        continue;
      }

      await workflow.setDropDownByText(page, key, value);
      await workflow.confirmWorkflowAction(page);

      if (config.actionNeedsWait.indexOf(key) > -1) {
        // wait for deployment to get over and next element to show up
        let nextOp = entries[parseInt(index) + 1];
        if (nextOp) {
          console.log(
            "|\n| ** Deployment in progress. Waiting for next operation  - " +
              nextOp[1] +
              " ** \n|"
          );
          await workflow.refreshPageTillNextStep(page, nextOp[0], 1000);
        }
      }
    }

    console.log("🎉🎉Done!");
  } catch (e) {
    console.error(e);
  } finally {
    // logout
    await workflow.logout(page);
    // close browser
    await browser.close();
    // exit process
    process.exit();
  }
};

module.exports = { start };
