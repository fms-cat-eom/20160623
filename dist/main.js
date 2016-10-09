(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160623/src/script/glcat.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var GLCat = function () {
	function GLCat(_gl) {
		_classCallCheck(this, GLCat);

		this.gl = _gl;
		var it = this;
		var gl = it.gl;

		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		gl.getExtension('OES_texture_float');
		gl.getExtension('OES_float_linear');
		gl.getExtension('OES_half_float_linear');

		it.program = null;
	}

	_createClass(GLCat, [{
		key: 'createProgram',
		value: function createProgram(_vert, _frag, _onError) {

			var it = this;
			var gl = it.gl;

			var error = void 0;
			if (typeof _onError === 'function') {
				error = _onError;
			} else {
				error = function error(_str) {
					console.error(_str);
				};
			}

			var vert = gl.createShader(gl.VERTEX_SHADER);
			gl.shaderSource(vert, _vert);
			gl.compileShader(vert);
			if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
				error(gl.getShaderInfoLog(vert));
				return null;
			}

			var frag = gl.createShader(gl.FRAGMENT_SHADER);
			gl.shaderSource(frag, _frag);
			gl.compileShader(frag);
			if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
				error(gl.getShaderInfoLog(frag));
				return null;
			}

			var program = gl.createProgram();
			gl.attachShader(program, vert);
			gl.attachShader(program, frag);
			gl.linkProgram(program);
			if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
				program.locations = {};
				return program;
			} else {
				error(gl.getProgramInfoLog(program));
				return null;
			}
		}
	}, {
		key: 'useProgram',
		value: function useProgram(_program) {

			var it = this;
			var gl = it.gl;

			gl.useProgram(_program);
			it.program = _program;
		}
	}, {
		key: 'createVertexbuffer',
		value: function createVertexbuffer(_array) {

			var it = this;
			var gl = it.gl;

			var buffer = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_array), gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, null);

			buffer.length = _array.length;
			return buffer;
		}
	}, {
		key: 'createIndexbuffer',
		value: function createIndexbuffer(_array) {

			var it = this;
			var gl = it.gl;

			var buffer = gl.createBuffer();

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(_array), gl.STATIC_DRAW);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

			buffer.length = _array.length;
			return buffer;
		}
	}, {
		key: 'attribute',
		value: function attribute(_name, _buffer, _stride) {

			var it = this;
			var gl = it.gl;

			var location = void 0;
			if (it.program.locations[_name]) {
				location = it.program.locations[_name];
			} else {
				location = gl.getAttribLocation(it.program, _name);
				it.program.locations[_name] = location;
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, _buffer);
			gl.enableVertexAttribArray(location);
			gl.vertexAttribPointer(location, _stride, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, null);
		}
	}, {
		key: 'getUniformLocation',
		value: function getUniformLocation(_name) {

			var it = this;
			var gl = it.gl;

			var location = void 0;

			if (it.program.locations[_name]) {
				location = it.program.locations[_name];
			} else {
				location = gl.getUniformLocation(it.program, _name);
				it.program.locations[_name] = location;
			}

			return location;
		}
	}, {
		key: 'uniform1i',
		value: function uniform1i(_name, _value) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.uniform1i(location, _value);
		}
	}, {
		key: 'uniform1f',
		value: function uniform1f(_name, _value) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.uniform1f(location, _value);
		}
	}, {
		key: 'uniform2fv',
		value: function uniform2fv(_name, _value) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.uniform2fv(location, _value);
		}
	}, {
		key: 'uniform3fv',
		value: function uniform3fv(_name, _value) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.uniform3fv(location, _value);
		}
	}, {
		key: 'uniformCubemap',
		value: function uniformCubemap(_name, _texture, _number) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.activeTexture(gl.TEXTURE0 + _number);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, _texture);
			gl.uniform1i(location, _number);
		}
	}, {
		key: 'uniformTexture',
		value: function uniformTexture(_name, _texture, _number) {

			var it = this;
			var gl = it.gl;

			var location = it.getUniformLocation(_name);
			gl.activeTexture(gl.TEXTURE0 + _number);
			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.uniform1i(location, _number);
		}
	}, {
		key: 'createTexture',
		value: function createTexture() {

			var it = this;
			var gl = it.gl;

			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.bindTexture(gl.TEXTURE_2D, null);

			return texture;
		}
	}, {
		key: 'textureFilter',
		value: function textureFilter(_texture, _filter) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _filter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _filter);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'textureWrap',
		value: function textureWrap(_texture, _wrap) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, _wrap);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, _wrap);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'setTexture',
		value: function setTexture(_texture, _image) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _image);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'setTextureFromArray',
		value: function setTextureFromArray(_texture, _width, _height, _array) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(_array));
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'setTextureFromFloatArray',
		value: function setTextureFromFloatArray(_texture, _width, _height, _array) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.FLOAT, new Float32Array(_array));
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'copyTexture',
		value: function copyTexture(_texture, _width, _height) {

			var it = this;
			var gl = it.gl;

			gl.bindTexture(gl.TEXTURE_2D, _texture);
			gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, _width, _height, 0);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'createCubemap',
		value: function createCubemap(_arrayOfImage) {

			var it = this;
			var gl = it.gl;

			// order : X+, X-, Y+, Y-, Z+, Z-
			var texture = gl.createTexture();

			gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
			for (var i = 0; i < 6; i++) {
				gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _arrayOfImage[i]);
			}
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

			return texture;
		}
	}, {
		key: 'createFramebuffer',
		value: function createFramebuffer(_width, _height) {

			var it = this;
			var gl = it.gl;

			var framebuffer = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

			framebuffer.depth = gl.createRenderbuffer();
			gl.bindRenderbuffer(gl.RENDERBUFFER, framebuffer.depth);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, framebuffer.depth);

			framebuffer.texture = it.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, framebuffer.texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
			gl.bindTexture(gl.TEXTURE_2D, null);

			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, framebuffer.texture, 0);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

			return framebuffer;
		}
	}, {
		key: 'resizeFramebuffer',
		value: function resizeFramebuffer(_framebuffer, _width, _height) {

			var it = this;
			var gl = it.gl;

			gl.bindFramebuffer(gl.FRAMEBUFFER, _framebuffer);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}
	}, {
		key: 'createFloatFramebuffer',
		value: function createFloatFramebuffer(_width, _height) {

			var it = this;
			var gl = it.gl;

			var framebuffer = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

			framebuffer.depth = gl.createRenderbuffer();
			gl.bindRenderbuffer(gl.RENDERBUFFER, framebuffer.depth);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, framebuffer.depth);

			framebuffer.texture = it.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, framebuffer.texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.FLOAT, null);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.bindTexture(gl.TEXTURE_2D, null);

			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, framebuffer.texture, 0);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

			return framebuffer;
		}
	}, {
		key: 'resizeFloatFramebuffer',
		value: function resizeFloatFramebuffer(_framebuffer, _width, _height) {

			var it = this;
			var gl = it.gl;

			gl.bindFramebuffer(gl.FRAMEBUFFER, _framebuffer);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.FLOAT, null);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}
	}, {
		key: 'clear',
		value: function clear(_r, _g, _b, _a, _d) {

			var it = this;
			var gl = it.gl;

			var r = _r || 0.0;
			var g = _g || 0.0;
			var b = _b || 0.0;
			var a = typeof _a === 'number' ? _a : 1.0;
			var d = typeof _d === 'number' ? _d : 1.0;

			gl.clearColor(r, g, b, a);
			gl.clearDepth(d);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		}
	}]);

	return GLCat;
}();

