// React 组件类
var ReactUpdateQueue = require('./ReactUpdateQueue');

function ReactComponent(props, context) {
  this.props = props;
  this.context = context;
}

ReactComponent.prototype.setState = function(partialState, callback) {
  ReactUpdateQueue.enqueueSetState(this, partialState);
  if (callback) {
    ReactUpdateQueue.enqueueCallback(this, callback);
  }
};

module.exports = ReactComponent;