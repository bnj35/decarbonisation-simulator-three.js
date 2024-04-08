import * as THREE from 'three';
import Stats from "three/addons/libs/stats.module.js";
import {createO2,createCO2,createN2, createH20}from './atome.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as lil from 'lil-gui';


//debug
let stats = Stats()
document.body.appendChild(stats.dom)


// Canvas
const canvas = document.querySelector('canvas.webgl');
if (!canvas) {
    console.error('Cannot find the canvas element.');
}

// Scene
const scene = new THREE.Scene()

//ambient light
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 10
scene.add(ambientLight)




// Mesh
const count =500;
const countLiquid = 10000;

const radius = 1;
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFFF, wireframe: false , transparent: true, opacity: 0.4})
)

scene.add(sphere)

const probAtome = {
    "ox": 20,
    "ca": 5,
    "na": 75
}

// let color = 0xFFFFFF;
let oxygene = 0;
let carbon = 0;
let azote = 0;

let isCarbon = false;
let cube; // Déclaration de la variable cube

const liquidGroup = new THREE.Group()
for (var i = 0; i < countLiquid; i++) {
    const cube = createH20();


    cube.position.x = Math.sin(Math.random() * 5 - 1) * 4;
    cube.position.y = Math.sin(Math.random() * 5 - 1)* 4;
    cube.position.z = Math.sin(Math.random() * 5 - 1) * 4;

    if (cube.position.distanceTo(sphere.position) <= radius) {
        cube.position.x = Math.sin(Math.random() * 5 - 1) * 5;
        cube.position.y = Math.sin(Math.random() * 5 - 1)* 5;
        cube.position.z = Math.sin(Math.random() * 5 - 1) * 5;
}

    liquidGroup.add(cube);
}

const spheregroup = new THREE.Group()
for (var i = 0; i < count; i++) {
    const rand = Math.random() * 100;
    if (rand < probAtome.na ) {
        cube = createN2();
        azote++;
        isCarbon = false;
    }
    else if (rand < (probAtome.na + probAtome.ox)) {
        cube = createO2();
        oxygene++;
        isCarbon = false;
    }
    else {  
        isCarbon = true;
        cube = createCO2();
        carbon++;
    }
    
    const r = Math.cbrt(Math.random()) * radius	; //radius
    const angleY = 2 * Math.PI * Math.random(); // angle around Y
    const angleZ = Math.acos(2 * Math.random() - 1); // angle from Z down 

    // convert spherical coordinates
    cube.position.x = r * Math.sin(angleZ) * Math.cos(angleY);
    cube.position.y = r * Math.sin(angleZ) * Math.sin(angleY);
    cube.position.z = r * Math.cos(angleZ);
    cube.isCarbon = isCarbon;
   
    spheregroup.add(cube);
}
console.log("azote: " + azote + " oxygene: " + oxygene + " carbon: " + carbon); 
scene.add(spheregroup, liquidGroup)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor( 0xf0a000);

//gui
const gui = new lil.GUI()
gui.add(sphere,'visible').name('visible');


//replay button
let button = document.getElementById("replay");



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update stats
    stats.update()

    button.addEventListener('click', function() {
        spheregroup.children.forEach(element => {
        if (element.isCarbon === true) {
            element.position.set(0,0,0);
        }
        console.log("replay");
    });
    });

    // Update objects
spheregroup.children.forEach(element => {
    element.rotation.y = (elapsedTime * 2.5);
    element.rotation.x = (elapsedTime * 2.5);
    element.rotation.z = (elapsedTime * 2.5);

    if (element.name == "") {
        if (element.velocity === undefined){
            element.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.006, (Math.random() - 0.5) * 0.006, (Math.random() - 0.5) * 0.006);
        }}

    element.position.add(element.velocity);
    if (element.isCarbon !== true) {
        if (element.position.distanceTo(sphere.position) >= radius) {
            element.velocity.negate();
            element.position.add(element.velocity);
    }}
        else{
            if (element.position.distanceTo(sphere.position) > radius + 0.5) {
                element.velocity.set(0,0,0);
                
                }
            }
});

liquidGroup.children.forEach(element => {
    element.rotation.y = (elapsedTime * 2.5);
    element.rotation.x = (elapsedTime * 2.5);
    element.rotation.z = (elapsedTime * 2.5);

    element.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02);
    element.position.add(element.velocity);
    });


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()