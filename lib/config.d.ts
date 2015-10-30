import { IAjaxOptions, IConfigSection } from 'jupyter-js-services';
import { IDisposable } from 'phosphor-disposable';
import { IExtension } from 'phosphor-plugins';
export { ConfigWithDefaults } from 'jupyter-js-services';
/**
 * Get the list of registered config providers.
 */
export declare function listConfigProviders(): string[];
/**
 * Get a config section from a given provider.
 */
export declare function getConfigSection(providerName: string, sectionName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IConfigSection>;
/**
 * Interface for a Config Provider extension object.
 */
export interface IConfigProvider {
    name: string;
    getConfigSection: (sectionName: string, baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<IConfigSection>;
}
/**
 * Config provider extension point handler.
 */
export declare function receiveConfigProvider(ext: IExtension<IConfigProvider>): IDisposable;
