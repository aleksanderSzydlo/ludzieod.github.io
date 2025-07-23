document.addEventListener('DOMContentLoaded', function() {

    const header = document.getElementById('header');
    
    // Funkcja dodająca tło do nagłówka podczas przewijania
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { // Jeśli przewinięto więcej niż 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Funkcja do płynnego pojawiania się paneli (bez zmian)
    const panelObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        panelObserver.observe(panel);
    });

    // Płynne przewijanie dla linków-kotwic (bez zmian)
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

    // Symulacja wysyłania formularza (bez zmian)
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Dziękujemy za wiadomość! Wkrótce się skontaktujemy.');
            form.reset();
        });
    }
});