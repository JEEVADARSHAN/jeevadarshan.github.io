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
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xFFD700,
                        metalness: 1.0,
                        roughness: 0.0,
                    });
                    child.material.opacity = 1.0;
                    child.material.transparent = false;
                }
            });

            function animate() {
                requestAnimationFrame(animate);
                const delta = clock.getDelta();
                object.rotation.z += delta * 0.5;
                renderer.render(scene, camera);
            }

            animate();
        }, undefined, function (error) {
            console.error("An error occurred while loading the model:", error);
        });

        window.addEventListener('resize', () => {
            renderer.setSize(container.clientWidth, container.clientHeight);
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
        });
    }

    window.addEventListener('load', initModel);
}

// ================= Helper Functions ====================
function throttle(callback, limit) {
    let waiting = false;
    return function () {
        if (!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(() => (waiting = false), limit);
        }
    };
}

// ================= MENU ====================
document.addEventListener('click', function (event) {
    const checkbox = document.querySelector('#navi-toggle');
    const menuContainer = document.querySelector('.menu');

    if (menuContainer.contains(event.target) && event.target.tagName === 'A') {
        checkbox.checked = false;
        document.body.style.overflow = 'auto';
    }
});

const checkbox = document.querySelector('#navi-toggle');
checkbox.addEventListener('change', function () {
    document.body.style.overflow = checkbox.checked ? 'hidden' : 'auto';
});

// ================= Scroll Navigation Highlight ====================
document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.includes('about.html')) {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar a');

        window.addEventListener('scroll', throttle(() => {
            let top = window.scrollY;

            sections.forEach(sec => {
                let offset = sec.offsetTop - 150;
                let height = sec.offsetHeight;
                let id = sec.getAttribute('id');

                if (top >= offset && top < offset + height) {
                    navLinks.forEach(link => link.classList.remove('highlight'));
                    navLinks.forEach(link => {
                        if (link.getAttribute('href').includes(id)) {
                            link.classList.add('highlight');
                        }
                    });
                }
            });
        }, 100));
    }
});

// ================= Intersection Observer for Animations ====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const animationType = entry.target.getAttribute('data-animation');
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view', animationType);
        } else {
            entry.target.classList.remove('in-view', animationType);
        }
    });
}, { threshold: 0.25 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// ================= Progress Bar Animations ====================
const progressBars = document.querySelectorAll('.progress-line');
const radialBars = document.querySelectorAll('.radial-bar');

const observer_graphs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.5 });

// Observe both progress bars and radial bars
progressBars.forEach(bar => observer_graphs.observe(bar));
radialBars.forEach(bar => observer_graphs.observe(bar));


// ================= Scroll Button ====================
const scrollButton = document.getElementById("scrollToTopBtn");

window.addEventListener('scroll', () => {
    scrollButton.style.display = (window.scrollY > 20) ? "block" : "none";
});

scrollButton.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ================= Mail ====================
function sendEmail(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const mailtoLink = `mailto:jeevadarshan11@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
}

// ================= Services Select Button ====================
const serviceBtns = document.querySelectorAll('.btn-box-otl');
const mechItems = document.querySelectorAll('.mech');
const csItems = document.querySelectorAll('.cs');

function toggleService(service, element) {
    serviceBtns.forEach(btn => btn.classList.remove('clicked'));
    element.classList.add('clicked');

    mechItems.forEach(item => item.classList.add('hidden'));
    csItems.forEach(item => item.classList.add('hidden'));

    requestAnimationFrame(() => {
        if (service === 'all') {
            mechItems.forEach(item => item.classList.remove('hidden'));
            csItems.forEach(item => item.classList.remove('hidden'));
        } else if (service === 'mech') {
            mechItems.forEach(item => item.classList.remove('hidden'));
        } else if (service === 'cs') {
            csItems.forEach(item => item.classList.remove('hidden'));
        }
    });
}


// ================= Skills Carousal Button ====================
window.addEventListener('load', () => {
    if (!window.location.pathname.includes('about.html')) {
        const slide = document.querySelector('.carousal');
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.previous-btn');
        const items = document.querySelectorAll('.elevated-bx');
        const dots = document.querySelectorAll('.dots');

        let currentIndex = 0;

        function updateChevron() {
            const isDesktop = window.innerWidth >= 1024;
            if (!isDesktop) {
                prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
                nextBtn.style.display = currentIndex >= items.length - 2 ? 'none' : 'block';
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            } else {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < items.length - 2) {
                currentIndex++;
                slide.scrollBy({ left: slide.clientWidth, behavior: 'smooth' });
                updateChevron();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                slide.scrollBy({ left: -slide.clientWidth, behavior: 'smooth' });
                updateChevron();
            }
        });

        slide.addEventListener('scroll', throttle(() => {
            const newIndex = Math.round(slide.scrollLeft / slide.clientWidth);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateChevron();
            }
        }, 100));

        updateChevron();
    }
});

// ================= Project Select Button ====================
function toggleProject(project, element) {
    document.querySelectorAll('.btn-box-otl.pj').forEach(btn => btn.classList.remove('clicked'));
    element.classList.add('clicked');

    const mech = document.querySelectorAll('.project.mech');
    const cs = document.querySelectorAll('.project.cs');

    mech.forEach(item => item.style.display = "none");
    cs.forEach(item => item.style.display = "none");

    requestAnimationFrame(() => {
        if (project === 'all') {
            mech.forEach(item => item.style.display = "block");
            cs.forEach(item => item.style.display = "block");
        } else if (project === 'mech') {
            mech.forEach(item => item.style.display = "block");
        } else if (project === 'cs') {
            cs.forEach(item => item.style.display = "block");
        }
    });
}
