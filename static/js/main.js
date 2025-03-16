const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Load scene.json
const gltfLoader = new THREE.GLTFLoader();
const textureLoader = new THREE.TextureLoader();

// Convert degrees to radians
function degreesToRadians(degreeVal) {
  return (degreeVal * Math.PI) / 180;
}

// Load an individual model
function loadImportedModel(
  modelPath,
  position3D,
  rotation3D,
  scale3D,
  shadowCast,
  shadowReceive
) {
  gltfLoader.load(
    modelPath,
    function (currentModel) {
      console.log(`Now loading a model: ${currentModel}`);
      const objectInstance = currentModel.scene.clone();
      objectInstance.position.set(position3D);
      objectInstance.rotation.set(rotation3D);
      objectInstance.scale.set(scale3D);
      objectInstance.castShadow = shadowCast;
      objectInstance.receiveShadow = shadowReceive;
      scene.add(objectInstance);
      const box = new THREE.BoxHelper(objectInstance, 0xff0000);
      scene.add(box);
      console.log(`Current scene children: ${scene.children}`);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

// Load entire glb scene
function loadImportedScene(modelPath) {
  gltfLoader.load(
    modelPath,
    function (gltf) {
      // gltf.scene contains the whole scene object from the .glb
      const objectInstance = gltf.scene;

      // Preserve position, rotation, and scale from the exported model
      // These are already set in the .glb file and will be applied automatically
      scene.add(objectInstance);
    },
    undefined,
    function (error) {
      console.error(`Error loading ${modelPath}:`, error);
    }
  );
}

// Add objects

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xa86200, 2);
ambientLight.intensity = 0.4;
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xfff2d6, 7);
directionalLight.position.set(20.338, 13.493, 6.517);
directionalLight.intensity = 4;
directionalLight.castShadow = true;
scene.add(directionalLight);

// Plane 1
const woodPlaneGeometry = new THREE.PlaneGeometry(40, 40);
const woodTileUrl = "/static/assets/111_herringbone_parquet.jpg";
const woodPlaneMaterial = new THREE.MeshLambertMaterial({
  map: textureLoader.load(woodTileUrl),
});
const woodPlane = new THREE.Mesh(woodPlaneGeometry, woodPlaneMaterial);
woodPlane.position.set(0, 0, 0);
woodPlane.rotation.set(degreesToRadians(-90), 0, 0);
scene.add(woodPlane);

// Rattan Coffee Table
gltfLoader.load(
  "/static/assets/rattan_coffee_table.glb",
  function (coffeeTable) {
    console.log("logging the gltf");
    console.log(coffeeTable.scene);
    scene.add(coffeeTable.scene);
    coffeeTable.scene.position.set(0, 0.18, 0);
    coffeeTable.scene.rotation.set(
      degreesToRadians(0),
      degreesToRadians(0),
      degreesToRadians(0)
    );
    coffeeTable.scene.scale.set(4, 4, 4);
    coffeeTable.scene.castShadow = true;
    coffeeTable.scene.receiveShadow = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Rug
gltfLoader.load(
  "/static/assets/rug.glb",
  function (rug) {
    console.log("logging the gltf");
    console.log(rug.scene);
    scene.add(rug.scene);
    rug.scene.position.set(0, 0.08, 0);
    rug.scene.rotation.set(
      degreesToRadians(0.2),
      degreesToRadians(93.8),
      degreesToRadians(0.6)
    );
    rug.scene.scale.set(5, 5, 5);
    rug.scene.castShadow = true;
    rug.scene.receiveShadow = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Standing Fan
gltfLoader.load(
  "/static/assets/standing_fan.glb",
  function (fan) {
    console.log("logging the gltf");
    console.log(fan.scene);
    scene.add(fan.scene);
    fan.scene.position.set(-6.76, 4.66, -6.5);
    fan.scene.rotation.set(
      degreesToRadians(0),
      degreesToRadians(32.6),
      degreesToRadians(0)
    );
    fan.scene.scale.set(3, 3, 3);
    fan.scene.castShadow = true;
    fan.scene.receiveShadow = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Book Stack
gltfLoader.load(
  "/static/assets/book_stack.glb",
  function (books) {
    console.log("logging the gltf");
    console.log(books.scene);
    scene.add(books.scene);
    books.scene.position.set(-4.74, 6.54, -7.86);
    books.scene.rotation.set(
      degreesToRadians(0),
      degreesToRadians(32.6),
      degreesToRadians(0)
    );
    books.scene.scale.set(1.6, 1.6, 1.6);
    books.scene.castShadow = true;
    books.scene.receiveShadow = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Console Table 1
gltfLoader.load(
  "/static/assets/console_table.glb",
  function (consoleTable1) {
    console.log("logging the gltf");
    console.log(consoleTable1.scene);
    scene.add(consoleTable1.scene);
    consoleTable1.scene.position.set(-4.06, 3.5, -13.18);
    consoleTable1.scene.rotation.set(
      degreesToRadians(0),
      degreesToRadians(0),
      degreesToRadians(0)
    );
    consoleTable1.scene.scale.set(0.1, 0.1, 0.1);
    consoleTable1.scene.castShadow = true;
    consoleTable1.scene.receiveShadow = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Console Table 2
gltfLoader.load(
  "/static/assets/console_table.glb",
  function (consoleTable2) {
    console.log("logging the gltf");
    console.log(consoleTable2.scene);
    scene.add(consoleTable2.scene);
    consoleTable2.scene.position.set(6.22, 3.5, -13.18);
    consoleTable2.scene.rotation.set(
      degreesToRadians(0),
      degreesToRadians(0),
      degreesToRadians(0)
    );
    consoleTable2.scene.scale.set(0.1, 0.1, 0.1);
    consoleTable2.scene.castShadow = true;
    consoleTable2.scene.receiveShadow = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Old Book
gltfLoader.load(
  "/static/assets/old_book.glb",
  function (oldBook) {
    console.log("logging the gltf");
    console.log(oldBook.scene);
    scene.add(oldBook.scene);
    oldBook.scene.position.set(0, 2.94, 0);
    oldBook.scene.rotation.set(
      degreesToRadians(0),
      degreesToRadians(11.4),
      degreesToRadians(0)
    );
    oldBook.scene.scale.set(1, 1, 1);
    oldBook.scene.castShadow = true;
    oldBook.scene.receiveShadow = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Plane 2
const wallPlaneGeometry = new THREE.PlaneGeometry(50, 20);
const wallTileUrl = "/static/assets/93-floral-wallpaper-seamless.jpg";
const wallPlaneMaterial = new THREE.MeshLambertMaterial({
  map: textureLoader.load(wallTileUrl),
});
const wallPlane = new THREE.Mesh(wallPlaneGeometry, wallPlaneMaterial);
wallPlane.position.set(0, 9.9, -14.2);
wallPlane.rotation.set(0, 0, 0);
scene.add(wallPlane);

// Plane 3

// Load entire scene
// loadImportedScene("/static/assets/itanet-online.glb");

// Camera setup
camera.position.set(-1.767, 14.678, 10.923);
camera.rotation.set(
  degreesToRadians(-45.98),
  degreesToRadians(-2.11),
  degreesToRadians(-2.18)
);

function animate() {
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
