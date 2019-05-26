/**
 * test 事务
 */

var Transaction = require('./Transaction');
// 我们自己定义的 Transaction
var MyTransaction = function () {
  // do sth.
};

Object.assign(MyTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function () {
    return [{
      initialize: function () {
        console.log('before method perform');
      },
      close: function () {
        console.log('after method perform');
      }
    }];
  }
});

var transaction = new MyTransaction();
transaction.reinitializeTransaction();
var testMethod = function () {
  console.log('test');
}
transaction.perform(testMethod);