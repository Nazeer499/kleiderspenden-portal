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

        // Abholadresse validieren, wenn die Option "pickup" gewählt ist
        if (deliveryOption.value === "pickup") {
            const pickupAddress = document.getElementById("pickup-address").value; // Hier wird die Abholadresse angenommen

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
        }

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
