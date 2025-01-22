const keyboardOrder = "Q,W,E,R,T,Y,U,P,A,S,D,F,G,H,J,K,L,Z,C,V,B,N,M,2,3,4,5,6,7,8,9".split(",");
const teamCodeInput = document.getElementById("teamcode");
const tryButton = document.getElementById("tryButton");
let cooldownActive = false;

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

	if (inputValue.length > 0 && !["X", "H"].includes(inputValue[0])) {
		inputValue = inputValue.replace(/[^XH]/, "");
	}

	if ((inputValue.match(/X/g) || []).length > 1) {
		inputValue = "X" + inputValue.replace(/X/g, "");
	}

	if (inputValue.startsWith("H")) {
		let helpSequence = "HELP";
		let filteredValue = "";

		for (let i = 0; i < inputValue.length; i++) {
			if (i < helpSequence.length && inputValue[i] === helpSequence[i]) {
				filteredValue += inputValue[i];
			} else {
				break;
			}
		}

		inputValue = filteredValue;
	}

	let filteredValue = inputValue
	.split('')
	.filter((c, index) => {
		if (index === 0) return ["X",
			"H"].includes(c);
		if (inputValue.startsWith("H")) {
			let expectedChar = "HELP"[index];
			return c === expectedChar;
		}
		return keyboardOrder.includes(c);
	})
	.join('');

	teamCodeInput.value = filteredValue;

	if (filteredValue.toLowerCase() === "help") {
		window.location.replace("help.html");
	} else {
		const isInputValid = filteredValue.startsWith("X") && filteredValue.length >= 2;
		tryButton.disabled = !isInputValid || cooldownActive;
	}
});

tryButton.addEventListener("click", () => {
	let teamCode = teamCodeInput.value.toUpperCase();
	let newCode = decrementCode(teamCode);
	teamCodeInput.value = newCode;

	const brawlStarsLink = `brawlstars://joinRoom?tag=${newCode}`;
	window.location.href = brawlStarsLink;

	cooldownActive = true;
	tryButton.disabled = true;

	setTimeout(() => {
		cooldownActive = false;
		teamCodeInput.dispatchEvent(new Event('input'));
	}, 400);
});

window.addEventListener("pageshow", () => teamCodeInput.dispatchEvent(new Event("input")));
window.addEventListener("load", () => teamCodeInput.dispatchEvent(new Event("input")));
