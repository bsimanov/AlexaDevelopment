const constants = require('./resources/constants')
const ActionIntent = require('./utils/ActionIntent')

module.exports = {

    'LaunchRequest': function () {
        this.emit(':ask', constants.outputSpeech.StartSession);
    },

    "MathIntent": function() {
        this.emit(':ask', "What's 2 plus 2?")
    },

    "UnknownIntent": function() {
        this.emit(':ask', constants.outputSpeech.UnknownIntent)
    },

    "ActionIntent": function () {
        var request = this.event.request
        var slots = request.intent.slots
        var speechText = constants.outputSpeech.ActionIntentDefault

        if (slots && slots.ActionType && slots.ActionType.value) {
            witIntent = ActionIntent.getIntent(slots.ActionType.value)
            this.emit(witIntent)
        }
        
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
