# node-red-contrib-game_controllerizer
Node-RED nodes for [GameControllerizer](https://github.com/GameControllerizer/GameControllerizer).

These nodes allow users to combine the processes of IoT devices, Web services, and applications of AI, and to convert them into game control operations to augment existing digital games.  
See our [paper](https://arxiv.org/abs/1810.01070) for more details.

## Block diagram

<img src="https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/images/block_diagram.png" width="640px" alt="block diagram">

## Getting Started
This assumes you have [Node-RED](https://nodered.org/) already installed and working. This requires,

- [Node.js](https://nodejs.org/) v10.18+ 
- [Node-RED](https://nodered.org/) v1.03+
- [GameControllerize : H/W gamepad emulator](https://github.com/GameControllerizer/GameControllerizer) 


Install via Node-RED Manage Palette
```
node-red-contrib-game_controllerizer
```

Install via npm
```
$ cd ~/.node-red
$ npm install node-red-contrib-game_controllerizer
# then restart node-red
```

## Cheat sheet 
Import **[this json](https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/docs/node-red-contrib-game_controllerizer-cheatsheet.json)** as a Node-RED flow.

## Usage examples

### Example 1 
Send control operations (ex. push button-A) to a game console via the H/W gamepad emulator. Do not forget to configure input/output _UART_ node. 

<img src="https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/images/flow1.png" width="640px" alt="flow1">

<details><summary>flow data</summary><div>

```
[{"id":"72540d54.4285f4","type":"inject","z":"24c06ae6.309316","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":110,"y":380,"wires":[["96f8637f.a373a"]]},{"id":"9aae373d.e1c218","type":"serial out","z":"24c06ae6.309316","name":"UART","serial":"b33fb905.04c2b","x":650,"y":400,"wires":[]},{"id":"96f8637f.a373a","type":"button","z":"24c06ae6.309316","name":"","button":0,"mode":"push","x":280,"y":380,"wires":[["97b5eb7d.8feaa"]]},{"id":"5ad63d0b.f5c9e4","type":"inject","z":"24c06ae6.309316","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":110,"y":420,"wires":[["82fb165b.94fc38"]]},{"id":"82fb165b.94fc38","type":"dpad","z":"24c06ae6.309316","name":"","dpad":"2","mode":"3","x":280,"y":420,"wires":[["97b5eb7d.8feaa"]]},{"id":"97b5eb7d.8feaa","type":"binary-serializer","z":"24c06ae6.309316","name":"","x":480,"y":400,"wires":[["9aae373d.e1c218"]]},{"id":"b33fb905.04c2b","type":"serial-port","z":"","serialport":"/dev/ttyAMA0","serialbaud":"115200","databits":"8","parity":"none","stopbits":"1","newline":"\\n","bin":"bin","out":"char","addchar":false,"responsetimeout":"10000"}]
```
</div></details>

### Example 2
Send a Street Figher 2 "Hadouken" comamnd to a game console in response to the HTTP get request. You can use JSON based abstract format [DSL4GC](https://github.com/GameControllerizer/DSL4GC) (Domain-specific Language for Game Control) for command descriptions. See _hadouken_ function node for example.

<img src="https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/images/flow2.png" width="640px" alt="flow2">

<details><summary>flow data</summary><div>

```
[{"id":"9a40e17c.c1af4","type":"serial out","z":"24c06ae6.309316","name":"UART","serial":"e8720150.5629d","x":650,"y":160,"wires":[]},{"id":"fd7715d3.54b788","type":"function","z":"24c06ae6.309316","name":"hadouken","func":"msg.payload = [\n    {\"dpad\": 2, \"dur\":3},\n    {\"dpad\": 3, \"dur\":3},\n    {\"dpad\": 6, \"dur\":3},\n    {\"btn\" : [0], \"dur\": 3}\n];\n\nreturn msg;","outputs":1,"noerr":0,"x":300,"y":160,"wires":[["ae3df6ef.dc3fe"]]},{"id":"a2ce9aa1.67f12","type":"http in","z":"24c06ae6.309316","name":"","url":"/hadouken","method":"get","upload":false,"swaggerDoc":"","x":120,"y":160,"wires":[["fd7715d3.54b788","bef21cc2.1c786"]]},{"id":"bef21cc2.1c786","type":"http response","z":"24c06ae6.309316","name":"http response","statusCode":"","headers":{"Access-Control-Allow-Origin":"*"},"x":320,"y":200,"wires":[]},{"id":"ae3df6ef.dc3fe","type":"binary-serializer","z":"24c06ae6.309316","name":"","x":480,"y":160,"wires":[["9a40e17c.c1af4"]]},{"id":"e8720150.5629d","type":"serial-port","z":"","serialport":"/dev/ttyAMA0","serialbaud":"115200","databits":"8","parity":"none","stopbits":"1","newline":"\\n","bin":"bin","out":"char","addchar":false,"responsetimeout":"10000"}]
```
</div></details>

### Example 3
Redirect control operations from a general gamepad to a game console. [GcScannerJs](https://github.com/GameControllerizer/GcScannerJs), a helper software for GameControllerizer, converts general gamepad operations to DSL4GC, then sends it to Node-RED via Websocket/MQTT.

<img src="https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/images/flow3.png" width="640px" alt="flow3">

<details><summary>flow data</summary><div>

```
[{"id":"2af3b0eb.387578","type":"serial out","z":"24c06ae6.309316","name":"UART","serial":"58598bf4.c908ec","x":650,"y":260,"wires":[]},{"id":"46ffafc1.409c3","type":"websocket in","z":"24c06ae6.309316","name":"","server":"9cb3c35c.a2fd9","client":"","x":120,"y":260,"wires":[["b26d49d7.723b8"]]},{"id":"b26d49d7.723b8","type":"json","z":"24c06ae6.309316","name":"","property":"payload","action":"obj","pretty":false,"x":290,"y":260,"wires":[["2a433803.5452f"]]},{"id":"897e21a4.1f3c3","type":"websocket in","z":"24c06ae6.309316","name":"","server":"3bc89e3a.806bba","client":"","x":110,"y":300,"wires":[[]]},{"id":"cc8d93d9.90b52","type":"websocket in","z":"24c06ae6.309316","name":"","server":"bf28459.50a72b8","client":"","x":110,"y":340,"wires":[[]]},{"id":"2a433803.5452f","type":"binary-serializer","z":"24c06ae6.309316","name":"","x":480,"y":260,"wires":[["2af3b0eb.387578"]]},{"id":"58598bf4.c908ec","type":"serial-port","z":"","serialport":"/dev/ttyAMA0","serialbaud":"115200","databits":"8","parity":"none","stopbits":"1","newline":"\\n","bin":"bin","out":"char","addchar":false,"responsetimeout":"10000"},{"id":"9cb3c35c.a2fd9","type":"websocket-listener","z":"","path":"/gamepad","wholemsg":"false"},{"id":"3bc89e3a.806bba","type":"websocket-listener","z":"","path":"/mouse","wholemsg":"false"},{"id":"bf28459.50a72b8","type":"websocket-listener","z":"","path":"/keyboard","wholemsg":"false"}]
```
</div></details>

### Example 4
Receive a event from a H/W gamepad emulator that has 4 tactile switches on it. You can use an event like a _injection_ node.

<img src="https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/images/flow4.png" width="640px" alt="flow4">

<details><summary>flow data</summary><div>

```
[{"id":"5b72539c.63192c","type":"serial in","z":"24c06ae6.309316","name":"UART","serial":"ec13252.94341d8","x":90,"y":440,"wires":[["954fa243.00c0b8"]]},{"id":"954fa243.00c0b8","type":"function","z":"24c06ae6.309316","name":"decode button input","func":"var tId = msg.payload.readUInt8(0);\n\nswitch(tId){\n    case 0x01:\n        return [{}, null, null, null];\n    case 0x02:\n        return [null, {}, null, null];\n    case 0x04:\n        return [null, null, {}, null];\n    case 0x08:\n        return [null, null, null, {}];\n}\n","outputs":4,"noerr":0,"x":290,"y":440,"wires":[[],[],[],[]]},{"id":"ec13252.94341d8","type":"serial-port","z":"","serialport":"/dev/ttyAMA0","serialbaud":"115200","databits":"8","parity":"none","stopbits":"1","newline":"\\n","bin":"bin","out":"char","addchar":false}]
```
</div></details>