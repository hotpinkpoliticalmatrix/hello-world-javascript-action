const core = require('@actions/core');

const formatForSingleDigitWeeks = (weekNum) => {
  return weekNum < 10 ? `0${weekNum}` : weekNum;
};

try {
  const currentBranch = core.getInput('current-branch');
  const currentTag = core.getInput('current-tag');
  const stringifiedTagYear = currentTag.slice(0, 4);
  const stringifiedTagWeek = currentTag.slice(5, 7);
  const productionBranch = `release/${stringifiedTagYear}.${stringifiedTagWeek}`;
  const numericTagYear = parseInt(stringifiedTagYear, 10);
  const numericTagWeek = parseInt(stringifiedTagWeek, 10);

  let stagingBranch;
  numericTagWeek === 52
    ? (stagingBranch = `release/${numericTagYear + 1}.01`)
    : (stagingBranch = `release/${numericTagYear}.${formatForSingleDigitWeeks(
        numericTagWeek + 1
      )}`);

  const isPushToStaging = currentBranch === stagingBranch;
  const isPushToProduction = currentBranch === productionBranch;

  core.setOutput('productionBranch', productionBranch);
  core.setOutput('stagingBranch', stagingBranch);
  core.setOutput('isPushToStaging', isPushToStaging);
  core.setOutput('isPushToProduction', isPushToProduction);
} catch (error) {
  core.setFailed(error.message);
}
