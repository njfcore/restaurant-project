/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const galleryLightbox = document.getElementById("galleryLightbox");

    if (!galleryLightbox) {
        return;
    }


    const galleryButtons = document.querySelectorAll(
        "[data-gallery-image]"
    );

    const closeButtons = galleryLightbox.querySelectorAll(
        "[data-lightbox-close]"
    );

    const lightboxImage = galleryLightbox.querySelector(
        ".gallery-lightbox__image"
    );

    const lightboxCategory = galleryLightbox.querySelector(
        ".gallery-lightbox__category"
    );

    const lightboxTitle = galleryLightbox.querySelector(
        ".gallery-lightbox__title"
    );

    const lightboxDescription = galleryLightbox.querySelector(
        ".gallery-lightbox__description"
    );


    /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

    const openLightbox = (button) => {

        const imageUrl = button.dataset.galleryImage;
        const title = button.dataset.galleryTitle || "";
        const description = button.dataset.galleryDescription || "";

        const card = button.closest(".gallery-card");

        const category = card
            ? card.querySelector(".gallery-card__category")?.textContent.trim()
            : "";


        /* ---------------------------------------------
           IMAGE
        --------------------------------------------- */

        lightboxImage.src = imageUrl;

        lightboxImage.alt = title;


        /* ---------------------------------------------
           CONTENT
        --------------------------------------------- */

        lightboxTitle.textContent = title;

        lightboxCategory.textContent = category;

        lightboxDescription.textContent = description;


        /* ---------------------------------------------
           DESCRIPTION VISIBILITY
        --------------------------------------------- */

        if (description) {

            lightboxDescription.style.display = "";

        } else {

            lightboxDescription.style.display = "none";

        }


        /* ---------------------------------------------
           OPEN
        --------------------------------------------- */

        galleryLightbox.classList.add("is-open");

        galleryLightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        /* ---------------------------------------------
           PREVENT PAGE SCROLL
        --------------------------------------------- */

        document.body.style.overflow = "hidden";


        /* ---------------------------------------------
           FOCUS CLOSE BUTTON
        --------------------------------------------- */

        const closeButton = galleryLightbox.querySelector(
            ".gallery-lightbox__close"
        );

        if (closeButton) {
            closeButton.focus();
        }

    };


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    const closeLightbox = () => {

        galleryLightbox.classList.remove("is-open");

        galleryLightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        /* ---------------------------------------------
           RESTORE PAGE SCROLL
        --------------------------------------------- */

        document.body.style.overflow = "";


        /* ---------------------------------------------
           RESET IMAGE
        --------------------------------------------- */

        lightboxImage.src = "";

        lightboxImage.alt = "";


        /* ---------------------------------------------
           RESET CONTENT
        --------------------------------------------- */

        lightboxCategory.textContent = "";

        lightboxTitle.textContent = "";

        lightboxDescription.textContent = "";

        lightboxDescription.style.display = "";

    };


    /* =====================================================
       GALLERY BUTTON EVENTS
    ===================================================== */

    galleryButtons.forEach((button) => {

        button.addEventListener("click", () => {

            openLightbox(button);

        });

    });


    /* =====================================================
       CLOSE BUTTON / BACKDROP
    ===================================================== */

    closeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            closeLightbox();

        });

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            galleryLightbox.classList.contains("is-open")
        ) {

            closeLightbox();

        }

    });

});