exports.GLCat = GLCat;

},{}],"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160623/src/script/main.js":[function(require,module,exports){
'use strict';

var _xorshift = require('./xorshift');

var _glcat = require('./glcat');



// ---

var clamp = function clamp(_value, _min, _max) {
  return Math.min(Math.max(_value, _min), _max);
};

var saturate = function saturate(_value) {
  return clamp(_value, 0.0, 1.0);
};

// ---

var width = canvas.width = 1280;
var height = canvas.height = 720;

var gl = canvas.getContext('webgl');
var glCat = new _glcat.GLCat(gl);

var distSize = 2048;

var frame = 0;
var frames = 160;
var iSample = 0;
var nSample = 200;
var time = 0.0;

// ---

var vboQuad = glCat.createVertexbuffer([-1, -1, 1, -1, -1, 1, 1, 1]);

// ---

var vertQuad = "#define GLSLIFY 1\nattribute vec2 p;\n\nvoid main() {\n  gl_Position = vec4( p, 0.0, 1.0 );\n}\n";

var programReturn = glCat.createProgram(vertQuad, "precision highp float;\n#define GLSLIFY 1\n\nuniform vec2 resolution;\nuniform sampler2D texture;\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution;\n  gl_FragColor = texture2D( texture, uv );\n}\n");

var programDistance = glCat.createProgram(vertQuad, "#define V vec2(0.,1.)\n#define saturate(i) clamp(i,0.,1.)\n\nprecision highp float;\n#define GLSLIFY 1\n\nuniform bool isVert;\nuniform sampler2D texture;\nuniform float distSize;\n\nbool isSameSide( float _col, bool _inside ) {\n  return ( _col < 0.0 ) == _inside;\n}\n\nfloat getDist( vec4 _i ) {\n  return isVert ? _i.x - 0.5 : ( _i.x < 0.5 ? 1E3 : -1E3 );\n}\n\nvoid main() {\n  vec2 p = gl_FragCoord.xy;\n\n  vec2 gap = V.yx;\n  float reso = distSize;\n  float coord = gl_FragCoord.x;\n\n  if ( isVert ) {\n    gap = V.xy;\n    reso = distSize;\n    coord = gl_FragCoord.y;\n  }\n\n  float dist = getDist( texture2D( texture, p / distSize ) );\n  bool inside = isSameSide( dist, true );\n\n  dist = abs( dist );\n\n  for ( int iLoop = 1; iLoop < 256; iLoop ++ ) {\n    float i = float( iLoop );\n    float d = ( i - 0.5 ) / 255.0;\n    if ( dist < d ) { break; }\n\n    for ( int iiLoop = -1; iiLoop < 2; iiLoop += 2 ) {\n      float ii = float( iiLoop );\n      vec2 tCoord = p + ii * i * gap;\n      if ( 0.0 <= tCoord.x && tCoord.x < distSize && 0.0 <= tCoord.y && tCoord.y < distSize ) {\n        float col = getDist( texture2D( texture, tCoord / distSize ) );\n        dist = min(\n          dist,\n          length( vec2( d, isSameSide( col, inside ) ? col : 0.0 ) )\n        );\n      }\n    }\n  }\n\n  gl_FragColor = vec4( 0.5 + ( inside ? dist : -dist ), 0.0, 0.0, 1.0 );\n}\n");

var programRaymarch = glCat.createProgram(vertQuad, "#define MARCH_ITER 100\n#define RAYAMP_MIN 0.01\n#define INIT_LEN 0.01\n#define NSAMPLE 3\n#define NREF 3\n#define SKY_COLOR vec3( 0.0 )\n\n#define IFS_ITER 4\n\n// ---\n\n#define PI 3.14159265\n#define V vec2(0.,1.)\n#define saturate(i) clamp(i,0.,1.)\n#define lofi(i,m) (floor((i)*(m))/(m))\n\n// ---\n\nprecision highp float;\n#define GLSLIFY 1\n\nuniform float time;\nuniform vec2 resolution;\n\nuniform sampler2D textureWordToomany;\nuniform sampler2D textureWordTasks;\nuniform sampler2D textureRandom;\n\n// ---\n\nvec3 color;\nvec3 amp;\n\n// ---\n\nvec4 seed;\nfloat preRandom() {\n  const vec4 q = vec4(   1225.0,    1585.0,    2457.0,    2098.0);\n  const vec4 r = vec4(   1112.0,     367.0,      92.0,     265.0);\n  const vec4 a = vec4(   3423.0,    2646.0,    1707.0,    1999.0);\n  const vec4 m = vec4(4194287.0, 4194277.0, 4194191.0, 4194167.0);\n\n  vec4 beta = floor(seed / q);\n  vec4 p = a * (seed - beta * q) - beta * r;\n  beta = (sign(-p) + vec4(1.0)) * vec4(0.5) * m;\n  seed = (p + beta);\n\n  return fract(dot(seed / m, vec4(1.0, -1.0, 1.0, -1.0)));\n}\n\nvec4 random() {\n  return vec4(\n    preRandom(),\n    preRandom(),\n    preRandom(),\n    preRandom()\n  );\n}\n\n// ---\n\nmat2 rotate2D( float _t ) {\n  return mat2( cos( _t ), sin( _t ), -sin( _t ), cos( _t ) );\n}\n\nvec3 rotateEuler( vec3 _p, vec3 _r ) {\n  vec3 p = _p;\n  p.yz = rotate2D( _r.x ) * p.yz;\n  p.zx = rotate2D( _r.y ) * p.zx;\n  p.xy = rotate2D( _r.z ) * p.xy;\n  return p;\n}\n\nfloat smin( float _a, float _b, float _k ) {\n  float h = clamp( 0.5 + 0.5 * ( _b - _a ) / _k, 0.0, 1.0 );\n  return mix( _b, _a, h ) - _k * h * ( 1.0 - h );\n}\n\n// ---\n\nvec3 gradient1( in float _p ) {\n  return mix(\n    vec3( 0.76, 0.92, 0.98 ),\n    mix(\n      vec3( 0.09, 0.51, 0.89 ) * 0.6,\n      mix(\n        vec3( 0.56, 0.14, 0.82 ) * 0.6,\n        vec3( 0.87, 0.64, 0.11 ),\n        saturate( _p * 3.0 - 2.0 )\n      ),\n      saturate( _p * 3.0 - 1.0 )\n    ),\n    saturate( _p * 3.0 )\n  );\n}\n\nvec3 gradient2( in float _p ) {\n  vec3 rgb = mix(\n    vec3( 0.84, 0.84, 0.93 ),\n    vec3( 0.02, 0.17, 0.93 ),\n    saturate( _p )\n  );\n\n  if ( _p < 0.0 ) {\n    rgb = mix(\n      vec3( 0.06, 0.01, 0.02 ),\n      vec3( 0.94, 0.12, 0.71 ),\n      saturate( -_p )\n    );\n  }\n\n  return rgb;\n}\n\nvec3 gradient3( in float _p ) {\n  return mix(\n    vec3( 0.02, 0.09, 0.91 ),\n    vec3( 0.36, 0.02, 0.91 ),\n    saturate( _p )\n  );\n}\n\nvec3 gradient4( in float _p ) {\n  return mix(\n    vec3( 0.92, 0.27, 0.01 ),\n    vec3( 0.92, 0.02, 0.01 ),\n    saturate( _p )\n  );\n}\n\n// ---\n\nstruct Camera {\n  vec3 pos;\n  vec3 dir;\n  vec3 sid;\n  vec3 top;\n};\n\nstruct Ray {\n  vec3 dir;\n  vec3 ori;\n  bool inside;\n};\n\nstruct Material {\n  vec3 color;\n  vec3 emissive;\n\n  float reflective;\n  float reflectiveRoughness;\n  float refractive;\n  float refractiveIndex;\n};\n\nstruct Map {\n  float dist;\n  Material material;\n};\n\nstruct March {\n  Ray ray;\n  Map map;\n  float len;\n  vec3 pos;\n};\n\n// ---\n\nCamera camInit( in vec3 _pos, in vec3 _tar ) {\n  Camera cam;\n  cam.pos = _pos;\n  cam.dir = normalize( _tar - _pos );\n  cam.sid = normalize( cross( cam.dir, V.xyx ) );\n  cam.top = normalize( cross( cam.sid, cam.dir ) );\n\n  return cam;\n}\n\nMap distFunc( in vec3 _p );\nRay rayInit( in vec3 _ori, in vec3 _dir ) {\n  Ray ray;\n  ray.dir = _dir;\n  ray.ori = _ori;\n  ray.inside = distFunc( ray.ori ).dist < 0.0;\n  return ray;\n}\n\nRay rayFromCam( in vec2 _p, in Camera _cam ) {\n  vec3 dir = normalize( _p.x * _cam.sid + _p.y * _cam.top + _cam.dir );\n  return rayInit( _cam.pos, dir );\n}\n\nMaterial mtlInit( in vec3 _col ) {\n  Material material;\n  material.color = _col;\n  material.emissive = V.xxx;\n\n  material.reflective = 0.0;\n  material.reflectiveRoughness = 0.0;\n  material.refractive = 0.0;\n  material.refractiveIndex = 1.0;\n  return material;\n}\n\nMap mapInit( in float _dist ) {\n  Map map;\n  map.dist = _dist;\n  map.material = mtlInit( V.xxx );\n  return map;\n}\n\nMarch marchInit( in Ray _ray ) {\n  March march;\n  march.ray = _ray;\n  march.len = INIT_LEN;\n  march.pos = _ray.ori + _ray.dir * march.len;\n  return march;\n}\n\n// ---\n\nfloat box( in vec3 _pos, in vec3 _size ) {\n  vec3 d = abs( _pos ) - _size;\n  return min( max( d.x, max( d.y, d.z ) ), 0.0 ) + length( max( d, 0.0 ) );\n}\n\nfloat tri( in vec3 _p, in float _size ) {\n  vec3 q = abs( _p );\n  return max( q.x * 0.866025 + _p.y * 0.5, -_p.y ) - _size * 0.5;\n}\n\nvec3 word( vec3 _p, sampler2D _tex, float _size, float _ext, float _bold ) {\n  vec3 pos = _p;\n  if ( box( pos, vec2( 0.5 * _size, _ext * 2.0 ).xxy ) < 0.0 ) {\n    vec4 tex = V.xxxx;\n    for ( int iy = -1; iy < 2; iy ++ ) {\n      for ( int ix = -1; ix < 2; ix ++ ) {\n        vec2 coord = 0.5 + pos.xy / _size + vec2( ix, iy ) / 2048.0;\n        tex += texture2D( _tex, coord ) / 9.0;\n      }\n    }\n    vec2 distXY = vec2(\n      ( ( tex.x - 0.5 ) - _bold ) * _size / 8.0,\n      abs( pos.z ) - _ext\n    );\n\n    float dist = min( max( distXY.x, distXY.y ), 0.0 ) + length( max( distXY, 0.0 ) );\n    return vec3( dist, distXY );\n  } else {\n    return vec3( box( pos, vec2( 0.5 * _size, _ext * 2.0 ).xxy * 0.9 ), 0.0, 0.0 );\n  }\n}\n\nvec3 ifs( vec3 _p, vec3 _rot, vec3 _shift ) {\n  vec3 pos = _p;\n\n  vec3 shift = _shift;\n\n  for ( int i = 0; i < IFS_ITER; i ++ ) {\n    float intensity = pow( 2.0, -float( i ) );\n\n    pos.y -= 0.0;\n\n    pos = abs( pos )\n      - shift\n      * intensity;\n\n    shift.yz = rotate2D( _rot.x ) * shift.yz;\n    shift.zx = rotate2D( _rot.y ) * shift.zx;\n    shift.xy = rotate2D( _rot.z ) * shift.xy;\n\n    if ( pos.x < pos.y ) { pos.xy = pos.yx; }\n    if ( pos.x < pos.z ) { pos.xz = pos.zx; }\n    if ( pos.y < pos.z ) { pos.yz = pos.zy; }\n  }\n\n  return pos;\n}\n\nMap distFunc( in vec3 _p, in float _time ) {\n  Map map = mapInit( 1E9 );\n\n  { // toomany\n    vec3 p = _p;\n    p.x += pow( max( 0.0, time - 0.8 ) * 20.0, 2.0 );\n    p.xy = rotate2D( -0.04 ) * p.xy;\n    p -= vec3( -1.0, 0.7, 0.4 );\n\n    float wid = ( time - 0.14 ) * 30.0;\n    vec3 dist = word( p, textureWordToomany, 8.0, 0.1, 0.0 );\n    dist = max( dist, p.x - wid );\n\n    if ( dist.x < map.dist ) {\n      map = mapInit( dist.x );\n      map.material = mtlInit( vec3( 0.9, 0.1, 0.1 ) );\n\n      float emi = exp( -abs( p.x - wid ) * 40.0 );\n      map.material.emissive = emi * vec3( 9.0 );\n    }\n  }\n\n  { // tasks\n    vec3 p = _p;\n    p.x -= pow( max( 0.0, time - 0.8 ) * 20.0, 2.0 );\n    p -= vec3( 0.0, -0.5, 0.0 );\n\n    float hei = ( time - 0.3 ) * 10.0;\n    vec3 dist = word( p, textureWordTasks, 10.0, 0.3, 0.02 );\n    dist = max( dist, p.y - hei );\n\n    if ( dist.x < map.dist ) {\n      map = mapInit( dist.x );\n\n      float phaseGlow = saturate( 1.0 - abs( time - 0.5 ) * 20.0 );\n      float phaseGrid = time < 0.5 ? 1.0 : phaseGlow;\n\n      map.material = mtlInit( gradient2( p.y * 2.0 ) * 0.6 );\n      map.material.color *= saturate( -dist.y * 1E3 );\n      map.material.color = mix(\n        map.material.color,\n        vec3( 1.0 ),\n        phaseGrid\n      );\n\n      map.material.refractive = phaseGrid;\n\n      float emi = exp( dist.y * 100.0 );\n      emi += phaseGrid * exp( -abs( mod( p.x - 0.1, 0.2 ) - 0.1 ) * 300.0 );\n      emi += phaseGrid * exp( -abs( mod( p.y - 0.1, 0.2 ) - 0.1 ) * 300.0 );\n      emi = mix(\n        emi * exp( dist.z * 40.0 ),\n        1.0,\n        phaseGlow\n      );\n      emi += exp( -abs( p.y - hei ) * 100.0 );\n      emi = saturate( emi );\n      map.material.emissive = emi * vec3( 3.0, 4.0, 5.0 );\n    }\n  }\n\n  { // tri\n    vec3 p = _p;\n    p.y -= pow( max( 0.0, time - 0.8 ) * 20.0, 2.0 );\n    p -= vec3( 0.0, -0.6, -0.5 );\n\n    float phaseSize = 0.5 - cos( min( time * 10.0, PI ) ) * 0.5;\n\n    float distTri = tri( p, 4.0 * phaseSize );\n    float dist = max( distTri, abs( p.z ) - 0.01 );\n\n    if ( dist < map.dist ) {\n      map = mapInit( dist );\n      map.material = mtlInit( vec3( 0.2 ) );\n      map.material.emissive = exp( distTri * 100.0 ) * gradient3( ( p.y - 0.5 ) * 0.3 ) * 40.0;\n      map.material.refractive = 1.0;\n    }\n  }\n\n  { // floor\n    vec3 p = _p;\n    p.z -= time * 10.0;\n    p -= vec3( 0.0, -3.0, 0.0 );\n\n    float dist = p.y;\n\n    if ( dist < map.dist ) {\n      map = mapInit( dist );\n      map.material = mtlInit( vec3( 0.2 ) );\n      map.material.reflective = 1.0;\n      map.material.reflectiveRoughness = 0.2;\n\n      float line = exp( -abs( mod( p.x - 0.5, 1.0 ) - 0.5 ) * 100.0 );\n      line += exp( -abs( mod( p.z - 0.5, 1.0 ) - 0.5 ) * 100.0 );\n      line = saturate( line );\n      map.material.emissive = line * vec3( 1.0, 0.1, 0.3 ) * 40.0;\n    }\n  }\n\n  { // sun\n    vec3 p = _p;\n    p -= vec3( 0.0, 2.0, -20.0 );\n\n    float distCirc = length( p.xy ) - 20.0;\n    float distSlash;\n    {\n      vec3 pd = p;\n      pd.y += time * 4.0;\n      pd.y = mod( pd.y - 1.0, 2.0 ) - 1.0;\n      distSlash = abs( pd.y ) - p.y * 0.05 - 0.3;\n    }\n    float dist = max( max( distCirc, distSlash ), abs( p.z ) - 0.01 );\n\n    if ( dist < map.dist ) {\n      map = mapInit( dist );\n      map.material = mtlInit( vec3( 0.04 ) );\n      map.material.emissive = gradient4( ( p.y + 10.0 ) * 0.04 ) * 2.0;\n    }\n  }\n\n  { // light\n    vec3 p = _p;\n    p -= vec3( 0.0, 30.0, 20.0 );\n\n    float dist = box( p, vec3( 100.0, 10.0, 10.0 ) );\n\n    if ( dist < map.dist ) {\n      map = mapInit( dist );\n      map.material = mtlInit( vec3( 0.4 ) );\n      map.material.emissive = vec3( 0.6, 0.7, 0.9 ) * 20.0;\n    }\n  }\n\n  return map;\n}\n\nMap distFunc( in vec3 _p ) {\n  return distFunc( _p, time );\n}\n\nvec3 normalFunc( in vec3 _p, in float _d ) {\n  vec2 d = V * _d;\n  return normalize( vec3(\n    distFunc( _p + d.yxx ).dist - distFunc( _p - d.yxx ).dist,\n    distFunc( _p + d.xyx ).dist - distFunc( _p - d.xyx ).dist,\n    distFunc( _p + d.xxy ).dist - distFunc( _p - d.xxy ).dist\n  ) );\n}\n\n// ---\n\nMarch march( in Ray _ray ) {\n  Ray ray = _ray;\n  March march = marchInit( ray );\n\n  for ( int iMarch = 0; iMarch < MARCH_ITER; iMarch ++ ) {\n    Map map = distFunc( march.pos );\n    map.dist *= ( ray.inside ? -1.0 : 1.0 ) * 0.8;\n\n    march.map = map;\n    march.len += map.dist;\n    march.pos = ray.ori + ray.dir * march.len;\n\n    if ( 1E3 < march.len || abs( map.dist ) < INIT_LEN * 0.01 ) { break; }\n  }\n\n  return march;\n}\n\n// ---\n\nvec3 backgroundColor( in vec3 _dir ) {\n  return V.xxx;\n}\n\n// ---\n\nvec3 randomHemisphere( in vec3 _normal ) {\n  vec3 dir = V.xxx;\n  for ( int i = 0; i < 9; i ++ ) {\n    dir = random().xyz * 2.0 - 1.0;\n    if ( length( dir ) < 1.0 ) { break; }\n  }\n  dir = normalize( dir );\n  if ( dot( dir, _normal ) < 0.0 ) { dir = -dir; }\n  return dir;\n}\n\nRay shade( in March _march ) {\n  March march = _march;\n\n  if ( abs( march.map.dist ) < 1E-2 ) {\n    bool inside = march.ray.inside;\n    vec3 normal = normalFunc( march.pos, 1E-4 );\n\n    normal = inside ? -normal : normal;\n    Material material = march.map.material;\n\n    vec3 dir = V.xxx;\n    float dice = random().x;\n\n    color += amp * max( 0.0, dot( normal, -march.ray.dir ) ) * march.map.material.emissive;\n    amp *= march.map.material.color;\n\n    if ( dice < material.reflective ) { // reflect\n      vec3 ref = normalize( reflect(\n        march.ray.dir,\n        normal\n      ) );\n      vec3 dif = randomHemisphere( normal );\n      dir = normalize( mix(\n        ref,\n        dif,\n        material.reflectiveRoughness\n      ) );\n      amp *= max( dot( dir, dif ), 0.0 );\n\n    } else if ( dice < material.reflective + material.refractive ) { // refract\n      vec3 inc = normalize( march.ray.dir );\n      bool toAir = ( 0.0 < dot( normal, inc ) );\n      float eta = 1.0 / march.map.material.refractiveIndex;\n      eta = inside ? 1.0 / eta : eta;\n\n      dir = refract(\n        inc,\n        toAir ? -normal : normal,\n        toAir ? 1.0 / eta : eta\n      );\n      dir = ( dir == V.xxx )\n      ? ( normalize( reflect(\n        march.ray.dir,\n        normal\n      ) ) )\n      : normalize( dir );\n      inside = !inside;\n\n    } else { // diffuse\n      dir = randomHemisphere( normal );\n      amp *= max( dot( dir, normal ), 0.0 );\n    }\n\n    Ray ray = rayInit( march.pos, dir );\n    ray.inside = inside;\n    return ray;\n  } else {\n    color += amp * SKY_COLOR;\n    amp *= 0.0;\n\n    return rayInit( V.xxx, V.xxx );\n  }\n}\n\n// ---\n\nvoid main() {\n  seed = texture2D( textureRandom, gl_FragCoord.xy / resolution );\n\n  vec3 sum = V.xxx;\n\n  for ( int iSample = 0; iSample < NSAMPLE; iSample ++ ) {\n    Camera cam = camInit(\n      vec3( 0.0, 0.0, 6.0 ),\n      vec3( 0.0, 0.0, 0.0 )\n    );\n    cam.pos += ( random().y - 0.5 ) * 0.01 * cam.sid;\n    cam.pos += ( random().y - 0.5 ) * 0.01 * cam.top;\n\n    vec3 tempSid = cam.sid;\n    vec3 tempTop = cam.top;\n\n    vec2 pix = gl_FragCoord.xy + random().xy - 0.5;\n    vec2 p = ( pix * 2.0 - resolution ) / resolution.x;\n    Ray ray = rayFromCam( p, cam );\n\n    color = V.xxx;\n    amp = V.yyy;\n\n    for ( int iRef = 0; iRef < NREF; iRef ++ ) {\n      ray = shade( march( ray ) );\n\n      if ( length( amp ) < RAYAMP_MIN ) { break; }\n    }\n\n    sum += color / float( NSAMPLE );\n  }\n\n  gl_FragColor = vec4( sum, 1.0 );\n}\n");

var programMotionblur = glCat.createProgram(vertQuad, "precision highp float;\n#define GLSLIFY 1\n\nuniform bool init;\nuniform float add;\nuniform vec2 resolution;\nuniform sampler2D renderTexture;\nuniform sampler2D blurTexture;\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution;\n  vec3 ret = texture2D( renderTexture, uv ).xyz * add;\n  if ( !init ) {\n    ret += texture2D( blurTexture, uv ).xyz;\n  }\n  gl_FragColor = vec4( ret, 1.0 );\n}\n");

var programGamma = glCat.createProgram(vertQuad, "precision highp float;\n#define GLSLIFY 1\n\nuniform vec2 resolution;\nuniform sampler2D texture;\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution;\n  gl_FragColor = vec4(\n    pow( texture2D( texture, uv ).xyz, vec3( 1.0 / 2.2 ) ),\n    1.0\n  );\n}\n");

// ---

var framebufferWordToomany = glCat.createFramebuffer(distSize, distSize);
var framebufferWordTasks = glCat.createFramebuffer(distSize, distSize);
var framebufferWordTemp = glCat.createFramebuffer(distSize, distSize);

var framebufferRender = glCat.createFloatFramebuffer(width, height);
var framebufferMotionblur = glCat.createFloatFramebuffer(width, height);
var framebufferMotionblurReturn = glCat.createFloatFramebuffer(width, height);

// ---

var prepareDistance = function prepareDistance(_framebuffer, _texture) {
  gl.viewport(0, 0, distSize, distSize);
  glCat.useProgram(programDistance);
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferWordTemp);
  glCat.clear();

  glCat.attribute('p', vboQuad, 2);

  glCat.uniform1i('isVert', false);
  glCat.uniform1f('distSize', distSize);
  glCat.uniformTexture('texture', _texture, 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // ---

  gl.viewport(0, 0, distSize, distSize);
  glCat.useProgram(programDistance);
  gl.bindFramebuffer(gl.FRAMEBUFFER, _framebuffer);
  glCat.clear();

  glCat.attribute('p', vboQuad, 2);

  glCat.uniform1i('isVert', true);
  glCat.uniform1f('distSize', distSize);
  glCat.uniformTexture('texture', framebufferWordTemp.texture, 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

var textureWordToomany = glCat.createTexture();
(function () {
  var image = new Image();
  image.src = 'image/toomany.png';
  image.onload = function () {
    glCat.setTexture(textureWordToomany, image);
    prepareDistance(framebufferWordToomany, textureWordToomany);
  };
})();

var textureWordTasks = glCat.createTexture();
(function () {
  var image = new Image();
  image.src = 'image/tasks.png';
  image.onload = function () {
    glCat.setTexture(textureWordTasks, image);
    prepareDistance(framebufferWordTasks, textureWordTasks);
  };
})();

var textureRandomSize = 256;
var textureRandom = glCat.createTexture();
glCat.textureWrap(textureRandom, gl.REPEAT);

var textureRandomUpdate = function textureRandomUpdate() {
  glCat.setTextureFromArray(textureRandom, textureRandomSize, textureRandomSize, function () {
    var len = textureRandomSize * textureRandomSize * 4;
    var ret = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      ret[i] = Math.floor((0, _xorshift.xorshift)() * 256.0);
    }
    return ret;
  }());
};

// ---

var renderA = document.createElement('a');

var saveFrame = function saveFrame() {
  renderA.href = canvas.toDataURL();
  renderA.download = ('0000' + frame).slice(-5) + '.png';
  renderA.click();
};

// ---

var render = function render() {
  gl.viewport(0, 0, width, height);
  glCat.useProgram(programRaymarch);
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferRender);
  glCat.clear();

  glCat.attribute('p', vboQuad, 2);

  glCat.uniform1f('time', time);
  glCat.uniform2fv('resolution', [width, height]);

  glCat.uniformTexture('textureRandom', textureRandom, 0);
  glCat.uniformTexture('textureWordToomany', framebufferWordToomany.texture, 1);
  glCat.uniformTexture('textureWordTasks', framebufferWordTasks.texture, 2);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // ---

  gl.viewport(0, 0, width, height);
  glCat.useProgram(programReturn);
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferMotionblurReturn);
  glCat.clear();

  glCat.attribute('p', vboQuad, 2);
  glCat.uniform2fv('resolution', [width, height]);
  glCat.uniformTexture('texture', framebufferMotionblur.texture, 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // ---

  gl.viewport(0, 0, width, height);
  glCat.useProgram(programMotionblur);
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferMotionblur);
  glCat.clear();

  glCat.attribute('p', vboQuad, 2);
  glCat.uniform1f('add', 1.0 / nSample);
  glCat.uniform1i('init', iSample === 0);
  glCat.uniform2fv('resolution', [width, height]);
  glCat.uniformTexture('renderTexture', framebufferRender.texture, 0);
  glCat.uniformTexture('blurTexture', framebufferMotionblurReturn.texture, 1);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // ---

  gl.viewport(0, 0, width, height);
  glCat.useProgram(programGamma);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  glCat.clear();

  glCat.attribute('p', vboQuad, 2);
  glCat.uniform2fv('resolution', [width, height]);
  glCat.uniformTexture('texture', framebufferMotionblur.texture, 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

// ---

var update = function update() {
  if (!checkboxPlay.checked) {
    requestAnimationFrame(update);
    return;
  }

  textureRandomUpdate();

  var timePrev = time;
  time = (frame + iSample / nSample) / frames % 1.0;
  var deltaTime = time - timePrev;

  render(iSample);

  iSample++;
  if (iSample === nSample) {
    if (checkboxSave.checked) {
      saveFrame();
    }

    iSample = 0;
    frame++;
  }

  console.log(frame);

  requestAnimationFrame(update);
};

update();

window.addEventListener('keydown', function (_e) {
  if (_e.which === 27) {
    checkboxPlay.checked = false;
  }
});

},{"./glcat":"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160623/src/script/glcat.js","./xorshift":"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160623/src/script/xorshift.js"}],"/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160623/src/script/xorshift.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var seed = void 0;
var xorshift = function xorshift(_seed) {
  seed = _seed || seed || 1;
  seed = seed ^ seed << 13;
  seed = seed ^ seed >>> 17;
  seed = seed ^ seed << 5;
  return seed / Math.pow(2, 32) + 0.5;
};

exports.xorshift = xorshift;

},{}]},{},["/Users/Yutaka/Dropbox/pro/_Projects/_eom/20160623/src/script/main.js"]);
