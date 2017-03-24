/// <reference path="../node_modules/@types/node/index.d.ts" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RustModule } from './rust.module';
import {enableProdMode} from '@angular/core';

enableProdMode();
platformBrowserDynamic().bootstrapModule(RustModule);
