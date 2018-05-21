/**
	This will represent a Node in a Scene Graph.
*/
function getNode(object, projectionMatrix) {
	let parentNode = null, nodeObject = object, nodeProjectionMatrix = projectionMatrix;
	const node = {
		children: [],
		localMatrix: mat4.create(),
		worldMatrix: mat4.create(),
		// Updates the reference to the new parent.
		setParent(parent) {
			// Remove the object from the parent node.
			if (parentNode && nodeObject) {
				const childIndex = parentNode.children.indexOf(nodeObject);
				if (childIndex >= 0) {
					parentNode.children.splice(childIndex, 1);
				}
			}

			// Add the object to the new parent node.
			if (parent && nodeObject) {
				parent.children.push(nodeObject);
			}

			parentNode = parent;
		},
		// Updates the reference to the new world matrix.
		setWorldMatrix(parentWorldMatrix) {
			if (parentWorldMatrix) {
				// Math is done with the matrix passed in. The result is stored in worldMatrix.
				mat4.multiply(localMatrix, parentWorldMatrix, worldMatrix);
			} else {
				// As no matrix was passed in, a copy from the localMatrix to the worldMatrix is done.
				mat4.copy(localMatrix, worldMatrix);
			}

			// Now update the world matrix of the children
			children.forEach(function(child) {
				child.updateWorldMatrix(worldMatrix);
			});
		},
	};
	return node
};
