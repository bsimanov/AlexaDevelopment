const expect = require('chai').expect
const sinon = require('sinon')
const witService = require('../../src/services/witService')
const ActionIntent = require('../../src/utils/ActionIntent')

var sandbox

describe('intents.ActionIntent', function () {
    describe('#getIntent', function () {
        beforeEach(function () {
            sandbox = sinon.sandbox.create()
        })

        afterEach(function () {
            sandbox.restore()
        })

        it('gets intent', function (done) {
            sandbox.stub(witService, 'getResponse').returns(new Promise((resolve, reject) => {
                resolve({ entities: { intent: [{ value: "TestIntent" }] }})
            }))

            var intent = ActionIntent.getIntent('teach me math').then((intent) => {
                expect(intent).to.equal('TestIntent')
                done()
            })
        })
    })
})