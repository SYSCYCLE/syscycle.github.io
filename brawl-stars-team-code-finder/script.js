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

document.addEventListener("DOMContentLoaded", function() {
    function checkInput() {
        if (teamCodeInput.value.toLowerCase() === "help") {
            window.location.replace("help.html");
        } else if (teamCodeInput.value.length >= 2 && teamCodeInput.value[0] === 'X') {
            tryButton.disabled = false;
        } else {
            tryButton.disabled = true;
        }
    }

    // İlk yüklemede input kontrolü
    checkInput();

    // Input alanında değişiklik olduğunda kontrol
    teamCodeInput.addEventListener("input", () => {
        teamCodeInput.value = teamCodeInput.value.toUpperCase();
        checkInput();
    });
});

tryButton.addEventListener("click", () => {
    let teamCode = teamCodeInput.value.toUpperCase();
    let newCode = decrementCode(teamCode);
    teamCodeInput.value = newCode;

    const brawlStarsLink = `brawlstars://joinRoom?tag=${newCode}`;
    window.location.href = brawlStarsLink;
});
