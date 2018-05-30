class Utils {
	static handleLoadedTexture(gl, texture) {
  
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
		
		if ((new URL(url)).origin !== window.location.origin) {
			texture.image.origin = "";
		}
	}

	static initTexture(gl, url) {
		
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		// Fill the texture with a 1x1 blue pixel.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));

		// let's assume all images are not a power of 2
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		
		var textureInfo = {
			width: 1,   // we don't know the size until it loads
		    height: 1,
		    texture: texture,
		};
		
		var img = new Image();
			img.addEventListener('load', function() {
		    textureInfo.width = img.width;
		    textureInfo.height = img.height;

		    gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
		    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
		});
		  
		img.crossOrigin = "anonymous";
		img.src = url;
		return texture;  
	}

	static clear(gl) {

		gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
		gl.clearDepth(1.0);                 // Clear everything
		gl.enable(gl.DEPTH_TEST);           // Enable depth testing
		gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

		// Clear the canvas before we start drawing on it.
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	//
	// Initialize a shader program, so WebGL knows how to draw our data
	//
	static initShaderProgram(gl, vsSource, fsSource) {
		
		const vertexShader = Utils.loadShader(gl, gl.VERTEX_SHADER, vsSource);
		const fragmentShader = Utils.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

		// Create the shader program
		const shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		// If creating the shader program failed, alert
		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		    return null;
		}

		return shaderProgram;
	}

	//
	// creates a shader of the given type, uploads the source and
	// compiles it.
	//
	static loadShader(gl, type, source) {
		
		const shader = gl.createShader(type);

	 	// Send the source to the shader object
		gl.shaderSource(shader, source);

		// Compile the shader program
		gl.compileShader(shader);

		// See if it compiled successfully
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}

		return shader;
	}

	static collisionWithSphere(radiusOne, radiusTwo, posX, posY, posZ, posX2, posY2, posZ2) {
		var distance = Math.sqrt( ((posX-posX2)*(posX-posX2)) + ((posY-posY2)*(posY-posY2)) + ((posZ-posZ2)*(posZ-posZ2)) );
		return (distance<radiusOne+radiusTwo);
	}

	static collisionWithPlane(posX, posY, posZ) {
		return ((posX >=1.0 || posX <= -1.0) || (posY >=1.0 || posY <= -1.0) || (posZ >=1.0 || posZ <= -10.0));
	}
}
