// console.log('----', __filename)
// console.log('----', __dirname)

import {isMainThread, Worker, parentPort} from 'worker_threads'

console.log('start--->', isMainThread)
class User {
    say() {
        console.log('Hello');
    }
}
if (isMainThread) {
    const worker = new Worker(__filename);
    worker.once('message', (message) => {
        console.log(message);  // Prints 'Hello, world!'.
    });
    // worker.postMessage('Hello, world!');
    worker.postMessage({name: 'hhh', say: new User()});
    // worker.postMessage({name: 'Hello, world!', say: () => {
    //         console.log('Hello, world!');
    //     }});
} else {
    // When a message from the parent thread is received, send it back:
    // @ts-ignore
    parentPort.once('message', (message) => {
        console.log('---------', message);
        // parentPort.postMessage(message);
    });
}