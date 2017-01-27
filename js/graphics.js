
var scene, camera, renderer
var box, matBox, geomBox 
var stats

function createStats() {
	var stats = new Stats()
	stats.setMode(0)

	stats.domElement.style.position = "absolute"
	stats.domElement.style.left = '0'
	stats.domElement.style.top = '0'

	return stats
}

function init () {
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
}


function animate() {
	requestAnimationFrame(animate)
	box.rotation.x += 0.01
	box.rotation.y += 0.01
	box.rotation.z += 0.01

	renderer.render(scene, camera)
	stats.update()
}

init()
animate()
