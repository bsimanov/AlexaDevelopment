module.exports = {
    randomNumber: function(num) {
        return Math.floor(Math.random() * num);
    },
    randomString: function(arr) {
        return arr[this.randomNumber(arr.length)];
    }
}