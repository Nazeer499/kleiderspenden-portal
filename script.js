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
