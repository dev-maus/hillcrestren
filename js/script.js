
emailjs.init("qOTfPgt-H2dhdPycA");

// get navbar
const mainNav = document.getElementById("nav-wrapper")
const navLinks = document.getElementsByClassName("nav-link")
const logoImg = document.getElementById("logo-img")
const testimonials = document.getElementsByClassName("testimonial")
const testimonialControllers = document.getElementsByClassName("testimonial-controller")
const contactForm = document.getElementById("contact-form-form")
const contactFormSubmitButton = document.getElementById("contact-form-submit-btn")

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

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_0d4mtpo', 'template_bl1zflg', '#contact-form-form')
        .then(function(response) {
            contactFormSubmitButton.classList.add('submitted');
            contactFormSubmitButton.disabled = true;
            contactFormSubmitButton.value = 'Message sent!';
            contactForm.reset();
        }, function(error) {
            contactFormSubmitButton.classList.add('form-submission-failed');
            contactFormSubmitButton.value = 'Message failed!';
            setTimeout(() => {
                contactFormSubmitButton.classList.remove('form-submission-failed');
                contactFormSubmitButton.value = 'Send message';
            }, 3000);
        });
})

startTestimonialInterval();

window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    toggleMainNav(scrollTop)
    resizeLogo(scrollTop)
});

