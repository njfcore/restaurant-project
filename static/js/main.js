/* ==========================================
   BELLA ITALIA
   Main JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       HEADER ON SCROLL
    ========================================== */

    const header = document.querySelector(".header");

    function updateHeader() {

        if (window.scrollY > 40) {
            header.classList.add("header--scrolled");
        } else {
            header.classList.remove("header--scrolled");
        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);



    /* ==========================================
       MOBILE MENU
    ========================================== */

    const toggle = document.querySelector(".header__toggle");
    const nav = document.querySelector(".header__nav");
    const backdrop = document.querySelector(".header__backdrop");
    const navLinks = document.querySelectorAll(".header__link");



    function openMenu() {

        nav.classList.add("is-open");

        backdrop.classList.add("is-visible");

        toggle.classList.add("is-active");

        document.body.classList.add("no-scroll");

        toggle.setAttribute("aria-expanded", "true");

    }



    function closeMenu() {

        nav.classList.remove("is-open");

        backdrop.classList.remove("is-visible");

        toggle.classList.remove("is-active");

        document.body.classList.remove("no-scroll");

        toggle.setAttribute("aria-expanded", "false");

    }



    if (toggle && nav && backdrop) {

        toggle.addEventListener("click", () => {

            if (nav.classList.contains("is-open")) {

                closeMenu();

            } else {

                openMenu();

            }

        });

    }



    backdrop.addEventListener("click", closeMenu);



    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });



    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });

});

// document.addEventListener("DOMContentLoaded", function () {

//     const starRating = document.querySelector(".star-rating");

//     if (!starRating) {
//         console.log("Star rating element not found.");
//         return;
//     }

//     const stars = starRating.querySelectorAll(".star-rating__star");
//     const ratingInput = document.querySelector("#id_rating");

//     if (!ratingInput) {
//         console.log("Rating input not found.");
//         return;
//     }

//     console.log("Star rating initialized.");

//     function updateStars(value) {

//         stars.forEach(function (star) {

//             const starValue = Number(star.dataset.value);

//             if (starValue <= value) {
//                 star.classList.add("is-active");
//             } else {
//                 star.classList.remove("is-active");
//             }

//         });
//     }

//     stars.forEach(function (star) {

//         star.addEventListener("mouseenter", function () {

//             const value = Number(star.dataset.value);

//             updateStars(value);

//         });

//         star.addEventListener("click", function () {

//             const value = Number(star.dataset.value);

//             ratingInput.value = value;

//             updateStars(value);

//             console.log("Selected rating:", value);

//         });

//     });

//     starRating.addEventListener("mouseleave", function () {

//         const currentValue = Number(ratingInput.value) || 0;

//         updateStars(currentValue);

//     });

//     const initialValue = Number(ratingInput.value) || 0;

//     updateStars(initialValue);

// });