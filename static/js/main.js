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