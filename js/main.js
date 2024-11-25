var typed = new Typed(".text", {
    strings: ["CAD Enthusiastic", "Python Developer", "Researcher"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

const hamburger = document.getElementById('hamburger-icon');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    navbar.classList.toggle('active');
});

document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
        navbar.classList.remove('active');
    }
});

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            let activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};



const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animationType = entry.target.getAttribute('data-animation');
            entry.target.classList.add('in-view', animationType);
        } else {
            entry.target.classList.remove('in-view', entry.target.getAttribute('data-animation'));
        }
    });
}, {
    threshold: 0.25 
});

document.querySelectorAll('.animate').forEach((element) => {
    observer.observe(element);
});


const progressBars = document.querySelectorAll('.progress-line');
const radialBars = document.querySelectorAll('.radial-bar');


const observer_graphs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, {
    threshold: 0.5
});

progressBars.forEach(bar => observer_graphs.observe(bar));
radialBars.forEach(bar => observer_graphs.observe(bar));