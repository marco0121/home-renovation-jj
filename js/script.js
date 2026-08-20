document.addEventListener("DOMContentLoaded", function () {


    // ========================================
    // MOBILE MENU
    // ========================================

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            function () {

                mainNav.classList.toggle("active");


                const isOpen =
                    mainNav.classList.contains("active");


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );


                menuToggle.textContent =
                    isOpen ? "✕" : "☰";


                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

            }
        );


        const navLinks =
            mainNav.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    mainNav.classList.remove("active");


                    menuToggle.textContent = "☰";


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        });

    }



    // ========================================
    // PROJECT FILTERS
    // ========================================

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    const projectCards =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(function (button) {


        button.addEventListener(
            "click",
            function () {


                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove("active");

                    }
                );


                button.classList.add("active");


                const selectedFilter =
                    button.getAttribute("data-filter");


                projectCards.forEach(
                    function (card) {


                        const categories =
                            card
                                .getAttribute("data-category")
                                .split(" ");


                        if (
                            selectedFilter === "all" ||
                            categories.includes(selectedFilter)
                        ) {

                            card.classList.remove("hidden");

                        } else {

                            card.classList.add("hidden");

                        }

                    }
                );

            }
        );

    });



    // ========================================
    // IMAGE MODAL
    // ========================================

    const modal =
        document.getElementById("imageModal");


    const modalImage =
        document.getElementById("modalImage");


    const closeModal =
        document.getElementById("closeModal");


    const previousImage =
        document.getElementById("previousImage");


    const nextImage =
        document.getElementById("nextImage");


    const galleryImages =
        Array.from(
            document.querySelectorAll(".project-image")
        );


    let currentImageIndex = 0;



    function openImage(index) {

        if (
            !modal ||
            !modalImage ||
            galleryImages.length === 0
        ) {

            return;

        }


        currentImageIndex = index;


        modalImage.src =
            galleryImages[currentImageIndex].src;


        modalImage.alt =
            galleryImages[currentImageIndex].alt;


        modal.classList.add("active");


        document.body.classList.add(
            "modal-open"
        );

    }



    function closeImageModal() {

        if (!modal) {
            return;
        }


        modal.classList.remove("active");


        document.body.classList.remove(
            "modal-open"
        );

    }



    function showPreviousImage() {

        currentImageIndex--;


        if (currentImageIndex < 0) {

            currentImageIndex =
                galleryImages.length - 1;

        }


        openImage(currentImageIndex);

    }



    function showNextImage() {

        currentImageIndex++;


        if (
            currentImageIndex >=
            galleryImages.length
        ) {

            currentImageIndex = 0;

        }


        openImage(currentImageIndex);

    }



    galleryImages.forEach(
        function (image, index) {


            image.addEventListener(
                "click",
                function () {

                    openImage(index);

                }
            );

        }
    );



    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeImageModal
        );

    }



    if (previousImage) {

        previousImage.addEventListener(
            "click",
            showPreviousImage
        );

    }



    if (nextImage) {

        nextImage.addEventListener(
            "click",
            showNextImage
        );

    }



    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {


                if (event.target === modal) {

                    closeImageModal();

                }

            }
        );

    }



    // ========================================
    // KEYBOARD CONTROLS FOR MODAL
    // ========================================

    document.addEventListener(
        "keydown",
        function (event) {


            if (
                !modal ||
                !modal.classList.contains("active")
            ) {

                return;

            }


            if (event.key === "Escape") {

                closeImageModal();

            }


            if (event.key === "ArrowLeft") {

                showPreviousImage();

            }


            if (event.key === "ArrowRight") {

                showNextImage();

            }

        }
    );



    // ========================================
    // ONLY ONE VIDEO AT A TIME
    // ========================================

    const videos =
        document.querySelectorAll(
            ".video-card video"
        );


    videos.forEach(function (video) {


        video.addEventListener(
            "play",
            function () {


                videos.forEach(
                    function (otherVideo) {


                        if (
                            otherVideo !== video &&
                            !otherVideo.paused
                        ) {

                            otherVideo.pause();

                        }

                    }
                );

            }
        );

    });



    // ========================================
    // ESTIMATE FORM -> WHATSAPP
    // ========================================

    const estimateForm =
        document.getElementById(
            "estimateForm"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (estimateForm) {


        estimateForm.addEventListener(
            "submit",
            function (event) {


                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById("phone")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();


                const service =
                    document
                        .getElementById("service")
                        .value;


                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();



                if (
                    name === "" ||
                    phone === "" ||
                    email === "" ||
                    service === "" ||
                    message === ""
                ) {


                    if (formMessage) {

                        formMessage.textContent =
                            "Please complete all fields.";

                    }


                    return;

                }



                const whatsappNumber =
                    "15596031452";



                const whatsappMessage =
                    "Hello Home Renovation JJ!" +
                    "\n\n" +
                    "I would like to request a free estimate." +
                    "\n\n" +
                    "Name: " + name +
                    "\n" +
                    "Phone: " + phone +
                    "\n" +
                    "Email: " + email +
                    "\n" +
                    "Service: " + service +
                    "\n\n" +
                    "Project Details:" +
                    "\n" +
                    message;



                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );



                if (formMessage) {

                    formMessage.textContent =
                        "Opening WhatsApp...";

                }



                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }



    // ========================================
    // CURRENT YEAR
    // ========================================

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    // ========================================
    // SMOOTH SCROLL
    // ========================================

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {


        link.addEventListener(
            "click",
            function (event) {


                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });



    // ========================================
    // HEADER EFFECT ON SCROLL
    // ========================================

    const header =
        document.querySelector(
            ".main-header"
        );


    if (header) {


        window.addEventListener(
            "scroll",
            function () {


                if (window.scrollY > 30) {


                    header.style.boxShadow =
                        "0 6px 25px rgba(0,0,0,0.40)";


                } else {


                    header.style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.25)";

                }

            }
        );

    }


});