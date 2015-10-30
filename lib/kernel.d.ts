import { IAjaxOptions, IKernel, IKernelId, IKernelMessage, IKernelMessageOptions, IKernelOptions, IKernelSpecIds } from 'jupyter-js-services';
import { IDisposable } from 'phosphor-disposable';
import { IExtension } from 'phosphor-plugins';
/**
 * Get the list of registered kernel providers.
 */
export declare function listKernelProviders(): string[];
/**
 * Get the kernel specs from a given provider.
 */
export declare function getKernelSpecs(providerName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IKernelSpecIds>;
/**
 * List the running kernels on a given provider.
 */
export declare function listRunningKernels(providerName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IKernelId[]>;
/**
 * Start a new kernel on the given provider.
 */
export declare function startNewKernel(providerName: string, options: IKernelOptions, ajaxOptions?: IAjaxOptions): Promise<IKernel>;
/**
 * Connect to an existing kernel on the given provider.
 */
export declare function connectToKernel(providerName: string, id: string, options?: IKernelOptions, ajaxOptions?: IAjaxOptions): Promise<IKernel>;
/**
 * Create a well-formed kernel message using the given provider.
 */
export declare function createKernelMessage(providerName: string, options: IKernelMessageOptions, content?: any, metadata?: any, buffers?: (ArrayBuffer | ArrayBufferView)[]): IKernelMessage;
/**
 * Interface for a Kernel Provider extension object.
 */
export interface IKernelProvider {
    name: string;
    getKernelSpecs: (baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<IKernelSpecIds>;
    listRunningKernels: (baseUrl: string, ajaxOptions?: IAjaxOptions) => Promise<IKernelId[]>;
    startNewKernel: (options: IKernelOptions, ajaxOptions?: IAjaxOptions) => Promise<IKernel>;
    connectToKernel: (id: string, options?: IKernelOptions, ajaxOptions?: IAjaxOptions) => Promise<IKernel>;
    createKernelMessage: (options: IKernelMessageOptions, content: any, metadata: any, buffers: (ArrayBuffer | ArrayBufferView)[]) => IKernelMessage;
}
/**
 * Kernel provider extension point handler.
 */
export declare function receiveKernelProvider(ext: IExtension<IKernelProvider>): IDisposable;
