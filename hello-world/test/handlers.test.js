const expect = require('chai').expect
const Alexa = require('alexa-sdk');
const handlers = require('../src/handlers')

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

  it('check all handlers', function () {
    expect(handlers).to.be.an.object
    var handlerNames = Object.keys(handlers);
    expect(handlerNames).to.deep.equal(["LaunchRequest", "HelloWorldIntent", "SayHello"])
    for (var i = 0; i < handlerNames.length; i++) {
      expect(typeof (handlers[handlerNames[i]])).to.equal('function')
    }
  })

  it('LaunchRequest', function () {
    event.request = {
      type: 'LaunchRequest'
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.true
    expect(response.outputSpeech.ssml).to.equal('<speak> Launched Hello World... </speak>')
  })

  it('HelloWorldIntent', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'HelloWorldIntent'
      }
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> What would you like to do? </speak>')
    expect(response.reprompt.outputSpeech.ssml).to.equal('<speak> Please say that again? </speak>')
  })

  it('SayHello', function () {
    event.request = {
      type: 'IntentRequest',
      intent: {
        name: 'SayHello'
      }
    }

    var response = callAlexa(event)
    expect(response.shouldEndSession).to.be.false
    expect(response.outputSpeech.ssml).to.equal('<speak> What would you like to do? </speak>')
    expect(response.reprompt.outputSpeech.ssml).to.equal('<speak> Please say that again? </speak>')
  })
})
