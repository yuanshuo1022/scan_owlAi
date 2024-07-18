export default new class {
	Convert(Original){
		return Number(Original);
	}
	Fixed(Original , Reserve){
		return this.Convert(Original).toFixed(this.Convert(App.Check(Reserve , 'PositiveInteger' , 2)));
	}
	Precision(Original , Reserve){
		return this.Convert(Original).toPrecision(this.Convert(App.Check(Reserve , 'PositiveInteger' , 2)));
	}
	Random(Min , Max , Reserve){
		Option = {};
		Option.Min = App.Check(Min , 'Number' , 0);
		Option.Max = App.Check(Max , 'Number' , 1);
		return this.Fixed(App.Calculate.Add(App.Calculate.Mul(Math.random() , App.Calculate.Sub(Option.Max , Option.Min)) , Option.Min) , Reserve);
	}
	Range(Min , Max , Step){
		const Array = [];
		App.Each.Loop(Min , Max , Step).Add(Index => {
			App.Array.Push(Array , Index);
			return true;
		});
		return Array;
	}
	Firend(Original , Reserve){
		if(!App.Verify.PositiveInteger(Original)) return this.Fixed(0 , Reserve);
		if(App.Verify.In(Original , ',')) Original = App.String.Replace(Original , ',' , '');
		const Negative = (App.Verify.Negative(Original) ? '-' : '');
		let [Integer , Decimal] = App.String.Split(this.Fixed(Original , Reserve) , '.');
		const Length = App.Length(Integer);
		if(App.Verify.Elt(Length , 3)) return App.String.Concat(Negative , Integer , (App.Verify.String(Decimal) ? App.String.Concat('.' , Decimal) : ''));
		const Remainder = App.Calculate.Cop(Length , 3);
		let String = '';
		App.Each.Of(App.String.Substr(Integer , Remainder) , Item => {
			if(App.Verify.Min(String , 1) && App.Verify.Eq(App.Calculate.Cop(App.Length(App.String.Replace(String , ',' , '.')) , 3) , 0)) String = App.String.Concat(String , ',');
			String = App.String.Concat(String , Item);
			return true;
		});
		const Finally = App.String.Concat((App.Verify.Eq(Remainder , 0) ? '' : App.String.Concat(App.String.Substr(Integer , 0 , Remainder) , ',')) , String);
		return App.String.Concat(Negative , Finally , (App.Verify.String(Decimal) ? App.String.Concat('.' , Decimal) : ''));
	}
}