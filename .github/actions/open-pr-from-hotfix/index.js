const core = require("@actions/core")
const github = require("@actions/github")

const getWeek = (date = new Date()) => {
 const oneJan = new Date(date.getFullYear(), 0, 1)
 const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000))
 const result = Math.floor((date.getDay() + 1 + numberOfDays) / 7)
 return result
}

const adjustForYearEnd = (currWeek) => {
 let currYear = new Date().getFullYear()
 let stagingWeek
 let stagingYear
 if (currWeek === 52) {
  stagingYear = currYear + 1
  stagingWeek = 01
 } else {
  stagingYear = currYear
  stagingWeek = currWeek + 1
 }
 return { currYear, stagingWeek, stagingYear }
}

try {
 //get current branch from input
 const currentBranch = core.getInput("current-branch")
 const currentTag = core.getInput("current-tag")
 console.log("current tag:", currentTag)

 const currWeek = getWeek()
 const { currYear, stagingWeek, stagingYear } = adjustForYearEnd(currWeek)

 const productionBranch = `release/${currYear}.${currWeek}`
 const stagingBranch = `release/${stagingYear}.${stagingWeek}`
 //to do: fix for december
 const isPushToStaging = currentBranch === stagingBranch
 const isPushToProduction = currentBranch === productionBranch

 console.log(
  productionBranch,
  stagingBranch,
  isPushToProduction,
  isPushToStaging
 )
 core.setOutput("productionBranch", productionBranch)
 core.setOutput("stagingBranch", stagingBranch)
 core.setOutput("isPushToStaging", isPushToStaging)
 core.setOutput("isPushToProduction", isPushToProduction)

 // Get the JSON webhook payload for the event that triggered the workflow
 const payload = JSON.stringify(github.context.payload, undefined, 2)
 console.log(`The event payload: ${payload}`)
} catch (error) {
 core.setFailed(error.message)
}
