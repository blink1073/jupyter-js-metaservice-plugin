// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import { 
  IAjaxOptions, IConfigSection
} from 'jupyter-js-services';

import {
  IDisposable, DisposableDelegate
} from 'phosphor-disposable';

import {
  IExtension
} from 'phosphor-plugins';


/**
 * Get the list of registered config providers.
 */
export
function listConfigProviders(): string[] {
  return Object.keys(providers);
}


/**
 * Get a config section from a given provider.
 */
export 
function getConfigSection(providerName: string, sectionName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IConfigSection> {
  let provider = providers[providerName];
  if (provider) {
    return provider.getConfigSection(sectionName, baseUrl, ajaxOptions);
  }
}


/**
 * Interface for a Config Provider extension object.
 */
export 
interface IConfigProvider {
  name: string;
  getConfigSection: (sectionName: string, baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<IConfigSection>;
}


// Map of available Config providers.
var providers: { [key: string]: IConfigProvider } = { };
