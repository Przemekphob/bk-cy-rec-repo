function Ranking(selector) {
    Component.call(this, selector);
    this.numbers = [];
    this.ranking = {};
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function() {
    const self = this;
}

Ranking.prototype.fetchNewNumbers = function() {
    const self = this;

    let promise = axios.get('http://localhost:3000/numbers')
    .then(function(response) {
        self.numbers = response.data.data;

        console.log('ranking.init done, numbers: ' + self.numbers);
    })
    .catch(function(error) {
        console.error(error);
    });

    return promise;
};

Ranking.prototype.updateRanking = function(randomNumbers) {
    const self = this;

    randomNumbers.forEach(function(number) {
        self.ranking[number] = (self.ranking[number] || 0) + 1;
    });
}

Ranking.prototype.render = function() {
    const self = this;
    const container = this.getDOMElement();

    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    this.numbers.map(function(number) {
        //get ranking and return object {number, ranking}
        return {
            "number": number,
            "ranking": (self.ranking[number] || 0)
        }
    })
    // sort after ranking
    .sort((a, b) => a.ranking < b.ranking)
    // sorted numbers in ranking
    .forEach(function(element) { 
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');

        listElement.innerHTML = "Number: " + element.number + " * " + element.ranking;

        container.appendChild(listElement);
    });
};
