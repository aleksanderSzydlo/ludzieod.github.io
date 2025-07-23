document.addEventListener('DOMContentLoaded', function() {

    // Funkcja do płynnego pojawiania się paneli
    const panelObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Panel pojawi się, gdy będzie widoczny w 10%
    });

    // Obserwuj wszystkie sekcje z klasą .panel
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        panelObserver.observe(panel);
    });

    // Płynne przewijanie dla linków-kotwic
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Symulacja wysyłania formularza (w statycznej stronie nie można wysłać maila bez zewnętrznej usługi)
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Zapobiegaj przeładowaniu strony
            alert('Dziękujemy za wiadomość! Wkrótce się skontaktujemy.');
            form.reset(); // Wyczyść pola formularza
        });
    }
});