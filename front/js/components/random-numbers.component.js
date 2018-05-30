function RandomNumbers(selector) {
    Component.call(this, selector);
    this.numbers = [];
    this.allNumbers = [];
}

RandomNumbers.prototype = Object.create(Component.prototype);
RandomNumbers.constructor = RandomNumbers;

RandomNumbers.prototype.init = function() {
    const self = this;
    
    let GetNumbers = function () {
        axios.get('http://localhost:3000/random-numbers')
        .then(function(response) {
            self.numbers = response.data.data.map(function(number) {
                self.allNumbers.push(number);
                console.log(self.allNumbers);

                return {
                    id: number,
                }
            });
            self.render();
        })
        .catch(function(error) {
            console.error(error);
        });
    }
    for (let i = 0; i < 1; i++) {
        setTimeout(GetNumbers, 0);
    }
    setInterval(GetNumbers, 10000);
};

RandomNumbers.prototype.render = function() {
    const container = this.getDOMElement();
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    this.numbers.forEach(function(number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = number.id;

        container.appendChild(listElement);
    });
};
