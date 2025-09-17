var gl;
var points;
window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  var hexagonVertices = [
    vec2(-0.3, 0.6), // v0
    vec2(-0.4, 0.8), // v1
    vec2(-0.6, 0.8), // v2
    vec2(-0.7, 0.6), // v3
    vec2(-0.6, 0.4), // v4
    vec2(-0.4, 0.4), // v5
    vec2(-0.3, 0.6), // v6
  ];

  var triangleVertices = [
    vec2(0.3, 0.4), // v0
    vec2(0.7, 0.4), // v1
    vec2(0.5, 0.8), // v2
  ];

  var colors = [
    vec4(1, 0, 0, 1), // v0
    vec4(0, 1, 0, 1), // v1
    vec4(0, 0, 1, 1), // v2
  ];

  var strtipVertices = [
    vec2(-0.5, 0.2), // v0
    vec2(-0.4, 0.0), // v1
    vec2(-0.3, 0.2), // v2
    vec2(-0.2, 0.0), // v3
    vec2(-0.1, 0.2), // v4
    vec2(0.0, 0.0), // v5
    vec2(0.1, 0.2), // v6
    vec2(0.2, 0.0), // v7
    vec2(0.3, 0.2), // v8
    vec2(0.4, 0.0), // v9
    vec2(0.5, 0.2), // v10
    // start second strip
    vec2(-0.5, -0.3), // v11
    vec2(-0.4, -0.5), // v12
    vec2(-0.3, -0.3), // v13
    vec2(-0.2, -0.5), // v14
    vec2(-0.1, -0.3), // v15
    vec2(0.0, -0.5), // v16
    vec2(0.1, -0.3), // v17
    vec2(0.2, -0.5), // v18
    vec2(0.3, -0.3), // v19
    vec2(0.4, -0.5), // v20
    vec2(0.5, -0.3), // v21
  ];


  // Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var vPosition = gl.getAttribLocation(program, "vPosition");
  var vColor = gl.getAttribLocation(program, "vColor");


  // hexagon
  var hexagonBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, hexagonBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(hexagonVertices), gl.STATIC_DRAW);

  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  gl.drawArrays(gl.LINE_STRIP, 0, 7);


  //traingle
  var traingleBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, traingleBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(triangleVertices), gl.STATIC_DRAW);

  var triangleColorBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  // associate out shader variables with our data buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, traingleBufferId);
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBufferId);
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(vPosition);
  gl.enableVertexAttribArray(vColor);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  var stripBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, stripBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(strtipVertices), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, stripBufferId);
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  gl.disableVertexAttribArray(vColor);
  gl.vertexAttrib4f(vColor, 1.0, 1.0, 0.0, 1.0); // yellow

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 11);

  gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1.0); // cyan
  gl.drawArrays(gl.LINE_STRIP, 0,11);
  gl.drawArrays(gl.LINE_STRIP, 11, 11);
};