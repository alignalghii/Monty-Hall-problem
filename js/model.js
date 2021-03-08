/**
 * Demonstration for the Monty Hall problem (Driedeurenprobleem) https://en.wikipedia.org/wiki/Monty_Hall_problem  |  https://nl.wikipedia.org/wiki/Driedeurenprobleem
 */

const selectRandomIndexUpTo = n => Math.floor(Math.random() * n);
const notThisIndex  = (n, i ) => sequenceUpTo(n).filter(j => j != i);

Array.sequenceUpTo = n => Array(n).fill().map((_, i) => i);
Array.fillWithExecuting = (n, f) => Array(n).fill().map(_ => f());
Array.fillWithRandomIndicesUpTo = (n, a) => Array.fillWithExecuting(n, () => selectRandomIndexUpTo(a));

Reflect.defineProperty(Array.prototype, 'monadicBind'       , {value: function (f)  {return this.map(f).monadicJoin();}}); // >>=
Reflect.defineProperty(Array.prototype, 'monadicJoin'       , {value: function ( )  {return this.reduceRight((i, acc) => acc.concat(i));}}); // flatten

Reflect.defineProperty(Array.prototype, 'selectRandomMember', {value: function ( )  {return this[selectRandomIndexUpTo(this.length)];}});
Reflect.defineProperty(Array.prototype, 'missingIndicesUpTo', {value: function (n)  {return Array.sequenceUpTo(n).filter(i => !this.containsMember(i));}});
Reflect.defineProperty(Array.prototype, 'containsMember'    , {value: function (i)  {return this.indexOf(i) >= 0;}});
Reflect.defineProperty(Array.prototype, 'descartesProduct'  , {value: function (bs) {return this.monadicBind(i => bs.map(j => [i, j]))}});
Reflect.defineProperty(Array.prototype, 'descartesSquare'   , {value: function ( )  {return this.descartesProduct(this);}});

const outcomes = numberOfDoors =>
	Array.sequenceUpTo(numberOfDoors).descartesSquare().monadicBind(
		([presetSelection, myFirstSelection]) => [presetSelection, myFirstSelection].missingIndicesUpTo(numberOfDoors).monadicBind(
			gameMasterSDifferentSelection => [myFirstSelection, gameMasterSDifferentSelection].map(
				myFinalSelection => [presetSelection, myFirstSelection, gameMasterSDifferentSelection, myFinalSelection]
			)
		)
	);

const stochasticExperiments = (numberOfDoors, numberOfExperiments) =>
	Array.fillWithRandomIndicesUpTo(numberOfExperiments, numberOfDoors).map(
		presetSelection => {
			const myFirstSelection = selectRandomIndexUpTo(numberOfDoors);
			const gameMasterSDifferentSelection = [presetSelection, myFirstSelection].missingIndicesUpTo(numberOfDoors).selectRandomMember();
			const myFinalSelection = [myFirstSelection, gameMasterSDifferentSelection].missingIndicesUpTo(numberOfDoors).selectRandomMember();
			return myFinalSelection == presetSelection;
		}
	).filter(changerOptionWins => changerOptionWins).length / numberOfExperiments;

const changerOutcomes = numberOfDoors =>
	Array.sequenceUpTo(numberOfDoors).descartesSquare().monadicBind(
		([presetSelection, myFirstSelection]) => [presetSelection , myFirstSelection             ].missingIndicesUpTo(numberOfDoors).monadicBind(
			gameMasterSDifferentSelection => [myFirstSelection, gameMasterSDifferentSelection].missingIndicesUpTo(numberOfDoors).map(
				myFinalSelection => [presetSelection, myFirstSelection, gameMasterSDifferentSelection, myFinalSelection, myFinalSelection == presetSelection]
			)
		)
	);

const contrastedOutcomes = numberOfDoors =>
	Array.sequenceUpTo(numberOfDoors).descartesSquare().monadicBind(
		([presetSelection, myFirstSelection]) => [presetSelection, myFirstSelection].missingIndicesUpTo(numberOfDoors).map(
			gameMasterSDifferentSelection => {
				const [myChangedSecondSelection] = [myFirstSelection, gameMasterSDifferentSelection].missingIndicesUpTo(numberOfDoors);
				const mySecondPossibilities = [myFirstSelection, myChangedSecondSelection];
				return  [
					presetSelection, myFirstSelection, gameMasterSDifferentSelection,
					mySecondPossibilities,
					mySecondPossibilities.map(mySecondChoice => mySecondChoice == presetSelection)
				];
			}
		)
	);

/*console.log(
	contrastedOutcomes(3)
);
console.log(
	stochasticExperiments(3, 10000)
);*/
