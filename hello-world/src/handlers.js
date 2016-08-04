module.exports = {

    'LaunchRequest': function () {
        //this.emit('SayHello');
        this.emit(':tell', 'Launched Hello World...')
    },

    'HelloWorldIntent': function () {
        this.emit('SayHello')
    },

    'SayHello': function () {
        //this.emit(':tell', 'Hello World!');
        this.emit(':ask', 'What would you like to do?', 'Please say that again?');
    }

};
