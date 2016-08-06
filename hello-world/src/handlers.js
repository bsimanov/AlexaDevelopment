var HelpIntent = require('./intents/HelpIntent')
var ActionIntent = require('./intents/ActionIntent')
const constants = require('./resources/constants')

module.exports = {

    'LaunchRequest': function () {
        this.emit(':ask', constants.outputSpeech.StartSession);
    },

    "ActionIntent": function () {
        var request = this.event.request
        var slots = request.intent.slots
        var action = "unknown"
        if (slots && slots.ActionType && slots.ActionType.value)
            action = slots.ActionType.value

        if (action == "unknown")
            speechText = constants.outputSpeech.ActionIntentDefault
        else
            speechText = ActionIntent.getSpeech(action)
        
        this.emit(':ask', speechText)
    },

    "AMAZON.HelpIntent": function (prefixMessage) {
        this.emit(':ask', constants.outputSpeech.HelpIntent)
    },

    "AMAZON.StopIntent": function () {
        this.emit(':tell', constants.outputSpeech.StopSession)
    },

    "AMAZON.CancelIntent": function () {
        this.emit(':tell', constants.outputSpeech.StopSession)
    }

};
