function RandomNumbers(selector) {
    Component.call(this, selector);
    this.numbers = [];
}

RandomNumbers.prototype = Object.create(Component.prototype);
RandomNumbers.constructor = RandomNumbers;

RandomNumbers.prototype.init = function() {
    const self = this;
}

RandomNumbers.prototype.fetchNewNumbers = function() {
    const self = this;

    let promise = axios.get('http://localhost:3000/random-numbers')
    .then(function(response) {
        self.numbers = response.data.data;

        console.log('got new numbers: ' + self.numbers);
    })
    .catch(function(error) {
        console.error(error);
    });

    return promise;
};

RandomNumbers.prototype.render = function() {
    const container = this.getDOMElement();

    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    this.numbers.forEach(function(number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = number;

        container.appendChild(listElement);
    });

};
