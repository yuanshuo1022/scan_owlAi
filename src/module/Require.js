export default new class {
	#Cache = new Map();
	#Resolve(Option){
		if(App.Verify.Empty(Option.Data)) return Promise.resolve((App.Verify.Length(Option.Module , 1) ? App.Object.Value(Option.Module)[0] : Option.Module));
		return Promise.all(Option.Data).then(Resolve => {
			App.Each.Of(Resolve , Value => {
				const [Index , Item] = Value;
				Option.Module[Index] = this.#Cache.get(Item);
				return true;
			});
			return (App.Verify.Length(Option.Module , 1) ? App.Object.Value(Option.Module)[0] : Option.Module);
		});
	}
	Make(Original , Method){
		const Option = {};
		App.Each.Of((App.Verify.Array(Original) ? Original : [Original]) , Item => {
			if(App.Verify.In(['https://' , 'http://'] , Item)){
				const Url = new URL(Item);
				Option[App.String.Replace(App.String.Substr(Url.pathname , 1 , App.String.Find.Start(Url.pathname , '.')) , '/' , '')] = Item;
			}else{
				let Link = '';
				if(App.Verify.In(App.String.Lower(Item) , 'vendor')){
					Link = App.String.Concat(Link , App.Config.Network);
				}else{
					Link = App.String.Concat(Link , location.origin);
					if(App.Verify.Require(App.Config.Program , 'string')){
						Link = App.String.Concat(Link , '/' , App.String.Capitalize(App.String.Lower(App.Config.Program)));
						if(App.Verify.Require(Method , 'string')) Link = App.String.Concat(Link , '/' , App.String.Capitalize(App.String.Lower(Method)));
					}
				}
				App.Each.Of(App.String.Split(App.String.Replace(Item , '.' , '/') , '/') , Value => {
					Link = App.String.Concat(Link , '/' , App.String.Capitalize(App.String.Lower(Value)));
					return true;
				});
				if(App.Verify.Require(Method , 'string')) Link = App.String.Concat(Link , '.' , App.String.Lower(Method));
				Option[Item] = Link;
			}
			return true;
		});
		return Option;
	}
	Js(Original){
		Option = {};
		Option.Data = [];
		Option.Module = {};
		App.Each.In(this.Make(Original , 'js') , (Item , Index) => {
			if(this.#Cache.has(Item)){
				Option.Module[Index] = this.#Cache.get(Item);
			}else{
				App.Array.Push(Option.Data , import(Item).then(Module => {
					this.#Cache.set(Item , Module);
					return [Index , Item];
				}));
			}
			return true;
		});
		return this.#Resolve(Option);
	}
	Json(Original){
		Option = {};
		Option.Data = [];
		Option.Module = {};
		App.Each.In(this.Make(Original , 'json') , (Item , Index) => {
			if(this.#Cache.has(Item)){
				Option.Module[Index] = this.#Cache.get(Item);
			}else{
				App.Array.Push(Option.Data , App.$.getJSON(Item).then(Module => {
					this.#Cache.set(Item , Module);
					return [Index , Item];
				}));
			}
			return true;
		});
		return this.#Resolve(Option);
	}
	Html(Original){
		Option = {};
		Option.Data = [];
		Option.Module = {};
		App.Each.In(this.Make(Original , 'html') , (Item , Index) => {
			if(this.#Cache.has(Item)){
				Option.Module[Index] = this.#Cache.get(Item);
			}else{
				App.Array.Push(Option.Data , App.$.get(Item).then(Module => {
					this.#Cache.set(Item , Module);
					return [Index , Item];
				}));
			}
			return true;
		});
		return this.#Resolve(Option);
	}
	Css(Original){
		let Accumulate = 0;
		App.Each.In(this.Make(Original , 'css') , (Item , Index) => {
			if(this.#Cache.has(Item)){
				Accumulate = App.Calculate.Add(Accumulate , 1);
			}else{
				const Link = document.createElement('link');
				Link.rel = 'stylesheet';
				Link.href = Item;
				document.getElementsByTagName('head').item(0).appendChild(Link);
				if(Link.attachEvent){
					Link.attachEvent('onload' , () => {
						Accumulate = App.Calculate.Add(Accumulate , 1);
						this.#Cache.set(Item , true);
					});
				}else{
					let Complete = false;
					const Timer = setInterval(() => {
						if(Complete){
							clearInterval(Timer);
							Accumulate = App.Calculate.Add(Accumulate , 1);
							this.#Cache.set(Item , true);
						}else if(App.Verify.Match(App.String.Lower(navigator.userAgent) , /webkit/i)){
							if(Link.sheet) Complete = true;
						}else if(Link.sheet){
							try{
								if(Link.sheet.cssRules) Complete = true;
							}catch(Error){
								if(App.Verify.Eq(Error.code , 1000)) Complete = true;
							}
						}
					} , 10);
				}
			}
			return true;
		});
		return new Promise(Resolve => {
			let Max = 1000;
			const Timer = setInterval(() => {
				Max = App.Calculate.Sub(Max , 1);
				if(App.Verify.Eq(Max , 0) || App.Verify.Length((App.Verify.Array(Original) ? Original : [Original]) , Accumulate)){
					clearInterval(Timer);
					Resolve();
				}
			} , 10);
		});
	}
}