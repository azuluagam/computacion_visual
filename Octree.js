class OctTree {

	constructor(region, objects, parent) {
		this.region = region;
		this.objects = objects;
		this.objectsToInsert = objects;
		this.parent = parent;
		this.child = new Array(8);
		if(Object.seal) { 
			Object.seal(this.child);
		}
		this.activeNodes = 8;
		const MIN_SIZE = 1;
		this.m_treeReady = false;
		this.m_treeBuilt = false;
		this.m_maxLifespan = 8;
		this.m_curLife = -1;
	}

	updateTree(newObjects) {
		this.objectsToInsert = newObjects;
	}

	buildTree() {
		if (this.objectsToInsert <= 1) {
			return;
		}
		vec3 dims = this.region.Max - this.region.Min;
		if (dims == vec3.Zero) {

		}
	}
	
}
