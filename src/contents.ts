// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { 
  Contents
} from 'jupyter-js-services';


/**
 * Return a namespace with the exported function.
 */
export
function loader(): any {
  return {
    'Contents': Contents
  }
}
