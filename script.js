document.getElementById("donation-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Verhindert das automatische Neuladen der Seite

    // Übergabeoption auslesen
    const deliveryOption = document.getElementById("delivery-option").value;

   if (!pickupAddress.startsWith("68")) {
    alert("Die Abholadresse muss mit 68 beginnen.");
    return;
}
 
    const allowedPostalCodes = ["68", "69", "67"];
    const postalCode = pickupAddress.substring(0, 2);

if (!allowedPostalCodes.includes(postalCode)) {
    alert("Die Abholadresse muss in einem erlaubten Bereich liegen: 68, 69, oder 67.");
    return;
}


    // Überprüfen, ob eine Übergabeoption gewählt wurde
    if (!deliveryOption) {
        alert("Bitte wähle eine Übergabeoption aus!");
        return; // Verhindert die weitere Verarbeitung
    }
    

    // Variablen für die Daten
    let clothingType = "";
    let crisisArea = "";
    let pickupAddress = "";

    // Daten basierend auf der Übergabeoption auslesen
    if (deliveryOption === "station") {
        // Geschäftsstelle: Felder auslesen
        clothingType = document.getElementById("clothing-type").value.trim();
        crisisArea = document.getElementById("crisis-area").value;
    } else if (deliveryOption === "pickup") {
        // Abholung: Felder auslesen
        clothingType = document.getElementById("clothing-type-pickup").value.trim();
        crisisArea = document.getElementById("crisis-area-pickup").value;
        pickupAddress = document.getElementById("pickup-address").value.trim();
    }

    // Überprüfen, ob das Feld "Art der Kleidung" korrekt befüllt ist
    if (!clothingType) {
        alert("Bitte gib die Art der Kleidung an!");
        return; // Verhindert die weitere Verarbeitung, wenn das Feld leer ist
    }

    // Bestätigung anzeigen
    alert(`
        Registrierung erfolgreich!
        Übergabeoption: ${deliveryOption === "station" ? "Geschäftsstelle" : "Abholung"}
        Art der Kleidung: ${clothingType}
        Krisengebiet: ${crisisArea}
        ${pickupAddress ? "Abholadresse: " + pickupAddress : ""}
    `);

    // Formular zurücksetzen
    document.getElementById("donation-form").reset();
    document.getElementById("station-fields").style.display = "none";
    document.getElementById("pickup-fields").style.display = "none";
});
