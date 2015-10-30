import { IContents } from 'jupyter-js-services';
import { IDisposable } from 'phosphor-disposable';
import { IExtension } from 'phosphor-plugins';
/**
 * Get the list of registered contents providers.
 */
export declare function listContentsProviders(): string[];
/**
 * Get a contents class from a given provider.
 */
export declare function getContentsClass(providerName: string): () => IContents;
/**
 * Interface for a Contents Provider extension object.
 */
export interface IContentsProvider {
    name: string;
    contentsClass: () => IContents;
}
/**
 * Contents provider extension point handler.
 */
export declare function receiveConfigProvider(ext: IExtension<IContentsProvider>): IDisposable;
