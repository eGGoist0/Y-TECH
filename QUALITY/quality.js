function calcul() {
    let volume = parseFloat(document.querySelector(".v").value);
    let currentPh = parseFloat(document.querySelector(".cp").value);
    let desiredPh = parseFloat(document.querySelector(".dp").value);
    let constant = parseFloat(document.querySelector(".cn").value);
    let resultDiv = document.querySelector(".result");

    if (isNaN(volume) || isNaN(currentPh) || isNaN(desiredPh) || isNaN(constant) || constant <= 0) {
        resultDiv.innerHTML = `<p style="color: red; font-weight: bold;">Enter valid values.</p>`;
        return;
    }

    let currentH = Math.pow(10, -currentPh);
    let desiredH = Math.pow(10, -desiredPh);
    let neededAmount = (volume * (currentH - desiredH) * 1000) / constant;
    
    if (Math.abs(neededAmount) < 0.0000001) {
        neededAmount = "Very small amount (~0 g) ";
    } else {
        neededAmount = Math.abs(neededAmount).toFixed(7);
    }

    let phDescriptions = [
        "<span style='color:#d9534f;'>Strong Acid</span> - Corrosive and harmful", 
        "<span style='color:#f0ad4e;'>Acidic</span> - Can cause irritation", 
        "<span style='color:#ffd700;'>Slightly Acidic</span> - Found in rainwater", 
        "<span style='color:#5cb85c;'>Neutral</span> - Safe for use", 
        "<span style='color:#5bc0de;'>Slightly Alkaline</span> - Common in minerals", 
        "<span style='color:#337ab7;'>Alkaline</span> - Can leave deposits", 
        "<span style='color:#6f42c1;'>Strong Alkali</span> - May harm skin"
    ];
    
    let phColors = [
        "#ff6666", "#ffb366", "#ffff66", "#66ff66", "#66ccff", "#3366ff", "#9966ff"
    ];
    
    function getPhCategory(ph) {
        if (ph < 3) return 0;
        if (ph < 6) return 1;
        if (ph < 7) return 2;
        if (ph === 7) return 3;
        if (ph < 9) return 4;
        if (ph < 12) return 5;
        return 6;
    }

    let currentCategory = getPhCategory(currentPh);
    let desiredCategory = getPhCategory(desiredPh);
    
    resultDiv.style.opacity = 0;
    resultDiv.innerHTML = `
        <p style="font-size: 18px; line-height: 2.5;"><strong>Required:</strong> <span style="color: #28a745; font-weight: bold;">${neededAmount} g</span></p>
        <p style="font-size: 16px; line-height: 2;"><strong>Current pH:</strong> ${currentPh} - ${phDescriptions[currentCategory]}</p>
        <p style="font-size: 16px; line-height: 2;"><strong>Target pH:</strong> ${desiredPh} - ${phDescriptions[desiredCategory]}</p>
        <div class="ph-wave"></div>
        <style>
            .ph-wave {
                width: 300px;
                height: 40px;
                border-radius: 10px;
                margin-top: 40px;
                border: none;
                background: linear-gradient(90deg, ${phColors[currentCategory]}, ${phColors[desiredCategory]});
                background-size: 400% 100%;
                animation: smoothWave 6s infinite linear;
            }
            @keyframes smoothWave {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        </style>
    `;
    setTimeout(() => {
        resultDiv.style.transition = "opacity 1s";
        resultDiv.style.opacity = 1;
    }, 100);
}
