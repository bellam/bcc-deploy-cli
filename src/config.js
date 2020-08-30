/**
 * All workflow steps
 */
const actionTextMapping = {
  actionOption11: "Ready for Review",
  actionOption21: "Approve Content",
  actionOption31: "Approve and Deploy to Staging",
  actionOption51: "Accept Staging Deployment",
  actionOption71: "Approve and Deploy to Production",
  actionOption91: "Accept Production Deployment",
};

/**
 * Deployment Actions
 */
const actionNeedsWait = ["actionOption31", "actionOption71"];

/**
 * Project name transformer function based on date
 *
 * @param {*} ogProjectNametName - string to be transformed as project name
 */
let xformFn = (ogProjectName) => {
  const xfProjectName = ogProjectName.split("##").reduce((x, y) => {
    const regx = /(\w{3}) (\w{3}) (\d{2}) (\d{2}):(\d{2}):(\d{2}) (\w{3}) (\d{4})/g;
    const s = regx.exec(y);
    const month = (
      "0" +
      (new Date(s[8] + "-" + s[2] + "-" + s[3]).getMonth() + 1)
    ).slice(-2);

    const xy = s[8] + month + s[3] + "-" + s[4] + s[5] + s[6];
    return x + xy;
  });
  console.log("Project name : " + xfProjectName);
  return xfProjectName;
};

module.exports = { actionTextMapping, actionNeedsWait, xformFn };
