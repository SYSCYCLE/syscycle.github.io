const keyboardOrder = "Q,W,E,R,T,Y,U,P,A,S,D,F,G,H,J,K,L,Z,C,V,B,N,M,2,3,4,5,6,7,8,9".split(",");
const teamCodeInput = document.getElementById("teamcode");
const tryButton = document.getElementById("tryButton");

// ... getPreviousChar ve decrementCode fonksiyonları aynı ...

// Buton durumunu kontrol eden fonksiyon
function updateButtonState() {
    const value = teamCodeInput.value.toUpperCase();
    tryButton.disabled = !(value.length >= 2 && value[0] === 'X');
}

// Input değiştiğinde
teamCodeInput.addEventListener("input", () => {
    teamCodeInput.value = teamCodeInput.value.toUpperCase(); // Büyük harfe çevir
    
    if (teamCodeInput.value.toLowerCase() === "help") {
        window.location.replace("help.html");
        return;
    }
    
    updateButtonState(); // Butonu güncelle
});

// Sayfa yüklendiğinde veya tarayıcıdan geri gelindiğinde (kritik çözüm)
window.addEventListener('load', updateButtonState);
window.addEventListener('pageshow', (e) => e.persisted && updateButtonState());

// Try butonu kodu aynı
tryButton.addEventListener("click", () => {
    const newCode = decrementCode(teamCodeInput.value.toUpperCase());
    teamCodeInput.value = newCode;
    window.location.href = `brawlstars://joinRoom?tag=${newCode}`;
});
