# node-red-contrib-game_controllerizer
Node-RED nodes for [GameControllerizer](https://github.com/GameControllerizer/GameControllerizer).

These nodes allow users to combine the processes of IoT devices, Web services, and applications of AI, and to convert them into game control operations to augment existing digital games.  
See our [paper](https://arxiv.org/abs/1810.01070) for more details.

## Block diagram

<img src="https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/images/block_diagram.png" width="640px" alt="block diagram">

## Getting Started
This assumes you have [Node-RED](https://nodered.org/) already installed and working. This requires,

- [Node.js](https://nodejs.org/) v8.10+ 
- [Node-RED](https://nodered.org/) v0.19+
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
[{"id":"2b272205.0bbbae","type":"inject","z":"abdf250f.e70848","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":90,"y":200,"wires":[["7bf7ea0c.be3224"]]},{"id":"6b75b9c0.35b14","type":"binary-serializer-g","z":"abdf250f.e70848","name":"","x":480,"y":220,"wires":[["4bd490d.699fef"]]},{"id":"4bd490d.699fef","type":"serial out","z":"abdf250f.e70848","name":"UART","serial":"6588e81e.de6eb8","x":680,"y":220,"wires":[]},{"id":"7bf7ea0c.be3224","type":"button","z":"abdf250f.e70848","name":"","button":0,"mode":"push","x":260,"y":200,"wires":[["6b75b9c0.35b14"]]},{"id":"f95bde4d.ac85b","type":"inject","z":"abdf250f.e70848","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":90,"y":240,"wires":[["761745ea.042bec"]]},{"id":"761745ea.042bec","type":"dpad","z":"abdf250f.e70848","name":"","dpad":"2","mode":"3","x":260,"y":240,"wires":[["6b75b9c0.35b14"]]},{"id":"6588e81e.de6eb8","type":"serial-port","z":"","serialport":"/dev/ttyUSB0","serialbaud":"115200","databits":"8","parity":"none","stopbits":"1","newline":"\\n","bin":"bin","out":"char","addchar":false,"responsetimeout":"10000"}]
```
</div></details>

### Example 2
Send a Street Figher 2 "Hadouken" comamnd to a game console in response to the HTTP get request. You can use JSON based abstract format [DSL4GC](https://github.com/GameControllerizer/DSL4GC) (Domain-specific Language for Game Control) for command descriptions. See _hadouken_ function node for example.

<img src="https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/images/flow2.png" width="640px" alt="flow2">

<details><summary>flow data</summary><div>

```
[{"id":"29070cb8.8aee1c","type":"binary-serializer-g","z":"1a746c04.626334","name":"","x":480,"y":220,"wires":[["e007be2c.1ed9c8"]]},{"id":"e007be2c.1ed9c8","type":"serial out","z":"1a746c04.626334","name":"UART","serial":"6588e81e.de6eb8","x":670,"y":220,"wires":[]},{"id":"1b18053c.a63593","type":"function","z":"1a746c04.626334","name":"hadouken","func":"msg.payload = [\n    {\"dpad\": 2, \"dur\":3},\n    {\"dpad\": 3, \"dur\":3},\n    {\"dpad\": 6, \"dur\":3},\n    {\"btn\" : [0], \"dur\": 3}\n];\n\nreturn msg;","outputs":1,"noerr":0,"x":280,"y":220,"wires":[["29070cb8.8aee1c"]]},{"id":"64415dc7.6bcbd4","type":"http in","z":"1a746c04.626334","name":"","url":"/hadouken","method":"get","upload":false,"swaggerDoc":"","x":100,"y":220,"wires":[["1b18053c.a63593","e9d6854d.ff3a6"]]},{"id":"e9d6854d.ff3a6","type":"http response","z":"1a746c04.626334","name":"http response","statusCode":"","headers":{"Access-Control-Allow-Origin":"*"},"x":300,"y":260,"wires":[]},{"id":"6588e81e.de6eb8","type":"serial-port","z":"","serialport":"/dev/ttyUSB0","serialbaud":"115200","databits":"8","parity":"none","stopbits":"1","newline":"\\n","bin":"bin","out":"char","addchar":false,"responsetimeout":"10000"}]
```
</div></details>

### Example 3
Redirect control operations from a general gamepad to a game console. [GcScannerJs](https://github.com/GameControllerizer/GcScannerJs), a helper software for GameControllerizer, converts general gamepad operations to DSL4GC, then sends it to Node-RED via Websocket/MQTT.

<img src="https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/images/flow3.png" width="640px" alt="flow3">

<details><summary>flow data</summary><div>

```
[{"id":"5b5ed7a4.3a708","type":"binary-serializer-g","z":"708cfa21.65ae74","name":"","x":460,"y":40,"wires":[["d5bbc3c2.544f6"]]},{"id":"d5bbc3c2.544f6","type":"serial out","z":"708cfa21.65ae74","name":"UART","serial":"b63ff287.139858","x":650,"y":40,"wires":[]},{"id":"30822f79.3b4b68","type":"websocket in","z":"708cfa21.65ae74","name":"","server":"937f43d6.3821f","client":"","x":100,"y":40,"wires":[["6a3cf06.85a2f1"]]},{"id":"6a3cf06.85a2f1","type":"json","z":"708cfa21.65ae74","name":"","property":"payload","action":"obj","pretty":false,"x":270,"y":40,"wires":[["5b5ed7a4.3a708"]]},{"id":"35695353.d71c1c","type":"websocket in","z":"708cfa21.65ae74","name":"","server":"2326fcf1.bebea4","client":"","x":90,"y":80,"wires":[[]]},{"id":"1cfae7c3.83add8","type":"websocket in","z":"708cfa21.65ae74","name":"","server":"109e49f7.15ac66","client":"","x":100,"y":120,"wires":[[]]},{"id":"b63ff287.139858","type":"serial-port","z":"","serialport":"/dev/ttyAMA0","serialbaud":"115200","databits":"8","parity":"none","stopbits":"1","newline":"\\n","bin":"bin","out":"char","addchar":false,"responsetimeout":"10000"},{"id":"937f43d6.3821f","type":"websocket-listener","z":"","path":"/gamepad","wholemsg":"false"},{"id":"2326fcf1.bebea4","type":"websocket-listener","z":"","path":"/mouse","wholemsg":"false"},{"id":"109e49f7.15ac66","type":"websocket-listener","z":"","path":"/keyboard","wholemsg":"false"}]
```
</div></details>

### Example 4
Receive a event from a H/W gamepad emulator that has 4 tactile switches on it. You can use an event like a _injection_ node.

<img src="https://raw.githubusercontent.com/wiki/GameControllerizer/node-red-contrib-game_controllerizer/images/flow4.png" width="640px" alt="flow4">

<details><summary>flow data</summary><div>

```
[{"id":"c026faa3.597b2","type":"serial in","z":"5607c9e4.bc5558","name":"UART","serial":"6588e81e.de6eb8","x":70,"y":60,"wires":[["3b1b734d.cc84c4"]]},{"id":"3b1b734d.cc84c4","type":"function","z":"5607c9e4.bc5558","name":"to Button ID","func":"msg.payload = msg.payload.readUInt8(0);\nreturn msg;\n","outputs":1,"noerr":0,"x":250,"y":60,"wires":[["726001b9.53c108"]]},{"id":"726001b9.53c108","type":"switch","z":"5607c9e4.bc5558","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"0x01","vt":"num"},{"t":"eq","v":"0x02","vt":"str"},{"t":"eq","v":"0x04","vt":"str"},{"t":"eq","v":"0x08","vt":"str"}],"checkall":"true","repair":false,"outputs":4,"x":430,"y":60,"wires":[[],[],[],[]]},{"id":"6588e81e.de6eb8","type":"serial-port","z":"","serialport":"/dev/ttyUSB0","serialbaud":"115200","databits":"8","parity":"none","stopbits":"1","newline":"\\n","bin":"bin","out":"char","addchar":false,"responsetimeout":"10000"}]
```
</div></details>