
//get main nav and check if scroll is greater than 10px then add class

// get navbar
const mainNav = document.getElementById("nav-wrapper")
const navLinks = document.getElementsByClassName("nav-link")
const logoImg = document.getElementById("logo-img")
const testimonials = document.getElementsByClassName("testimonial")
const testimonialControllers = document.getElementsByClassName("testimonial-controller")
const testimonialIntervalTimeout = 5000;
let testimonialIndex = 0;
let intervalId

const scrolled = (scrollTop) => {
    return scrollTop > 20
}

for (const navLink of navLinks) {
    navLink.addEventListener('click', function(event) {
        const target = event.target;
        for (const navLink of navLinks) {
            navLink.classList.remove('active');
        }
        console.log(target)
        target.classList.add('active');
    });

}

function toggleMainNav(scrollTop) {
    if (scrolled(scrollTop)) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
}

function resizeLogo(scrollTop) {
    if (scrolled(scrollTop)) {
        logoImg.style.width = '100px';
        logoImg.src = 'images/hillcrest-logo.svg';
    } else {
        logoImg.style.width = '150px';
        logoImg.src = 'images/hillcrest-logo-white.svg';
    }
}

startTestimonialInterval = () => {
    intervalId = setInterval(() => {
        testimonialControllers[testimonialIndex].click()
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    }, testimonialIntervalTimeout);
}


for (const testimonialController of testimonialControllers) {
    testimonialController.addEventListener('click', function(event) {
        const target = event.target;
        for (const testimonialController of testimonialControllers) {
            testimonialController.classList.remove('active');
        }
        for (const testimonial of testimonials) {
            testimonial.classList.remove('active');
        }
        target.classList.add('active');
        testimonials[target.dataset.testimonial].classList.add('active');
    });
}

startTestimonialInterval();


window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    toggleMainNav(scrollTop)
    resizeLogo(scrollTop)
});

