const stateContainer = 'attributes'

module.exports = {
    setState: function (session, key, value) {
        if (!session[stateContainer])
            session[stateContainer] = {}

        session[stateContainer][key] = value
    },
    getState: function (session, key) {
        if (!session[stateContainer] || !session[stateContainer][key])
            return ''

        return session[stateContainer][key]
    },
    remove: function (session, keys) {
        if (keys.constructor === String) {
            keys = [keys]
        }
        keys.forEach(function(key) {
            if (session[stateContainer] && session[stateContainer][key])
                delete session[stateContainer][key]
        }, this);
    },
    drop: function (session) {
        session[stateContainer] = {}
    }
}