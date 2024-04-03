import fs from 'node:fs';
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: '__MSG_extensionName__',
  version: packageJson.version,
  description: '__MSG_extensionDescription__',
  permissions: ['storage', 'sidePanel', 'activeTab', 'scripting', 'identity', 'identity.email', 'downloads'],
  side_panel: {
    default_path: 'src/pages/sidepanel/index.html',
  },
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-34.png',
  },
  icons: {
    128: 'icon-128.png',
  },
  host_permissions: ['https://apis.google.com/*'],
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/contentInjected/index.js'],
      // KEY for cache invalidation
      css: ['assets/css/contentStyle<KEY>.chunk.css'],
    },
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/contentUI/index.js'],
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
    sandbox: 'sandbox allow-scripts',
    web_accessible_resources: 'images/*',
    'connect-src': [
      'https://apis.google.com/*',
      'https://www.gstatic.com/*',
      'https://www.googleapis.com/*',
      'https://securetoken.googleapis.com/*',
      'http://localhost:*/*',
    ],
  },
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'assets/css/*.css', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*'],
    },
  ],
  oauth2: {
    client_id: '225706941399-fgb4r32gnk21ee42pn1je7kb3n30crft.apps.googleusercontent.com',
    scopes: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  },
  //key: '-----BEGIN PUBLIC KEY-----\n<fill-me>\n-----END PUBLIC KEY-----',
};

export default manifest;
