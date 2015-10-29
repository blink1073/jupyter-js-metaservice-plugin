// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import { 
  IAjaxOptions, INotebookSession, ISessionId, ISessionOptions, 
  connectToSession, listRunningSessions, startNewSession
} from 'jupyter-js-services';

import {
  IDisposable, DisposableDelegate
} from 'phosphor-disposable';

import {
  IExtension
} from 'phosphor-plugins';


/**
 * Get the list of registered session providers.
 */
export
function listSessionProviders(): string[] {
  return Object.keys(providers);
}


/**
 * List the running sessions on a given provider.
 */
export 
function listRunningSessions(providerName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<ISessionId[]> {
  let provider = providers[providerName];
  if (provider) {
    return provider.listRunningSessions(baseUrl, ajaxOptions);
  }
}


/**
 * Start a new session on the given provider.
 */
export 
function startNewSession(providerName: string, options: ISessionOptions, ajaxOptions?: IAjaxOptions): Promise<INotebookSession> {
  let provider = providers[providerName];
  if (provider) {
    return provider.startNewSession(options, ajaxOptions);
  }
}


/**
 * Connect to an existing session on the given provider.
 */
export 
function connectToSession(providerName: string, id: string, options?: ISessionOptions, ajaxOptions?: IAjaxOptions): Promise<INotebookSession> {
  let provider = providers[providerName];
  if (provider) {
    return provider.connectToSession(id, options, ajaxOptions);
  }
}


/**
 * Interface for a Session Provider extension object.
 */
export 
interface ISessionProvider {
  name: string;
  listRunningSessions: (baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<ISessionId[]>;
  startNewSession: (options: ISessionOptions, ajaxOptions?: IAjaxOptions) =>Promise<INotebookSession>;
  connectToSession: (id: string, options?: ISessionOptions, ajaxOptions?: IAjaxOptions) => Promise<INotebookSession>;
}


/**
 * Session provider extension point handler.
 */
export
function receiveSessionProvider(ext: IExtension<ISessionProvider>): IDisposable {
  providers[ext.object.name] = ext.object;
  return new DisposableDelegate(() => {
    if (ext.object.name in providers) {
      delete providers[ext.object.name];
    }
  });
}


// Map of available Session providers.
var providers: { [key: string]: ISessionProvider } = { };
