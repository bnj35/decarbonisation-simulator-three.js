import * as THREE from 'three';

const atomSize = 0.02;

export function createN2(){
const geometry = new THREE.SphereGeometry(atomSize, 32, 32);

const material = new THREE.MeshBasicMaterial({ color: 0x0000FF });

const sphere1 = new THREE.Mesh(geometry, material);
const sphere2 = new THREE.Mesh(geometry, material);

sphere1.position.set(-atomSize/2, 0, 0);
sphere2.position.set(atomSize/2, 0, 0);

const molecule = new THREE.Group();
molecule.add(sphere1);
molecule.add(sphere2);

return molecule;
}

export function createO2(){
    const geometry = new THREE.SphereGeometry(atomSize, 16, 16);
    
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    
    const sphere1 = new THREE.Mesh(geometry, material);
    const sphere2 = new THREE.Mesh(geometry, material);
    
    sphere1.position.set(-atomSize/2, 0, 0);
    sphere2.position.set(atomSize/2, 0, 0);
    
    const molecule = new THREE.Group();
    molecule.add(sphere1);
    molecule.add(sphere2);
    
    return molecule;
    }

    export function createCO2(){
        const geometry = new THREE.SphereGeometry(atomSize, 16, 16);
    
        const materialC = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const materialO = new THREE.MeshBasicMaterial({ color: 0xFf0000 });
    
        const sphereC = new THREE.Mesh(geometry, materialC);
        const sphereO1 = new THREE.Mesh(geometry, materialO);
        const sphereO2 = new THREE.Mesh(geometry, materialO);
    
        sphereC.position.set(0, 0, 0);
        sphereO1.position.set(-atomSize, 0, 0);
        sphereO2.position.set(atomSize, 0, 0);
    
        const molecule = new THREE.Group();
        molecule.add(sphereC);
        molecule.add(sphereO1);
        molecule.add(sphereO2);
    
        return molecule; // Retournez le groupe
    }

    export function createH20(){
        const geometry = new THREE.SphereGeometry(atomSize, 16, 16);
    
        const materialH = new THREE.MeshBasicMaterial({ color: 0xFFFFFF , transparent: true, opacity: 0.5 });
        const materialO = new THREE.MeshBasicMaterial({ color: 0xFF0000, transparent: true, opacity: 0.5});
    
        const sphereC = new THREE.Mesh(geometry, materialO);
        const sphereO1 = new THREE.Mesh(geometry, materialH);
        const sphereO2 = new THREE.Mesh(geometry, materialH);
    
        sphereC.position.set(0, 0, 0);
        sphereO1.position.set(-atomSize, 0, 0);
        sphereO2.position.set(atomSize, 0, 0);
    
        const molecule = new THREE.Group();
        molecule.add(sphereC);
        molecule.add(sphereO1);
        molecule.add(sphereO2);
    
        return molecule; // Retournez le groupe
    }