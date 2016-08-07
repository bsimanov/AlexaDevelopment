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

        it('value', function () {
            var session = { attributes: { testKey: 'testValue' } }
            var actual = sessionState.getState(session, 'testKey')
            expect(actual).to.equal('testValue')
        })
    })

    describe('#remove', function () {
        it('one key', function () {
            var session = { attributes: { testKey: 'testValue', testKey2: 'testValue2' } }
            sessionState.remove(session, 'testKey2')
            expect(session.attributes).to.deep.equal({testKey: 'testValue'})
        })

        it('multiple keys', function () {
            var session = { attributes: { testKey: 'testValue', testKey2: 'testValue2', testKey3: 'testValue3' } }
            sessionState.remove(session, ['testKey', 'testKey3'])
            expect(session.attributes).to.deep.equal({testKey2: 'testValue2'})
        })
    })

    describe('#drop', function () {
        it('everything', function () {
            var session = { attributes: { testKey: 'testValue' } }
            sessionState.drop(session)
            expect(session.attributes).to.deep.equal({})
        })
    })
})