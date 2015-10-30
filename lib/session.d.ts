import { IAjaxOptions, INotebookSession, ISessionId, ISessionOptions } from 'jupyter-js-services';
import { IDisposable } from 'phosphor-disposable';
import { IExtension } from 'phosphor-plugins';
/**
 * Get the list of registered session providers.
 */
export declare function listSessionProviders(): string[];
/**
 * List the running sessions on a given provider.
 */
export declare function listRunningSessions(providerName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<ISessionId[]>;
/**
 * Start a new session on the given provider.
 */
export declare function startNewSession(providerName: string, options: ISessionOptions, ajaxOptions?: IAjaxOptions): Promise<INotebookSession>;
/**
 * Connect to an existing session on the given provider.
 */
export declare function connectToSession(providerName: string, id: string, options?: ISessionOptions, ajaxOptions?: IAjaxOptions): Promise<INotebookSession>;
/**
 * Interface for a Session Provider extension object.
 */
export interface ISessionProvider {
    name: string;
    listRunningSessions: (baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<ISessionId[]>;
    startNewSession: (options: ISessionOptions, ajaxOptions?: IAjaxOptions) => Promise<INotebookSession>;
    connectToSession: (id: string, options?: ISessionOptions, ajaxOptions?: IAjaxOptions) => Promise<INotebookSession>;
}
/**
 * Session provider extension point handler.
 */
export declare function receiveSessionProvider(ext: IExtension<ISessionProvider>): IDisposable;
