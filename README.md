# 3D Viewer

Mini project for learning how to use threepipe.js

### Demo

[https://3-d-viewer-jfemamj71-manittrees-projects.vercel.app](https://3-d-viewer-jfemamj71-manittrees-projects.vercel.app)

### Screenshot

![image](https://github.com/user-attachments/assets/4debe594-5669-4de2-913a-3372ee28cf9e)

### index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite Vanilla</title>
  </head>
  <body>
    <div id="app">
      <canvas id="three-canvas"></canvas>
    </div>
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <script type="module" src="./app.js"></script>
  </body>
</html>
```

### app.js

```javascript
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
```

### package.json

```json
{
  "name": "3D-viewer",
  "description": "Mini project for learning how to use threepipe.js",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "lightningcss": "^1.25.1",
    "vite": "^5.4.1",
    "vite-plugin-css-injected-by-js": "^3.4.0"
  },
  "dependencies": {
    "threepipe": "^0.0.33"
  }
}
```

### vite.config.js

```javascript
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from 'vite';
import fs from 'fs'

export default defineConfig({
    plugins: [cssInjectedByJsPlugin()],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        outDir: './dist',
        minify: false,
        sourcemap: false,
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }    
    },
    server: {
        https: {
            key: fs.readFileSync(`./server.key`),
            cert: fs.readFileSync(`./server.crt`)
        }
    }
})
```
