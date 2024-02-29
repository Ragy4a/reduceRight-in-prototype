'use strict';

function MyArray(...args) {
    this.length = 0;
    if (args.length) {
        for (let i = 0; i < args.length; i++) {
            this.push(args[i]);
        }
    }
}

function isMyArray(obj) {
    return obj instanceof MyArray;
}

MyArray.prototype = new MyArrayProto();

function MyArrayProto(...args) {
    this.push = function () {
        if(args) {
            for (let i = 0; i < args.length; i++) {
                this[this.length++] = args[i];
            }
        }
        return this.length;
    };

    this.forEach = function (callback) {
		for (let i = 0; i < this.length; i++) {
			callback(this[i], i, this);
		}
	};

    this.concat = function (...args) {
		const res = new MyArray();
        this.forEach(el => {
            res.push(el);
        });
		for (let i = 0; i < args.length; i++) {
			if (Array.isArray(args[i])) {
				res.push(...args[i]);
			} else if (isMyArray(args[i])) {
				for (let j = 0; j < args[i].length; j++) {
					res.push(args[i][j]);
				}
			} else {
				res.push(args[i]);
			}
		}
		return res;
	};

    this.myReduceRight = function(callback, initialValue) {
        let accumulator = initialValue;
        let i = this.length - 1;
        if (!initialValue) {
            accumulator = this[this.length - 1];
            i = this.length - 2;
        }
        for (; i >= 0; i--) {
            accumulator = callback(accumulator, this[i], i, this);
        }
        return accumulator;
    };
    
    this.myFlat = function(depth = 1) {
        let flattenedArray = new MyArray();
        function flatten (arrProto, depth) {
            for(let item of arrProto) {
                if (MyArray.isMyArray(item) && depth) {
                    flatten(item, depth - 1)
                } else {
                    flattenedArray.push(item);
                }
            }
        }
        flatten(this, depth);
        return flattenedArray;
    };
};