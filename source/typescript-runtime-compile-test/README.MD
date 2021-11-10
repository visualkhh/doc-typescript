Using the Compiler API
https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
https://cancerberosgx.github.io/typescript-in-the-browser/typescript-compiler/#example=tsTranspilingProject1
Since in your case the input code is dynamic you need to compile at runtime probably using TypeScript compiler API. In the case you don't have a dedicated server for that, you can still compile TS projects in the browser using the TypeScript compiler API https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API .

here you have a playground for transpiling ts to js 100% in the browser https://cancerberosgx.github.io/typescript-in-the-browser/typescript-compiler/#example=tsTranspilingProject1

you could also use ts-simple-ast library also in the browser that's better documented and more easy to use - https://cancerberosgx.github.io/typescript-in-the-browser/typescript-compiler/#example=tsSimpleAst1

For transpiling, again, you don't have to do anything but to include node_modules/typescript/typescript.js in your html and you are done. But for more complex APIs like type checking and Language Service API (https://github.com/Microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin) you will need to implement some interfaces.
