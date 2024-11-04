import{_ as s,c as a,a0 as i,o as e}from"./chunks/framework.D-cni5uf.js";const n="/to-webp-json/assets/bg.DS8MVOLT.jpg",k=JSON.parse('{"title":"to-webp-json","description":"","frontmatter":{},"headers":[],"relativePath":"docs.md","filePath":"docs.md"}'),l={name:"docs.md"};function d(p,t,o,h,r,c){return e(),a("div",null,t[0]||(t[0]=[i('<h1 id="to-webp-json" tabindex="-1">to-webp-json <a class="header-anchor" href="#to-webp-json" aria-label="Permalink to &quot;to-webp-json&quot;">​</a></h1><p><img src="'+n+`" alt="to-webp-json"></p><h3 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h3><p>Create <code>img-src</code> folder</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> img-src</span></span></code></pre></div><p>Add images to <code>img-src</code></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to-webp-json@latest</span></span></code></pre></div><h3 id="command-line-options" tabindex="-1">Command line options <a class="header-anchor" href="#command-line-options" aria-label="Permalink to &quot;Command line options&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Param</th><th>Type</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td>src</td><td>string</td><td>Source folder name</td><td>img-src</td></tr><tr><td>dist</td><td>string</td><td>Result folder name</td><td>img-dist</td></tr><tr><td>format</td><td>string</td><td>webp, jpg, png, avif, tiff, gif or original</td><td>webp</td></tr><tr><td>json</td><td>string | null</td><td>Structure file name</td><td>null</td></tr><tr><td>width</td><td>number | null</td><td>Maximum image width in pixels</td><td>null</td></tr><tr><td>height</td><td>number | null</td><td>Maximum image height in pixels</td><td>null</td></tr></tbody></table><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to-webp-json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> json=static-images</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> format=original</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to-webp-json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> src=sources</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> height=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2000</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># no arguments interactive mode</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to-webp-json</span></span></code></pre></div>`,13)]))}const m=s(l,[["render",d]]);export{k as __pageData,m as default};