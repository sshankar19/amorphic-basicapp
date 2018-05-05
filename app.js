var session = require('express-session');
var RedisStore = require('connect-redis')(session);
sessionStore = new RedisStore();
sessionStore.on('connect', function() {
    require('amorphic').listen(__dirname, sessionStore);
});
