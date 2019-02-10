// 
// Test code for gc-ops.ts
// 
// % copy [pxt-gamecontrollerizer/main.js] ./pxt-gc.ts
// % [copy ts_diff to ./pxt-gc.ts]
// % tsc --lib es5 gc-ops.ts 
// % node test_gc-ops.js
// 
const GcOps = require('./gc-ops').GcOps;

// Build gc_sentence (=DSL4GC)
let gc_word0 = {"dpad": 5, "dur":0};
let gc_word1 = {"stk0": [0,1], "stk1": {"x":1,"y":1}};
let gc_word2 = {"btn": {"1":true, "2":false, "3":false}, "dur":0};
let gc_word3 = {"cfg_input": {"stk1": 1, "stk0": 0}};

let gc_sentence = null;
gc_sentence = GcOps.concat(gc_sentence, gc_word1);
gc_sentence = GcOps.concat(gc_sentence, gc_word1);
console.log("gc_sentence  >\t" + JSON.stringify(gc_sentence));

// serialize gc_sentence
let binary_sentence = [];
let total_bytes = 0;
for (let gc_word of gc_sentence){
	var bytes = GcOps.toBytes(gc_word);
	binary_sentence.push(bytes);
	total_bytes += bytes.length;
}
final_bytes = Buffer.concat(binary_sentence, total_bytes);
console.log("final_length >\t" + final_bytes.length);
console.log("final_data   >\t" + final_bytes.toString('hex'));

// Then, you can send `final_bytes` to UART like below,
// `serialPort.write(final_bytes);`
