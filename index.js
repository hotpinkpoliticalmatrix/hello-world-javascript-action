const core = require("@actions/core")
const github = require("@actions/github")

try {
 //get current branch from input
 const currentBranch = core.getInput("who-to-greet")
 const getWeek = (date = new Date()) => {
  const oneJan = new Date(date.getFullYear(), 0, 1)
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000))
  const result = Math.floor((date.getDay() + 1 + numberOfDays) / 7)
  return result
 }
 console.log(`Hello ${currentBranch}!`)
 const time = new Date().toTimeString()
 const currYear = new Date().getFullYear()
 const currWeek = getWeek()
 const productionBranch = `release/${currYear}.${currWeek}`
 const stagingBranch = `release/${currYear}.${currWeek + 1}`
 const masterBranch = `release/${currYear}.${currWeek + 2}`
 //to do: fix for december
 const isPushToStaging = currentBranch === stagingBranch
 const isPushToProd = currentBranch === productionBranch
 core.setOutput("masterBranch", masterBranch)
 core.setOutput("productionBranch", productionBranch)
 core.setOutput("stagingBranch", stagingBranch)
 core.setOutput("isPushToStaging", isPushToStaging)
 core.setOutput("isPushToProduction", isPushToProd)
 console.log(productionBranch, isPushToProd)

 // Get the JSON webhook payload for the event that triggered the workflow
 //  const payload = JSON.stringify(github.context.payload, undefined, 2)
 //  console.log(`The event payload: ${payload}`)
} catch (error) {
 core.setFailed(error.message)
}

// const core = require("@actions/core")
// const github = require("@actions/github")

// try {
//  const currYear = new Date().getFullYear()

//  const getWeek = (date = new Date()) => {
//   const oneJan = new Date(date.getFullYear(), 0, 1)
//   const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000))
//   const result = Math.floor((date.getDay() + 1 + numberOfDays) / 7)
//   return result
//  }

//  const currentBranch = core.getInput("current-branch")
//  const staging = `**/release/${currYear}.${getWeek()}`
//  const prod = `**/release/${currYear}.${getWeek() - 1}`
//  console.log({ currentBranch, staging, prod })
//  //  core.setOutput("production-branch", prod)
//  //  core.setOutput("staging-branch", staging)

//  //  const time = new Date().toTimeString()
//  //  core.setOutput("time", time)
//  //  // Get the JSON webhook payload for the event that triggered the workflow
//  //  const payload = JSON.stringify(github.context.payload, undefined, 2)
//  //  console.log(`The event payload: ${payload}`)

//  //  const nameToGreet = core.getInput("type-of-hotfix")
//  //  console.log(`Hello ${nameToGreet}!`)
// } catch (error) {
//  core.setFailed(error.message)
// }

// // const typeOfHotfix = core.getInput("hotfix-type")
// // const formatBranchNameForMaster = () => {
// //  const currYear = new Date().getFullYear()
// //  return `**/release/${currYear}.${getWeek()}`
// // }
// // core.setOutput("branch-name", formatBranchNameForMaster())
// // const payload = JSON.stringify(github.context.payload, undefined, 2)
// // console.log(`The event payload: ${payload}`)
