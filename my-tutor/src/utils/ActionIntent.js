const witService = require('../services/witService')
const constants = require('../resources/constants')

const DefaultIntent = 'UnknownIntent'

module.exports = {
    getIntent: function (message) {
        return witService.getResponse(message).then(function (response) {
            var entities = response.entities
            if (entities && entities.intent) {
                return entities.intent[0].value
            }
            return  DefaultIntent
        }, function(err) {
            console.log('Error getting intent for: ' + message)
            console.log(err)
            return DefaultIntent
        })
    }
}