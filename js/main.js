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

// ================= 3D Model with Three.js ====================

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

    
    const objLoader = new THREE.OBJLoader();
    objLoader.load('assets/3d_models/j.obj', function (object) {
        scene.add(object);

      
        object.position.set(0, -3, 2);
        object.rotation.set(Math.PI / 2, Math.PI, Math.PI / 2);

        object.traverse(function (child) {
            if (child.isMesh) {
                // Apply a new material to each mesh
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xFFD700, 
                    metalness: 1.0,  
                    roughness: 0.0,
                });

                // Ensure full opacity and no transparency
                child.material.opacity = 1.0;
                child.material.transparent = false;
            }
        });
            
        
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            object.rotation.z += 0.005; // Rotate around the Z-axis
            renderer.render(scene, camera);
        }

        animate();
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        onWindowResize();
    });
    function onWindowResize() {

        camera.aspect = container.clientWidth / container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(container.clientWidth, container.clientHeight);
    }
}


// ================= Typer ====================

var typed = new Typed(".text", {
    strings: ["CAD Enthusiastic", "Python Developer", "Researcher"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

window.onload = initModel;

