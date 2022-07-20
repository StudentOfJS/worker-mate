<div align="center"><h1>Worker Mate</h1></div>
<div align="right">
  <img src="https://badgen.net/npm/types/worker-mate" alt="worker-mate types included" />
</div>
<div align="right">
  <img src="https://badgen.net/bundlephobia/minzip/worker-mate" alt="minzipped size badge" />
</div>

[![Open Bundle](https://bundlejs.com/badge-light.svg)](https://bundlejs.com/?q=worker-mate)

###  install

    yarn add worker-mate

or

    pnpm add worker-mate

  

or

    npm install worker-mate

  

###  import

    import { fnWorker, fetchWorker } from "worker-mate"


##  fnWorker
Perform a long runnning or expensive task in a worker with a simple promise interface.

### example

    const contrivedFn = (arrayOfNumbers) => arrayOfNumbers.map(n => n ** n).filter(n => n > 9999).sort()[0]
    const contrivedArray = [420, 10, 225, 50,100,1000]
    let largestSquare = await fnWorker(contrivedFn, contrivedArray).then(n => n)

>  **Tip:** Each **fnWorker()** opens in a new web worker



### props
fnWorker requires two arguments. The first should be a pure function, that takes the second, your unprocessed data does some expensive computation and returns the result. Both arguments are required. Side effects are not recommended.
 - fn - required
 - rawData-  required

## fetchWorker
Fetch with middleware in a worker. Offload expensive data transformations onto their own thread. Need to mutate the body of a request? No dramas, we've got you covered.
### example
    fetchWorker<Record<string, any>>({ 
        url: 'https://swapi.dev/api/starships/9',
        responseMiddleware: (d) =>  ({
            name: d?.name ?? '',
            model: d?.model ?? '',
            manufacturer: d?.manufacturer ?? ''
        }),
        retry: {
            attempts: 2,
            delay: 1000
        }
    })
        .then((d: { name: string; model: string; manufacturer: string }) => { setStar(d) })
        .catch((err) => console.log(err));

### props
    - fetchProps: FetchToolProps

    interface FetchToolProps {
        url: string;
        options?: RequestInit;
        requestMiddleware?: Function;
        responseMiddleware?: Function;
        retry?: {
            attempts: number;
            delay: number;
        };
    }
#### url and options
url is the same as the first option in the fetch api and options is exactly the same as the second option. Please refer to [fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for details. url is equivalant to resource and options is options.

#### requestMiddleware
requestMiddleware is an optional function you can provide to process data before you send a POST or PUT request. Add your unprocessed data to the body of options using JSON.stringify and your function will be executed on the data in the web worker.

#### responseMiddleware
responseMiddleware is an optional function you can provide to process data from a response. This will run in the web worker.

#### retry
retry is an object with two entries := attempts is the amount of times you want to attempt a request and delay is the time you want to wait between attempts.



##  Why Worker Mate?

Worker mate is just Typescript with no dependencies. It makes offloading expensive computations to web workers simple . This allows you to keep the main thread clear and your site responsive. It's a super simple, easy to use function that returns a promise. Each instantiation creates a new web worker thread, which terminates itself once the request is complete.


###  Advice
Recursion and memoization can still be used to great effect in this web worker, but you will need to pass a named function otherwise the function reference is lost.
Web workers have overhead in postMessage. This means web workers are not ideal for time critical operations like animations unless the data is kept below 10KB per request/ response. 
To keep within a 100ms response time budget it's advised to keep data below 100KB. Surma covered this in this excellent blog post  [Is postMessage slow?](https://surma.dev/things/is-postmessage-slow/index.html)
