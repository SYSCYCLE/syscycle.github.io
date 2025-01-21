const keyboardOrder = "Q,W,E,R,T,Y,U,P,A,S,D,F,G,H,J,K,L,Z,C,V,B,N,M,2,3,4,5,6,7,8,9".split(",");
const teamCodeInput = document.getElementById("teamcode");
const tryButton = document.getElementById("tryButton");

// ... getPreviousChar ve decrementCode fonksiyonları aynı kalacak ...

function checkButtonState() {
    teamCodeInput.value = teamCodeInput.value.toUpperCase();

    if (teamCodeInput.value.toLowerCase() === "help") {
        window.location.replace("help.html");
    } else if (teamCodeInput.value.length >= 2 && teamCodeInput.value[0] === 'X') {
        tryButton.disabled = false;
    } else {
        tryButton.disabled = true;
    }
}

// Event listener'lar
document.addEventListener('DOMContentLoaded', checkButtonState);
window.addEventListener('pageshow', function(event) {
    if (event.persisted) checkButtonState();
});
teamCodeInput.addEventListener("input", checkButtonState);

// Try butonu click handler'ı aynı kalacak
tryButton.addEventListener("click", () => {
    let teamCode = teamCodeInput.value.toUpperCase();
    let newCode = decrementCode(teamCode);
    teamCodeInput.value = newCode;
    const brawlStarsLink = `brawlstars://joinRoom?tag=${newCode}`;
    window.location.href = brawlStarsLink;
});
