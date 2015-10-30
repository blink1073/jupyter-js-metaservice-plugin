// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';
var phosphor_disposable_1 = require('phosphor-disposable');
var jupyter_js_services_1 = require('jupyter-js-services');
exports.ConfigWithDefaults = jupyter_js_services_1.ConfigWithDefaults;
/**
 * Get the list of registered config providers.
 */
function listConfigProviders() {
    return Object.keys(providers);
}
exports.listConfigProviders = listConfigProviders;
/**
 * Get a config section from a given provider.
 */
function getConfigSection(providerName, sectionName, baseUrl, ajaxOptions) {
    var provider = providers[providerName];
    if (provider) {
        return provider.getConfigSection(sectionName, baseUrl, ajaxOptions);
    }
}
exports.getConfigSection = getConfigSection;
/**
 * Config provider extension point handler.
 */
function receiveConfigProvider(ext) {
    providers[ext.object.name] = ext.object;
    return new phosphor_disposable_1.DisposableDelegate(function () {
        if (ext.object.name in providers) {
            delete providers[ext.object.name];
        }
    });
}
exports.receiveConfigProvider = receiveConfigProvider;
// Map of available Config providers.
var providers = {};
//# sourceMappingURL=config.js.map