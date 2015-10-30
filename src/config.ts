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


export { 
  ConfigWithDefaults 
} from 'jupyter-js-services';


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
 * Interface for a `'jupyter-metaservice:config'` extension object.
 */
export 
interface IConfigProvider {
  name: string;
  getConfigSection: (sectionName: string, baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<IConfigSection>;
}


/**
 * Config provider extension point handler.
 */
export
function receiveConfigProvider(ext: IExtension<IConfigProvider>): IDisposable {
  providers[ext.object.name] = ext.object;
  return new DisposableDelegate(() => {
    if (ext.object.name in providers) {
      delete providers[ext.object.name];
    }
  });
}


// Map of available config providers.
var providers: { [key: string]: IConfigProvider } = { };
