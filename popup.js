document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('popup-btn');
    const closeBtn = document.getElementById('close-btn');
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('overlay');

    // Function to open drawer
    function openDrawer() {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close drawer
    function closeDrawer() {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    // Event Listeners
    if (openBtn) {
        openBtn.addEventListener('click', openDrawer);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
    }

    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeDrawer);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            closeDrawer();
        }
    });
});
