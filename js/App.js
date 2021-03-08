function App()
{
	this.selectionField = document.getElementById('num-of-experiments');
	this.tblContrasted  = document.getElementById('contrasting');
	this.percentField   = document.getElementById('percent-field');

	this.selectionField.addEventListener('change', event => this.calculateWinningChance());
};

App.prototype.fillCasesTable = function ()
{
	contrastedOutcomes(3).map(
		([organizerSelection, contestantSFirstSelection, gameMasterSSelection, [contestantSFinalSelectionKeep, contestantSFinalSelectionChange], [scoreKeep, scoreChange]]) =>
		{
			const tr = createChild(this.tblContrasted, 'tr');
			simpleCell(tr, organizerSelection       );
			simpleCell(tr, contestantSFirstSelection);
			simpleCell(tr, gameMasterSSelection     );
			coloredCell(tr, contestantSFinalSelectionKeep  , scoreKeep  );
			coloredCell(tr, contestantSFinalSelectionChange, scoreChange);
		}
	);
};

App.prototype.calculateWinningChance = function ()
{
	const numOfExperiments = Number(this.selectionField.selectedOptions[0].innerHTML);
	this.percentField.innerHTML = stochasticExperiments(3, numOfExperiments);
};
