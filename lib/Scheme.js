(function(global) {

  "use strict";

  var S = {};

  var cons = S.cons = function cons(x, y) {
    var fn = function(pick) {
      return pick(x, y);
    };
    fn.pair = true;
    fn.toString = function() {
      // TODO
    };
    return fn;
  };

  var car = S.car = function car(f) {
    return f(function(x, y) { return x; });
  };

  var cdr = S.cdr = function cdr(f) {
    return f(function(x, y) { return y; });
  };

  var atom = S.atom = function atom(x) {
    return x && x.pair;
  };

  var pair = S.pair = function pair(x) {
    return !atom(x);
  };

  var map = S.map = function map(fn, lat) { 
    return (lat === null) ? null : cons(fn(car(lat)), map(fn, cdr(lat))); 
  };

  var foldl = S.foldl = function foldl(fn, acc, lat) {
    return (lat === null) ? acc : foldl(fn, fn(acc, car(lat)), cdr(lat));
  };

  var list = S.list = function list() {
    var args = Array.prototype.slice.call(arguments);
    return (args.length === 0) ? null : cons(args.shift(), list.apply(null, args));
  };

  var append = S.append = function append(l, m) {
    return (l === null) ? m : cons(car(l), append(cdr(l), m));
  };

  global.Scheme = S;

}(this));


