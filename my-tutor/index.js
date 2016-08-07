const Alexa = require('alexa-sdk');
const handlers = require('./src/handlers')

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
