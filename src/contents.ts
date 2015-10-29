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
 * Get a co section from a given provider.
 */
export 
function getContentsClass(providerName: string): IContents {
  let provider = providers[providerName];
  if (provider) {
    return provider.contentsClass
  }
}


/**
 * Interface for a Contents Provider extension object.
 */
export 
interface IContentsProvider {
  name: string;
  contentsClass: IContents;
}


// Map of available Contents providers.
var providers: { [key: string]: IContentsProvider } = { };
