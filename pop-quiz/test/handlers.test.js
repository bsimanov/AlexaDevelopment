const util = require('util')
const expect = require('chai').expect
const Alexa = require('alexa-sdk');
const handlers = require('../src/handlers')
const constants = require('../src/resources/constants')
const sessionState = require('../src/utils/SessionState')

const applicationId = 1337

describe('handlers', function () {
  var event = {}

  beforeEach(function () {
    event = {
      session: {
        application: {
          applicationId: applicationId
        },
        attributes: {}
      },
      request: {}
    }
  })

  function callAlexa(event) {
    var success = false
    var context = {
      fail: function () {
        success = false
      },
      succeed: function () {
        success = true
      }
    }

    var alexa = Alexa.handler(event, context)
    alexa.registerHandlers(handlers);
    alexa.appId = applicationId
    alexa.execute()

    expect(success).to.be.true

    return alexa.response.response
  }

  it('all handlers exist', function () {
    expect(handlers).to.be.an.object
    var handlerNames = Object.keys(handlers);
    const expectHandlers = ["LaunchRequest", "MathIntent", "MathAnswerIntent", "AMAZON.NextIntent", "AMAZON.RepeatIntent", "AMAZON.YesIntent", "AMAZON.NoIntent", "AMAZON.HelpIntent", "AMAZON.StopIntent", "AMAZON.CancelIntent"]
    expect(handlerNames).to.deep.equal(expectHandlers)
    for (var i = 0; i < handlerNames.length; i++) {
      expect(typeof (handlers[handlerNames[i]])).to.equal('function')
    }
  })

  it('LaunchRequest', function () {
    event.request = {
      type: 'LaunchRequest'
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.StartSession + ' </speak>')
  })

  it('MathIntent', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'MathIntent'
      }
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> What is two plus two? </speak>')
  })

  it('MathAnswerIntent - Triggered without question', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'MathAnswerIntent'
      }
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.HelpIntent + ' </speak>')
  })

  it('MathAnswerIntent - Answered correctly', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'MathAnswerIntent',
        slots: {
          MathAnswer: {
            value: 42
          }
        }
      }
    }

    sessionState.setState(event.session, 'lastIntent', 'MathIntent')
    sessionState.setState(event.session, 'correctAnswer', 42)

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.AnswerCorrect + ' </speak>')
  })

  it('MathAnswerIntent - Answered incorrectly', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'MathAnswerIntent',
        slots: {
          MathAnswer: {
            value: 10
          }
        }
      }
    }

    const correctAnswer = 42
    sessionState.setState(event.session, 'lastIntent', 'MathIntent')
    sessionState.setState(event.session, 'correctAnswer', correctAnswer)

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + util.format(constants.outputSpeech.AnswerIncorrect, correctAnswer) + ' </speak>')
  })

  it('MathAnswerIntent - without MathAnswer.value', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'MathAnswerIntent'
      }
    }

    const correctAnswer = 42
    sessionState.setState(event.session, 'lastIntent', 'MathIntent')
    sessionState.setState(event.session, 'lastQuestion', 'Unit Test Question')
    sessionState.setState(event.session, 'correctAnswer', correctAnswer)

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> Unit Test Question </speak>')
  })

  it('AMAZON.NextIntent - lastIntent set', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'AMAZON.NextIntent'
      }
    }

    sessionState.setState(event.session, 'lastIntent', 'MathIntent')
    sessionState.setState(event.session, 'lastQuestion', 'Unit Test Question')
    sessionState.setState(event.session, 'correctAnswer', 'correctAnswer')

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> What is two plus two? </speak>')
  })

  it('AMAZON.NextIntent - lastIntent removed', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'AMAZON.NextIntent'
      }
    }

    sessionState.remove(event.session, 'lastIntent')
    sessionState.setState(event.session, 'lastQuestion', 'Unit Test Question')
    sessionState.setState(event.session, 'correctAnswer', 'correctAnswer')

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.HelpIntent + ' </speak>')
  })

  it('AMAZON.RepeatIntent', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'AMAZON.RepeatIntent'
      }
    }

    sessionState.setState(event.session, 'lastIntent', 'MathIntent')
    sessionState.setState(event.session, 'lastQuestion', 'Unit Test Question')

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> Unit Test Question </speak>')
  })

  it('AMAZON.YesIntent', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'AMAZON.YesIntent'
      }
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.HelpIntent + ' </speak>')
  })

  it('AMAZON.NoIntent', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'AMAZON.NoIntent'
      }
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.NoIntent + ' </speak>')
  })

  it('AMAZON.HelpIntent', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'AMAZON.HelpIntent'
      }
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.HelpIntent + ' </speak>')
  })

  it('AMAZON.StopIntent', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'AMAZON.StopIntent'
      }
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.true
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.StopSession + ' </speak>')
  })

  it('AMAZON.CancelIntent', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'AMAZON.CancelIntent'
      }
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.true
    expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.StopSession + ' </speak>')
  })
})
