import {ThreeViewer, DepthBufferPlugin} from 'threepipe';

document.addEventListener('DOMContentLoaded', () => {
    const viewer = new ThreeViewer({canvas: document.getElementById('three-canvas')});

    viewer.addPluginSync(new DepthBufferPlugin());
    const envPromise = viewer.setEnvironmentMap('https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr');
    const modelPromise = viewer.load('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf', {
        autoCenter: true,
        autoScale: true,
    })

    Promise.all([envPromise, modelPromise]).then(([env, model]) => {
        console.log('Loaded', model, env, viewer)
    })
})