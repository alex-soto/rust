/// <reference path="../node_modules/@types/node/index.d.ts" />
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var rust_module_1 = require('./rust.module');
var core_1 = require('@angular/core');
core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(rust_module_1.RustModule);
//# sourceMappingURL=main.js.map