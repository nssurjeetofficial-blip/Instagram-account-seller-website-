document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // 1. WHATSAPP SETTINGS
    // ========================================

    // Replace with your WhatsApp number.
    // Include country code, without +, spaces or dashes.
    const WHATSAPP_NUMBER = "918700949041";


    // ========================================
    // 2. AUTOMATIC FOOTER YEAR
    // ========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ========================================
    // 3. SEARCH AND CATEGORY FILTERS
    // ========================================

    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const listingCards = document.querySelectorAll(".listing-card");

    let selectedCategory = "all";

    function filterListings() {

        const searchTerm = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        listingCards.forEach(function (card) {

            const category = card.dataset.category || "";
            const cardText = card.textContent.toLowerCase();

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const matchesSearch =
                cardText.includes(searchTerm);

            card.style.display =
                matchesCategory && matchesSearch ? "" : "none";

        });
    }


    // Category buttons

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedCategory = button.dataset.category || "all";

            filterListings();

        });

    });


    // Search input

    if (searchInput) {
        searchInput.addEventListener("input", filterListings);
    }


    // ========================================
    // 4. WHATSAPP INQUIRY FUNCTION
    // ========================================

    function openWhatsApp(message) {

        // Check whether a real number has been entered.
        if (
            !WHATSAPP_NUMBER ||
            WHATSAPP_NUMBER.includes("X") ||
            !/^\d+$/.test(WHATSAPP_NUMBER)
        ) {
            alert(
                "Please add your WhatsApp number in script.js first."
            );
            return;
        }

        const encodedMessage = encodeURIComponent(message);

        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodedMessage;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

    }


    // ========================================
    // 5. ADD INQUIRY BUTTON TO EACH PROFILE
    // ========================================

    listingCards.forEach(function (card) {

        const listingTitle = card.querySelector("h3");

        if (!listingTitle) {
            return;
        }

        const profileName = listingTitle.textContent.trim();

        // Avoid creating the same button more than once.
        if (card.querySelector(".whatsapp-inquiry-btn")) {
            return;
        }

        const inquiryButton = document.createElement("button");

        inquiryButton.type = "button";
        inquiryButton.className =
            "btn btn-primary full-width whatsapp-inquiry-btn";

        inquiryButton.textContent = "WhatsApp Inquiry ↗";

        inquiryButton.addEventListener("click", function () {

            const message =
                "Hello! I am interested in learning more about the " +
                profileName +
                " listing on InstaVault. Please share more details.";

            openWhatsApp(message);

        });

        // Place the inquiry button after the existing card content.
        const listingContent = card.querySelector(".listing-content");

        if (listingContent) {
            listingContent.appendChild(inquiryButton);
        }

    });


    // ========================================
    // 6. GENERAL WEBSITE WHATSAPP BUTTON
    // ========================================

    const contactSection = document.querySelector(".cta-content");

    if (
        contactSection &&
        !contactSection.querySelector(".whatsapp-general-btn")
    ) {

        const contactButton = document.createElement("button");

        contactButton.type = "button";
        contactButton.className =
            "btn btn-primary whatsapp-general-btn";

        contactButton.textContent = "Send an Inquiry on WhatsApp ↗";

        contactButton.addEventListener("click", function () {

            openWhatsApp(
                "Hello! I would like to know more about InstaVault and its creator collaboration services."
            );

        });

        contactSection.appendChild(contactButton);

    }

});
