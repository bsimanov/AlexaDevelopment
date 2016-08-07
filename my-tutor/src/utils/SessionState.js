const stateContainer = 'attributes'

module.exports = {
    setState: function(session, key, value) {
        if (!session[stateContainer])
            session[stateContainer] = {}
        
        session[stateContainer][key] = value
    },
    getState: function(session, key) {
        if (!session[stateContainer] || !session[stateContainer][key])
            return ''
        
        return session[stateContainer][key]
    }
}