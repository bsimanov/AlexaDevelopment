const expect = require('chai').expect
const sinon = require('sinon')
const randomizer = require('../../src/utils/Randomizer')
const questions = require('../../src/utils/Questions')

var sandbox

describe('utils.Questions', function () {
    describe('#math', function () {
        beforeEach(function () {
            sandbox = sinon.sandbox.create()
        })

        afterEach(function () {
            sandbox.restore()
        })

        it('add', function () {
            sandbox.stub(randomizer, 'randomString').returns('add')
            sandbox.stub(randomizer, 'randomNumber').returns(10)
            var qa = questions.math()
            expect(qa.question).to.equal('What is the value of 10 plus 10?')
            expect(qa.answer).to.equal(20)
        })

        it('sub', function () {
            sandbox.stub(randomizer, 'randomString').returns('sub')
            sandbox.stub(randomizer, 'randomNumber').returns(10)
            var qa = questions.math()
            expect(qa.question).to.equal('What is the value of 10 minus 10?')
            expect(qa.answer).to.equal(0)
        })

        it('div', function () {
            sandbox.stub(randomizer, 'randomString').returns('div')
            sandbox.stub(randomizer, 'randomNumber').returns(10)
            var qa = questions.math()
            expect(qa.question).to.equal('What is 100 divided by 10?')
            expect(qa.answer).to.equal(10)
        })

        it('mul', function () {
            sandbox.stub(randomizer, 'randomString').returns('mul')
            sandbox.stub(randomizer, 'randomNumber').returns(10)
            var qa = questions.math()
            expect(qa.question).to.equal('What is the value of 10 times 10?')
            expect(qa.answer).to.equal(100)
        })
    })
})