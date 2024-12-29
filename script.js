// JavaScript zur Steuerung des Formulars
document.addEventListener("DOMContentLoaded", function () {
    const deliveryOption = document.getElementById("delivery-option");
    const stationFields = document.getElementById("station-fields");
    const pickupFields = document.getElementById("pickup-fields");

    // Funktion zur Steuerung der Sichtbarkeit
    deliveryOption.addEventListener("change", function () {
        if (deliveryOption.value === "station") {
            stationFields.style.display = "block";
            pickupFields.style.display = "none";
        } else if (deliveryOption.value === "pickup") {
            stationFields.style.display = "none";
            pickupFields.style.display = "block";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const deliveryOption = document.getElementById("delivery-option");
    const stationFields = document.getElementById("station-fields");
    const pickupFields = document.getElementById("pickup-fields");
    const form = document.getElementById("donation-form");

    // Zeige oder verstecke Felder basierend auf der Auswahl
    deliveryOption.addEventListener("change", () => {
        if (deliveryOption.value === "station") {
            stationFields.style.display = "block";
            pickupFields.style.display = "none";
        } else if (deliveryOption.value === "pickup") {
            stationFields.style.display = "none";
            pickupFields.style.display = "block";
        }
    });

    // Formularvalidierung und Überprüfung der Postleitzahl
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (deliveryOption.value === "pickup") {
            const pickupAddress = document.getElementById("pickup-address").value;
            const postalCode = pickupAddress.split(" ")[0]; // Erste Zahl im Feld
            const allowedPostalCode = "68"; // Beispiel: Geschäftsstelle in PLZ 68xxx

            if (!pickupAddress) {
                alert("Bitte geben Sie eine Abholadresse ein.");
                return;
            }

            if (!postalCode.startsWith(allowedPostalCode)) {
                alert("Die Abholadresse muss in der Nähe der Geschäftsstelle liegen (PLZ beginnt mit '68').");
                return;
            }
        }

        alert("Registrierung erfolgreich!");
        form.reset();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const deliveryOption = document.getElementById("delivery-option");
    const stationFields = document.getElementById("station-fields");
    const pickupFields = document.getElementById("pickup-fields");
    const form = document.getElementById("donation-form");
    const confirmationSection = document.getElementById("confirmation");
    const confirmationDetails = document.getElementById("confirmation-details");
    const newDonationButton = document.getElementById("new-donation");

    // Zeige oder verstecke Felder basierend auf der Auswahl
    deliveryOption.addEventListener("change", () => {
        if (deliveryOption.value === "station") {
            stationFields.style.display = "block";
            pickupFields.style.display = "none";
        } else if (deliveryOption.value === "pickup") {
            stationFields.style.display = "none";
            pickupFields.style.display = "block";
        }
    });

    // Formularvalidierung und Überprüfung der Postleitzahl
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (deliveryOption.value === "pickup") {
            const pickupAddress = document.getElementById("pickup-address").value;
            const postalCode = pickupAddress.split(" ")[0]; // Erste Zahl im Feld
            const allowedPostalCode = "68"; // Beispiel: Geschäftsstelle in PLZ 68xxx

            if (!pickupAddress) {
                alert("Bitte geben Sie eine Abholadresse ein.");
                return;
            }

            if (!postalCode.startsWith(allowedPostalCode)) {
                alert("Die Abholadresse muss in der Nähe der Geschäftsstelle liegen (PLZ beginnt mit '68').");
                return;
            }
        }

        // Daten sammeln und Bestätigung anzeigen
        const clothingType = deliveryOption.value === "station"
            ? document.getElementById("clothing-type").value
            : document.getElementById("clothing-type-pickup").value;
        const crisisArea = deliveryOption.value === "station"
            ? document.getElementById("crisis-area").value
            : document.getElementById("crisis-area-pickup").value;

        confirmationDetails.innerHTML = `
            <p><strong>Übergabeart:</strong> ${deliveryOption.options[deliveryOption.selectedIndex].text}</p>
            <p><strong>Art der Kleidung:</strong> ${clothingType}</p>
            <p><strong>Krisengebiet:</strong> ${crisisArea}</p>
            ${deliveryOption.value === "pickup" ? `<p><strong>Abholadresse:</strong> ${document.getElementById("pickup-address").value}</p>` : ""}
            <p><strong>Datum:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Uhrzeit:</strong> ${new Date().toLocaleTimeString()}</p>
        `;

        form.style.display = "none";
        confirmationSection.style.display = "block";
    });

    // Zurück zur Registrierung
    newDonationButton.addEventListener("click", () => {
        form.reset();
        form.style.display = "block";
        confirmationSection.style.display = "none";
    });
});

