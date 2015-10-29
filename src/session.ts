// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import { 
  listRunningSessions, startNewSession, connectToSession 
} from 'jupyter-js-services';


/**
 * Return a namespace with the exported function.
 */
export
function loader(): any {
  return {
    'listRunningSessions': listRunningSessions,
    'startNewSession': startNewSession,
    'connectToSession': connectToSession
  }
}
