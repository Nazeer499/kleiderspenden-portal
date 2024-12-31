document.addEventListener("DOMContentLoaded", () => {
    const deliveryOption = document.getElementById("delivery-option");
    const stationFields = document.getElementById("station-fields");
    const pickupFields = document.getElementById("pickup-fields");
    const donationForm = document.getElementById("donation-form");
    const confirmationPage = document.getElementById("confirmation");

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

        // Daten aus dem Formular lesen
        const clothingType = document.getElementById(
            deliveryOption.value === "station" ? "clothing-type" : "clothing-type-pickup"
        ).value;
        const crisisArea = document.getElementById(
            deliveryOption.value === "station" ? "crisis-area" : "crisis-area-pickup"
        ).value;

        const date = new Date();
        const formattedDate = date.toLocaleDateString("de-DE");
        const formattedTime = date.toLocaleTimeString("de-DE");

        // Bestätigungsseite befüllen
        document.getElementById("confirm-clothing-type").textContent = clothingType;
        document.getElementById("confirm-crisis-area").textContent = crisisArea;
        document.getElementById("confirm-delivery-option").textContent =
            deliveryOption.options[deliveryOption.selectedIndex].text;
        document.getElementById("confirm-date").textContent = formattedDate;
        document.getElementById("confirm-time").textContent = formattedTime;

        // Formular verstecken und Bestätigungsseite anzeigen
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
