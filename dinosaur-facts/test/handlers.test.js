const expect = require('chai').expect
const sinon = require('sinon')
const Alexa = require('alexa-sdk');
const handlers = require('../src/handlers')
const constants = require('../src/resources/constants')
const randomizer = require('../src/util/Randomizer')

const applicationId = 1337
var sandbox

describe('handlers', function () {
    var event = {}

    beforeEach(function () {
        sandbox = sinon.sandbox.create()
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

    afterEach(function () {
        sandbox.restore()
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
        const expectHandlers = ["LaunchRequest", "InformationIntent", "AMAZON.HelpIntent"]
        expect(handlerNames).to.deep.equal(expectHandlers)
        for (var i = 0; i < handlerNames.length; i++) {
            expect(typeof (handlers[handlerNames[i]])).to.equal('function')
        }
    })

    it('LaunchRequest', function () {
        sandbox.stub(randomizer, 'randomString').returns('Unit Test String')
        event.request = {
            type: 'LaunchRequest'
        }

        var response = callAlexa(event)
        expect(response.shouldEndSession).to.be.true
        expect(response.outputSpeech.ssml).to.equal('<speak> Unit Test String </speak>')
    })

    it('InformationIntent', function () {
        sandbox.stub(randomizer, 'randomString').returns('Unit Test String')
        event.request = {
            type: 'IntentRequest',
            intent: {
                name: 'InformationIntent'
            }
        }

        var response = callAlexa(event)
        expect(response.shouldEndSession).to.be.true
        expect(response.outputSpeech.ssml).to.equal('<speak> Unit Test String </speak>')
    })

    it('AMAZON.HelpIntent', function () {
        event.request = {
            type: 'IntentRequest',
            intent: {
                name: 'AMAZON.HelpIntent'
            }
        }

        var response = callAlexa(event)
        expect(response.shouldEndSession).to.be.true
        expect(response.outputSpeech.ssml).to.equal('<speak> ' + constants.outputSpeech.HelpIntent + ' </speak>')
    })
})