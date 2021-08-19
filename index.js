const core = require("@actions/core")
const github = require("@actions/github")

try {
 // `who-to-greet` input defined in action metadata file
 const currYear = new Date().getFullYear()

 const getWeek = (date = new Date()) => {
  const oneJan = new Date(date.getFullYear(), 0, 1)
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000))
  const result = Math.floor((date.getDay() + 1 + numberOfDays) / 7)
  return result
 }

 const currentBranch = core.getInput("current-branch")
 const staging = `**/release/${currYear}.${getWeek()}`
 const prod = `**/release/${currYear}.${getWeek() - 1}`
 console.log({ currentBranch, staging, prod })
 //  core.setOutput("production-branch", prod)
 //  core.setOutput("staging-branch", staging)

 //  const time = new Date().toTimeString()
 //  core.setOutput("time", time)
 //  // Get the JSON webhook payload for the event that triggered the workflow
 //  const payload = JSON.stringify(github.context.payload, undefined, 2)
 //  console.log(`The event payload: ${payload}`)

 //  const nameToGreet = core.getInput("type-of-hotfix")
 //  console.log(`Hello ${nameToGreet}!`)
} catch (error) {
 core.setFailed(error.message)
}

// const typeOfHotfix = core.getInput("hotfix-type")
// const formatBranchNameForMaster = () => {
//  const currYear = new Date().getFullYear()
//  return `**/release/${currYear}.${getWeek()}`
// }
// core.setOutput("branch-name", formatBranchNameForMaster())
// const payload = JSON.stringify(github.context.payload, undefined, 2)
// console.log(`The event payload: ${payload}`)
