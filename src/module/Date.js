export default new class {
	Get(Original){
		if(!App.Verify.Date(Original)) return new Date();
		if(App.Verify.Integer(Original)) Original = App.Number.Convert(App.String.Pad(Original , 13 , 0).Start);
		return new Date(Original);
	}
	Time(Original){
		return App.Number.Convert(App.String.Substr(this.Microtime(Original) , 0 , 10));
	}
	Microtime(Original){
		return this.Get(Original).getTime();
	}
	Second(Original , Double){
		const Data = this.Get(Original).getSeconds();
		return (App.Check(Double , 'Boolean' , true) ? App.String.Pad(Data , 2 , 0).Start : Data);
	}
	Minute(Original , Double){
		const Data = this.Get(Original).getMinutes();
		return (App.Check(Double , 'Boolean' , true) ? App.String.Pad(Data , 2 , 0).Start : Data);
	}
	Hour(Original , Double){
		const Data = this.Get(Original).getHours();
		return (App.Check(Double , 'Boolean' , true) ? App.String.Pad(Data , 2 , 0).Start : Data);
	}
	Day(Original , Double){
		const Data = this.Get(Original).getDate();
		return (App.Check(Double , 'Boolean' , true) ? App.String.Pad(Data , 2 , 0).Start : Data);
	}
	Month(Original , Double){
		const Data = App.Calculate.Add(this.Get(Original).getMonth() , 1);
		return (App.Check(Double , 'Boolean' , true) ? App.String.Pad(Data , 2 , 0).Start : Data);
	}
	Year(Original){
		return this.Get(Original).getFullYear();
	}
	Format(Original , Method , Double){
		Method = App.String.Lower(Method);
		if(App.Verify.In(Method , '%y')) Method = App.String.Replace(Method , '%y' , this.Year(Original));
		if(App.Verify.In(Method , '%m')) Method = App.String.Replace(Method , '%m' , this.Month(Original , Double));
		if(App.Verify.In(Method , '%d')) Method = App.String.Replace(Method , '%d' , this.Day(Original , Double));
		if(App.Verify.In(Method , '%h')) Method = App.String.Replace(Method , '%h' , this.Hour(Original , Double));
		if(App.Verify.In(Method , '%i')) Method = App.String.Replace(Method , '%i' , this.Minute(Original , Double));
		if(App.Verify.In(Method , '%s')) Method = App.String.Replace(Method , '%s' , this.Second(Original , Double));
		return Method;
	}
	Calendar(Original , Double , Method){
		return this.Format(Original , App.Check(Method , 'Require' , '%Y-%M-%D' , 'string') , Double);
	}
	Clock(Original , Double , Method){
		return this.Format(Original , App.Check(Method , 'Require' , '%H:%I:%S' , 'string') , Double);
	}
	Full(Original , Double , Method){
		return this.Format(Original , App.Check(Method , 'Require' , '%Y-%M-%D %H:%I:%S' , 'string') , Double);
	}
	Friend(Original){
		const Time = this.Time(Original);
		const Current = this.Time();
		const Option = {};
		Option.Negative = App.Verify.Gt(Time , Current);
		Option.Difference = Math.abs(App.Calculate.Sub(Current , Time));
		return Option;
	}
}