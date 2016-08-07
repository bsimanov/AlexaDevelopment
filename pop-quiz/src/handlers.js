const util = require('util')
const constants = require('./resources/constants')
const sessionState = require('./utils/SessionState')
const questions = require('./utils/Questions')

module.exports = {

    'LaunchRequest': function () {
        this.emit(':ask', constants.outputSpeech.StartSession);
    },

    "MathIntent": function () {
        console.log('MathIntent')
        var lastIntent = sessionState.getState(this.event.session, 'lastIntent')
        var lastQuestion = sessionState.getState(this.event.session, 'lastQuestion')
        var correctAnswer = sessionState.getState(this.event.session, 'correctAnswer')

        sessionState.setState(this.event.session, 'lastIntent', 'MathIntent')
        
        if (lastIntent == 'MathIntent' && lastQuestion != '') {
            // Last question wasn't answered, ask it again
            this.emit('AMAZON.RepeatIntent')
        } else {
            var qa = questions.math()
            sessionState.setState(this.event.session, 'lastQuestion', qa.question)
            sessionState.setState(this.event.session, 'correctAnswer', qa.answer)
            this.emit(':ask', qa.question)
        }
    },

    "MathAnswerIntent": function () {
        console.log('MathAnswerIntent')
        var lastIntent = sessionState.getState(this.event.session, 'lastIntent')
        console.log(lastIntent)
        var lastQuestion = sessionState.getState(this.event.session, 'lastQuestion')
        console.log(lastQuestion)
        var correctAnswer = sessionState.getState(this.event.session, 'correctAnswer')
        console.log(correctAnswer)

        if (lastIntent == 'MathIntent') {
            var request = this.event.request
            console.log(JSON.stringify(request))
            var slots = request.intent.slots
            if (slots && slots.MathAnswer && slots.MathAnswer.value) {
                var userAnswer = slots.MathAnswer.value
                console.log('correctAnswer: ' + correctAnswer)
                console.log('User answer: ' + userAnswer)
                // TODO: Unit Test this
                sessionState.remove(this.event.session, ['lastQuestion', 'correctAnswer'])
                if (correctAnswer == slots.MathAnswer.value)
                    this.emit(':ask', constants.outputSpeech.AnswerCorrect)
                else
                    this.emit(':ask', util.format(constants.outputSpeech.AnswerIncorrect, correctAnswer))
            } else {
                this.emit(':ask', lastQuestion)
            }
        } else {
            this.emit('AMAZON.HelpIntent')
        }
    },

    "AMAZON.NextIntent": function() {
        var lastIntent = sessionState.getState(this.event.session, 'lastIntent')
        sessionState.remove(this.event.session, ['lastQuestion', 'correctAnswer'])
        if (lastIntent != '') {
            this.emit(lastIntent)
        } else {
            this.emit('AMAZON.HelpIntent')
        }
    },

    "AMAZON.RepeatIntent": function() {
        var lastQuestion = sessionState.getState(this.event.session, 'lastQuestion')
        this.emit(':ask', lastQuestion)
    },

    "AMAZON.YesIntent": function () {
        var lastIntent = sessionState.getState(this.event.session, 'lastIntent')
        if (!lastIntent)
            this.emit('AMAZON.HelpIntent')
        else
            this.emit(lastIntent)
    },

    "AMAZON.NoIntent": function () {
        sessionState.drop(this.event.session)
        this.emit(':ask', constants.outputSpeech.NoIntent)
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
