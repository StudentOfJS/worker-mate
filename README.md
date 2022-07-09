<div align="center"><h1>Worker Mate</h1></div>

###  install

    yarn add worker-mate

or

    pnpm add worker-mate

  

or

    npm install worker-mate

  

###  import

    import { doHardwork } from "worker-mate"


##  doHardwork
Perform a long runnning or expensive task in a worker with a simple promise interface.

### examples

    const contrivedFn = (arrayOfNumbers) => arrayOfNumbers.map(n => n ** n).filter(n < 999999).sort()[0]
    const contrivedArray = [420, 10, 225, 50,100,1000]
    let largestSquare = doHardwork(contrivedFn, contrivedArray).then(n => n)

>  **Tip:** Each **doHardwork()** opens in a new web worker

 

       export const convertToMoney = (num: number): string => {
	      let round = Math.round(num * 100) / 100
	      let minus = num < 0
	      let moneyArray = round.toString().split('.')
	      let d = minus ? moneyArray[0].slice(1) : moneyArray[0]
	      let dollars = d
	        .split('')
	        .reverse()
	        .map((str, i) => (i !== 0 && i % 3 === 0 ? str + ',' : str))
	        .reverse()
	        .join('')
	      return `${minus ? '-' : ''}$${dollars}.${
	        moneyArray[1]
	          ? moneyArray[1].length === 2
	            ? moneyArray[1]
	            : String(moneyArray[1]) + '0'
	          : '00'
	      }`
    }
    let moneyString = doHardwork(convertToMoney, 231.2).then(s => s)

### doHardwork function arguments
doHardwork requires two arguments. The first should be a pure function, that takes the second, your unprocessed data does some expensive computation and returns the result. Both arguments are required. Side effects are not recommended.
 - fn - required
 - rawData-  required


##  Why Worker Mate?

Worker mate is just Typescript with no dependencies. It makes offloading expensive computations to web workers simple . This allows you to keep the main thread clear and your site responsive. It's a super simple, easy to use function that returns a promise. Each instantiation creates a new web worker thread, which terminates itself once the request is complete.


###  Advice

Web workers have overhead in postMessage. This means web workers are not ideal for time critical operations like animations unless the data is kept below 10KB per request/ response. 
To keep within a 100ms response time budget it's advised to keep data below 100KB. Surma covered this in this excellent blog post  [Is postMessage slow?](https://surma.dev/things/is-postmessage-slow/index.html)
