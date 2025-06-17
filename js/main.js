// ================= 3D Model with Three.js ====================
if (!window.location.pathname.includes('about.html')) {
    function initModel() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('modelCanvas'),
            alpha: true,
            antialias: true
        });
        const container = document.getElementById('model');
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        camera.position.set(0, 3, 8);
        camera.rotation.x = -Math.PI / 8;

        const frontLight = new THREE.DirectionalLight(0xffffff, 1000, 100);
        frontLight.position.set(0, 0, 9);
        scene.add(frontLight);

        const leftLight = new THREE.DirectionalLight(0xffffff, 1000, 100);
        leftLight.position.set(-10, -1, 0);
        scene.add(leftLight);

        const clock = new THREE.Clock();

        const objLoader = new THREE.OBJLoader();
        objLoader.load('assets/3d_models/j.obj', function (object) {
            scene.add(object);
            object.position.set(0, -3, 2);
            object.rotation.set(Math.PI / 2, Math.PI, Math.PI / 2);

            object.traverse(function (child) {
                if (child.isMesh) {
                    // Apply gold material
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xFFD700,
                        metalness: 1.0,
                        roughness: 0.0,
                    });
                    child.material.opacity = 1.0;
                    child.material.transparent = false;
                }
            });

            // Animation loop using time-based increment
            function animate() {
                requestAnimationFrame(animate);
                const delta = clock.getDelta(); // Time between frames
                object.rotation.z += delta * 0.5; // Rotate based on time delta for smooth animation
                renderer.render(scene, camera);
            }

            animate();
        }, undefined, function (error) {
            console.error("An error occurred while loading the model:", error);
        });

        // Handle window resize
        window.addEventListener('resize', onWindowResize);

        function onWindowResize() {
            renderer.setSize(container.clientWidth, container.clientHeight);
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
        }
    }

    window.onload = initModel;
}


// ================= MENU ====================

document.addEventListener('click', function (event) {
    const checkbox = document.querySelector('#navi-toggle');
    const menuContainer = document.querySelector('.menu');

    if (menuContainer.contains(event.target) && event.target.tagName === 'A') {
        checkbox.checked = false;
        body.style.overflow = 'auto';
    }
});
const checkbox = document.querySelector('#navi-toggle');
const body = document.body;

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});



// ================= Scroll ====================
document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.includes('about.html')) {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar a');

        if (sections.length === 0 || navLinks.length === 0) {
            console.warn("No sections or nav links found!");
            return;
        }

        window.addEventListener('scroll', () => {
            let top = window.scrollY;

            sections.forEach(sec => {
                let offset = sec.offsetTop - 150;
                let height = sec.offsetHeight;
                let id = sec.getAttribute('id');

                if (top >= offset && top < offset + height) {
                    navLinks.forEach(link => link.classList.remove('highlight'));

                    const activeLink = document.querySelector('.navbar a[href*="' + id + '"]');
                    if (activeLink) {
                        activeLink.classList.add('highlight');
                    }
                }
            });
        });
    }
});




window.addEventListener('load', () => {
    if (!window.location.pathname.includes('about.html')) {
        const carousal = document.querySelector('.carousal');
        if (carousal) {
            const glassBoxes = document.querySelectorAll('.glass-bx');

            carousal.addEventListener('scroll', () => {
                glassBoxes.forEach(box => {
                    const rect = box.getBoundingClientRect();
                    box.classList.add('animate');

                    if (rect.left >= 0 && rect.right <= window.innerWidth) {
                        box.classList.add('shrink');
                        box.classList.remove('animate');
                    } else {
                        box.classList.remove('shrink');
                        box.classList.add('animate');
                    }
                });
            });
        }
    }
});






// =================  Intersection Observer for Animations ====================


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



// ================= Progress Bar Animations ====================


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


// ================= Scroll Button ====================


let scrollButton = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
};
scrollButton.onclick = function () {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
};

// ================= Mail ====================


function sendEmail(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way

    // Get the form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Construct the mailto link with the form data
    const mailtoLink = `mailto:jeevadarshan11@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Redirect the user to the mailto link
    window.location.href = mailtoLink;
}


// ================= Serivces Select Button ====================

function toggleService(service, element) {
    document.querySelectorAll('.btn-box-otl').forEach(btn => {
        btn.classList.remove('clicked');
    });
    element.classList.add('clicked');


    const mech = document.querySelectorAll('.mech');
    const cs = document.querySelectorAll('.cs');

    mech.forEach(item => item.style.display = "none");
    cs.forEach(item => item.style.display = "none");

    setTimeout(() => {
        if (service == 'all') {
            mech.forEach(item => item.style.display = "block");
            cs.forEach(item => item.style.display = "block");
            const btn = document.querySelectorAll('.cs');
        }
        else if (service == 'mech') {
            mech.forEach(item => item.style.display = "block");
        }
        else if (service == 'cs') {
            cs.forEach(item => item.style.display = "block");
        }
    }, 200); 
}


// ================= Skills carousal Button ====================
window.addEventListener('load', () => {
    if (!window.location.pathname.includes('about.html')) {
       const slide = document.querySelector('.carousal');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.previous-btn');
const items = document.querySelectorAll('.glass-bx');
const dots = document.querySelectorAll('.dots');

let currentIndex = 0;

function updatechevron() {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) {
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex === items.length - 2 ? 'none' : 'block';
        setTimeout(() => {
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }, 100);
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
}


nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - 2) {
        currentIndex++;
        slide.scrollBy({
            left: slide.clientWidth,
            behavior: 'smooth'
        });
        updatechevron();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        slide.scrollBy({
            left: -slide.clientWidth,
            behavior: 'smooth'
        });
        updatechevron();
    }
});

slide.addEventListener('scroll', () => {
    const newIndex = Math.round(slide.scrollLeft / slide.clientWidth);
    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updatechevron();
    }
});

updatechevron();
}

    }
});




// ================= Project Select Button ====================

function toggleProject(project, element) {
    document.querySelectorAll('.btn-box-otl.pj').forEach(btn => {
        btn.classList.remove('clicked');
    });
    element.classList.add('clicked');


    const mech = document.querySelectorAll('.project.mech');
    const cs = document.querySelectorAll('.project.cs');

    mech.forEach(item => item.style.display = "none");
    cs.forEach(item => item.style.display = "none");

    setTimeout(() => {
        if (project == 'all') {
            mech.forEach(item => item.style.display = "block");
            cs.forEach(item => item.style.display = "block");
            const btn = document.querySelectorAll('.project.cs');
        }
        else if (project == 'mech') {
            mech.forEach(item => item.style.display = "block");
        }
        else if (project == 'cs') {
            cs.forEach(item => item.style.display = "block");
        }
    }, 200);
}
