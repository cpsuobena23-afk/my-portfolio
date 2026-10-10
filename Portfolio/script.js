
document.addEventListener("DOMContentLoaded", () => {
    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });

    // TYPING EFFECT
    const typingText = document.getElementById("typingText");
    const words = ["Designer", "Creative Thinker", "Web Creator"];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            typingText.textContent = "Designer";
            return;
        }

        const currentWord = words[wordIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingText.textContent = currentWord.substring(0, characterIndex);

        let delay = deleting ? 55 : 100;

        if (!deleting && characterIndex === currentWord.length) {
            deleting = true;
            delay = 1400;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }

        window.setTimeout(typeEffect, delay);
    }

    typeEffect();

    // SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // ACTIVE NAVIGATION WHILE SCROLLING
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            const isActive =
                                link.getAttribute("href") ===
                                "#" + entry.target.id;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // BACK TO TOP BUTTON
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // AUTOMATIC COPYRIGHT YEAR
    document.getElementById("year").textContent =
        new Date().getFullYear();

    // CONTACT FORM
    // This opens the visitor's email app; it does not send directly
    // from the website or store messages on a server.
    const contactForm = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");

    // IMPORTANT: Replace this with your actual email address.
    const recipientEmail = "your.email@example.com";

    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formNote.textContent = "Please complete all fields.";
            return;
        }

        const emailSubject = encodeURIComponent(subject);
        const emailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const mailtoLink =
            "mailto:" + recipientEmail +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        formNote.textContent =
            "Opening your email app. Please send the message there.";

        window.location.href = mailtoLink;
    });
});
