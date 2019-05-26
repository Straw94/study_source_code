/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

/* globals __REACT_DEVTOOLS_GLOBAL_HOOK__*/

'use strict';

var ReactDefaultInjection = require('./ReactDefaultInjection');

// 注入路口
ReactDefaultInjection.inject();

var React = {
}

React.version = '0.13.3';

module.exports = React;
