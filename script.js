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
        li.classList.add('menu-item');
        if (item.submenu && item.submenu.length > 0) {
            li.classList.add('has-submenu');
        }
        
        // Background Strip Image
        const bgImg = document.createElement('img');
        bgImg.src = item.bgImage;
        bgImg.classList.add('nav-bg-strip');
        li.appendChild(bgImg);

        const linkWrapper = document.createElement('div');
        linkWrapper.classList.add('menu-link-wrapper');

        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.name;
        linkWrapper.appendChild(a);
        
        li.appendChild(linkWrapper);

        // Mobile Submenu (Rendered inline)
        if (item.submenu && item.submenu.length > 0) {
            const mobileSubUl = document.createElement('ul');
            mobileSubUl.classList.add('mobile-submenu');
            item.submenu.forEach(subItem => {
                const subLi = document.createElement('li');
                const subA = document.createElement('a');
                subA.href = "#";
                subA.textContent = subItem;
                subLi.appendChild(subA);
                mobileSubUl.appendChild(subLi);
            });
            li.appendChild(mobileSubUl);
        }

        // Hover Event (Desktop)
        li.addEventListener('mouseenter', () => {
             if (window.innerWidth > 1024) {
                updateActiveState(index);
             }
        });

        // Click Event (Mobile Accordion)
        linkWrapper.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && item.submenu && item.submenu.length > 0) {
                e.preventDefault();
                // Toggle Active Class
                const isActive = li.classList.contains('mobile-active');
                
                // Close siblings
                const siblings = navList.querySelectorAll('li.menu-item');
                siblings.forEach(sib => {
                    if (sib !== li) {
                        sib.classList.remove('mobile-active');
                        const sub = sib.querySelector('.mobile-submenu');
                        if (sub) sub.style.maxHeight = null;
                    }
                });

                if (!isActive) {
                    li.classList.add('mobile-active');
                    const sub = li.querySelector('.mobile-submenu');
                    if (sub) sub.style.maxHeight = sub.scrollHeight + "px";
                } else {
                    li.classList.remove('mobile-active');
                    const sub = li.querySelector('.mobile-submenu');
                    if (sub) sub.style.maxHeight = null;
                }
            }
        });


        // Add stagger effect
        li.style.transitionDelay = `${index * 0.05 + 0.2}s`; 

        navList.appendChild(li);
    });

    // Initialize (Desktop)
    if (window.innerWidth > 1024) {
        updateActiveState(activeIndex);
    }
}

function updateActiveState(index) {
    if (index >= 0 && index < menuItems.length) {
        activeIndex = index;
        
        // Update List Items Style
        const lis = navList.querySelectorAll('li.menu-item');
        lis.forEach((li, i) => {
            if (i === index) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });

        // Update Fullscreen Background
        if (sidebar.classList.contains('active')) {
            if (menuItems[index].largeImage) {
                appBg.style.backgroundImage = `url('${menuItems[index].largeImage}')`;
                appBg.style.backgroundColor = 'transparent';
            } else {
                appBg.style.backgroundImage = 'none';
                appBg.style.backgroundColor = '#000';
            }
        }

        updateSubmenu(menuItems[index].submenu);
        
        // Position submenu panel vertically aligned with active item
        setTimeout(() => {
             const activeLi = lis[index];
             if (activeLi) {
                 const rect = activeLi.getBoundingClientRect();
                 const submenuList = document.querySelector('.submenu-list');
                 if (submenuList) {
                     // Simple alignment logic
                     let top = rect.top;
                     // Adjust if too low? 
                     if (top > window.innerHeight - 300) top = window.innerHeight - 300;
                     submenuList.style.marginTop = `${top}px`;
                 }
             }
        }, 50);
    } else {
        // Clear if invalid index
         submenuPanel.classList.remove('active');
    }
}

function updateSubmenu(items) {
    submenuPanel.innerHTML = ''; 
    if (items && items.length > 0) {
        submenuPanel.classList.add('active');
        const ul = document.createElement('ul');
        ul.classList.add('submenu-list');
        
        items.forEach((subItem, idx) => {
            const li = document.createElement('li');
            li.style.animation = `fadeInRight 0.3s ease forwards ${idx * 0.1}s`;
            li.style.opacity = '0';
            if (idx === 0) li.classList.add('header-item');

            const a = document.createElement('a');
            a.href = "#";
            a.innerHTML = idx === 0 ? `${subItem} <i class="fas fa-caret-right"></i>` : subItem;
            
            li.appendChild(a);
            ul.appendChild(li);
        });
        submenuPanel.appendChild(ul);
    } else {
        submenuPanel.classList.remove('active');
    }
}

