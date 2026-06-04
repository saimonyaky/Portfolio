// NAV STICKY
const navbar = document.getElementById('navbar'),
    sticky = navbar.offsetTop

function navbarSticky() {
    const scrollY = window.pageYOffset;

    if (scrollY >= sticky) {
        navbar.classList.add('sticky')
    } else {
        navbar.classList.remove('sticky')
    }
}
window.addEventListener('scroll', navbarSticky)

// NAV MENU TOGGLE
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show_menu')
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show_menu')
    })
}

// SCROLL UP
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');

    if (scrollY >= 560) {
        scrollUp.classList.add('scroll_up')
    } else {
        scrollUp.classList.remove('scroll_up')
    }
}
window.addEventListener('scroll', scrollUp)

// SCROLL SECTIONS
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= (sectionTop + sectionHeight)) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active_nav_link')
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active_nav_link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// QUALIFICATION
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        target.classList.add('active')
        tabs.forEach(tab => {
            tab.classList.remove('qualification_active')
        })
        tab.classList.add('qualification_active')
    })
})

// SKILL
const skillContainer = document.getElementsByClassName('skill_container'),
    skillHeader = document.querySelectorAll('.skills_header')

function skillToggle() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillContainer.length; i++) {
        skillContainer[i].className = 'skill_container skills_close'
    }
    if (itemClass === 'skill_container skills_close') {
        this.parentNode.className = 'skill_container skills_open'
    }
}

// add event skillToggle to skillHeader
skillHeader.forEach(Element => {
    Element.addEventListener('click', skillToggle)
});

// SERVICES
const modalViews = document.querySelectorAll('.services_modal')
modalBtns = document.querySelectorAll('.services_btn')
modalCloses = document.querySelectorAll('.modal_close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('modal_active')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('modal_active')
        })
    })
})

// SWIPER
var swiper = new Swiper('.portfolio_container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
})