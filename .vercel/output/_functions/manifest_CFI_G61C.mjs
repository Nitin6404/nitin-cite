import 'piccolore';
import { l as decodeKey } from './chunks/astro/server_DS-Vk3-f.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CLiYfFLA.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/nc157/Projects/nitin-cite/","cacheDir":"file:///C:/Users/nc157/Projects/nitin-cite/node_modules/.astro/","outDir":"file:///C:/Users/nc157/Projects/nitin-cite/dist/","srcDir":"file:///C:/Users/nc157/Projects/nitin-cite/src/","publicDir":"file:///C:/Users/nc157/Projects/nitin-cite/public/","buildClientDir":"file:///C:/Users/nc157/Projects/nitin-cite/dist/client/","buildServerDir":"file:///C:/Users/nc157/Projects/nitin-cite/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"api/github","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/github","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/github\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"github","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/github.ts","pathname":"/api/github","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"cinema/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cinema","isIndex":false,"type":"page","pattern":"^\\/cinema\\/?$","segments":[[{"content":"cinema","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cinema.astro","pathname":"/cinema","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"music/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/music","isIndex":false,"type":"page","pattern":"^\\/music\\/?$","segments":[[{"content":"music","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/music.astro","pathname":"/music","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"reading/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/reading","isIndex":false,"type":"page","pattern":"^\\/reading\\/?$","segments":[[{"content":"reading","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/reading.astro","pathname":"/reading","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"urls.json","links":[],"scripts":[],"styles":[],"routeData":{"route":"/urls.json","isIndex":false,"type":"endpoint","pattern":"^\\/urls\\.json\\/?$","segments":[[{"content":"urls.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/urls.json.ts","pathname":"/urls.json","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"writings/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/writings","isIndex":true,"type":"page","pattern":"^\\/writings\\/?$","segments":[[{"content":"writings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/writings/index.astro","pathname":"/writings","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/soundcloud","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/soundcloud\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"soundcloud","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/soundcloud.ts","pathname":"/api/soundcloud","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/nc157/Projects/nitin-cite/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/nc157/Projects/nitin-cite/src/pages/cinema.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/nc157/Projects/nitin-cite/src/pages/music.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/nc157/Projects/nitin-cite/src/pages/reading.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/nc157/Projects/nitin-cite/src/pages/writings/posts/[slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/nc157/Projects/nitin-cite/src/pages/writings/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/nc157/Projects/nitin-cite/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/nc157/Projects/nitin-cite/src/pages/urls.json.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/urls.json@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/writings/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/writings/posts/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/nc157/Projects/nitin-cite/src/components/NavigationTimer.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/nc157/Projects/nitin-cite/src/layouts/layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/cinema@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/music@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/reading@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/github@_@ts":"pages/api/github.astro.mjs","\u0000@astro-page:src/pages/api/soundcloud@_@ts":"pages/api/soundcloud.astro.mjs","\u0000@astro-page:src/pages/cinema@_@astro":"pages/cinema.astro.mjs","\u0000@astro-page:src/pages/music@_@astro":"pages/music.astro.mjs","\u0000@astro-page:src/pages/reading@_@astro":"pages/reading.astro.mjs","\u0000@astro-page:src/pages/urls.json@_@ts":"pages/urls.json.astro.mjs","\u0000@astro-page:src/pages/writings/posts/[slug]@_@astro":"pages/writings/posts/_slug_.astro.mjs","\u0000@astro-page:src/pages/writings/index@_@astro":"pages/writings.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CFI_G61C.mjs","C:/Users/nc157/Projects/nitin-cite/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CBipLoOn.mjs","C:\\Users\\nc157\\Projects\\nitin-cite\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\nc157\\Projects\\nitin-cite\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_MdmbKlsH.mjs","C:/Users/nc157/Projects/nitin-cite/src/cinema":"_astro/cinema.CsTf1fqz.js","C:/Users/nc157/Projects/nitin-cite/src/components/ui/MusicList":"_astro/MusicList.CTt8SCAi.js","C:/Users/nc157/Projects/nitin-cite/src/components/ui/ReadingList":"_astro/ReadingList.BEtvpBIM.js","C:/Users/nc157/Projects/nitin-cite/src/components/ui/PostItem":"_astro/PostItem.C55q0vqj.js","C:/Users/nc157/Projects/nitin-cite/src/components/ui/VerticalNav":"_astro/VerticalNav.C_q7hGEL.js","C:/Users/nc157/Projects/nitin-cite/src/components/ui/ModeToggle":"_astro/ModeToggle.D8_jIkqg.js","C:/Users/nc157/Projects/nitin-cite/src/components/ui/NowPlaying":"_astro/NowPlaying.CyCmOna0.js","@astrojs/react/client.js":"_astro/client.DHQl6hFp.js","C:/Users/nc157/Projects/nitin-cite/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CDGfc0hd.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/cinema.kRXboJHx.css","/_astro/cinema.CsTf1fqz.js","/_astro/client.DHQl6hFp.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CDGfc0hd.js","/_astro/index.CGw6F0hf.js","/_astro/index.Cu8XpFJv.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/ModeToggle.D8_jIkqg.js","/_astro/MusicList.CTt8SCAi.js","/_astro/NowPlaying.CyCmOna0.js","/_astro/PostItem.C55q0vqj.js","/_astro/ReadingList.BEtvpBIM.js","/_astro/soundcloud.D6VTbZ3B.js","/_astro/tabs.C7gWx7F6.js","/_astro/VerticalNav.C_q7hGEL.js","/_astro/fonts/f455a1a09bd39cc9.woff2","/_astro/fonts/fb7adfd659f112e7.woff2","/404.html","/api/github","/cinema/index.html","/music/index.html","/reading/index.html","/urls.json","/writings/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"092PasljLo2jRfEoYldCj+ib1mmPCbGzT4DMiQmxc0U="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