// Secondary Navigation
const secondaryLinks = [
    { text: "About iTailor", isItalic: true },
    { text: "About Us", isItalic: false },
    { text: "Contact Us", isItalic: false },
    { text: "FAQ", isItalic: false },
    { text: "Why iTailor", isItalic: true },
    { text: "Reviews", isItalic: false },
    { text: "How It Works", isItalic: false },
    { text: "Quality", isItalic: false },
    { text: "Fit-Guarantee", isItalic: false },
    { text: "More", isItalic: true }
];

function renderSecondaryMenu() {
    const secList = document.getElementById('secondary-nav-list');
    secList.innerHTML = '';
    
    secondaryLinks.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "#";
        a.textContent = item.text;
        if (item.isItalic) {
            a.style.fontStyle = 'italic';
            a.style.opacity = '0.9'; 
        }
        li.appendChild(a);
        secList.appendChild(li);
    });
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
        if (window.innerWidth > 1024) {
            updateActiveState(activeIndex);
        }
    } else {
        // Reset sub panel when closing main menu
        submenuPanel.classList.remove('active');
        appBg.style.backgroundImage = 'none';
        appBg.style.backgroundColor = 'transparent';
    }
}

// Function to close sidebar
function closeMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    submenuPanel.classList.remove('active');
    appBg.style.backgroundImage = 'none';
    appBg.style.backgroundColor = 'transparent';
}

// Blog Data
const blogPosts = [
    {
        title: "A Perfect, Natural Fit — Without the Effort",
        desc: "Men want a suit that feels right instantly — balanced shoulders, easy movement, and a sharp silhouette.",
        image: "./images/image-1.png"
    },
    {
        title: "Fast Turnaround (Because Life Doesn't Wait)",
        desc: "Long waiting periods feel outdated. Men expect premium tailoring delivered efficiently.",
        image: "./images/image-2.png"
    },
    {
        title: "Digital Convenience That Actually Works",
        desc: "Accurate online tools remove hesitation — from measurements to fit confidence.",
        image: "./images/image-3.png"
    },
    {
        title: "Modern, Versatile Style",
        desc: "One suit should work across moments — formal when needed, adaptable when styled casual.",
        image: "./images/image-4.png"
    },
    {
        title: "Clear Fabric Choices (No Overwhelm)",
        desc: "Men prefer curated fabric selections chosen for climate, occasion, and durability.",
        image: "./images/image-5.png"
    },
    {
        title: "A Simple, Guided Experience",
        desc: "Most men value expert guidance — someone to simplify choices and recommend what works.",
        image: "./images/image-6.png"
    },
    {
        title: "The Ultimate Wedding Suit Guide",
        desc: "From the groom to the best man, find the perfect look for the big day with timeless elegance, ensuring everyone looks dapper.",
        image: "./images/image-7.png"
    },
    {
        title: "Business Casual Redefined",
        desc: "How to style your custom jacket with jeans or chinos for a sharp yet relaxed office look that commands respect.",
        image: "./images/image-8.png"
    },
    {
        title: "Essential Accessories for Every Gentleman",
        desc: "Elevate your suit with the right tie, pocket square, and cufflinks for a polished finish that separates the men from the boys.",
        image: "./images/image-9.png"
    }
];

function renderBlogGrid() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return; 

    blogGrid.innerHTML = ''; 

    blogPosts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('feature-card');

        // Create inner HTML structure
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('feature-img-wrapper');
        const img = document.createElement('img');
        img.src = post.image;
        img.alt = post.title;
        img.classList.add('feature-img');
        imgWrapper.appendChild(img);

        const content = document.createElement('div');
        content.classList.add('feature-content');
        
        const title = document.createElement('h3');
        title.classList.add('feature-title');
        title.textContent = post.title;
        
        const desc = document.createElement('p');
        desc.classList.add('feature-desc');
        desc.innerHTML = `${post.desc} <a href="#" class="read-more">Read More...</a>`; // Using innerHTML for the link

        content.appendChild(title);
        content.appendChild(desc);

        article.appendChild(imgWrapper);
        article.appendChild(content);

        blogGrid.appendChild(article);
    });
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
    renderSecondaryMenu();
    renderBlogGrid(); // Render blog posts

    menuToggle.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMenu();
        }
    });
});
