import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_TL0-EN6J.mjs';
import { manifest } from './manifest_CyQPKHOz.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/github.astro.mjs');
const _page3 = () => import('./pages/api/soundcloud.astro.mjs');
const _page4 = () => import('./pages/cinema.astro.mjs');
const _page5 = () => import('./pages/music.astro.mjs');
const _page6 = () => import('./pages/reading.astro.mjs');
const _page7 = () => import('./pages/urls.json.astro.mjs');
const _page8 = () => import('./pages/writings/posts/_slug_.astro.mjs');
const _page9 = () => import('./pages/writings.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/github.ts", _page2],
    ["src/pages/api/soundcloud.ts", _page3],
    ["src/pages/cinema.astro", _page4],
    ["src/pages/music.astro", _page5],
    ["src/pages/reading.astro", _page6],
    ["src/pages/urls.json.ts", _page7],
    ["src/pages/writings/posts/[slug].astro", _page8],
    ["src/pages/writings/index.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d1999aea-c9b3-4be3-a2bc-6096c92b0346",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
