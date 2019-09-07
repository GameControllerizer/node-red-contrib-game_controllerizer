## Development flow

```bash
$ copy [pxt-gamecontrollerizer/main.js] ./pxt-gc.ts
$ patch -u ./pxt-gc.ts < ts_diff.patch
$ tsc --lib es5 gc-ops.ts 
$ node test_gc-ops.js
$ nano gc.js   # edit node UI
$ nano gc.html # edit node UI
```
