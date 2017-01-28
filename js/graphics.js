
var scene, camera, renderer
var box, matBox, geomBox 
var stats
var control
var projector, vector

function createStats() {
	var stats = new Stats()
	stats.setMode(0)

	stats.domElement.style.position = "absolute"
	stats.domElement.style.left = '0'
	stats.domElement.style.top = '0'

	return stats
}

function addControls(controlObject) {
	// body...
	var gui = new dat.GUI()
	gui.add(controlObject, 'Rotation Speed', -0.1, 0.1)
	gui.add(controlObject, 'Scale', 0.01, 2)
}

function init () {

	control = new function () {
		this.rotationSpeed = 0.005
		this.scale = 1
	}

	addControls(control)

	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10 )
	camera.position.z = 3;

	stats = createStats()
	document.body.appendChild( stats.domElement )
	
	renderer = new THREE.WebGLRenderer()
	renderer.setSize( window.innerWidth, window.innerHeight)
	// renderer.setClearColor(0x00ff67, 1.0);
	
	geomBox = new THREE.BoxGeometry(1, 1, 1)
	// matBox = new THREE.MeshBasicMaterial( {color: 0x00ff00})
	matBox =  new THREE.MeshNormalMaterial()

	box = new THREE.Mesh(geomBox, matBox)
	scene.add( box )

	document.body.appendChild( renderer.domElement )

	document.addEventListener('mousedown', onDocumentMouseDown, false)

	var raycaster = new THREE.Raycaster(
			camera.position,
			vector.sub(camera.position).normalize()
		)
	var intersects = raycaster.intersectObjects( [sphere, cylinder, cube] )
}

function onDocumentMouseDown(event) {
	// body...
	projector = new THREE.Projector()
	vector = new THREE.Vector3(	
									(event.clientX / window.innerWidth) * 2 -1,
									-(event.clientY / window.innerHeight) * 2 +1,
									0.5 
							)
	projector.unprojectVector(vector, camera)

}

function animate() {
	requestAnimationFrame(animate)
	// box.rotation.x += 0.01
	box.rotation.x += control.rotationSpeed
	box.rotation.y += 0.01
	box.rotation.z += 0.01

	renderer.render(scene, camera)
	stats.update()
}

init()
animate()
