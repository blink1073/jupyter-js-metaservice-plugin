// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';
var phosphor_disposable_1 = require('phosphor-disposable');
/**
 * Get the list of registered kernel providers.
 */
function listKernelProviders() {
    return Object.keys(providers);
}
exports.listKernelProviders = listKernelProviders;
/**
 * Get the kernel specs from a given provider.
 */
function getKernelSpecs(providerName, baseUrl, ajaxOptions) {
    var provider = providers[providerName];
    if (provider) {
        return provider.getKernelSpecs(baseUrl, ajaxOptions);
    }
}
exports.getKernelSpecs = getKernelSpecs;
/**
 * List the running kernels on a given provider.
 */
function listRunningKernels(providerName, baseUrl, ajaxOptions) {
    var provider = providers[providerName];
    if (provider) {
        return provider.listRunningKernels(baseUrl, ajaxOptions);
    }
}
exports.listRunningKernels = listRunningKernels;
/**
 * Start a new kernel on the given provider.
 */
function startNewKernel(providerName, options, ajaxOptions) {
    var provider = providers[providerName];
    if (provider) {
        return provider.startNewKernel(options, ajaxOptions);
    }
}
exports.startNewKernel = startNewKernel;
/**
 * Connect to an existing kernel on the given provider.
 */
function connectToKernel(providerName, id, options, ajaxOptions) {
    var provider = providers[providerName];
    if (provider) {
        return provider.connectToKernel(id, options, ajaxOptions);
    }
}
exports.connectToKernel = connectToKernel;
/**
 * Create a well-formed kernel message using the given provider.
 */
function createKernelMessage(providerName, options, content, metadata, buffers) {
    if (content === void 0) { content = {}; }
    if (metadata === void 0) { metadata = {}; }
    if (buffers === void 0) { buffers = []; }
    var provider = providers[providerName];
    if (provider) {
        return provider.createKernelMessage(options, content, metadata, buffers);
    }
}
exports.createKernelMessage = createKernelMessage;
/**
 * Kernel provider extension point handler.
 */
function receiveKernelProvider(ext) {
    providers[ext.object.name] = ext.object;
    return new phosphor_disposable_1.DisposableDelegate(function () {
        if (ext.object.name in providers) {
            delete providers[ext.object.name];
        }
    });
}
exports.receiveKernelProvider = receiveKernelProvider;
// Map of available Kernel providers.
var providers = {};
//# sourceMappingURL=kernel.js.map