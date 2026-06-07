function logger(action,data=""){
const timestamp = new Date().toISOString();
console.log(`[${timestamp}] ${action}: ${data}`);
}
module.exports = logger;