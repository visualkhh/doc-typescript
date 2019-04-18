express
=============
[express](http://expressjs.com/ko/starter/generator.html)
 - npm install express-generator -g
 - express --view=pug myapp
 > - cd myapp 
 > - npm install
 > - mac : $ DEBUG=myapp:* npm start
 > - window : set DEBUG=myapp:* & npm start
 
tsc
=============
### tsconfig.json
 - tsc -init
 

npm install
=============
### package.json <-- add 
 - npm install --save @types/node
 - npm install typescript --save
 - npm install -g tslint typescript
 - npm install --save tslint typescript
 - other ...


tslint
=============
### tslint.json
 - tslint --init
### Lint TypeScript source globs
 - tslint -c tslint.json 'src/**/*.ts'
