import Verify  from "./Verify";
import Calculate from "./Calculate";
import Array from "./Array";
import Each from "./Each";

export default new class {
	Convert(Original , Mold){
		if(Verify.PositiveInteger(Mold)) return Original.toString(Mold);
		return String(Original);
	}
	Lower(Original){
		return this.Convert(Original).toLowerCase();
	}
	Upper(Original){
		return this.Convert(Original).toUpperCase();
	}
	Capitalize(Original){
		return this.Concat(this.Upper(this.Substr(Original , 0 , 1)) , this.Substr(Original , 1));
	}
	Json(Original){
		return JSON.parse(Original);
	}
	Split(Original , Symbol){
		return this.Convert(Original).split(Check(Symbol , 'String' , ''));
	}
	Concat(Original , ...Additional){
		return this.Convert(Original).concat(...Additional);
	}
	Find = new class {
		Start(Original , Target){
			return String.Convert(Original).indexOf(String.Convert(Target));
		}
		End(Original , Target){
			return String.Convert(Original).lastIndexOf(String.Convert(Target));
		}
		Place(Original , Target , Count){
			let Position = -1;
			Each.Loop(0 , Count).Add(Index => {
				Position = String.Convert(Original).indexOf(String.Convert(Target) , Calculate.Add(Position , 1));
				return true;
			});
			return Position;
		}
		Count(Original , Target){
			return Calculate.Sub(Length(String.Split(Original , Target)) , 1);
		}
	}
	Trim = new class {
		Start(Original){
			return String.Convert(Original).trimStart();
		}
		End(Original){
			return String.Convert(Original).trimEnd();
		}
		Both(Original){
			return String.Convert(Original).trim();
		}
	}
	Pad(Original , Length , Value){
		Option = {};
		Option.Original = String.Convert(Original);
		Option.Length = Check(Length , 'PositiveInteger' , Length(Length));
		Option.Value = Check(Value , 'Type' , '' , [['string' , 'number']]);
		return new class {
			get Start(){
				return Option.Original.padStart(Option.Length , Option.Value);
			}
			get End(){
				return Option.Original.padEnd(Option.Length , Option.Value);
			}
		}
	}
	Uniqid(Symbol){
		const Blob = URL.createObjectURL(new Blob());
		const Link = this.Convert(Blob);
		URL.revokeObjectURL(Blob);
		const Uuid = this.Substr(Link , Calculate.Add(this.Find.End(Link , '/') , 1));
		if(Check(Symbol , 'Boolean' , true)) return Uuid;
		return this.Replace(Uuid , '-' , '');
	}
	Random(Length , Repeat , Digit){
		Option = {};
		Option.Length = Check(Length , 'PositiveInteger' , 5);
		Option.Repeat = Check(Repeat , 'Boolean' , true);
		Option.Reserve = this.Split(this.Concat('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' , (Check(Digit , 'Boolean' , true) ? '0123456789' : '')));
		Option.Finally = [];
		Each.Loop(0 , Option.Length).Add(Index => {
			const Shuffle = Array.Shuffle(Option.Reserve);
			if(!Option.Repeat && Verify.In(Option.Finally , Shuffle[0])) return Calculate.Sub(Index , 1);
			Array.Push(Option.Finally , Shuffle[0]);
			return true;
		});
		return Array.Join(Option.Finally);
	}
	Replace(Original , Rule , Value){
		if(Verify.Object(Original)){
			Each.in(Original , (Item , Index) => {
				Original[Index] = this.Replace(Item , Rule , Value);
				return true;
			});
		}else if(Verify.Array(Rule)){
			Each.In(Rule , (Item , Index) => {
				Original = this.Convert(Original).replaceAll(Item , (Verify.Array(Value) ? Value[Index] : Value));
				return true;
			});
		}else if(Verify.Object(Rule)){
			Original = this.Convert(Original).replace(Rule , Value);
		}else{
			Original = this.Convert(Original).replaceAll(Rule , Value);
		}
		return Original;
	}
	Repeat(Original , Length){
		return this.Convert(Original).repeat(Check(Length , 'PositiveInteger' , 0));
	}
	Substr(Original , Start , End){
		return this.Convert(Original).substring(Check(Start , 'PositiveInteger' , 0) , Check(End , 'PositiveInteger' , Length(Original)));
	}
	Url(Original){
		const Finally = {};
		Each.Of(this.Split(this.Convert(Original) , '&') , Item => {
			let [Index , Value] = this.Split(Item , '=');
			try{
				Finally[Index] = this.Json(Value);
			}catch{
				Finally[Index] = Value;
			}
		});
		return Finally;
	}
}