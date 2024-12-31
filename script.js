document.addEventListener("DOMContentLoaded", () => {
    const deliveryOption = document.getElementById("delivery-option");
    const stationFields = document.getElementById("station-fields");
    const pickupFields = document.getElementById("pickup-fields");
    const donationForm = document.getElementById("donation-form");
    const confirmationPage = document.getElementById("confirmation");

    const officePostalCode = "68"; // Die ersten beiden Stellen der Geschäftsstelle-Postleitzahl

    deliveryOption.addEventListener("change", () => {
        if (deliveryOption.value === "station") {
            stationFields.style.display = "block";
            pickupFields.style.display = "none";
        } else if (deliveryOption.value === "pickup") {
            stationFields.style.display = "none";
            pickupFields.style.display = "block";
        } else {
            stationFields.style.display = "none";
            pickupFields.style.display = "none";
        }
    });

    donationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let clothingType = "";
        let crisisArea = "";
        let pickupAddress = "";

        // Daten je nach Übergabeoption auslesen
        if (deliveryOption.value === "station") {
            clothingType = document.getElementById("clothing-type").value.trim();
            crisisArea = document.getElementById("crisis-area").value;
        } else if (deliveryOption.value === "pickup") {
            clothingType = document.getElementById("clothing-type-pickup").value.trim();
            crisisArea = document.getElementById("crisis-area-pickup").value;
            pickupAddress = document.getElementById("pickup-address").value.trim();
        }

        // Überprüfen, ob die Art der Kleidung angegeben wurde
        if (!clothingType) {
            alert("Bitte gib die Art der Kleidung an!");
            return;
        }

        // Überprüfen der Postleitzahl bei Abholung
        if (deliveryOption.value === "pickup") {
            const postalCodeMatch = pickupAddress.match(/\b\d{5}\b/); // Suche nach 5-stelliger Postleitzahl
            if (!postalCodeMatch) {
                alert("Bitte geben Sie eine gültige Postleitzahl in der Abholadresse an.");
                return;
            }

            const pickupPostalCode = postalCodeMatch[0].substring(0, 2); // Extrahiere die ersten beiden Stellen
            if (pickupPostalCode !== officePostalCode) {
                alert(
                    "Die Abholadresse liegt nicht in der Nähe der Geschäftsstelle. Bitte überprüfen Sie die Postleitzahl."
                );
                return;
            }
        }

       
