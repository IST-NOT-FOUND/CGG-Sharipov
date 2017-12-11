var gl;
var shaderProgram;
var vertexBuffer;
var colorBuffer;

var v1r = 1, v1g = 0, v1b = 1,
    v2r = 0, v2g = 1, v2b = 0,
    v3r = 1, v3g = 1, v3b = 0;

var tempV1R, tempV1G, tempV1B,
    tempV2R, tempV2G, tempV2B,
    tempV3R, tempV3G, tempV3B, k = 0;

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
    if (k % 100 === 0) {
        tempV1R = v1r;
        tempV2R = v2r;
        tempV3R = v3r;

        tempV1G = v1g;
        tempV2G = v2g;
        tempV3G = v3g;

        tempV1B = v1b;
        tempV2B = v2b;
        tempV3B = v3b;
        k = 1;
    }

    v1r += changeCol(v1r, tempV3R);
    v2r += changeCol(v2r, tempV1R);
    v3r += changeCol(v3r, tempV2R);
    v1g += changeCol(v1g, tempV3G);
    v2g += changeCol(v2g, tempV1G);
    v3g += changeCol(v3g, tempV2G);
    v1b += changeCol(v1b, tempV3B);
    v2b += changeCol(v2b, tempV1B);
    v3b += changeCol(v3b, tempV2B);

    k++;

    var сolors = [
        v1r, v1g, v1b,
        v2r, v2g, v2b,
        v3r, v3g, v3b,
        v3r, v3g, v3b,
        v1r, v1g, v1b
    ];
    
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}
