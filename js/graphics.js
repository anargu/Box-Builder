
var scene, camera, renderer
var box, matBox, geomBox 
var stats
var control
var projector, vector
var raycaster
var mouse
var newCube
var cubesGroup = []


function createStats() {
	var stats = new Stats()
	stats.setMode(0)

	stats.domElement.style.position = "absolute"
	stats.domElement.style.left = '0'
	stats.domElement.style.top = '0'

	return stats
}

function addControls(controlObject) {

	var gui = new dat.GUI()
	gui.add(controlObject, 'rotationSpeed', -0.1, 0.1)
}



function onDocumentClick(event) {

	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 -1
	mouse.y = -(event.clientY / window.innerHeight) * 2 +1

	console.log("click")
	detectObjects()
}

function onDocumentTouchStart(event) {

	// event.preventDefault();

	mouse.x = (event.changedTouches[0].pageX / window.innerWidth) * 2 -1
	mouse.y = -(event.changedTouches[0].pageY / window.innerHeight) * 2 +1

	console.log("touchstart")
	detectObjects()
}

function detectObjects() {

	raycaster.setFromCamera( mouse ,camera)
	var intersects = raycaster.intersectObjects( cubesGroup )

	if (intersects.length > 0) {

		var intersectedObject = intersects[0]

		// console.log(intersectedObject.object.position.x, 
		// 			intersectedObject.object.position.y, 
		// 			intersectedObject.object.position.z )

		console.log(intersectedObject)

		createNewBox(intersectedObject)		 
	}
}

function createNewBox(intersect) {

	cube = new THREE.Mesh(geomBox, matBox)

	originalPosition = intersect.object.position

	cube.position.x = originalPosition.x + intersect.face.normal.x * 50
	cube.position.y = originalPosition.y + intersect.face.normal.y * 50
	cube.position.z = originalPosition.z + intersect.face.normal.z * 50

	// cube.position.copy(intersect.point).add( intersect.face.normal )
	// cube.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)

	scene.add(cube)
	cubesGroup.push(cube)
}

function init () {

	control = new function () {
		this.rotationSpeed = 0.005
		this.scale = 1
	}

	addControls(control)

	raycaster = new THREE.Raycaster()
	mouse = new THREE.Vector2()

	scene = new THREE.Scene()

	camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 2000 );
	camera.position.x = 200;
	camera.position.y = 100;
	camera.position.z = 200;
	camera.lookAt( scene.position );

	stats = createStats()
	document.body.appendChild( stats.domElement )
	
	renderer = new THREE.WebGLRenderer()
	renderer.setSize( window.innerWidth, window.innerHeight)
	renderer.setClearColor(0xffffff, 1.0);

	
	geomBox = new THREE.BoxGeometry(50, 50, 50)
	matBox =  new THREE.MeshLambertMaterial( { color: 0xffffff, } )

	box = new THREE.Mesh(geomBox, matBox)
	box.position.z = 0
	box.position.x = 0
	box.position.y = 0
	// box.geometry.elementsNeedUpdate = true
	scene.add( box )
	cubesGroup.push(box)

	document.body.appendChild( renderer.domElement )

	document.addEventListener('click', onDocumentClick, false)
	// document.addEventListener('touchstart', onDocumentTouchStart, false)

	var light = new THREE.PointLight( 0xff0000 );
	light.position.set(80,80,80)
	scene.add(light)

	var light = new THREE.PointLight( 0xff0000 );
	light.position.set(-40, -20, -30)
	scene.add(light)
}


function animate() {

  //   for (var i = scene.children.length - 1; i >= 0; i--) {

		// scene.children[i].rotation.x += 0.01
		// scene.children[i].rotation.y += 0.01
  //   }	

	renderer.render(scene, camera)
	stats.update()
	requestAnimationFrame(animate)


	// console.log("ElementsNeedUpdate :" + box.geometry.elementsNeedUpdate);



}


init()
animate()
