function Ranking(selector) {
    Component.call(this, selector);
    this.numbers = [];
    this.ammount = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function() {
    const self = this;
    self.ammount = [0,0,0,0,0,0,0,0,0,0];

    axios.get('http://localhost:3000/numbers')
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
};

Ranking.prototype.render = function() {
    const self = this;
    const container = this.getDOMElement();
    
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    this.numbers.forEach(function(number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = "Number: " + number.id + " * " + self.ammount[number.id-1];

        container.appendChild(listElement);
    });
};
