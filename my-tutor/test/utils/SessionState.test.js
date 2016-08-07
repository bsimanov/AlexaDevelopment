const expect = require('chai').expect
const sessionState = require('../../src/utils/SessionState')

describe('utils.SessionState', function () {
    describe('#setState', function () {
        it('new key/value', function () {
            var session = {}
            sessionState.setState(session, 'testKey', 'testValue')
            expect(session.attributes.testKey).to.equal('testValue')
        })

        it('update key/value', function () {
            var session = { attributes: { testKey: 'testValue' } }
            sessionState.setState(session, 'testKey', 'newValue')
            expect(session.attributes.testKey).to.equal('newValue')
        })
    })

    describe('#getState', function () {
        it('on a non-existing key', function () {
            session = {}
            var actual = sessionState.getState(session, 'unknownKey')
            expect(actual).to.equal('')
        })

        it('value', function() {
            var session = { attributes: { testKey: 'testValue' } }
            var actual = sessionState.getState(session, 'testKey')
            expect(actual).to.equal('testValue')
        })
    })
})