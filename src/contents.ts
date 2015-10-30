// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { 
  IAjaxOptions, IContents
} from 'jupyter-js-services';

import {
  IDisposable, DisposableDelegate
} from 'phosphor-disposable';

import {
  IExtension
} from 'phosphor-plugins';


/**
 * Get the list of registered contents providers.
 */
export
function listContentsProviders(): string[] {
  return Object.keys(providers);
}


/**
 * Get a contents factory from a given provider.
 */
export 
function getContentsFactory(providerName: string): (baseUrl: string) => IContents {
  let provider = providers[providerName];
  if (provider) {
    return provider.contentsFactory
  }
}


/**
 * Interface for a `'jupyter-metaservice:contents'` extension object.
 */
export 
interface IContentsProvider {
  name: string;
  contentsFactory: (baseUrl: string) => IContents;
}


/**
 * Contents provider extension point handler.
 */
export
function receiveConfigProvider(ext: IExtension<IContentsProvider>): IDisposable {
  providers[ext.object.name] = ext.object;
  return new DisposableDelegate(() => {
    if (ext.object.name in providers) {
      delete providers[ext.object.name];
    }
  });
}


// Map of available contents providers.
var providers: { [key: string]: IContentsProvider } = { };
