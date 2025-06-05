import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Set up the scene
const scene = new THREE.Scene();

// Add a small sphere at the origin to show the origin point
const originGeometry = new THREE.SphereGeometry(0.08, 32, 32);
const originMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const originSphere = new THREE.Mesh(originGeometry, originMaterial);
originSphere.position.set(0, 0, 0);
// Flip the y and z axes of the origin
// scene.add(originSphere);

// Add axes helper to show the axes
const axesHelper = new THREE.AxesHelper(1.5); // length of axes

// X label (red)
const xLabel = createAxisLabel("X", "#ff0000", new THREE.Vector3(1.7, 0, 0));
// Y label (green)
const yLabel = createAxisLabel("Y", "#00ff00", new THREE.Vector3(0, 1.7, 0));
// Z label (blue)
const zLabel = createAxisLabel("Z", "#0000ff", new THREE.Vector3(0, 0, 1.7));
// scene.add(xLabel);
// scene.add(yLabel);
// scene.add(zLabel);
// scene.add(axesHelper);

// Set the background to a solid color (e.g., white)
scene.background = new THREE.Color("rgb(255, 255, 255)");

// Add a grid helper to the scene
const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0xcccccc);
gridHelper.position.y = -0.5; // Align with shadow plane
scene.add(gridHelper);

// Add ambient light for general illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Lower intensity for more dramatic shadows
scene.add(ambientLight);

// Add a large plane to receive shadows
const shadowPlaneGeometry = new THREE.PlaneGeometry(20, 20);
const shadowPlaneMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
const shadowPlane = new THREE.Mesh(shadowPlaneGeometry, shadowPlaneMaterial);
shadowPlane.rotation.x = -Math.PI / 2;
shadowPlane.position.y = -0.5;
shadowPlane.receiveShadow = true;
scene.add(shadowPlane);

// Add a strong directional light that casts big shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048; // High-res shadow map
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);

// Safely get values from DOM or use defaults if not present
var plate_width = parseFloat($("#plate_width").val()) || 1;
var plate_width_input = document.getElementById("plate_width");
var plate_height = parseFloat($("#plate_height").val()) || 1;
var plate_height_input = document.getElementById("plate_height");
var plate_length = parseFloat($("#plate_length").val()) || 1;
var plate_length_input = document.getElementById("plate_length");
var layer_thickness2 = parseFloat($("#layer_thickness").val()) || 1;
var layer_thickness_input = document.getElementById("layer_thickness");

// 4. Create Box Geometry
var width = (plate_width * 3.2) / 800; // x axis
var height = (plate_height * 3.2) / 800; // y axis
var length = (plate_length * 3.2) / 800; // z axis

const layer_thickness = (layer_thickness2 * 3.2) / 800; // y axis
const geometry = new THREE.BoxGeometry(width, height, length);

// 5. Create edges geometry and material
var edges = new THREE.EdgesGeometry(geometry);
var edgeMaterial = new THREE.LineBasicMaterial({
  color: 0x00ff00,
  linewidth: 2,
});
var plateEdgeLines = new THREE.LineSegments(edges, edgeMaterial);

// Position the box geometry so its corner is at the origin
geometry.translate(-width / 2, height / 2, -length / 2);
plateEdgeLines.position.set(width / 2, height / 2, -length / 2);

// 6. Add only the edges to the scene (no solid box)
scene.add(plateEdgeLines);

const geometry2 = new THREE.BoxGeometry(width, layer_thickness, length);

// 5. Create edges geometry and material
const edges2 = new THREE.EdgesGeometry(geometry2);
const edgeMaterial2 = new THREE.LineBasicMaterial({
  color: 0xff0000,
  linewidth: 2,
});

var powderEdgeLines = new THREE.LineSegments(edges2, edgeMaterial2);

geometry2.translate(width / 2, height / 2, -length / 2);
powderEdgeLines.position.set(
  width / 2,
  height - 0.0001 + layer_thickness / 2,
  -length / 2
);

// 6. Add only the edges to the scene (no solid box)
scene.add(powderEdgeLines);

// Convert micrometers to scene units
var radius = scaleMicromToPx(25);
const cylinderHeight = 1;
const cylinderGeometry = new THREE.CylinderGeometry(
  radius,
  radius,
  cylinderHeight,
  50
);
const cylinderMaterial = new THREE.MeshStandardMaterial({
  color: 0x33ff33,
  opacity: 0.5,
  transparent: true,
});

const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

const x = scaleMicromToPx(100);
const y = scaleMicromToPx(0);
const z = scaleMicromToPx(-100);

