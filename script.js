document.addEventListener("DOMContentLoaded", function () {
    // Elemente aus dem DOM holen
    const deliveryOption = document.getElementById("delivery-option");
    const stationFields = document.getElementById("station-fields");
    const pickupFields = document.getElementById("pickup-fields");
    const form = document.getElementById("donation-form");
    const confirmationSection = document.getElementById("confirmation");
    const confirmationDetails = document.getElementById("confirmation-details");
    const newDonationButton = document.getElementById("new-donation");

    // Überprüfen, ob alle Elemente gefunden wurden
    if (!deliveryOption || !stationFields || !pickupFields || !form || !confirmationSection || !confirmationDetails || !newDonationButton) {
        console.error("Ein oder mehrere Elemente wurden nicht gefunden!");
        return;
    }

    // Initialisierung beim Laden der Seite
    window.addEventListener("load", function () {
        if (deliveryOption.value === "station") {
            stationFields.style.display = "block";
            pickupFields.style.display = "none";
        } else if (deliveryOption.value === "pickup") {
            stationFields.style.display = "none";
            pickupFields.style.display = "block";
        }
    });

    // Zeige oder verstecke Felder basierend auf der Auswahl
    deliveryOption.addEventListener("change", function () {
        if (deliveryOption.value === "station") {
            stationFields.style.display = "block";
            pickupFields.style.display = "none";
        } else if (deliveryOption.value === "pickup") {
            stationFields.style.display = "none";
            pickupFields.style.display = "block";
        }
    });

    // Formularvalidierung und Überprüfung der Postleitzahl
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Überprüfung der Abholadresse, wenn "Abholung" ausgewählt ist
        if (deliveryOption.value === "pickup") {
            const pickupAddress = document.getElementById("pickup-address").value.trim();
            const postalCodeMatch = pickupAddress.match(/^\d+/); // Extrahiert die PLZ am Anfang der Adresse
            const allowedPostalCode = "68"; // Beispiel: Geschäftsstelle in PLZ 68xxx

            if (!pickupAddress) {
                alert("Bitte geben Sie eine Abholadresse ein.");
                return;
            }

            if (!postalCodeMatch || !postalCodeMatch[0].startsWith(allowedPostalCode)) {
                alert("Die Abholadresse muss in der Nähe der Geschäftsstelle liegen (PLZ beginnt mit '68').");
                return;
            }
        }

        // Daten sammeln
        const clothingType = deliveryOption.value === "station"
            ? document.getElementById("clothing-type").value.trim()
            : document.getElementById("clothing-type-pickup").value.trim();
        const crisisArea = deliveryOption.value === "station"
            ? document.getElementById("crisis-area").value
            : document.getElementById("crisis-area-pickup").value;

        // Überprüfung der Kleidungsart
        if (!clothingType) {
            alert("Bitte geben Sie die Art der Kleidung an.");
            return;
        }

        // Bestätigungsdetails anzeigen
        confirmationDetails.innerHTML = `
            <p><strong>Übergabeart:</strong> ${deliveryOption.options[deliveryOption.selectedIndex].text}</p>
            <p><strong>Art der Kleidung:</strong> ${clothingType}</p>
            <p><strong>Krisengebiet:</strong> ${crisisArea}</p>
            ${deliveryOption.value === "pickup" ? `<p><strong>Abholadresse:</strong> ${document.getElementById("pickup-address").value}</p>` : ""}
            <p><strong>Datum:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Uhrzeit:</strong> ${new Date().toLocaleTimeString()}</p>
        `;

        // Formular ausblenden und Bestätigung anzeigen
        form.style.display = "none";
        confirmationSection.style.display = "block";
    });

    // Neue Spende registrieren
    newDonationButton.addEventListener("click", function () {
        // Bestätigung ausblenden und Formular zurücksetzen
        confirmationSection.style.display = "none";
        form.style.display = "block";
        form.reset();

        // Felder basierend auf der ausgewählten Option anzeigen
        if (deliveryOption.value === "station") {
            stationFields.style.display = "block";
            pickupFields.style.display = "none";
        } else if (deliveryOption.value === "pickup") {
            stationFields.style.display = "none";
            pickupFields.style.display = "block";
        }
    });
});
