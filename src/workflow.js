/**
 * ************************************************
 * Log in to BCC and navigate to BCC Home page
 *
 * @param {*} page - browser page
 * @param {*} user - BCC user name
 * @param {*} password - BCC password
 * ************************************************
 */
const login = async (page, user, password) => {
  console.log("Logging in to BCC");
  // enter credentials and click login button
  await page.evaluate(
    (user, password) => {
      document.querySelector("#loginName").value = user;
      document.querySelector("#loginPassword").value = password;
      document.querySelector(".buttonSmall.go").click();
    },
    user,
    password
  );
  await page.waitForNavigation({ timeout: 0, waitUntil: "networkidle0" });
  console.log("Successfully logged in.");
};

/**
 * Log out of BCC
 * @param {*} page - the browser page
 */
const logout = async (page) => {
  console.log("Project deploy. Logging out of BCC.");
  await page.evaluate(() => {
    document.querySelector(".logout").click();
  });
  await page.waitForNavigation({ timeout: 0, waitUntil: "networkidle0" });
  await page.evaluate(() => {
    document.querySelector(".buttonSmall").click();
  });
  console.log("Successfully logged out.");
};

/**
 * ************************************************
 * Search for a project by name
 *
 * @param {*} page - browser page
 * @param {*} project - project name
 * ************************************************
 */
const search = async (page, url, project) => {
  // perform search
  await page.goto(url);
  await page.evaluate((project) => {
    document.querySelector(
      'input[name="/atg/epub/servlet/ProcessSearchFormHandler.textInput"]'
    ).value = project;
    document.querySelector(".goButton").click();
  }, project);
  await page.waitForNavigation({ timeout: 0, waitUntil: "networkidle0" });

  // check if searched project exists
  const res0 = await page.evaluate(() => {
    const res = document.querySelector(".tableInfo");
    return res ? res.textContent : "";
  });

  // return first result in case of multiple projects with the same name
  if (res0 == project) return true;

  return false;
};

/**
 * ************************************************
 * Open first project in search results
 *
 * @param {*} page - browser page
 * ************************************************
 */
const openProject = async (page) => {
  await page.evaluate(() => document.querySelector(".tableInfo > a").click());
  await page.waitForNavigation({ timeout: 0, waitUntil: "networkidle0" });
};

/**
 * ************************************************
 * Select a dropdown value based on <option> tag's text content (not it's value)
 *
 * @param {*} page - browser
 * @param {*} id - id of the <select> element to be set
 * @param {*} text - text content of the <option>
 * ************************************************
 */
const setDropDownByText = async (page, id, text) => {
  console.log("| - " + text);
  await page.evaluate(
    (id, text) => {
      const elem = document.querySelector("#" + id);
      [...elem.options]
        .filter((o) => o.text == text)
        .forEach((o) => (o.selected = true));

      window.setIframe(id);
    },
    id,
    text
  );
};

/**
 * ************************************************
 * Confirm workflow action from OK/Cancel dialog box iFrame created by BCC
 *
 * @param {*} page - browser page
 * ************************************************
 */
const confirmWorkflowAction = async (page) => {
  const iframeElem = await page.$("div#approveAction > iframe");
  const frame = await iframeElem.contentFrame();

  await frame.waitForSelector("#okActionButton");
  await frame.evaluate(() => document.querySelector("#okActionButton").click());
  await page.waitForNavigation({ timeout: 0, waitUntil: "networkidle0" });
};

/**
 * ************************************************
 * Refresh page till next step in workflow is enabled.
 *
 * @param {*} page - the browser page
 * @param {*} id - the ID of the element to be checked for visibility
 * ************************************************
 */
function refreshPageTillNextStep(page, id, retry) {
  return new Promise(async function (resolve, reject) {
    // reject if no retry
    if (retry <= 0) reject();

    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    const nextOption = await page.$("#" + id);
    if (!nextOption) {
      setTimeout(function () {
        resolve(refreshPageTillNextStep(page, id, retry - 1));
      }, 10000);
    } else resolve(true);
  });
}

module.exports = {
  login,
  logout,
  search,
  openProject,
  setDropDownByText,
  confirmWorkflowAction,
  refreshPageTillNextStep,
};
