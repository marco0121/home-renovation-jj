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

                }
            );

        });

    }


    // ========================================
    // ACTIVE MENU ON SCROLL
    // ========================================

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            "#mainNav a"
        );


    function updateActiveMenu() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active-link"
                );


                const href =
                    link.getAttribute("href");


                if (
                    href ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active-link"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveMenu
    );


    updateActiveMenu();


    // ========================================
    // PROJECT FILTERS
    // ========================================

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const selectedFilter =
                        button.getAttribute(
                            "data-filter"
                        );


                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    projectCards.forEach(
                        function (card) {

                            const categories =
                                card.getAttribute(
                                    "data-category"
                                );


                            if (
                                selectedFilter === "all" ||
                                categories.includes(
                                    selectedFilter
                                )
                            ) {

                                card.classList.remove(
                                    "hidden"
                                );

                            } else {

                                card.classList.add(
                                    "hidden"
                                );

                            }

                        }
                    );

                }
            );

        }
    );


    // ========================================
    // IMAGE GALLERY
    // ========================================

    const modal =
        document.getElementById(
            "imageModal"
        );

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const closeModal =
        document.getElementById(
            "closeModal"
        );

    const previousButton =
        document.getElementById(
            "previousImage"
        );

    const nextButton =
        document.getElementById(
            "nextImage"
        );


    let currentImageIndex = 0;

    let visibleImages = [];


    function updateVisibleImages() {

        visibleImages =
            Array.from(
                document.querySelectorAll(
                    ".project-card:not(.hidden) .project-image"
                )
            );

    }


    function showImage(index) {

        updateVisibleImages();


        if (
            visibleImages.length === 0
        ) {

            return;

        }


        if (index < 0) {

            index =
                visibleImages.length - 1;

        }


        if (
            index >=
            visibleImages.length
        ) {

            index = 0;

        }


        currentImageIndex =
            index;


        if (
            modalImage &&
            modal
        ) {

            modalImage.src =
                visibleImages[
                    currentImageIndex
                    ].src;


            modalImage.alt =
                visibleImages[
                    currentImageIndex
                    ].alt;


            modal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        }

    }


    function attachImageEvents() {

        const images =
            document.querySelectorAll(
                ".project-image"
            );


        images.forEach(
            function (image) {

                image.addEventListener(
                    "click",
                    function () {

                        updateVisibleImages();


                        const index =
                            visibleImages.indexOf(
                                image
                            );


                        if (
                            index !== -1
                        ) {

                            showImage(
                                index
                            );

                        }

                    }
                );

            }
        );

    }


    attachImageEvents();


    function closeImageModal() {

        if (!modal) {

            return;

        }


        modal.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeImageModal
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                showImage(
                    currentImageIndex + 1
                );

            }
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                showImage(
                    currentImageIndex - 1
                );

            }
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeImageModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !modal ||
                !modal.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeImageModal();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                showImage(
                    currentImageIndex + 1
                );

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                showImage(
                    currentImageIndex - 1
                );

            }

        }
    );


    // ========================================
    // FREE ESTIMATE FORM -> WHATSAPP
    // ========================================

    const estimateForm =
        document.getElementById(
            "estimateForm"
        );


    if (estimateForm) {

        estimateForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById(
                            "name"
                        )
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById(
                            "phone"
                        )
                        .value
                        .trim();


                const email =
                    document
                        .getElementById(
                            "email"
                        )
                        .value
                        .trim();


                const service =
                    document
                        .getElementById(
                            "service"
                        )
                        .value;


                const message =
                    document
                        .getElementById(
                            "message"
                        )
                        .value
                        .trim();


                const whatsappMessage =
                    "Hello Home Renovation JJ!" +

                    "\n\nI would like to request a free estimate." +

                    "\n\nName: " +
                    name +

                    "\nPhone: " +
                    phone +

                    "\nEmail: " +
                    email +

                    "\nService: " +
                    service +

                    "\n\nProject Details:" +

                    "\n" +
                    message;


                const encodedMessage =
                    encodeURIComponent(
                        whatsappMessage
                    );


                const whatsappNumber =
                    "15596301452";


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodedMessage;


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


});