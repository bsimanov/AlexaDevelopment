const randomizer = require('./Randomizer')
module.exports = {
    math: function () {
        var operations = ['add', 'sub', 'div', 'mul']
        var operation = randomizer.randomString(operations)
        var question
        if (operation == 'add') {
            var a = randomizer.randomNumber(10, 30)
            var b = randomizer.randomNumber(5, 25)
            question = `What is the value of ${a} plus ${b}?`
            answer = a + b
        }
        if (operation == 'sub') {
            var a = randomizer.randomNumber(10, 40)
            var b = randomizer.randomNumber(10, 30)
            question = `What is the value of ${a} minus ${b}?`
            answer = a - b
        }
        if (operation == 'div') {
            var a = randomizer.randomNumber(0, 12)
            var b = randomizer.randomNumber(0, 12)
            var total = a * b
            question = `What is ${total} divided by ${a}?`
            answer = b
        }
        if (operation == 'mul') {
            var a = randomizer.randomNumber(0, 12)
            var b = randomizer.randomNumber(0, 12)
            question = `What is the value of ${a} times ${b}?`
            answer = a * b
        }

        return { question: question, answer: answer }
    }
}