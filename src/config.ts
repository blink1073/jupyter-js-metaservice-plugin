// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { 
  getConfigSection, ConfigWithDefaults 
} from 'jupyter-js-services';


/**
 * Return a namespace with the exported functions.
 */
export
function loader(): any {
  return {
    'getConfigSection': getConfigSection,
    'ConfigWithDefaults': ConfigWithDefaults
  }
}
