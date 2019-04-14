const { runGetUrlQueue } = require("./queue/getUrlQueue");
const { runGetTwitterInfoQueue } = require("./queue/getTwitterInfoQueue");
const { runGetLinkedinInfoQueue } = require("./queue/getLinkedinInfoQueue");
const { runGetFbInfoQueue } = require("./queue/getFbInfoQueue");

runGetUrlQueue();
runGetTwitterInfoQueue();
runGetLinkedinInfoQueue();
runGetFbInfoQueue();
