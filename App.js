export default new class {
	constructor(){
		this.#Consume.#Welcome.#Require;
	}
	#Runtime = 0
	#Location = window.location
	#Cache = new Map()
	#Vendor = new class {
		Group(Method){
			let Array = [];
			App.Each.Of(Method , Item => {
				Array = App.Array.Concat(Array , this[Item]);
				return true;
			});
			return Array;
		}
		get Element(){
			return ['Icon' , 'Layer' , 'Scroll'];
		}
		get Extend(){
			return ['Beautify' , 'Crypto' , 'Echart' , 'Html2Canvas' , 'Pinyin' , 'Qrcode'];
		}
		get Module(){
			return ['Array' , 'Calculate' , 'Date' , 'Each' , 'Jquery' , 'Number' , 'Object' , 'Require' , 'String' , 'Verify'];
		}
		get Unit(){
			return ['Aux' , 'Cache' , 'Cypher' , 'Db' , 'Event' , 'Fa' , 'Image' , 'Request' , 'Socket'];
		}
	}
	get #Consume(){
		if(this.#Runtime > 0) return App.String.Concat(App.Calculate.Div(App.Calculate.Sub((new window.Date()).getTime() , this.#Runtime) , 1000) , 's');
		this.#Runtime = new window.Date().getTime();
		return this;
	}
	get #Welcome(){
		const Style = document.createElement('style');
		Style.innerHTML = `body{font-size:14px;font-family:-apple-system-font,Microsoft YaHei,Arial,sans-serif;font-weight:400;line-height:24px;color:#393d49;background-color:#fff;margin:0;padding:0;position:fixed;top:0;left:0;right:0;bottom:0;z-index:1;overflow:hidden;}body > #Welcome{position:absolute;top:0;left:0;right:0;bottom:0;z-index:1;background-color:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;}body > #Welcome > .Load{position:relative;font-size:30px;font-weight:800;letter-spacing:20px;text-indent:20px;text-transform:uppercase;padding:10px;overflow:hidden;}body > #Welcome > .Load > span{color:#fff;mix-blend-mode:difference;}body > #Welcome > .Load:before{content:'';position:absolute;top:0;left:0;width:50px;height:100%;background-color:#000;animation:loading 5s linear infinite;}@keyframes loading{0%{left:0;}50%{left:calc(100% - 50px);}100%{left:0;}}`;
		document.getElementsByTagName('head').item(0).appendChild(Style);
		const Section = document.createElement('section');
		Section.id = 'Welcome';
		Section.innerHTML = `<div class="Load"><span>Loading</span></div>`;
		document.getElementsByTagName('body').item(0).appendChild(Section);
		return this;
	}
	get #Require(){
		Promise.all(this.#Vendor.Module.map(Item => import(`./Module/${Item}.js`).then(Module => {
			this.#Cache.set(Item , Module.default);
		}))).then(() => {
			this.#Watch.#Domain.#Config;
		});
	}
	get #Watch(){
		window.App = this.#System.Proxy({} , (Index , Target) => {
			if(window.Object.is('$' , Index)) Index = 'Jquery';
			if(window.Object.is('Config' , Index) || this.#Vendor.Module.includes(Index)) return this.#Cache.get(Index);
			if(Reflect.has(this.#System , Index)) return this.#System[Index];
			if(App.Verify.In(this.#Vendor.Group(['Element' , 'Extend' , 'Unit']) , Index)) return this.#Chain(Index);
			return Target[Index];
		} , (Index , Value , Target) => {
			if(!App.Verify.In(App.Array.Concat(['$' , 'Config'] , this.#Vendor.Group(['Element' , 'Extend' , 'Module' , 'Unit'])) , Index)) Target[Index] = Value;
			return true;
		});
		return this;
	}
	#Chain(...Array){
		return App.Proxy((...Parameter) => {
			const [Class , ...Callable] = Array;
			const Path = (App.Verify.In(this.#Vendor.Unit , Class) ? 'Unit' : (App.Verify.In(this.#Vendor.Element , Class) ? 'Element' : 'Extend'));
			return App.Require.Js(`Vendor.${Path}.${Class}`).then(Module => {
				this.#Cache.set(Class , Module.default);
				return Module.default;
			}).then(Module => {
				if(App.Verify.Length(Callable , 0)){
					if(App.Verify.Match(App.String.Convert(Module) , /^class\s/)) return (new Module(...Parameter));
					if(Module instanceof Function && !App.Verify.In(this.#Vendor.Extend , Class)) return Module(...Parameter);
					return Module;
				}
				const Length = App.Calculate.Sub(App.Length(Callable) , 1);
				if(App.Verify.Gt(Length , 0)) App.Each.Loop(0 , Length).Add(Index => {
					if(Reflect.has(Module , Callable[Index])) Module = Module[Callable[Index]];
					return true;
				});
				const Calltion = Module[Callable[Length]];
				if(App.Verify.Match(App.String.Convert(Calltion) , /^class\s/)) return (new Module[Callable[Length]](...Parameter));
				if(Calltion instanceof Function) return Module[Callable[Length]](...Parameter);
				return Module[Callable[Length]];
			});
		} , Index => {
			return this.#Chain(...Array , Index);
		});
	}
	get #Domain(){
		const Option = {};
		Option.Remote = false;
		Option.Network = this.#Location.origin;
		App.Each.Of(document.querySelectorAll('script') , Item => {
			if(App.Verify.In(Item.src , 'Vendor/App.js')){
				const Url = new window.URL(Item.src);
				Option.Remote = (App.Verify.Confirm(Url.host , this.#Location.host) ? false : true);
				Option.Network = Url.origin;
				return false;
			}
			return true;
		});
		this.#Cache.set('Config' , Option);
		return this;
	}
	get #Config(){
		Promise.all([
			App.Require.Json('Vendor.App') ,
			App.Require.Css('Vendor.App') ,
		]).then(Module => {
			const Configure = App.Check(Module[0][this.#Location.host] , 'Object' , {});
			Configure.Debug = App.Check(Configure.Debug , 'Boolean' , true);
			Configure.Description = App.Check(Configure.Description , 'String' , '');
			Configure.Entrance = App.Check(Configure.Entrance , 'String' , 'Home');
			Configure.Favicon = App.Check(Configure.Favicon , 'Boolean' , true);
			Configure.Forward = App.Check(Configure.Forward , 'PositiveInteger' , 3);
			Configure.Js = App.Check(Configure.Js , 'Array' , []);
			Configure.Json = App.Check(Configure.Json , 'Array' , []);
			Configure.Keyword = App.Check(Configure.Keyword , 'String' , '');
			Configure.Program = App.Check(Configure.Program , 'Require' , 'Default' , 'string');
			Configure.Title = App.Check(Configure.Title , 'String' , '');
			Configure.Unify = App.Check(Configure.Unify , 'String' , 'App');
			this.#Cache.set('Config' , App.Object.Assign(App.Config , Configure));
			this.#Setting.#Switch.#Route.#Preload;
		});
	}
	get #Setting(){
		App.Target = {};
		App.Target.Head = App.$('head');
		App.Target.Body = App.$('body');
		if(!App.Verify.Empty(App.Config.Title)){
			if(App.Verify.Length(App.Target.Head.find('> title') , 0)) App.Target.Head.append('<title></title>');
			App.Target.Title = App.Target.Head.find('> title');
			App.Target.Title.text(App.Config.Title);
		}
		if(!App.Verify.Empty(App.Config.Keyword)){
			if(App.Verify.Length(App.Target.Head.find('> meta[name="keywords"]') , 0)) App.Target.Head.append('<meta name="keywords" content="">');
			App.Target.Keyword = App.Target.Head.find('> meta[name="keywords"]');
			App.Target.Keyword.attr('content' , App.Config.Keyword);
		}
		if(!App.Verify.Empty(App.Config.Description)){
			if(App.Verify.Length(App.Target.Head.find('> meta[name="description"]') , 0)) App.Target.Head.append('<meta name="description" content="">');
			App.Target.Description = App.Target.Head.find('> meta[name="description"]');
			App.Target.Description.attr('content' , App.Config.Description);
		}
		if(!App.Config.Favicon){
			if(App.Verify.Length(App.Target.Head.find('> link[rel="icon"]') , 0)) App.Target.Head.append('<link rel="icon" type="image/png" sizes="64x64" />');
			App.Target.Favicon = App.Target.Head.find('> link[rel="icon"]');
			App.Target.Favicon.attr('href' , `/Image/${App.Config.Program}.ico`);
		}
		if(App.Verify.Length(App.Target.Body.find('> section[id="Magic"]') , 0)) App.Target.Body.append('<section id="Magic" class="Hidden"></section>');
		App.Target.Magic = App.Target.Body.find('> section[id="Magic"]');
		return this;
	}
	get #Switch(){
		if(Reflect.has(window , 'onhashchange') && (App.Verify.Undefined(document.documentMode) || App.Verify.Eq(document.documentMode , 8))){
			App.$(window).bind('hashchange' , () => {
				this.#Runtime = App.Date.Microtime();
				this.#Location = window.location;
				this.#Route.#Lunch;
			});
		}else{
			setInterval(() => {
				if(!App.Verify.Confirm(this.#Location.hash , window.location.hash)){
					this.#Runtime = App.Date.Microtime();
					this.#Location = window.location;
					this.#Route.#Lunch;
				}
			} , 100);
		}
		return this;
	}
	get #Route(){
		this.#Cache.set('Config' , App.Object.Assign(App.Config , {
			Search : (App.Verify.Empty(this.#Location.search) ? {} : App.String.Url(App.String.Substr(this.#Location.search , 1))) ,
			Query : (App.Verify.In(this.#Location.hash , '?') ? App.String.Url(App.String.Substr(this.#Location.hash , App.Calculate.Add(App.String.Find.Start(this.#Location.hash , '?') , 1))) : {}) ,
			Link : (App.Verify.Empty(this.#Location.hash) ? [] : App.String.Split(App.String.Substr(this.#Location.hash , 1 , App.String.Find.Start(this.#Location.hash , '?')) , '.')) ,
		}));
		return this;
	}
	get #Preload(){
		const Require = [App.Require.Css('App')];
		let Config = App.Config;
		if(!App.Verify.Empty(Config.Json)) App.Array.Push(Require , App.Require.Json(Config.Json).then(Module => {
			App.Each.In(Module , Item => {
				Config = App.Object.Assign(Config , Item);
				return true;
			});
			return true;
		}));
		if(!App.Verify.Empty(Config.Js)) App.Array.Push(Require , App.Require.Js(Config.Js).then(Module => {
			App.Each.In((App.Verify.Length(Module , 1) ? [Module] : Module) , (Item , Index) => {
				if(App.Verify.Length(Module , 1)) Index = Config.Js[0];
				if(App.Verify.Match(App.String.Convert(Item.default) , /^Class\s/)){
					App[Index] = (new Item.default());
				}else if(Item.default instanceof Function){
					App[Index] = Item.default();
				}else{
					App[Index] = Item.default;
				}
				return true;
			});
			return true;
		}));
		Promise.all(Require).then(() => {
			this.#Cache.set('Config' , Config);
			this.#Lunch;
		});
	}
	get #Lunch(){
		if(App.Verify.Empty(App.Config.Link) && App.Verify.Eq(App.Config.Forward , 3)) return App.Jump(App.Config.Entrance);
		App.Require.Js((App.Verify.Empty(App.Config.Unify) ? App.Array.Join(App.Config.Link , '.') : App.Config.Unify)).then(Module => {
			if(App.Verify.Match(App.String.Convert(Module.default) , /^class\s/)) return (new Module.default());
			if(Module.default instanceof Function) return Module.default();
			return Module.default;
		}).catch(Error => {
			App.Print.Error(Error);
		}).then(() => {
			if(App.Config.Debug) App.Print.Warn(this.#Consume , this.#Cache , App);
			App.Target.Magic.removeClass('Hidden');
		});
	}
	#System = new class {
		Proxy(Data , Getable , Setable , Option){
			if(!(typeof Option === 'object')) Option = {};
			return new Proxy(Data , Object.assign(Option , {
				get : (Target , Index) => {
					if(typeof Getable === 'function') return Getable(Index , Target);
					return Target[Index];
				} ,
				set : (Target , Index , Value) => {
					if(typeof Setable === 'function') return Setable(Index , Value , Target);
					Target[Index] = Value;
					return true;
				} ,
			}));
		}
		Print = new class {
			Log(...Data){
				console.log(...Data);
			}
			Warn(...Data){
				console.warn(...Data);
			}
			Error(...Data){
				console.error(...Data);
			}
		}
		Length(Data){
			if(typeof Data === 'undefined') return 0;
			if(typeof Data.length === 'number') return Data.length;
			if(typeof Data === 'object') return this.Length(App.Object.Key(Data));
			return this.Length(App.String.Convert(Data));
		}
		Jump(Url , Option){
			// App.Target.Magic.addClass('Hidden');
			if(!App.Verify.Object(Option)) Option = {};
			if(!App.Verify.Number(Option.Forward) || !App.Verify.In([1 , 2 , 3 , 4 , 5] , Option.Forward)) Option.Forward = (App.Config.Forward || 4);
			if(App.Verify.String(Option.Remove)) Option.Remove = [Option.Remove];
			if(App.Verify.Array(Option.Remove)) App.Each.Of(Option.Remove , Value => {
				App.$(App.String.Concat('#' , Value)).remove();
				return true;
			});
			if(App.Verify.Eq(Option.Forward , 1)) return App.Aux.Switch.Open(Url , Option);
			if(App.Verify.Eq(Option.Forward , 2)) return App.Aux.Switch.Location(Url , Option);
			if(App.Verify.Eq(Option.Forward , 3)) return App.Aux.Switch.Hash(Url , Option);
			if(App.Verify.Eq(Option.Forward , 4)) return App.Aux.Switch.Page(Url , Option);
			if(App.Verify.Eq(Option.Forward , 5)) return App.Aux.Switch.Back(Url);
		}
		Check(Original , Validate , Default , Parameter){
			if(App.Verify.Undefined(Default)) Default = '';
			if(!App.Verify.Undefined(Parameter) && !App.Verify.Array(Parameter)) Parameter = [Parameter];
			if(App.Verify.Require(Parameter , 'array')){
				if(App.Verify.String(Validate)){
					if(App.Verify.Confirm(Validate , 'In')){
						if(!App.Verify[Validate](Parameter , Original)) return Default;
					}else{
						if(!App.Verify[Validate](Original , ...Parameter)) return Default;
					}
				}else if(App.Verify.Array(Validate)){
					let Boolean = true;
					App.Each.In(Validate , (Item , Index) => {
						if(App.Verify.Empty(Parameter[Index])){
							Boolean = App.Verify[Item](Original);
						}else{
							if(App.Verify.Confirm(Item , 'In')){
								Boolean = App.Verify[Item](Parameter[Index] , Original);
							}else{
								Boolean = App.Verify[Item](Original , ...Parameter[Index]);
							}
						}
						return Boolean
					});
					if(!Boolean) return Default;
				}
			}else if(App.Verify.String(Validate)){
				if(!App.Verify[Validate](Original)) return Default;
			}else if(App.Verify.Array(Validate)){
				let Boolean = true;
				App.Each.Of(Validate , Item => {
					Boolean = App.Verify[Item](Original);
					return Boolean;
				});
				if(!Boolean) return Default;
			}
			return Original;
		}
	}
}