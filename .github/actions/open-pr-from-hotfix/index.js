const core = require("@actions/core")
const github = require("@actions/github")

const formatForSingleDigitWeeks = (weekNum) => {
 return weekNum.length === 1 ? `0${weekNum}` : weekNum
}

try {
 const currentBranch = core.getInput("current-branch")
 const currentTag = core.getInput("current-tag")
 const tagYear = currentTag.slice(0, 4)
 const tagWeek = currentTag.slice(5, 7)
 const productionBranch = `release/${tagYear}.${tagWeek}`

 let stagingBranch

 tagWeek === 52
  ? (stagingBranch = `release/${tagYear + 1}.01`)
  : (stagingBranch = `release/${tagYear}.${formatForSingleDigitWeeks(
     tagWeek + 1
    )}`)

 const isPushToStaging = currentBranch === stagingBranch
 const isPushToProduction = currentBranch === productionBranch

 core.setOutput("productionBranch", productionBranch)
 core.setOutput("stagingBranch", stagingBranch)
 core.setOutput("isPushToStaging", isPushToStaging)
 core.setOutput("isPushToProduction", isPushToProduction)
} catch (error) {
 core.setFailed(error.message)
}
