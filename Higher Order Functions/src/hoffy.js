// hoffy.js

function longestString(...args){
  if(args.length>0){
    var longest = args.reduce(largerString);
    return longest;
  }else{
    return undefined;
  }

}

function largerString(string1 , string2){
  if(string1.length>string2.length){
    return string1;
  }else{
    return string2;
  }
}


function maybe(fn){
  return function(...args){
      if(args.includes(null)){
        return undefined;
      }else if(args.includes(undefined)){
        return undefined;
      }else{
        return fn(...args);
      }
  }

}

function filterWith(fn){
  return function(array){
    var newarray = array.filter(fn);
    return newarray;

  }
}

function steppedForEach(arr, fn, step){
  if(arr.length>step){
    var newarray = arr.splice(0,step);
    fn(newarray);
    steppedForEach(arr, fn, step);
    return;
  }else{
    fn(arr);
    return;
  }
}


function constrainDecorator(fn, min, max){
  return function(...args){
    if(fn(...args)<min){
      return min;
    }else if(fn(...args)>max){
      return max;
    }else{
      return fn(...args);
    }


  }
}


function limitCallsDecorator(fn, n){
  var calls = 0;
  return function(...args){
    calls = calls + 1;
    if(calls>n){
      return undefined;
    }else{
      return fn(...args);

    }

  }

}

function bundleArgs(fn, ...args){
  var original = args;
  return function(...args){
    var all = original.concat(args);
    return fn.apply(undefined, all);
  }
}

function sequence(...args){
  var all = args;
  return function(string){
    var output = string;
    for(var i = 0; i<all.length; i++){
      output = all[i](output);

    }
    console.log(string);
    return output;

    }

}











module.exports = {
  largerString: largerString,
  longestString: longestString,
  maybe: maybe,
  filterWith: filterWith,
  steppedForEach: steppedForEach,
  constrainDecorator: constrainDecorator,
  limitCallsDecorator: limitCallsDecorator,
  bundleArgs: bundleArgs,
  sequence: sequence,
}
