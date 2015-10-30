// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var phosphor_disposable_1 = require('phosphor-disposable');
/**
 * Get the list of registered contents providers.
 */
function listContentsProviders() {
    return Object.keys(providers);
}
exports.listContentsProviders = listContentsProviders;
/**
 * Get a contents class from a given provider.
 */
function getContentsClass(providerName) {
    var provider = providers[providerName];
    if (provider) {
        return provider.contentsClass;
    }
}
exports.getContentsClass = getContentsClass;
/**
 * Contents provider extension point handler.
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
// Map of available Contents providers.
var providers = {};
//# sourceMappingURL=contents.js.map