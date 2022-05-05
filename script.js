function startVideoFromCamera() {
    navigator.mediaDevices.getUserMedia({ video: true}).then(stream => {//(video: true) pode ser separado e passado aqui como parametro, para ser possível alterar as propriedades da exibição do video
        const videoElement = document.querySelector("#video")
        videoElement.srcObject = stream

    }).catch(error => { console.log(error) })
}

window.addEventListener("DOMContentLoaded", startVideoFromCamera)

function getConnectedDevices(type, callback) {//verifica quantos dispositivos possíveis estão conectados ao pc
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const filtered = devices.filter(device => device.kind === type);
            callback(filtered);
        });
}

getConnectedDevices('videoinput', cameras => console.log('Cameras found', cameras));

//Verificando alterações nos dispositivos
// Updates the select element with the provided set of cameras
function updateCameraList(cameras) {
    const listElement = document.querySelector('select#availableCameras');
    listElement.innerHTML = '';
    cameras.map(camera => {
        const cameraOption = document.createElement('option');
        cameraOption.label = camera.label;
        cameraOption.value = camera.deviceId;
    }).forEach(cameraOption => listElement.add(cameraOption));
}

// Fetch an array of devices of a certain type
async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

// Get the initial set of cameras connected
const videoCameras = getConnectedDevices('videoinput');
updateCameraList(videoCameras);

// Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener('devicechange', event => {
    const newCameraList = getConnectedDevices('video');
    updateCameraList(newCameraList);
});