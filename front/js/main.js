const ranking = new Ranking('#numbers-ranking');
const randomNumbers = new RandomNumbers('#random-numbers');

randomNumbers.init();
ranking.init();

const interval = function()
{
	randomNumbers.fetchNewNumbers()
		.then(function(){
			console.log('got new numbers; updating ranking...');
			ranking.updateRanking(randomNumbers.numbers);

			console.log('rendering...');
			randomNumbers.render();
			ranking.render();
		});
}

ranking.fetchNewNumbers()
	.then(function() {
		interval();

		setInterval(interval, 10000);
	});