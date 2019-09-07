import {gamecontrollerizer as PxtGc} from "./pxt-gc";
declare const Buffer;

export namespace GcOps {

	function classof(obj:any){
		return Object.prototype.toString.call(obj).slice(8, -1);
	}
	function isEmpty(obj:any){
		return !obj?!(obj===0||obj===false)?true:false:false;
	}
	
	export function concat(payload:any, obj:object){
		switch (classof(payload)){
			case "Array":
				payload.push(obj);
				break;
			case "Object":
				payload = [payload, obj];
				break;
			default:
				if (isEmpty(payload))
					payload = [obj];			
				else
					throw new Error("Illegal DSL4GC '" + payload + "'");
		}
		return payload;
	}

	function toBytesDpad(v){
		return (new PxtGc.DpadCmd(v, 0)).toBytes();
	}
	function toBytesButton(v){
		switch(classof(v)){
			case "Array":
				return toBytesButtonArray(v);
			case "Object":
				return toBytesButtonObject(v);
			default:
				throw new Error();
		}
	}
	function toBytesButtonArray(v){
		return (new PxtGc.ButtonCmd(v, 0)).toBytes();		
	}
	function toBytesButtonObject(obj){
		var set_buttons = [];
		var unset_buttons = [];
		for (var key in obj){
			if (obj[key])
				set_buttons.push(parseInt(key));
			else
				unset_buttons.push(parseInt(key));
		}
		var bytes = [];
		if (set_buttons.length>0)
			bytes = bytes.concat((new PxtGc.ButtonSetCmd(set_buttons, 0)).toBytes());
		if (unset_buttons.length>0)
			bytes = bytes.concat((new PxtGc.ButtonUnsetCmd(unset_buttons, 0)).toBytes());
		return bytes;
	}
	function toBytesStick(id, v){
		switch(classof(v)){
			case "Array":
				return toBytesStickArray(id,v);
			case "Object":
				return toBytesStickObject(id,v);
			default:
				throw new Error();
		}
	}
	function toBytesStickArray(id,v){
		return (new PxtGc.StickCmd(id, v[0], v[1], 0)).toBytes();
	}
	function toBytesStickObject(id,v){
		var bytes = [];
		if ("x" in v){
			const x_bytes = (new PxtGc.StickAxisCmd(id, PxtGc.GamepadStickAxis.x, v["x"], 0)).toBytes();
			bytes = bytes.concat(x_bytes);			
		}
		if ("y" in v){
			const y_bytes = (new PxtGc.StickAxisCmd(id, PxtGc.GamepadStickAxis.y, v["y"], 0)).toBytes();
			bytes = bytes.concat(y_bytes);
		}
		return bytes;
	}
	function toBytesInputConfig(v){
		var bytes = [];
		if ("dpad" in v){
			const bytes0 = (new PxtGc.InputConfigCmd(0x01, v["dpad"])).toBytes();
			bytes = bytes.concat(bytes0);
		}
		if ("stk0" in v){
			const bytes1 = (new PxtGc.InputConfigCmd(0x02, v["stk0"])).toBytes();		
			bytes = bytes.concat(bytes1);
		}
		if ("stk1" in v){
			const bytes2 = (new PxtGc.InputConfigCmd(0x04, v["stk1"])).toBytes();		
			bytes = bytes.concat(bytes2);
		}
		return bytes;
	}
	function toBytesInterrupt(){
		const bytes = (new PxtGc.InterruptCmd()).toBytes();
		return bytes;
	}


	export function toBytes(obj:object) {
		try{
			// console.log("toBytes : " + JSON.stringify(obj));
			const dev = Object.keys(obj).filter(x => x !=="dur");			
			let sub_sentence = [];
			for(var k=0, l=dev.length; k<l; k++){
				var bytes;
				switch(dev[k]){
					case "dpad":
						bytes = toBytesDpad(obj["dpad"]);
						break;
					case "btn":
						bytes = toBytesButton(obj["btn"]);
						break;
					case "stk0":
						bytes = toBytesStick(PxtGc.GamepadStick.Left,  obj["stk0"]);
						break;
					case "stk1":
						bytes = toBytesStick(PxtGc.GamepadStick.Right, obj["stk1"]);
						break;
					case "cfg_input":
						bytes = toBytesInputConfig(obj["cfg_input"]);
						break;
					case "interrupt":
						bytes = toBytesInterrupt();
						break;
				}
				sub_sentence = sub_sentence.concat(bytes);
			}
			const dur = ("dur" in obj) ? obj["dur"] : 0;
			if (dur!=0)
				sub_sentence = sub_sentence.concat((new PxtGc.DurationCmd(dur)).toBytes());

			return Buffer.from(sub_sentence);
		} catch(e){
			throw new Error("Illegal DSL4GC '" + JSON.stringify(obj) + "'");
		}
	}
}
