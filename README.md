# Simple Three.js + TypeScript Starter

This scaffolding lets you easily get started with using Three.js and TypeScript.

Especially good for rendering scenes which include custom models, textures, and materials.

## Features
- Vite development environment
- TypeScript
- Asset loading
- lil-gui

## Prerequisites

* [Node.js](https://nodejs.org)
* [yarn](https://yarnpkg.com) OR [npm](https://www.npmjs.com)

> 💡 This project uses **yarn@3.2.1** and **npm@8.1.2**. Other versions might lead to different package resolutions, proceed with caution. Example commands use **yarn**.

## Installation

To use this scaffolding, run the following command:

```bash
$ git clone https://github.com/mayacoda/simple-threejs-typescript-starter my-threejs-project
$ cd my-threejs-project
$ yarn install
```

> ✅ If you are on GitHub, create a new repository using this repository as a template by clicking the green **Use this template** button in the top right.

## Development

The starter includes a pre-configured Vite server which you can use to run and develop your project. To start the development server, run the following command:

```bash
$ yarn dev
```

To build the project, run:

```bash
$ yarn build
```

And if you wish to automatically start a server to preview your build, you can run:

```bash
$ yarn build && yarn preview
```

### Removing the example scene

To demonstrate asset loading, this project includes an example scene. To remove it and start with a blank project, run:

```bash
$ yarn remove-example
```

### Serving Assets

If you are using an asset type such as Wavefront OBJ files that come with self-referencing MTL material definitions, you will need to store the assets in the `/public` directory. 

Vite inlines or hashes references which are used directly in code, otherwise it doesn't know about them. This isn't the case for MTL files which references texture files directly. 

Thankfully Vite offers the option to store assets that should be built and deployed as-is in the `/public` directory. Anything that goes into this directory will be placed in the root of the project and will be copied without renaming in the build.

More information about Vite's asset handling can be found [here](https://vitejs.dev/guide/assets.html).

In the example, the `space_dog` model is stored in the `/public` directory, so it's assets can be referenced as if they are in the root of the project:

```typescript
const mtlLoader = new MTLLoader()

mtlLoader.load('./space_dog/space_dog.mtl', (materials) => {
  //...
})
```

It is possible to change the name of the directory using the [publicDir](https://vitejs.dev/config/#publicdir) option.

### Shaders

For loading shaders, Vite uses the [vite-plugin-glsl]( https://github.com/UstymUkhman/vite-plugin-glsl) plugin. Unlike other assets, they need to be inside the `/src/` directory in order to be recognized by TypeScript. In `src/types/glsl.d.ts`, TypeScript recognizes `*.glsl`, `*.vert`, and `*.frag` files as strings.

`src/glsl-import-example` shows how multiple shaders can be imported and resolved using **vite-plugin-glsl**.
