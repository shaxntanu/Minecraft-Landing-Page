import './style.css'
import { animate, stagger, inView, hover, spring } from "motion";

console.log('Minecraft Project Loaded with Motion');

// Initial Page Load Animations
const initAnimations = () => {
    // 1. Navigation staggered entry
    animate(
        ".nav-item, .logo, .nav-actions",
        { opacity: [0, 1], y: [-20, 0] },
        { duration: 0.6, delay: stagger(0.1), easing: "ease-out" }
    );

    // 2. Hero Content Slide In
    animate(
        ".hero-overlay-box",
        { opacity: [0, 1], y: [50, 0] },
        { duration: 0.8, delay: 0.4, easing: [0.17, 0.55, 0.55, 1] }
    );

    // 3. Hero Background scale effect
    animate(
        ".hero-bg",
        { scale: [1.1, 1] },
        { duration: 1.5, easing: "ease-out" }
    );
};

// Scroll Animations
const setupScrollAnimations = () => {
    // Gallery Items Stagger
    inView(".gallery-track img", ({ target }) => {
        animate(
            target,
            { opacity: [0, 1], scale: [0.8, 1] },
            { duration: 0.5, easing: spring() }
        );
    });

    // Features Grid Staggered properties
    // We target the section to stagger its children
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card) => {
        // Set initial state
        (card as HTMLElement).style.opacity = "0";
        (card as HTMLElement).style.transform = "translateY(30px)";
    });

    inView(".features-grid", ({ target }) => {
        animate(
            target.querySelectorAll(".feature-card"),
            { opacity: 1, y: 0 },
            { duration: 0.5, delay: stagger(0.1) }
        );
    });

    // Game Cards specific reveal
    const gameCards = document.querySelectorAll(".game-card");
    gameCards.forEach((card) => {
        (card as HTMLElement).style.opacity = "0";
        (card as HTMLElement).style.transform = "scale(0.9)";
    });

    inView(".games-grid", ({ target }) => {
        animate(
            target.querySelectorAll(".game-card"),
            { opacity: 1, scale: 1 },
            { duration: 0.6, delay: stagger(0.15), easing: spring() }
        );
    });
};

// Interaction Animations
const setupInteractions = () => {
    // Hover effects for Buttons (Physics based)
    const buttons = document.querySelectorAll<HTMLElement>(".btn-primary, .btn-cta, .btn-buy");

    buttons.forEach((btn) => {
        hover(btn, (element) => {
            // Mouse enter
            const controls = animate(element, { scale: 1.05 }, { duration: 0.2, easing: "ease-out" });

            // Mouse leave (return function)
            return () => controls.stop();
        });

        // Click press effect
        btn.addEventListener("mousedown", () => {
            animate(btn, { scale: 0.95 }, { duration: 0.1 });
        });

        btn.addEventListener("mouseup", () => {
            animate(btn, { scale: 1.05 }, { duration: 0.1 });
        });
    });

    // Dropdown animations
    const dropdowns = document.querySelectorAll<HTMLElement>(".has-dropdown");

    dropdowns.forEach((item) => {
        const dropdownMenu = item.querySelector<HTMLElement>(".dropdown");
        if (dropdownMenu) {
            item.addEventListener("mouseenter", () => {
                animate(
                    dropdownMenu,
                    { opacity: 1, y: [10, 0], display: "block" },
                    { duration: 0.2 }
                );
            });

            item.addEventListener("mouseleave", () => {
                animate(
                    dropdownMenu,
                    { opacity: 0, y: 10, display: "none" },
                    { duration: 0.2 }
                );
            });
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setupScrollAnimations();
    setupInteractions();
});
