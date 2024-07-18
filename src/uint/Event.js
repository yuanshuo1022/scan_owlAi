export default new class {
	#Direction(Original){
		const Angle = App.Calculate.Cop(window.Math.round(App.Calculate.Add(App.Calculate.Div(App.Calculate.Add(App.Calculate.Mul(window.Math.atan2(Original.Y , Original.X) , App.Calculate.Div(180 , window.Math.PI)) , 180) , 90) , 3)) , 4);
		if(App.Verify.Eq(Angle , 0) && App.Verify.Lt(Original.Y , -10) && App.Verify.Lt(window.Math.abs(Original.X) , window.Math.abs(Original.Y))) return 0;
		if(App.Verify.Eq(Angle , 1) && App.Verify.Gt(Original.X , 10) && App.Verify.Gt(window.Math.abs(Original.X) , window.Math.abs(Original.Y))) return 1;
		if(App.Verify.Eq(Angle , 2) && App.Verify.Gt(Original.Y , 10) && App.Verify.Lt(window.Math.abs(Original.X) , window.Math.abs(Original.Y))) return 2;
		if(App.Verify.Eq(Angle , 3) && App.Verify.Lt(Original.X , -10) && App.Verify.Gt(window.Math.abs(Original.X) , window.Math.abs(Original.Y))) return 3;
		return -1;
	}
	#Initialize(Original){
		if(!App.Verify.Object(Original)) Original = {};
		Original.Unbind = App.Check(Original.Unbind , 'Boolean' , true);
		Original.Prevent = App.Check(Original.Prevent , 'Boolean' , true);
		Original.Tap = App.Check(Original.Tap , 'Function' , () => {});
		Original.Double = App.Check(Original.Double , 'Function' , () => {});
		Original.Hold = App.Check(Original.Hold , 'Function' , () => {});
		Original.Top = App.Check(Original.Top , 'Function' , () => {});
		Original.Bottom = App.Check(Original.Bottom , 'Function' , () => {});
		Original.Left = App.Check(Original.Left , 'Function' , () => {});
		Original.Right = App.Check(Original.Right , 'Function' , () => {});
		Original.Up = App.Check(Original.Up , 'Function' , () => {});
		Original.Down = App.Check(Original.Down , 'Function' , () => {});
		if(!App.Verify.Object(Original.Move)) Original.Move = {};
		Original.Move.Top = App.Check(Original.Move.Top , 'Function' , () => {});
		Original.Move.Bottom = App.Check(Original.Move.Bottom , 'Function' , () => {});
		Original.Move.Left = App.Check(Original.Move.Left , 'Function' , () => {});
		Original.Move.Right = App.Check(Original.Move.Right , 'Function' , () => {});
		Original.Move.Drag = App.Check(Original.Move.Drag , 'Function' , () => {});
		Original.Option = {};
		Original.Option.Coordinate = {};
		Original.Option.Coordinate.X = 0;
		Original.Option.Coordinate.Y = 0;
		Original.Option.Double = false;
		Original.Option.Interval = 0;
		Original.Option.Timer = 0;
		return Original;
	}
	Mouse(Original){
		Original = this.#Initialize(Original);
		if(Original.Unbind){
			Original.Element.unbind('mouseup');
			Original.Element.unbind('mousemove');
			Original.Element.unbind('mousedown');
		}
		Original.Element.bind('mousedown' , Event => {
			if(Original.Prevent) Event.preventDefault();
			Original.Option.Interval = App.Date.Microtime();
			Original.Option.Coordinate.X = window.Math.floor(Event.originalEvent.pageX);
			Original.Option.Coordinate.Y = window.Math.floor(Event.originalEvent.pageY);
			if(!Original.Option.Double) Original.Down(App.$(Event.currentTarget) , Original.Option.Coordinate , Event);
			Original.Element.bind('mousemove' , Event => {
				if(Original.Prevent) Event.preventDefault();
				const Coordinate = {};
				Coordinate.X = window.Math.floor(Event.originalEvent.pageX);
				Coordinate.Y = window.Math.floor(Event.originalEvent.pageY);
				const Difference = {};
				Difference.X = App.Calculate.Sub(Coordinate.X , Original.Option.Coordinate.X);
				Difference.Y = App.Calculate.Sub(Coordinate.Y , Original.Option.Coordinate.Y);
				const Direction = this.#Direction(Difference);
				if(App.Verify.Eq(Direction , 0)) Original.Move.Top(App.$(Event.currentTarget) , Difference , Event);
				if(App.Verify.Eq(Direction , 1)) Original.Move.Right(App.$(Event.currentTarget) , Difference , Event);
				if(App.Verify.Eq(Direction , 2)) Original.Move.Bottom(App.$(Event.currentTarget) , Difference , Event);
				if(App.Verify.Eq(Direction , 3)) Original.Move.Left(App.$(Event.currentTarget) , Difference , Event);
				Original.Move.Drag(App.$(Event.currentTarget) , Difference , Event);
			});
		});
		Original.Element.bind('mouseup' , Event => {
			if(Original.Prevent) Event.preventDefault();
			const Coordinate = {};
			Coordinate.X = window.Math.floor(Event.originalEvent.pageX);
			Coordinate.Y = window.Math.floor(Event.originalEvent.pageY);
			const Difference = {};
			if(!Original.Option.Double) Original.Up(App.$(Event.currentTarget) , Coordinate , Event);
			Difference.X = App.Calculate.Sub(Coordinate.X , Original.Option.Coordinate.X);
			Difference.Y = App.Calculate.Sub(Coordinate.Y , Original.Option.Coordinate.Y);
			if(App.Verify.Elt(window.Math.abs(Difference.X) , 10) && App.Verify.Elt(window.Math.abs(Difference.Y) , 10)){
				Original.Option.Interval = App.Calculate.Sub(App.Date.Microtime() , Original.Option.Interval);
				if(App.Verify.Gt(Original.Option.Interval , 500)){
					Original.Hold(App.$(Event.currentTarget) , Event);
				}else if(Original.Option.Double){
					Original.Option.Double = false;
					clearTimeout(Original.Option.Timer);
					Original.Double(App.$(Event.currentTarget) , Event);
				}else{
					Original.Option.Double = true;
					App.Aux.Sleep(0.2).then(Timer => {
						if(Original.Option.Double){
							Original.Option.Double = false;
							Original.Option.Timer = Timer;
							Original.Tap(App.$(Event.currentTarget) , Event);
						}
					});
				}
			}else{
				const Direction = this.#Direction(Difference);
				if(App.Verify.Eq(Direction , 0)) Original.Top(App.$(Event.currentTarget) , Event);
				if(App.Verify.Eq(Direction , 1)) Original.Right(App.$(Event.currentTarget) , Event);
				if(App.Verify.Eq(Direction , 2)) Original.Bottom(App.$(Event.currentTarget) , Event);
				if(App.Verify.Eq(Direction , 3)) Original.Left(App.$(Event.currentTarget) , Event);
			}
			Original.Element.unbind('mousemove');
		});
		Original.Element.bind('mouseleave' , Event => {
			if(Original.Prevent) Event.preventDefault();
			Original.Element.unbind('mousemove');
		});
	}
	Touch(Original){
		Original = this.#Initialize(Original);
		App.Each.Loop(0 , App.Length(Original.Element)).Add(Index => {
			Original.Element[Index].addEventListener('touchstart' , Event => {
				if(Original.Prevent && Event.cancelable) Event.preventDefault();
				Original.Option.Interval = App.Date.Microtime();
				Original.Option.Coordinate.X = window.Math.floor(Event.changedTouches[0].pageX);
				Original.Option.Coordinate.Y = window.Math.floor(Event.changedTouches[0].pageY);
				if(!Original.Option.Double) Original.Down(App.$(Original.Element[Index]) , Original.Option.Coordinate , Event);
			});
			Original.Element[Index].addEventListener('touchmove' , Event => {
				if(Original.Prevent && Event.cancelable) Event.preventDefault();
				const Coordinate = {};
				Coordinate.X = window.Math.floor(Event.changedTouches[0].pageX);
				Coordinate.Y = window.Math.floor(Event.changedTouches[0].pageY);
				const Difference = {};
				Difference.X = App.Calculate.Sub(Coordinate.X , Original.Option.Coordinate.X);
				Difference.Y = App.Calculate.Sub(Coordinate.Y , Original.Option.Coordinate.Y);
				const Direction = this.#Direction(Difference);
				if(App.Verify.Eq(Direction , 0)) Original.Move.Top(App.$(Original.Element[Index]) , Difference , Event);
				if(App.Verify.Eq(Direction , 1)) Original.Move.Right(App.$(Original.Element[Index]) , Difference , Event);
				if(App.Verify.Eq(Direction , 2)) Original.Move.Bottom(App.$(Original.Element[Index]) , Difference , Event);
				if(App.Verify.Eq(Direction , 3)) Original.Move.Left(App.$(Original.Element[Index]) , Difference , Event);
				Original.Move.Drag(App.$(Original.Element[Index]) , Difference , Event);
			});
			Original.Element[Index].addEventListener('touchend' , Event => {
				if(Original.Prevent && Event.cancelable) Event.preventDefault();
				const Coordinate = {};
				Coordinate.X = window.Math.floor(Event.changedTouches[0].pageX);
				Coordinate.Y = window.Math.floor(Event.changedTouches[0].pageY);
				if(!Original.Option.Double) Original.Up(App.$(Original.Element[Index]) , Original.Option.Coordinate , Event);
				const Difference = {};
				Difference.X = App.Calculate.Sub(Coordinate.X , Original.Option.Coordinate.X);
				Difference.Y = App.Calculate.Sub(Coordinate.Y , Original.Option.Coordinate.Y);
				if(App.Verify.Elt(window.Math.abs(Difference.X) , 10) && App.Verify.Elt(window.Math.abs(Difference.Y) , 10)){
					Original.Option.Interval = App.Calculate.Sub(App.Date.Microtime() , Original.Option.Interval);
					if(App.Verify.Gt(Original.Option.Interval , 500)){
						Original.Hold(App.$(Original.Element[Index]) , Event);
					}else if(Original.Option.Double){
						Original.Option.Double = false;
						clearTimeout(Original.Option.Timer);
						Original.Double(App.$(Original.Element[Index]) , Event);
					}else{
						Original.Option.Double = true;
						App.Aux.Sleep(0.2).then(Timer => {
							if(Original.Option.Double){
								Original.Option.Double = false;
								Original.Option.Timer = Timer;
								Original.Tap(App.$(Original.Element[Index]) , Event);
							}
						});
					}
				}else{
					const Direction = this.#Direction(Difference);
					if(App.Verify.Eq(Direction , 0)) Original.Top(App.$(Original.Element[Index]) , Event);
					if(App.Verify.Eq(Direction , 1)) Original.Right(App.$(Original.Element[Index]) , Event);
					if(App.Verify.Eq(Direction , 2)) Original.Bottom(App.$(Original.Element[Index]) , Event);
					if(App.Verify.Eq(Direction , 3)) Original.Left(App.$(Original.Element[Index]) , Event);
				}
			});
		});
	}
	Auto(Original){
		if(App.Verify.Wap()) return this.Touch(Original);
		return this.Mouse(Original);
	}
	Tap(Element , Callable , Original){
		if(!App.Verify.Object(Original)) Original = {};
		return this.Auto({
			Element : Element ,
			Unbind : App.Check(Original.Unbind , 'Boolean' , true) ,
			Prevent : App.Check(Original.Prevent , 'Boolean' , true) ,
			Tap(Target , Event){
				let Which = Event.which;
				if(App.Verify.Wap()) Which = App.Calculate.Add(Which , 1);
				if(App.Verify.Eq(Which , 1)) Callable(Target , Event);
			} ,
		});
	}
	Double(Element , Callable , Original){
		if(!App.Verify.Object(Original)) Original = {};
		return this.Auto({
			Element : Element ,
			Unbind : App.Check(Original.Unbind , 'Boolean' , true) ,
			Prevent : App.Check(Original.Prevent , 'Boolean' , true) ,
			Double(Target , Event){
				let Which = Event.which;
				if(App.Verify.Wap()) Which = App.Calculate.Add(Which , 1);
				if(App.Verify.Eq(Which , 1)) Callable(Target , Event);
			} ,
		});
	}
	Hold(Element , Callable , Original){
		if(!App.Verify.Object(Original)) Original = {};
		return this.Auto({
			Element : Element ,
			Unbind : App.Check(Original.Unbind , 'Boolean' , true) ,
			Prevent : App.Check(Original.Prevent , 'Boolean' , true) ,
			Hold(Target , Event){
				let Which = Event.which;
				if(App.Verify.Wap()) Which = App.Calculate.Add(Which , 1);
				if(App.Verify.Eq(Which , 1)) Callable(Target , Event);
			} ,
		});
	}
	Context(Element , Callable , Original){
		if(!App.Verify.Object(Original)) Original = {};
		Original.Timer = 0;
		return this.Auto({
			Element : Element ,
			Unbind : App.Check(Original.Unbind , 'Boolean' , true) ,
			Prevent : App.Check(Original.Prevent , 'Boolean' , true) ,
			Down(Target , Coordinate , Event){
				if(App.Verify.Eq(Event.which , 3)) document.oncontextmenu = () => {
					clearTimeout(Original.Timer);
					Callable(Target , Event);
					return false;
				};
			} ,
			Up(Target , Coordinate , Event){
				if(App.Verify.Eq(Event.which , 3)) App.Aux.Sleep(0.01).then(Timer => {
					Original.Timer = Timer;
					document.oncontextmenu = () => {
						return true;
					};
				});
			} ,
		});
	}
	Hover(Element , Callable){
		Element.hover(Event => {
			if(App.Verify.Function(Callable)) return Callable(App.$(Event.currentTarget) , true);
			if(App.Verify.Require(Callable.In , 'function')) return Callable.In(App.$(Event.currentTarget));
			return false;
		} , Event => {
			if(App.Verify.Function(Callable)) return Callable(App.$(Event.currentTarget) , false);
			if(App.Verify.Require(Callable.Out , 'function')) return Callable.Out(App.$(Event.currentTarget));
			return false;
		});
	}
	Bind(Element , Callable , Method){
		Element.bind(App.Check(Method , 'String' , 'click') , Event => {
			if(App.Verify.Function(Callable)) return Callable(App.$(Event.currentTarget) , Event);
			return false;
		});
	}
	Input(Element , Callable){
		return this.Bind(Element , Callable , 'input');
	}
	Change(Element , Callable){
		return this.Bind(Element , Callable , 'change');
	}
	Focus(Element , Callable){
		return this.Bind(Element , Callable , 'focus');
	}
	Blur(Element , Callable){
		return this.Bind(Element , Callable , 'blur');
	}
	Press(Element , Callable , Method){
		return this.Bind(Element , Callable , App.Check(Method , 'String' , 'keypress'));
	}
	Quick(Element , Callable , Original){
		if(!App.Verify.Object(Original)) Original = {};
		Original.Code = App.Check(Original.Code , 'Number' , -1);
		Original.Alt = App.Check(Original.Alt , 'Boolean' , false);
		Original.Ctrl = App.Check(Original.Ctrl , 'Boolean' , false);
		Original.Shift = App.Check(Original.Shift , 'Boolean' , false);
		this.Press(Element , (Target , Event) => {
			if(App.Verify.Egt(Original.Code , 0) && App.Verify.Confirm(Original.Alt , Event.altKey) && App.Verify.Confirm(Original.Ctrl , Event.ctrlKey) && App.Verify.Confirm(Original.Shift , Event.shiftKey) && App.Verify.Eq(Original.Code , Event.keyCode)) Callable(Target);
		});
	}
}