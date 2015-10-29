// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import { 
  IAjaxOptions, IKernel, IKernelId, IKernelMessage, IKernelMessageOptions, 
  IKernelOptions, IKernelSpecIds
} from 'jupyter-js-services';

import {
  IDisposable, DisposableDelegate
} from 'phoshor-disposable';

import {
  IExtension
} from 'phosphor-plugins';



export 
interface IKernelProvider {
  name: string;
  getKernelSpecs: (baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<IKernelSpecIds>;
  listRunningKernels: (baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<IKernelId[]>;
  startNewKernel: (options: IKernelOptions, ajaxOptions?: IAjaxOptions) =>Promise<IKernel>;
  connectToKernel: (id: string, options?: IKernelOptions, ajaxOptions?: IAjaxOptions) => Promise<IKernel>;
  createKernelMessage: (options: IKernelMessageOptions, content: any, metadata: any, buffers:(ArrayBuffer | ArrayBufferView)[]) => IKernelMessage;
}


export
function listKernelProviders(): string[] {
  return (Array as any).from(providers.keys());
}


export
function receiveKernelProvider(ext: IExtension<IKernelProvider>): IDisposable {
  providers.set(ext.name, ext.object);
  return new DisposableDelegate(() => {
    providers.delete(ext.name);
  });
}


export 
function getKernelSpecs(providerName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IKernelSpecIds> {
  let provider = providers.get(providerName);
  if (provider) {
    return provider.getKernelSpecs(baseUrl, ajaxOptions);
  }
}


var providers = new Map<string, IKernelProvider>();
