/**
	This will represent a Node in a Scene Graph.
*/
function getNode(object, projectionMatrix) {
	let parentNode = null, nodeObject = object, nodeProjectionMatrix = projectionMatrix;
	const node = {
		children: [],
		localMatrix: mat4.create(),
		worldMatrix: mat4.create(),
		setParent(parent) {
			parentNode = parent
		},
		setWorldMatrix() {

		},
	};
	return node
};
