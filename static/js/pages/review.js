document.addEventListener("DOMContentLoaded", function () {

    const starRating = document.querySelector(".star-rating");

    // اگر صفحه Review نیست، کاری انجام نده
    if (!starRating) {
        return;
    }

    const stars = starRating.querySelectorAll(".star-rating__star");
    const ratingInput = document.querySelector("#id_rating");

    if (!ratingInput) {
        return;
    }

    function updateStars(value) {

        stars.forEach(function (star) {

            const starValue = Number(star.dataset.value);

            star.classList.toggle(
                "is-active",
                starValue <= value
            );

        });
    }

    stars.forEach(function (star) {

        star.addEventListener("mouseenter", function () {

            const value = Number(star.dataset.value);

            updateStars(value);
        });

        star.addEventListener("click", function () {

            const value = Number(star.dataset.value);

            ratingInput.value = value;

            updateStars(value);
        });
    });

    starRating.addEventListener("mouseleave", function () {

        const currentValue = Number(ratingInput.value) || 0;

        updateStars(currentValue);
    });

    // مقدار اولیه؛ مخصوصاً برای Edit Review
    const initialValue = Number(ratingInput.value) || 0;

    updateStars(initialValue);
});