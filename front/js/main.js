const ranking = new Ranking('#numbers-ranking');
const randomNumbers = new RandomNumbers('#random-numbers');

ranking.init();
const interval = function()
{
	let count = {};
    randomNumbers.allNumbers.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    console.log(count);
	randomNumbers.init();
	ranking.render();


}
setInterval(interval,10000);


