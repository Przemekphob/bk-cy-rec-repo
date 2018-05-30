const interval = 10000;

function RandomNumbers(selector) {
    Component.call(this, selector);
    this.numbers = [];
}

RandomNumbers.prototype = Object.create(Component.prototype);
RandomNumbers.constructor = RandomNumbers;

RandomNumbers.prototype.init = function() {
    const self = this;
    setInterval(function () {
        axios.get('http://localhost:3000/random-numbers')
        .then(function(response) {
            self.numbers = response.data.data.map(function(number) {
                return {
                    id: number
                }
            });
            self.render();
        })
        .catch(function(error) {
            console.error(error);
        });
    }, 10000);
};

RandomNumbers.prototype.render = function() {
    const container = this.getDOMElement();

    this.numbers.forEach(function(number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = number.id;

        container.appendChild(listElement);
    });
};