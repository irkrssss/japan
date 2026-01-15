// Регистрация плагина ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. ПРЕЛОАДЕР (Убираем черный экран после загрузки)
window.addEventListener("load", () => {
    const tl = gsap.timeline();
    
    tl.to(".loader", {
        duration: 1,
        y: "-100%",
        ease: "power4.inOut",
        delay: 0.5
    })
    .from("h1 .line", { // Анимация заголовка
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.5");
});

// 2. АНИМАЦИЯ ФОТО (ARTIFACT SECTION)
// Фото появляется с эффектом "проявки"
gsap.from(".main-photo", {
    scrollTrigger: {
        trigger: ".artifact-section",
        start: "top 70%", // Начинаем, когда верх секции на 70% экрана
        end: "bottom top",
        toggleActions: "play none none reverse"
    },
    scale: 1.4, // Зум
    filter: "blur(10px)", // Размытие
    duration: 1.5,
    ease: "power2.out"
});

// 3. СМЕНА ЦВЕТА ФОНА (Белый -> Черный)
// Находим все секции, у которых есть data-bgcolor
const sections = document.querySelectorAll("[data-bgcolor]");

sections.forEach((section) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top 50%", // Когда секция доходит до середины экрана
        end: "bottom 50%",
        onEnter: () => gsap.to("body", { backgroundColor: section.dataset.bgcolor, color: section.dataset.bgcolor === "#1a1a1a" ? "#ffffff" : "#111111" }),
        onEnterBack: () => gsap.to("body", { backgroundColor: section.dataset.bgcolor, color: section.dataset.bgcolor === "#1a1a1a" ? "#ffffff" : "#111111" })
    });
});

// 4. ПАРАЛЛАКС ЭФФЕКТ ДЛЯ "THE GAZE"
// Двигаем фото с разной скоростью
gsap.to(".parallax-fast", {
    yPercent: -20, // Движется быстрее вверх
    scrollTrigger: {
        trigger: ".gaze-section",
        scrub: true // Привязать к скроллу (smooth)
    }
});

gsap.to(".parallax-slow", {
    yPercent: 10, // Движется чуть медленнее вниз
    scrollTrigger: {
        trigger: ".gaze-section",
        scrub: true
    }
});

// Анимация красного иероглифа на фоне
gsap.to(".jap-big", {
    x: "100px", 
    scrollTrigger: {
        trigger: ".gaze-section",
        scrub: 1
    }
});
// 5. ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ
// Мы берем контейнер .horizontal-container и двигаем его влево
// пока пользователь скроллит вниз.

let sectionsHor = gsap.utils.toArray(".panel");

gsap.to(sectionsHor, {
  xPercent: -100 * (sectionsHor.length - 1), // Сдвигаем на (количество панелей - 1) * 100%
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-wrapper",
    pin: true, // "Прикалываем" блок к экрану
    scrub: 1,  // Плавная привязка к скроллу
    snap: 1 / (sectionsHor.length - 1), // Доводка до целого слайда (опционально)
    end: () => "+=" + document.querySelector(".horizontal-wrapper").offsetWidth // Длина скролла равна ширине блока
  }
});
