'use strict';

function MyArray (...args) {
    this.length = 0;
    if (args.length) {
        for (let i = 0; i < args.length; i++) {
            this.push(args[i]);
        }
    }
};

MyArray.prototype = new MyArrayProto();

function MyArrayProto () {
    this.push = function () {
        if(arguments) {
            for (let i = 0; i < arguments.length; i++) {
                this[this.length++] = arguments[i];
            }
        }
        return this.length;
    };

    this.reduceRight = function(callback, initialValue) {
        let accumulator = initialValue;
        let i = this.length - 1;
        if (!initialValue) {
            accumulator = this[this.length - 1];
            i = this.length - 2;
        }
        for (; i >= 0; i--) {
            accumulator = callback.call(accumulator, this[i], i, this);
        }
        return accumulator;
    };
};


const testArr = new Array(1, 2, 3, 4, 5);
const result = testArr.reduceRight(function(accumulator, currentNumber) {
    return accumulator + currentNumber;
}, 1);

console.log(result);
