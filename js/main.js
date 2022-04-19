


function takeScreenshot() {
    var scene = document.querySelector("a-scene");
    scene.setAttribute('screenshot', { width: 512, height: 256 });
    var screenshot = scene.components.screenshot.getCanvas('perspective');
    var dataURL = screenshot.toDataURL();
    generateCaption(dataURL);
}

function generateCaption(data) {
    var caption = document.querySelector("#caption");
var environment = document.querySelector("#environment");
var takenPhoto = document.querySelector("#takenPhoto");
    fetch('https://hf.space/embed/Akbartus/image-captioning/+/api/predict/',
        {
            method: "POST", body: JSON.stringify(
                {
                    "data": ["data: " + data]
                }),
            headers: { "Content-Type": "application/json" }
        })
        .then(function (response) { return response.json(); })
        .then(function (json_response) {

            caption.setAttribute("text", "value: You took the photo: " + json_response.data[0]);
            caption.setAttribute("visible", true);
            takenPhoto.setAttribute("visible", true);
            takenPhoto.setAttribute("src", data);

            // Remove after 4 sec
            setTimeout(() => {
                takenPhoto.setAttribute("visible", false);
                caption.setAttribute("visible", false);
                if (json_response.data[0].includes("bicycle")) {
                    caption.setAttribute("visible", true);
                    caption.setAttribute("text", "value: You found it!");
                    setTimeout(() => {
                        environment.setAttribute("animation", "property: position; to: 0 -5 -40; dur: 2000; easing: linear;");
                        caption.setAttribute("visible", false);
                    }, 2000);
                }
            }, 3000);
        })
}

setTimeout(() => {
    var task = document.getElementById("task");
    task.setAttribute("visible", false);
}, 10000);