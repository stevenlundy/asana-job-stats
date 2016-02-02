var tasks = require('./tasks');

var applied = tasks.data.filter(task => task.memberships[0].section.name == "Applied:");
var rejected = applied.filter(task => task.completed);
var rejectionTimes = rejected.map(getTimeToRejection);

var mean = rejectionTimes.reduce((total, time) => total + time)/rejected.length;
var stdDev = Math.sqrt(rejectionTimes.reduce((total, time) => total + Math.pow(time - mean, 2))/(rejected.length - 1));
var conHi = mean + 1.96 * stdDev / Math.sqrt(rejected.length)
var conLo = mean - 1.96 * stdDev / Math.sqrt(rejected.length)

console.log('number applied          =', applied.length);
console.log('number rejected         =', rejected.length);
console.log('mean                    =', mean.toFixed(1));
console.log('standard deviation      =', stdDev.toFixed(1));
console.log('95% confidence interval =', conLo.toFixed(1), ',', conHi.toFixed(1));
console.log('Max resonse time        =', Math.max.apply(null, rejectionTimes).toFixed(1));
console.log('Min resonse time        =', Math.min.apply(null, rejectionTimes).toFixed(2));

function getTimeToRejection(task) {
  var applyDate = new Date(task.created_at);
  var rejectDate = new Date(task.completed_at);

  return (rejectDate - applyDate)/1000/60/60/24;
}
