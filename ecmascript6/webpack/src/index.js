import test_module from './test';

function index_module_print() {
    console.log('this is index_module print function');
    document.body.innerHTML = 'This is test_module';
    test_module.print('this is test_module print function');
}

index_module_print();

console.log(`module.hot : ${JSON.stringify(module)}`);