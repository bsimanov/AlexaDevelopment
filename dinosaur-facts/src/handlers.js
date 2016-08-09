const util = require('util')
const constants = require('./resources/constants')
const randomizer = require('./util/Randomizer')

module.exports = {

    'LaunchRequest': function () {
        this.emit('InformationIntent');
    },

    "InformationIntent": function () {
        var randomInfo = randomizer.randomString(constants.outputSpeech.facts)
        this.emit(':tell', randomInfo)
    },

    "AMAZON.HelpIntent": function (prefixMessage) {
        this.emit(':tell', constants.outputSpeech.HelpIntent)
    }

};