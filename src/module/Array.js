import Verify  from "./Verify";
import Calculate from "./Calculate";
import Each from "./Each";
import Number from "./Number";
export default  class {
	Push(Original , ...Additional){
		return this.Splice(Original , Length(Original) , 0 , ...Additional);
	}
	Delete(Original , Index , Length){
		return this.Splice(Original , Index , Length);
	}
	Splice(Original , Index , Length , ...Additional){
		return Original.splice(Number.Convert(Check(Index , 'Integer' , 0)) , Number.Convert(Check(Length , 'Integer' , 0)) , ...Additional);
	}
	Join(Original , Symbol){
		return Original.join(Check(Symbol , 'String' , ''));
	}
	Concat(Original , ...Additional){
		return Original.concat(...Additional);
	}
	Deduplication(Original){
		const Data = [];
		Each.Of(Original , Item => {
			if(!Verify.In(Data , Item)) this.Push(Data , Item);
			return true;
		});
		return Data;
	}
	Flat(Original , Level){
		return Original.flat(Number.Convert(Check(Level , 'Integer' , 1)));
	}
	Reverse(Original){
		return Original.reverse();
	}
	Shuffle(Original){
		return this.Order(Original , () => {
			return Calculate.Sub(Math.random() , 0.5);
		});
	}
	Order(Original , Callable){
		return Original.sort((Current , Next) => {
			if(Verify.Function(Callable)) return Callable(Current , Next);
			if(Verify.Gt(Current , Next)) return 1;
			if(Verify.Lt(Current , Next)) return -1;
			return 0;
		});
	}
}