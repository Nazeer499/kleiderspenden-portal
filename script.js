document.addEventListener("DOMContentLoaded", function () {
    const deliveryOption = document.getElementById("delivery-option");
    const stationFields = document.getElementById("station-fields");
    const pickupFields = document.getElementById("pickup-fields");
    const form = document.getElementById("donation-form");
    const confirmationSection = document.getElementById("confirmation");
    const confirmationDetails = document.getElementById("confirmation-details");
    const newDonationButton = document.getElementById("new-donation");

    if (!deliveryOption || !stationFields || !pickupFields || !form || !confirmationSection || !confirmationDetails || !newDonationButton) {
        console.error("Ein oder mehrere Elemente wurden nicht gefunden!");
        return;
    }

    // Felder initialisieren
    stationFields.style.display = deliveryOption.value === "station" ? "block" : "none";
    pickupFields.style.display = deliveryOption.value === "pickup" ? "block" : "none";

    deliveryOption.addEventListener("change", function () {
        stationFields.style.display = deliveryOption.value === "station" ? "block" : "none";
        pickupFields.style.display = deliveryOption.value === "pickup" ? "block" : "none";
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (deliveryOption.value === "pickup") {
            const pickupAddress = document.getElementById("pickup-address").value.trim();
            const postalCode = pickupAddress.split(" ")[0];
            const allowedPostalCode = "68";

            if (!pickupAddress || !/^\d{5}$/.test(postalCode)) {
                alert("Bitte geben Sie eine gültige Postleitzahl ein.");
                return;
            }

            if (!postalCode.startsWith(allowedPostalCode)) {
                alert("Die Abholadresse muss in der Nähe der Geschäftsstelle liegen (PLZ beginnt mit '68').");
                return;
            }
        }

        const clothingType = deliveryOption.value === "station"
            ? document.getElementById("clothing-type").value.trim()
            : document.getElementById("clothing-type-pickup").value.trim();

        if (!clothingType) {
            alert("Bitte geben Sie die Art der Kleidung an.");
            return;
        }

        const crisisArea = deliveryOption.value === "station"
            ? document.getElementById("crisis-area").value
            : document.getElementById("crisis-area-pickup").value;

        confirmationDetails.innerHTML = `
            <p><strong>Übergabeart:</strong> ${deliveryOption.options[deliveryOption.selectedIndex].text}</p>
            <p><strong>Art der Kleidung:</strong> ${clothingType}</p>
            <p><strong>Krisengebiet:</strong> ${crisisArea}</p>
        `;
        confirmationSection.style.display = "block";
        form.style.display = "none";
    });

    newDonationButton.addEventListener("click", function () {
        form.reset();
        stationFields.style.display = "none";
        pickupFields.style.display = "none";
        confirmationSection.style.display = "none";
        form.style.display = "block";
    });
});
confirmationDetails.innerHTML = `
    <p><strong>Übergabeart:</strong> ${deliveryOption.options[deliveryOption.selectedIndex].text}</p>
    <p><strong>Art der Kleidung:</strong> ${clothingType}</p>
    <p><strong>Krisengebiet:</strong> ${crisisArea}</p>
`;
