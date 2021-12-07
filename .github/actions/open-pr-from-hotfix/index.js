const core = require("@actions/core")

try {
 const currentBranch = core.getInput("current-branch")
 const currentTag = core.getInput("current-tag")
 const tagYear = currentTag.slice(0, 4)
 const tagWeek = currentTag.slice(5, 7)
 const productionBranch = `release/${tagYear}.${tagWeek}`
 const stagingBranch = `release/${tagYear}.${parseInt(tagWeek, 10) + 1}`
 const isPushToStaging = currentBranch === stagingBranch
 const isPushToProduction = currentBranch === productionBranch

 console.log(
  currentTag,
  currentTag.slice(0, 4),
  currentTag.slice(5, 7),
  productionBranch,
  stagingBranch,
  isPushToProduction,
  isPushToStaging,
  "test"
 )
 core.setOutput("productionBranch", productionBranch)
 core.setOutput("stagingBranch", stagingBranch)
 core.setOutput("isPushToStaging", isPushToStaging)
 core.setOutput("isPushToProduction", isPushToProduction)
} catch (error) {
 core.setFailed(error.message)
}
