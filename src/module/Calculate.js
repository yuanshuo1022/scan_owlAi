export default new class {
	#Power(Original){
		let Length = 0;
		App.Each.Of(Original , Item => {
			if(!App.Verify.Decimal(Item)) return true;
			const [Integer , Decimal] = App.String.Split(Item , '.');
			Length = Math.max(Length , App.Length(Decimal));
			return true;
		});
		return Math.pow(10 , Length);
	}
	Cop(...Additional){
		let Totality = undefined;
		App.Each.Of(Additional , Item => {
			Totality = (App.Verify.Undefined(Totality) ? Item : (Totality % Item));
			return true;
		});
		return Totality;
	}
	Add(...Additional){
		let Totality = undefined;
		const Power = this.#Power(Additional);
		App.Each.Of(Additional , Item => {
			const Tally = this.Mul(Item , Power);
			Totality = (App.Verify.Undefined(Totality) ? Tally : (Totality + Tally));
			return true;
		});
		return this.Div(Totality , Power);
	}
	Sub(...Additional){
		let Totality = undefined;
		const Power = this.#Power(Additional);
		App.Each.Of(Additional , Item => {
			const Tally = this.Mul(Item , Power);
			Totality = (App.Verify.Undefined(Totality) ? Tally : (Totality - Tally));
			return true;
		});
		return this.Div(Totality , Power);
	}
	Mul(...Additional){
		let Totality = undefined;
		let Length = 1;
		const Power = this.#Power(Additional);
		App.Each.Of(Additional , Item => {
			Length *= Power;
			const Tally = Item * Power;
			Totality = (App.Verify.Undefined(Totality) ? Tally : (Totality * Tally));
			return true;
		});
		return this.Div(Totality , Length);
	}
	Div(...Additional){
		let Totality = undefined;
		App.Each.Of(Additional , Item => {
			Totality = (App.Verify.Undefined(Totality) ? Item : (Totality / Item));
			return true;
		});
		return Totality;
	}
}