const menuItems = [
    { 
        name: "Home", 
        link: "#",
        bgImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/Menu_01.jpg",
        largeImage: " https://www.itailor.com/landing/assets/iTailor/images/menu/home/Home.jpg",
        submenu: [] 
    },
    { 
        name: "Men's Clothing", 
        link: "#",
        bgImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/Menu_02.jpg",
        largeImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/men-clothing/custom-shirt.jpg", 
        submenu: ["Suits", "Shirts", "Pants", "Jackets", "Coats"]
    },
    { 
        name: "Women's Clothing", 
        link: "#", 
        active: true,
        bgImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/Menu_03.jpg",
        largeImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/women-clothing/women-suits.jpg",
        submenu: ["Tailored Women Suits", "Women Coats", "Custom Blouses", "Custom Blazers/Jackets", "Custom Pants"]
    },
    { 
        name: "Collection", 
        link: "#",
        bgImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/Menu_04.jpg",
        largeImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/collection/Shirt-Collection.jpg",
        submenu: ["New Arrivals", "Best Sellers", "Limited Edition"]
    },
    { 
        name: "Accessories", 
        link: "#",
        bgImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/Menu_05.jpg",
        largeImage: "",
        submenu: ["Neckties", "Cufflinks", "Pocket Squares"]
    },
    { 
        name: "Shoes", 
        link: "#",
        bgImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/Menu_06.jpg",
        largeImage: "",
        submenu: ["Formal Shoes", "Loafers", "Boots"]
    },
    { 
        name: "Style of the Week", 
        link: "#",
        bgImage: "https://www.itailor.com/landing/assets/iTailor/images/menu/Menu_07.jpg",
        largeImage: "",
        submenu: []
    }
];

const socialLinks = [
    { icon: "fab fa-facebook-f", link: "#" },
    { icon: "fab fa-twitter", link: "#" },
    { icon: "fab fa-pinterest-p", link: "#" },
    { icon: "fab fa-youtube", link: "#" },
    { icon: "fab fa-linkedin-in", link: "#" },
    { icon: "fab fa-google-plus-g", link: "#" }
];

// Select DOM elements
const navList = document.getElementById('nav-list');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('overlay'); // Note: Overlay used for click-away but we are changing bg on interaction
const appBg = document.getElementById('app-bg');
const submenuPanel = document.getElementById('submenu-panel');

// State
let activeIndex = 2; // Default to Women's clothing per example

// Function to render menu items dynamically
function renderMenu() {
    navList.innerHTML = ''; // Clear existing
    menuItems.forEach((item, index) => {
        const li = document.createElement('li');
        
        // Background Strip Image
        const bgImg = document.createElement('img');
        bgImg.src = item.bgImage;
        bgImg.classList.add('nav-bg-strip');
        li.appendChild(bgImg);

        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.name;
        li.appendChild(a);

        // Hover Event with explicit handling
        li.addEventListener('mouseenter', () => {
            updateActiveState(index);
        });

        // Add stagger effect for animation
        li.style.transitionDelay = `${index * 0.05 + 0.2}s`; 

        navList.appendChild(li);
    });

    // Initialize with active item
    updateActiveState(activeIndex);
}

function updateActiveState(index) {
    if (index >= 0 && index < menuItems.length) {
        activeIndex = index;
        
        // Update List Items Style
        const lis = navList.querySelectorAll('li');
        lis.forEach((li, i) => {
            if (i === index) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });

        // Update Fullscreen Background
        if (menuItems[index].largeImage) {
            appBg.style.backgroundImage = `url('${menuItems[index].largeImage}')`;
            appBg.style.backgroundColor = 'transparent';
        } else {
            appBg.style.backgroundImage = 'none';
            appBg.style.backgroundColor = '#000';
        }

        // Update Submenu
        updateSubmenu(menuItems[index].submenu);
    }
}

function updateSubmenu(items) {
    submenuPanel.innerHTML = ''; // Clear
    
    if (items && items.length > 0) {
        submenuPanel.classList.add('active');
        
        const ul = document.createElement('ul');
        ul.classList.add('submenu-list');
        
        // Add Header? Maybe just list items
        items.forEach((subItem, idx) => {
            const li = document.createElement('li');
            li.style.animation = `fadeInRight 0.3s ease forwards ${idx * 0.1}s`;
            li.style.opacity = '0'; // For animation
            if (idx === 0) li.classList.add('header-item'); // Assuming first is title-like or just styling all same

            const a = document.createElement('a');
            a.href = "#";
            a.innerHTML = idx === 0 ? `${subItem} <i class="fas fa-caret-right"></i>` : subItem; // add arrow to first or just text
            // Per image 2, top one "TAILORED WOMEN SUITS" has a caret
            
            li.appendChild(a);
            ul.appendChild(li);
        });
        
        submenuPanel.appendChild(ul);
    } else {
        submenuPanel.classList.remove('active');
    }
}

// Function to toggle sidebar
function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Animate items on open
    if (sidebar.classList.contains('active')) {
        const lis = navList.querySelectorAll('li');
        lis.forEach((li, index) => {
             li.style.opacity = '0';
             li.style.transform = 'translateY(10px)';
             void li.offsetWidth; // Trigger reflow
             li.style.opacity = '1';
             li.style.transform = 'translateY(0)';
        });
        
        // Trigger initial active state render
        updateActiveState(activeIndex);
    } else {
        // Reset sub panel when closing main menu?
        submenuPanel.classList.remove('active');
    }
}

// Function to close sidebar
function closeMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inject keyframes for submenu if not in CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }
    `;
    document.head.appendChild(styleSheet);

    renderMenu();

    menuToggle.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMenu();
        }
    });
});
