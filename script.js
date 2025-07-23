// Czekaj, aż cała zawartość strony (DOM) się załaduje
document.addEventListener('DOMContentLoaded', function() {
    
    // Znajdź główny kontener wizytówki
    const card = document.querySelector('.card-container');

    // Użyj małego opóźnienia, aby animacja była widoczna
    setTimeout(() => {
        // Dodaj klasę 'visible', która uruchomi animację w CSS
        card.classList.add('visible');
    }, 100);

});