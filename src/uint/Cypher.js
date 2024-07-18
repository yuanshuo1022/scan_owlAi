// import Crypto from "../edxtend/Crypto";
import Crypto from 'crypto-js';
import String from "../module/String";
export default new class {
	Md5(Original){
		const Data= Crypto.MD5(String.Convert(Original))
		return String.Convert(Data);
		// return Crypto.MD5(String.Convert(Original)).then(Data => {
		// 	return String.Convert(Data);
		// });
	}
	Sha256(Original){
		return Crypto.SHA256(String.Convert(Original)).then(Data => {
			return String.Convert(Data);
		});
	}
	Base64 = new class {
		async Encode(Original){
			return String.Convert(await Crypto.enc.Base64.stringify(await Crypto.enc.Utf8.parse(String.Convert(Original))));
		}
		async Decode(Original){
			return String.Convert(await Crypto.enc.Utf8.stringify(await Crypto.enc.Base64.parse(String.Convert(Original))));
		}
	}
	Aes = new class {
		async Encode(Original , Secret){
			const Md5 = await Cypher.Md5(Secret);
			return await Cypher.Base64.Encode(await Crypto.AES.encrypt(String.Convert(Original) , await Crypto.enc.Utf8.parse(String.Substr(Md5 , 0 , 16)) , {
				iv : await Crypto.enc.Utf8.parse(String.Substr(Md5 , 16)) ,
				mode : await Crypto.mode.CBC() ,
			}));
		}
		async Decode(Original , Secret){
			const Md5 = await Cypher.Md5(Secret);
			return String.Convert(await Crypto.enc.Utf8.stringify(await Crypto.AES.decrypt(await Cypher.Base64.Decode(Original) , await Crypto.enc.Utf8.parse(String.Substr(Md5 , 0 , 16)) , {
				iv : await Crypto.enc.Utf8.parse(String.Substr(Md5 , 16)) ,
				mode : await Crypto.mode.CBC() ,
			})));
		}
	}
	Des = new class {
		async Encode(Original , Secret){
			const Md5 = await Cypher.Md5(Secret);
			return await Cypher.Base64.Encode(await Crypto.DES.encrypt(String.Convert(Original) , await Crypto.enc.Utf8.parse(String.Substr(Md5 , 0 , 16)) , {
				mode : await Crypto.mode.ECB() ,
				padding : await Crypto.pad.Pkcs7() ,
			}));
		}
		async Decode(Original , Secret){
			const Md5 = await Cypher.Md5(Secret);
			return String.Convert(await Crypto.enc.Utf8.stringify(await Crypto.DES.decrypt(await Cypher.Base64.Decode(Original) , await Crypto.enc.Utf8.parse(String.Substr(Md5 , 0 , 16)) , {
				mode : await Crypto.mode.ECB() ,
				padding : await Crypto.pad.Pkcs7() ,
			})));
		}
	}
}