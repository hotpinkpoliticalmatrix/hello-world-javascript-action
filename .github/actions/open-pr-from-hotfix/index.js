const core = require("@actions/core")

try {
 const currentBranch = core.getInput("current-branch")
 const currentTag = core.getInput("current-tag")
 const tagYear = parseInt(currentTag.slice(0, 4), 10)
 const tagWeek = parseInt(currentTag.slice(5, 7), 10)
 const productionBranch = `release/${tagYear}.${tagWeek}`

 let stagingBranch
 tagWeek === 52
  ? (stagingBranch = `release/${tagYear + 1}.01`)
  : (stagingBranch = `release/${tagYear}.${tagWeek + 1}`)

 const isPushToStaging = currentBranch === stagingBranch
 const isPushToProduction = currentBranch === productionBranch

 core.setOutput("productionBranch", productionBranch)
 core.setOutput("stagingBranch", stagingBranch)
 core.setOutput("isPushToStaging", isPushToStaging)
 core.setOutput("isPushToProduction", isPushToProduction)
} catch (error) {
 core.setFailed(error.message)
}
