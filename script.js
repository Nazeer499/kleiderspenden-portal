document.addEventListener("DOMContentLoaded", () => {
    const deliveryOption = document.getElementById("delivery-option");
    const stationFields = document.getElementById("station-fields");
    const pickupFields = document.getElementById("pickup-fields");
    const donationForm = document.getElementById("donation-form");
    const confirmationPage = document.getElementById("confirmation");

    const officePostalCode = "68"; // Die ersten beiden Stellen der Postleitzahl der Geschäftsstelle

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

        const clothingType = document.getElementById(
            deliveryOption.value === "station" ? "clothing-type" : "clothing-type-pickup"
        ).value;
        const crisisArea = document.getElementById(
            deliveryOption.value === "station" ? "crisis-area" : "crisis-area-pickup"
        ).value;

        if (deliveryOption.value === "pickup") {
            const pickupAddress = document.getElementById("pickup-address").value;
            const postalCodeMatch = pickupAddress.match(/\b\d{5}\b/); // Extrahiert eine 5-stellige Postleitzahl

            if (!postalCodeMatch) {
                alert("Bitte geben Sie eine gültige Postleitzahl in der Abholadresse an.");
                return;
            }

            const pickupPostalCode = postalCodeMatch[0].substring(0, 2); // Extrahiert die ersten beiden Stellen
            if (pickupPostalCode !== officePostalCode) {
                alert(
                    "Die Abholadresse liegt nicht in der Nähe der Geschäftsstelle. Bitte überprüfen Sie die Postleitzahl."
                );
                return;
            }
        }

        const date = new Date();
        const formattedDate = date.toLocaleDateString("de-DE");
        const formattedTime = date.toLocaleTimeString("de-DE");

        document.getElementById("confirm-clothing-type").textContent = clothingType;
        document.getElementById("confirm-crisis-area").textContent = crisisArea;
        document.getElementById("confirm-delivery-option").textContent =
            deliveryOption.options[deliveryOption.selectedIndex].text;
        document.getElementById("confirm-date").textContent = formattedDate;
        document.getElementById("confirm-time").textContent = formattedTime;

        donationForm.style.display = "none";
        confirmationPage.style.display = "block";
    });

    document.getElementById("new-donation").addEventListener("click", () => {
        donationForm.reset();
        donationForm.style.display = "block";
        confirmationPage.style.display = "none";
        stationFields.style.display = "none";
        pickupFields.style.display = "none";
    });
});
