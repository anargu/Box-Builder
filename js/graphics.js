
var scene, camera, renderer
var box, matBox, geomBox 

function init () {
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth, window.innerHeight, 0.1, 1000 )

	renderer = new THREE.WebGLRenderer()
	renderer.setSize( window.innerWidth, window.innerHeight)
	document.body.appendChild( renderer.domElement )

	geomBox = new THREE.BoxGeometry(1, 1, 1)
	matBox = new THREE.MeshBasicMaterial( {color: 0x00ff00})

	box = new THREE.Mesh(geomBox, matBox)
	scene.add( box )
}

function renderer() {
	
}

init()

