<script>
document.getElementById("donation-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Verhindert das automatische Neuladen der Seite

    // Übergabeoption auslesen
    const deliveryOption = document.getElementById("delivery-option").value;

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

        // Postleitzahl validieren
        const postalCode = pickupAddress.split(" ")[0];
        const allowedPostalCodePrefix = "68";

        if (!pickupAddress || !postalCode.startsWith(allowedPostalCodePrefix)) {
            alert("Die Abholadresse muss in der Nähe der Geschäftsstelle liegen (PLZ beginnt mit '68').");
            return; 
        }
    }

    // Überprüfen, ob das Feld "Art der Kleidung" korrekt befüllt ist
    if (!clothingType) {
        alert("Bitte gib die Art der Kleidung an!");
        return; 
    }

    // Datum und Uhrzeit abrufen
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("de-DE");
    const formattedTime = currentDate.toLocaleTimeString("de-DE");

    // Daten auf der Bestätigungsseite anzeigen
    document.getElementById("confirm-clothing-type").textContent = clothingType;
    document.getElementById("confirm-crisis-area").textContent = crisisArea;
    document.getElementById("confirm-delivery-option").textContent =
        deliveryOption === "station" ? "Geschäftsstelle" : "Abholung";
    document.getElementById("confirm-location").textContent =
        deliveryOption === "station" ? "Geschäftsstelle" : pickupAddress;
    document.getElementById("confirm-date").textContent = formattedDate;
    document.getElementById("confirm-time").textContent = formattedTime;

    // Formular ausblenden und Bestätigungsseite anzeigen
    document.getElementById("donation-form").style.display = "none";
    document.getElementById("confirmation-page").style.display = "block";
});

// Funktion zum Zurücksetzen des Formulars
function restartForm() {
    document.getElementById("donation-form").reset();
    document.getElementById("donation-form").style.display = "block";
    document.getElementById("confirmation-page").style.display = "none";
    document.getElementById("station-fields").style.display = "none";
    document.getElementById("pickup-fields").style.display = "none";
}
</script>
