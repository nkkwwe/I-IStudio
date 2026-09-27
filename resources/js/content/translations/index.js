// Side-effect module: publishes the language packs on `window` for the
// legacy markup scripts, exactly as the former single translations.js did.
import { en } from './en';
import { uk } from './uk';
import { ro } from './ro';
import { solutionsData } from './solutions-data';
import { serviceManagerMap } from './service-manager-map';

window.translations = { en, uk, ro };
window.solutionsData = solutionsData;
window.serviceManagerMap = serviceManagerMap;

export const translations = window.translations;
export { solutionsData, serviceManagerMap };
