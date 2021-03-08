ready(init);

function init()
{
	const app = new App();
	app.fillCasesTable();
	app.calculateWinningChance(10000);
};

function ready (callback)
{
	if (document.readyState != 'loading') {
		callback();
	} else {
		document.addEventListener('DOMContentLoaded', callback);
	}
}
