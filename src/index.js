import { app, useOptions } from './services/app.js'
import minimist from 'minimist'

// { port: number, public: string, lib: bool }
const options = minimist(argv.slice(2));

useOptions(options);

if(!!options.port){
    // TODO: check for a public folder
    // TODO: build site from package if necessary
    app.listen(options.port);
    console.log(`> HIOYH is live on port ${options.port}`);
    break;
}

export { app }