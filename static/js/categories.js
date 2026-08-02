// Categories: make entire card clickable (progressive enhancement)
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function (e) {
            const link = this.querySelector('.category-link');
            if (!link) return;
            if (e.target.closest('a')) return;
            window.location.href = link.getAttribute('href');
        });
    });
});
