const puppeteer = require("puppeteer");
const workflow = require("./workflow");

const actionTextMapping = {
  actionOption11: "Ready for Review",
  actionOption21: "Approve Content",
  actionOption31: "Approve and Deploy to Staging",
  actionOption51: "Accept Staging Deployment",
  actionOption71: "Approve and Deploy to Production",
  actionOption91: "Accept Production Deployment",
};

const actionNeedsWait = ["actionOption31", "actionOption71"];

/**
 * ***********************
 * START PUPPETEER SCRIPT
 * ***********************
 */
const start = async (args) => {
  // get and validate command arguments
  // validate(args);

  // get project name
  const project = args.project;

  // launch browser
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    devtools: false,
    defaultViewport: null,
    headless: args.headless,
  });
  try {
    // open a new page
    const page = await browser.newPage();

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
    const entries = Object.entries(actionTextMapping);
    for (const [index, [key, value]] of Object.entries(entries)) {
      const elem = await page.$("#" + key);
      if (!elem) {
        console.log(`"${value}" may have already completed. Check next step.`);
        continue;
      }

      await workflow.setDropDownByText(page, key, value);
      await workflow.confirmWorkflowAction(page);

      if (actionNeedsWait.indexOf(key) > -1) {
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
    process.exit();
  } finally {
    // close browser
    await browser.close();
  }
};

module.exports = { start };
