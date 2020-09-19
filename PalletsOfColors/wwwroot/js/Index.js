$(document).ready(function () {
    $("#upload").change(function (e) {
        file = e.target.files[0];
        if (!file.type.match(/image.*/)) return;
        var reader = new FileReader();
        reader.onload = uploadImage;
        reader.readAsDataURL(file);
    });

    setDefaultImage();
});

function setDefaultImage() {
    var image = new Image();
    image.src = $("#imagen").attr('src');
    image.onload = function () {
        switchImage(this);
    }
}

function getaverageColor(imagen) {
    var r = 0, g = 0, b = 0, count = 0, canvas, ctx, imageData, data, i;
    canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
    canvas.width = imagen.width;
    canvas.height = imagen.height;
    ctx.drawImage(imagen, 0, 0);
    imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
    data = imageData.data;
    for (i = 0, n = data.length; i < n; i += 4) {
        ++count;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }
    r = ~~(r / count);
    g = ~~(g / count);
    b = ~~(b / count);
    return [r, g, b];
}

function rgbToHex(arr) {
    return "#" + ((1 << 24) + (arr[0] << 16) + (arr[1] << 8) + arr[2]).toString(16).slice(1);
}

function uploadImage(e) {
    var image = new Image();
    image.src = e.target.result;
    image.onload = function () {
        switchImage(this);
    }
}
function switchImage(image) {
    var averagecolor = getaverageColor(image);
    var color = rgbToHex(averagecolor);
    $('#imagen').attr('src', image.src);
    $('#averagecolor').css("background-color", color);
    $('#averagecolor').text(color);
}