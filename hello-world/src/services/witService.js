var request = require('request')
const env = require('../../.env')

exports.getResponse = function(message) {
    return new Promise(function (resolve, reject) {
        var options = {
            url: 'https://api.wit.ai/message',
            qs: { q: message },
            headers: {
                'Authorization': 'Bearer ' + env.WIT_TOKEN
            },
            json: true
        }

        request.get(options, function(err, res, body) {
            if (!err && res.statusCode == 200) {
                return resolve(body)
            } else {
                if (!err)
                    return reject('HTTP Error: ' + res.statusCode)
                return reject(err)
            }
        })
    })
}