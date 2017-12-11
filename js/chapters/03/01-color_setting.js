var gl;
var shaderProgram;
var vertexBuffer;
var colorBuffer;

function initShaders() {
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Failed to install shaders");
    }
    gl.useProgram(shaderProgram);
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
}

function getShader(type, id) {
    var source = document.getElementById(id).innerHTML;
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Shader compilation error: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initBuffers() {
    var vertices = [
        0.0, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0
    ];
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    vertexBuffer.numberOfItems = 3;
    var сolors = [
        1.0, 0.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}

function draw() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
            vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
            vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}
