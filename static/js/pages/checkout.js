document.addEventListener("DOMContentLoaded", () => {

    const orderTypeInputs = document.querySelectorAll(
        'input[name="order_type"]'
    );

    const addressGroup = document.getElementById(
        "delivery-address-group"
    );

    const addressInput = document.getElementById(
        "id_address"
    );


    if (!orderTypeInputs.length || !addressGroup || !addressInput) {
        return;
    }


    function updateAddressField() {

        const selectedOrderType = document.querySelector(
            'input[name="order_type"]:checked'
        );


        if (!selectedOrderType) {
            addressGroup.hidden = true;
            addressInput.required = false;

            return;
        }


        const isDelivery =
            selectedOrderType.value === "delivery";


        addressGroup.hidden = !isDelivery;

        addressInput.required = isDelivery;


        if (!isDelivery) {
            addressInput.value = "";
        }
    }


    orderTypeInputs.forEach((input) => {

        input.addEventListener(
            "change",
            updateAddressField
        );

    });


    updateAddressField();

});