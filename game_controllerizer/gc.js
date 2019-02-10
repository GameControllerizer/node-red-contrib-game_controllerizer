module.exports = function(RED) {

	let GcOps = require('./gc-ops').GcOps;

	////////////////////////////////////////////////////////////////////
	function OperateGamepadNode(config) {
		RED.nodes.createNode(this,config);
		let dpad = config.dpad;
		let button = parseInt(config.button);
		let pos0 = [parseInt(config.pos0x), parseInt(config.pos0y)];
		let pos1 = [parseInt(config.pos1x), parseInt(config.pos1y)];
		let dur = parseInt(config.mode);
		this.cmd = {"dpad":dpad, "btn":[button], "stk0":pos0, "stk1":pos1, "dur":dur};
		var node = this;
		node.on('input', function(msg) {
			try {
				msg.payload = GcOps.concat(msg.payload, this.cmd);
				node.send(msg);
			} catch (e) {
				node.error(e, msg);
			}
		});
	}
	RED.nodes.registerType("gamepad", OperateGamepadNode);

	////////////////////////////////////////////////////////////////////
	function OperateDpadNode(config) {
		RED.nodes.createNode(this,config);
		let dpad = config.dpad;
		let dur = parseInt(config.mode);
		this.cmd = {"dpad":dpad, "dur":dur};
		var node = this;
		node.on('input', function(msg) {
			try {
				msg.payload = GcOps.concat(msg.payload, this.cmd);
				node.send(msg);
			} catch (e) {
				node.error(e, msg);
			}
		});
	}
	RED.nodes.registerType("dpad", OperateDpadNode);

	////////////////////////////////////////////////////////////////////
	function OperateButtonNode(config) {
		RED.nodes.createNode(this,config);
		let button = parseInt(config.button);
		let dur,state;
		switch(config.mode){
			case "push":
				dur=3; state=true;  break;
			case "hold":
				dur=-1; state=true;  break;
			case "release":
				dur=-1; state=false; break;				
		}
		this.cmd = {"btn":{[button]:state}, "dur":dur};
		var node = this;
		node.on('input', function(msg) {
			try {
				msg.payload = GcOps.concat(msg.payload, this.cmd);
				node.send(msg);
			} catch (e) {
				node.error(e, msg);
			}
		});
	}
	RED.nodes.registerType("button", OperateButtonNode);

	////////////////////////////////////////////////////////////////////
	function OperateStickNode(config) {
		RED.nodes.createNode(this,config);
		let stick = config.stick ? "stk1" : "stk0";
		let pos = {"x":parseInt(config.posx), "y":parseInt(config.posy)};
		let dur = parseInt(config.mode);
		this.cmd = {[stick]:pos, "dur":dur};
		var node = this;
		node.on('input', function(msg) {
			try {
				msg.payload = GcOps.concat(msg.payload, this.cmd);
				node.send(msg);
			} catch (e) {
				node.error(e, msg);
			}
		});
	}
	RED.nodes.registerType("stick", OperateStickNode);

	////////////////////////////////////////////////////////////////////
	function OperateInputConfigNode(config) {
		RED.nodes.createNode(this,config);
		this.cmd = {"cfg_input": {[config.ctarget]: parseInt(config.cmap)}, "dur":0};
		var node = this;
		node.on('input', function(msg) {
			try {
				msg.payload = GcOps.concat(msg.payload, this.cmd);
				node.send(msg);
			} catch (e) {
				node.error(e, msg);
			}
		});
	}
	RED.nodes.registerType("input-config", OperateInputConfigNode);


	////////////////////////////////////////////////////////////////////
	function OperateWaitNode(config) {
		RED.nodes.createNode(this,config);
		this.cmd = {"dur": config.dur};
		var node = this;
		node.on('input', function(msg) {
			try {
				msg.payload = GcOps.concat(msg.payload, this.cmd);
				node.send(msg);
			} catch (e) {
				node.error(e, msg);
			}
		});
	}
	RED.nodes.registerType("wait", OperateWaitNode);
	
	////////////////////////////////////////////////////////////////////
    function BinarySerializerNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            try {
                let gc_sentence = msg.payload;
				let binary_sentence = [];
				let num_bytes = 0;
				for (let gc_word of gc_sentence){
					var bytes = GcOps.toBytes(gc_word);
                    binary_sentence.push(bytes);
					num_bytes += bytes.length;
				}
                msg.payload = Buffer.concat(binary_sentence, num_bytes);
                node.send(msg);
            } catch (e) {
                node.error(e, msg);
            }
        });
    }
	RED.nodes.registerType("binary-serializer-g", BinarySerializerNode);

	////////////////////////////////////////////////////////////////////
    // function RemapButtonNode(config) {
    //     RED.nodes.createNode(this,config);
    //     this.map = [
    //         parseInt(config.remap0),
    //         parseInt(config.remap1),
    //         parseInt(config.remap2),
    //         parseInt(config.remap3),
    //         parseInt(config.remap4),
    //         parseInt(config.remap5),
    //         parseInt(config.remap6),
    //         parseInt(config.remap7),
    //         parseInt(config.remap8),
    //         parseInt(config.remap9),
    //         parseInt(config.remap10),
    //         parseInt(config.remap11)
    //     ];
    //     var node = this;
    //     node.on('input', function(msg) {
    //         try {
	// 			   // button remapping codes
	//             // ...
    //             node.send(msg);
    //         } catch (e) {
    //             node.error(e, msg);
    //         }
    //     });
    // }
	// RED.nodes.registerType("button-map", RemapButtonNode);	
}

