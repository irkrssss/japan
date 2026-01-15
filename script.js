// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. LOADER ANIMATION
window.addEventListener("load", () => {
    const tl = gsap.timeline();
    
    tl.to(".loader", {
        duration: 1,
        y: "-100%",
        ease: "power4.inOut",
        delay: 0.5
    })
    .from("h1 .line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.5");
});

// 2. ARTIFACT REVEAL
gsap.from(".main-photo", {
    scrollTrigger: {
        trigger: ".artifact-section",
        start: "top 70%",
        end: "bottom top",
        toggleActions: "play none none reverse"
    },
    scale: 1.4,
    filter: "blur(10px)",
    duration: 1.5,
    ease: "power2.out"
});

// 3. BACKGROUND COLOR CHANGER
const sections = document.querySelectorAll("[data-bgcolor]");

sections.forEach((section) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => gsap.to("body", { backgroundColor: section.dataset.bgcolor, color: section.dataset.bgcolor === "#1a1a1a" ? "#ffffff" : "#111111" }),
        onEnterBack: () => gsap.to("body", { backgroundColor: section.dataset.bgcolor, color: section.dataset.bgcolor === "#1a1a1a" ? "#ffffff" : "#111111" })
    });
});

// 4. PARALLAX EFFECT (THE GAZE)
gsap.to(".parallax-fast", {
    yPercent: -20,
    scrollTrigger: {
        trigger: ".gaze-section",
        scrub: true
    }
});

gsap.to(".parallax-slow", {
    yPercent: 10,
    scrollTrigger: {
        trigger: ".gaze-section",
        scrub: true
    }
});

gsap.to(".jap-big", {
    x: "100px", 
    scrollTrigger: {
        trigger: ".gaze-section",
        scrub: 1
    }
});

// 5. HORIZONTAL SCROLL
let sectionsHor = gsap.utils.toArray(".panel");

gsap.to(sectionsHor, {
  xPercent: -100 * (sectionsHor.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-wrapper",
    pin: true,
    anticipatePin: 1, // Fix for mobile flicker
    scrub: 1,
    end: () => "+=" + document.querySelector(".horizontal-wrapper").offsetWidth
  }
});
