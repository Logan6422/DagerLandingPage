import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.querySelector('.model-container');

// Configuración de la escena
const scene = new THREE.Scene();
scene.background = null; // Fondo de la escena transparente

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true // Habilitar la transparencia del fondo
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0); // Hacer el fondo del canvas transparente
container.appendChild(renderer.domElement);

// Luz ambiental para iluminar el modelo
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Luz blanca suave
scene.add(ambientLight);

// Luz direccional para resaltar detalles
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); 
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Cargar el modelo .gltf
let model;
const loader = new GLTFLoader();
loader.load(
    '/Media/pickling_cucumber/scene.gltf',
    function (gltf) {
        model = gltf.scene; // Acceso al modelo
        model.scale.set(35, 35, 35); // Ajustar el tamaño del modelo según sea necesario
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('Error cargando el modelo:', error);
    }
);

// Animación
function animate() {
    if (model) {
        model.rotation.x += 0.02;
    }
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Ajuste dinámico de tamaño
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