cylinder.position.set(x, y + cylinderHeight / 2, z); // y + height/2 to sit on ground
cylinder.rotation.y = Math.PI / 2; // Align along Y axis
cylinder.position.set(x, y + cylinderHeight / 2, z); // y + height/2 to sit on ground

scene.add(cylinder);

// Set up the camera
const camera = new THREE.PerspectiveCamera();
camera.position.set(2.2, 2.5, 1);

import { STLLoader } from "three/addons/loaders/STLLoader.js";

// Set up the renderer and attach it to the document
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(678, 830);

document
  .getElementById("laser_position_window")
  .appendChild(renderer.domElement);
// document.getElementById("powder_bed").appendChild(renderer2.domElement);

$(renderer.domElement).attr("id", "laser_position_window_renderer_dom");

const controls = new OrbitControls(camera, renderer.domElement);

controls.target.set(0, -1, -2); // Set the controls' target to match
controls.update(); // Apply the target so OrbitControls uses it

// Enable camera panning (move x/y/z) on middle mouse button
controls.enablePan = true;
controls.mouseButtons.MIDDLE = THREE.MOUSE.PAN;
$(document).ready(function () {
  // Enable shadow mapping in the renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Create an STL loader
  const loader = new STLLoader();

  // Load and display the STL file in the same canvas
  loader.load("geometry/single_track_melted.stl", function (geometry) {
    // Create a material for the mesh
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      transparent: true,
      opacity: 0.7,
    });
    // Create a mesh from the geometry and material
    const mesh = new THREE.Mesh(geometry, material);
    // Optionally scale or position the mesh
    mesh.position.set(0, 0, 0);
    mesh.rotation.x = -Math.PI / 2;
    // mesh.rotation.z = Math.PI / 2;
    // mesh.rotation.y = -Math.PI / 10;
    mesh.scale.set(4000, 4000, 4000);
    // Add the mesh to the scene
    scene.add(mesh);
    // Optionally, store mesh reference for later use
    animate(); // Start animation after STL is loaded if needed
  });
});

// Global variables

var laser_x_obj = $("#laser_pos_x");
var laser_z_obj = $("#laser_pos_z");
var laser_radius_obj = $("#laser_rad");

// $(laser_x_obj).on("change", function () {
//   cylinder.position.set(scaleMicromToPx($(this).val()), cylinder.position.y, cylinder.position.z);
// });

$(laser_x_obj).on("input", function () {
  cylinder.position.set(
    scaleMicromToPx($(this).val()),
    cylinder.position.y,
    cylinder.position.z
  );
});

$(laser_z_obj).on("input", function () {
  cylinder.position.set(
    cylinder.position.x,
    cylinder.position.y,
    -scaleMicromToPx($(this).val())
  );
});

$(laser_radius_obj).on("input", function () {
  // Remove the old cylinder from the scene
  scene.remove(cylinder);

  // Get the new radius value and convert it
  var newRadius = scaleMicromToPx($(this).val());

  // Create new geometry with the updated radius
  const newCylinderGeometry = new THREE.CylinderGeometry(
    newRadius,
    newRadius,
    cylinder.geometry.parameters.height,
    50
  );

  // Create a new mesh with the same material
  const newCylinder = new THREE.Mesh(newCylinderGeometry, cylinder.material);

  // Set the position and rotation to match the old cylinder
  newCylinder.position.copy(cylinder.position);
  newCylinder.rotation.copy(cylinder.rotation);

  // Add the new cylinder to the scene
  scene.add(newCylinder);

  // Update the reference to the cylinder
  cylinder.geometry.dispose();
  cylinder.geometry = newCylinderGeometry;
  scene.remove(newCylinder); // Remove the duplicate
  scene.add(cylinder); // Add the updated cylinder back
  cylinder.scale.set(
    newRadius / cylinder.geometry.parameters.radiusTop,
    1,
    newRadius / cylinder.geometry.parameters.radiusBottom
  );
});

