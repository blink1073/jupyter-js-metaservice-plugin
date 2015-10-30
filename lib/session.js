// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';
var phosphor_disposable_1 = require('phosphor-disposable');
/**
 * Get the list of registered session providers.
 */
function listSessionProviders() {
    return Object.keys(providers);
}
exports.listSessionProviders = listSessionProviders;
/**
 * List the running sessions on a given provider.
 */
function listRunningSessions(providerName, baseUrl, ajaxOptions) {
    var provider = providers[providerName];
    if (provider) {
        return provider.listRunningSessions(baseUrl, ajaxOptions);
    }
}
exports.listRunningSessions = listRunningSessions;
/**
 * Start a new session on the given provider.
 */
function startNewSession(providerName, options, ajaxOptions) {
    var provider = providers[providerName];
    if (provider) {
        return provider.startNewSession(options, ajaxOptions);
    }
}
exports.startNewSession = startNewSession;
/**
 * Connect to an existing session on the given provider.
 */
function connectToSession(providerName, id, options, ajaxOptions) {
    var provider = providers[providerName];
    if (provider) {
        return provider.connectToSession(id, options, ajaxOptions);
    }
}
exports.connectToSession = connectToSession;
/**
 * Session provider extension point handler.
 */
function receiveSessionProvider(ext) {
    providers[ext.object.name] = ext.object;
    return new phosphor_disposable_1.DisposableDelegate(function () {
        if (ext.object.name in providers) {
            delete providers[ext.object.name];
        }
    });
}
exports.receiveSessionProvider = receiveSessionProvider;
// Map of available Session providers.
var providers = {};
//# sourceMappingURL=session.js.map