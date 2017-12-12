import { app, useOptions } from './components/app.js'
import minimist from './minimist'

// { port: number, public: string, lib: bool }
const options = minimist(process.argv.slice(2));

useOptions(options);

switch(true){
    case !!options.lib:{
        // TODO: Is there anything to do? 
        break;
    }
    case !!options.port:{
        // TODO: check for a public folder
        // TODO: build site from package if necessary
        app.listen(options.port);
        console.log(`> HIOYH is live on port ${options.port}`);
        break;
    }
    default:{
        throw Error('Either --port or -lib should be specified');
        break;
    }
}

export { app }