$(plate_width_input).on("input", function () {
  // Get new width value (for example, from an input)

  var width = scaleMicromToPx($(this).val());
  var length = scaleMicromToPx($("#plate_length").val());
  var height = scaleMicromToPx($("#plate_height").val());

  // Remove old plateEdgeLines from scene
  scene.remove(plateEdgeLines);

  // Create new geometry with updated width
  const newGeometry = new THREE.BoxGeometry(width, height, length);
  newGeometry.translate(width / 2, height / 2, -length / 2);

  // Create new edges and plateEdgeLines
  var edges = new THREE.EdgesGeometry(newGeometry);
  plateEdgeLines = new THREE.LineSegments(edges, edgeMaterial);
  scene.add(plateEdgeLines);

  scene.remove(powderEdgeLines);
  
  const newGeometry_powder = new THREE.BoxGeometry(width, layer_thickness, length);
  var powder_edges = new THREE.EdgesGeometry(newGeometry_powder);
  powderEdgeLines = new THREE.LineSegments(powder_edges, edgeMaterial2);

  powderEdgeLines.position.set(
    width / 2,
    height - 0.0001 + layer_thickness / 2,
    -length / 2
  );
  scene.add(powderEdgeLines);

});

$(plate_height_input).on("input", function () {
  // Get new width value (for example, from an input)

  var width = scaleMicromToPx($("#plate_width").val());
  var length = scaleMicromToPx($("#plate_length").val());
  var height = scaleMicromToPx($(this).val());

  // Remove old plateEdgeLines from scene
  scene.remove(plateEdgeLines);

  // Create new geometry with updated width
  const newGeometry = new THREE.BoxGeometry(width, height, length);
  newGeometry.translate(width / 2, height / 2, -length / 2);

  // Create new edges and plateEdgeLines
  var edges = new THREE.EdgesGeometry(newGeometry);
  plateEdgeLines = new THREE.LineSegments(edges, edgeMaterial);
  scene.add(plateEdgeLines);


    scene.remove(powderEdgeLines);
  
  const newGeometry_powder = new THREE.BoxGeometry(width, layer_thickness, length);
  var powder_edges = new THREE.EdgesGeometry(newGeometry_powder);
  powderEdgeLines = new THREE.LineSegments(powder_edges, edgeMaterial2);

  powderEdgeLines.position.set(
    width / 2,
    height - 0.0001 + layer_thickness / 2,
    -length / 2
  );

  scene.add(powderEdgeLines);

});

$(plate_length_input).on("input", function () {
  // Get new width value (for example, from an input)

  var width = scaleMicromToPx($("#plate_width").val());
  var length = scaleMicromToPx($(this).val());
  var height = scaleMicromToPx($("#plate_height").val());

  // Remove old plateEdgeLines from scene
  scene.remove(plateEdgeLines);

  // Create new geometry with updated width
  const newGeometry = new THREE.BoxGeometry(width, height, length);
  newGeometry.translate(width / 2, height / 2, -length / 2);

  // Create new edges and plateEdgeLines
  var edges = new THREE.EdgesGeometry(newGeometry);
  plateEdgeLines = new THREE.LineSegments(edges, edgeMaterial);
  scene.add(plateEdgeLines);



  scene.remove(powderEdgeLines);

  const newGeometry_powder = new THREE.BoxGeometry(width, layer_thickness, length);
  var powder_edges = new THREE.EdgesGeometry(newGeometry_powder);
  powderEdgeLines = new THREE.LineSegments(powder_edges, edgeMaterial2);

  powderEdgeLines.position.set(
    width / 2,
    height - 0.0001 + layer_thickness / 2,
    -length / 2
  );

  scene.add(powderEdgeLines);



});


$(layer_thickness_input).on("input", function () {
  // Get new width value (for example, from an input)

  var width = scaleMicromToPx($("#plate_width").val());
  var height = scaleMicromToPx($("#plate_height").val());
  var length = scaleMicromToPx($("#plate_length").val());

  var thickness = scaleMicromToPx($(this).val());

if (thickness>=0){
  scene.remove(powderEdgeLines);

  const newGeometry_powder = new THREE.BoxGeometry(width, thickness, length);
  var powder_edges = new THREE.EdgesGeometry(newGeometry_powder);
  powderEdgeLines = new THREE.LineSegments(powder_edges, edgeMaterial2);

  powderEdgeLines.position.set(
    width / 2,
    height - 0.0001 + thickness / 2,
    -length / 2
  );
  scene.add(powderEdgeLines);
  }
});



// Add event listener for window resize

// ############################################  Functions   ######################################################
// Animation loop

function scaleMicromToPx(x) {
  // Convert micrometers to pixels (assuming 1 pixel = 3.2 micrometers)
  const scaleFactor = 3.2 / 800; // Adjust this factor based on your specific conversion needs
  return x * scaleFactor;
}

// Add axis labels (X, Y, Z)
function createAxisLabel(text, color, position) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  ctx.font = "36px Courier";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.4, 0.2, 1);
  sprite.position.copy(position);
  return sprite;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
