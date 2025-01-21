const keyboardOrder = "Q,W,E,R,T,Y,U,P,A,S,D,F,G,H,J,K,L,Z,C,V,B,N,M,2,3,4,5,6,7,8,9".split(",");
const teamCodeInput = document.getElementById("teamcode");
const tryButton = document.getElementById("tryButton");

function getPreviousChar(char) {
	const index = keyboardOrder.indexOf(char);
	if (index === -1) return char;
	return keyboardOrder[(index - 1 + keyboardOrder.length) % keyboardOrder.length];
}

function decrementCode(code) {
	let codeArray = code.split("");
	let carry = true;

	for (let i = codeArray.length - 1; i >= 0 && carry; i--) {
		let currentChar = codeArray[i];

		if (!keyboardOrder.includes(currentChar)) {
			continue;
		}

		let newChar = getPreviousChar(currentChar);
		codeArray[i] = newChar;

		carry = newChar === keyboardOrder[keyboardOrder.length - 1];
	}

	return codeArray.join("");
}

teamCodeInput.addEventListener("input", () => {
	let inputValue = teamCodeInput.value.toUpperCase();

	if ((inputValue.match(/X/g) || []).length > 1) {
		inputValue = "X" + inputValue.replace(/X/g, "");
	}

	let filteredValue = inputValue
	.split('')
	.filter((c, index) => {
		if (index === 0) return c === "X";
		return keyboardOrder.includes(c);
	})
	.join('');

	teamCodeInput.value = filteredValue;

	if (filteredValue.toLowerCase() === "help") {
		window.location.replace("help.html");
	} else if (filteredValue.length >= 2 && filteredValue[0] === 'X') {
		tryButton.disabled = false;
	} else {
		tryButton.disabled = true;
	}
});

tryButton.addEventListener("click", () => {
	let teamCode = teamCodeInput.value.toUpperCase();
	let newCode = decrementCode(teamCode);
	teamCodeInput.value = newCode;

	const brawlStarsLink = `brawlstars://joinRoom?tag=${newCode}`;
	window.location.href = brawlStarsLink;
});

window.addEventListener("pageshow", () => teamCodeInput.dispatchEvent(new Event("input")));
window.addEventListener("load", () => teamCodeInput.dispatchEvent(new Event("input")));
