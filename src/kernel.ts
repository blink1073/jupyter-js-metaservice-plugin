// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import { 
  IAjaxOptions, IKernel, IKernelId, IKernelMessage, IKernelMessageOptions, 
  IKernelOptions, IKernelSpecIds
} from 'jupyter-js-services';

import {
  IDisposable, DisposableDelegate
} from 'phosphor-disposable';

import {
  IExtension
} from 'phosphor-plugins';


/**
 * Get the list of registered kernel providers.
 */
export
function listKernelProviders(): string[] {
  return Object.keys(providers);
}


/**
 * Get the kernel specs from a given provider.
 */
export 
function getKernelSpecs(providerName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IKernelSpecIds> {
  let provider = providers[providerName];
  if (provider) {
    return provider.getKernelSpecs(baseUrl, ajaxOptions);
  }
}


/**
 * List the running kernels on a given provider.
 */
export 
function listRunningKernels(providerName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IKernelId[]> {
  let provider = providers[providerName];
  if (provider) {
    return provider.listRunningKernels(baseUrl, ajaxOptions);
  }
}


/**
 * Start a new kernel on the given provider.
 */
export 
function startNewKernel(providerName: string, options: IKernelOptions, ajaxOptions?: IAjaxOptions): Promise<IKernel> {
  let provider = providers[providerName];
  if (provider) {
    return provider.startNewKernel(options, ajaxOptions);
  }
}


/**
 * Connect to an existing kernel on the given provider.
 */
export 
function connectToKernel(providerName: string, id: string, options?: IKernelOptions, ajaxOptions?: IAjaxOptions): Promise<IKernel> {
  let provider = providers[providerName];
  if (provider) {
    return provider.connectToKernel(id, options, ajaxOptions);
  }
}


/**
 * Create a well-formed kernel message using the given provider.
 */
export 
function createKernelMessage(providerName: string, options: IKernelMessageOptions, content: any = {}, metadata: any = {}, buffers: (ArrayBuffer | ArrayBufferView)[] = []): IKernelMessage {
  let provider = providers[providerName];
  if (provider) {
    return provider.createKernelMessage(options, content, metadata, buffers);
  }
}


/**
 * Interface for a Kernel Provider extension object.
 */
export 
interface IKernelProvider {
  name: string;
  getKernelSpecs: (baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<IKernelSpecIds>;
  listRunningKernels: (baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<IKernelId[]>;
  startNewKernel: (options: IKernelOptions, ajaxOptions?: IAjaxOptions) =>Promise<IKernel>;
  connectToKernel: (id: string, options?: IKernelOptions, ajaxOptions?: IAjaxOptions) => Promise<IKernel>;
  createKernelMessage: (options: IKernelMessageOptions, content: any, metadata: any, buffers:(ArrayBuffer | ArrayBufferView)[]) => IKernelMessage;
}


/**
 * Kernel provider extension point handler.
 */
export
function receiveKernelProvider(ext: IExtension<IKernelProvider>): IDisposable {
  providers[ext.object.name] = ext.object;
  return new DisposableDelegate(() => {
    if (ext.object.name in providers) {
      delete providers[ext.object.name];
    }
  });
}


// Map of available Kernel providers.
var providers: { [key: string]: IKernelProvider } = { };
