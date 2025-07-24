document.addEventListener('DOMContentLoaded', function() {

    // Płynne przewijanie do sekcji
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dodanie cienia do nawigacji podczas przewijania
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Symulacja wysłania formularza
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            
            // Prosta walidacja dla przykładu
            if (name.trim() === '' || document.getElementById('email').value.trim() === '' || document.getElementById('message').value.trim() === '') {
                 alert('Proszę wypełnić wszystkie pola formularza.');
                 return;
            }

            // Wyświetlenie komunikatu dla użytkownika
            alert(`Dziękujemy za wiadomość, ${name}! Skontaktujemy się z Tobą wkrótce.`);
            
            // Wyczyszczenie formularza
            contactForm.reset();
        });
    }

});
