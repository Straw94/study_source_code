'use strict';

// 是ReactDefaultBatchingStrategy对象的引用
var batchingStrategy = null;
var dirtyComponents = [];

/**
 * Mark a component as needing a rerender, adding an optional callback to a
 * list of functions which will be executed once the rerender occurs.
 */
function enqueueUpdate(component) {
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
}

var ReactUpdatesInjection = {
  injectReconcileTransaction: function (ReconcileTransaction) {
    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
  },
  injectBatchingStrategy: function (_batchingStrategy) {
    console.log('_batchingStrategy =====>', _batchingStrategy)
    batchingStrategy = _batchingStrategy;
  }
};

var ReactUpdates = {
  injection: ReactUpdatesInjection
};

module.exports = ReactUpdates;
