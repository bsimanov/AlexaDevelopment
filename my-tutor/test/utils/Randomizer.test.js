const expect = require('chai').expect
const sinon = require('sinon')
const randomizer = require('../../src/utils/Randomizer')

var sandbox

describe('utils.Randomizer', function () {
    describe('#randomNumber', function () {
        beforeEach(function () {
            sandbox = sinon.sandbox.create()
        })

        afterEach(function () {
            sandbox.restore()
        })

        it('between 0 and 99', function () {
            sandbox.stub(Math, 'random').returns(0.42)
            var randomNumber = randomizer.randomNumber(0, 99)
            expect(randomNumber).to.equal(42)
        })

        it('between 10 and 20', function () {
            sandbox.stub(Math, 'random').returns(0.35)
            var randomNumber = randomizer.randomNumber(10, 20)
            expect(randomNumber).to.equal(13)
        })
    })

    describe('#randomString', function () {
        beforeEach(function () {
            sandbox = sinon.sandbox.create()
        })

        afterEach(function () {
            sandbox.restore()
        })

        it('of strings', function () {
            sandbox.stub(Math, 'random').returns(0.75)
            var options = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
            var randomString = randomizer.randomString(options)
            expect(randomString).to.equal('f')
        })
    })
})