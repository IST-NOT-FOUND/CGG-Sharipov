var gl;
var shaderProgram;
var wallVertexBuffer;
var wallIndexBuffer;
var roofVertexBuffer;
var roofIndexBuffer;
var wallTextureCoordsBuffer;
var roofTextureCoordsBuffer;
var wallTexture;
var roofTexture;
var angle = 2.0;
var zTranslation = -2.0;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();

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
    shaderProgram.vertexTextureAttribute = gl.getAttribLocation(shaderProgram, "aVertexTextureCoords");
    gl.enableVertexAttribArray(shaderProgram.vertexTextureAttribute);
    shaderProgram.MVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.ProjMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");
}

function setMatrixUniforms(){
    gl.uniformMatrix4fv(shaderProgram.ProjMatrix,false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.MVMatrix, false, mvMatrix);
}

function getShader(type,id) {
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

function initWallBuffers() {
    var vertices = [
        -0.8, -0.5, 0.5,
        -0.8, 0.5, 0.5,
        -0.4, 0.5, 0.5,
        -0.4, -0.5, 0.5,
        -0.8, -0.5, 0.0,
        -0.8, 0.5, 0.0,
        -0.4, 0.5, 0.0,
        -0.4, -0.5, 0.0,
        -0.8, -0.5, 0.5,
        -0.8, 0.5, 0.5,
        -0.8, 0.5, 0.0,
        -0.8, -0.5, 0.0,
        -0.4, -0.5, 0.5,
        -0.4, 0.5, 0.5,
        -0.4, 0.5, 0.0,
        -0.4, -0.5, 0.0,
        0.8, -0.5, 0.5,
        0.8, 0.5, 0.5,
        0.4, 0.5, 0.5,
        0.4, -0.5, 0.5,
        0.8, -0.5, 0.0,
        0.8, 0.5, 0.0,
        0.4, 0.5, 0.0,
        0.4, -0.5, 0.0,
        0.8, -0.5, 0.5,
        0.8, 0.5, 0.5,
        0.8, 0.5, 0.0,
        0.8, -0.5, 0.0,
        0.4, -0.5, 0.5,
        0.4, 0.5, 0.5,
        0.4, 0.5, 0.0,
        0.4, -0.5, 0.0
    ];
    var indices = [
        0, 1, 2,
        2, 3, 0,
        4, 5, 6,
        6, 7, 4,
        8, 9, 10,
        10, 11, 8,
        12, 13, 14,
        14, 15, 12,
        16, 17, 18,
        18, 19, 16,
        20, 21, 22,
        22, 23, 20,
        24, 25, 26,
        26, 27, 24,
        28, 29, 30,
        30, 31, 28
    ];
    wallVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    wallVertexBuffer.itemSize = 3;
    wallIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wallIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    wallIndexBuffer.numberOfItems = indices.length;
    var textureCoords = [];
    for (var i=0; i<8; i++) {
        textureCoords.push(0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0);
    }
    wallTextureCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallTextureCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    wallTextureCoordsBuffer.itemSize=2;
}
