function createChild(parent, name, command)
{
	const elem = document.createElement(name);
	parent.appendChild(elem);
	if (command) command(elem);
	return elem;
}

function simpleCell(trParent, content)
{
	return createChild(
		trParent, 'td',
		elem => {elem.innerHTML = symbol(content);}
	);
} 

function coloredCell(trParent, content, flag)
{
	return createChild(
		trParent, 'td',
		elem => {
			elem.innerHTML = symbol(content);
			elem.style['background-color'] = semaphor(flag);
		}
	);
}

function semaphor(flag) {return flag ? 'green' : 'red';}

function symbol(doorIndex) {return 'ABC'[doorIndex];};
