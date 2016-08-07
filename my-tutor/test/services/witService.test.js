const expect = require('chai').expect
const sinon = require('sinon')
const request = require('request')
const witService = require('../../src/services/witService')

var sandbox

describe('services.witService', function () {
    describe('#getResponse', function () {
        beforeEach(function () {
            sandbox = sinon.sandbox.create()
        })

        afterEach(function () {
            sandbox.restore()
        })

        it('message resolves response', function (done) {
            var serviceResponse = {
                entities: {
                    intent: [{
                        "value": "test_intent"
                    }],
                    contact: [{
                        "value": "Bob"
                    }]
                }
            }
            sandbox.stub(request, 'get').yields(null, { statusCode: 200 }, serviceResponse)
            witService.getResponse('unit test')
                .then(function (response) {
                    expect(response.entities).to.be.an.object
                    expect(response.entities.intent[0].value).to.equal('test_intent')
                    expect(response.entities.contact[0].value).to.equal('Bob')
                    done()
                })
        })

        it('rejects on error', function (done) {
            sandbox.stub(request, 'get').yields('Server Error', null, null)
            witService.getResponse('unit test').then(() => { }, function (err) {
                expect(err).to.equal('Server Error')
                done()
            })
        })

        it('rejects on bad status code', function (done) {
            sandbox.stub(request, 'get').yields(null, { statusCode: 400 }, { entities: {} })
            witService.getResponse('unit test').then(() => { }, function (err) {
                expect(err).to.equal('HTTP Error: 400')
                done()
            })
        })
    })
})