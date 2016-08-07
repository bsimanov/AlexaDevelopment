module.exports = {
    randomNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
    randomString: function(arr) {
        return arr[this.randomNumber(0, arr.length - 1)];
    }
}