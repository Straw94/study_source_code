
'use strict';

var ReactDefaultBatchingStrategy = require('./ReactDefaultBatchingStrategy');
var ReactInjection = require('./ReactInjection');

function inject() {
  ReactInjection.Updates.injectBatchingStrategy(
    ReactDefaultBatchingStrategy
  )
}

module.exports = {
  inject: inject
};
