export default new class {
	Image = class {
		constructor(){
			App.Each.Of(App.Target.Magic.find('img') , Item => {
				const Image = App.$(Item);
				if(!App.Verify.String(Image.attr('data-src'))) return true;
				this.#Load(Image , 1);
			});
		}
		#Load(Image , Count){
			App.Aux.Sleep(1 , true).then(() => {
				App.Image.Load(Image.attr('data-src')).then(Status => {
					if(Status){
						Image.attr('src' , Image.attr('data-src')).removeAttr('data-src');
						if(!App.Verify.String(Image.attr('data-open')) || !App.Verify.Eq(Image.attr('data-open') , 2)) App.Event.Bind(Image , Self => {
							App.Jump(Self.attr('src') , {
								Forward : 1 ,
							});
						});
					}else{
						Count = App.Calculate.Add(Count , 1);
						if(App.Verify.Egt(Count , 5)){
							Image.parent().addClass('Noimage');
							Image.remove();
						}else{
							this.#Load(Image , Count);
						}
					}
				}).catch(() => {
					Count = App.Calculate.Add(Count , 1);
					if(App.Verify.Egt(Count , 5)){
						Image.parent().addClass('Noimage');
						Image.remove();
					}else{
						this.#Load(Image , Count);
					}
				});
			});
		}
	}
	Language(Option){
		return App.Check(App.Language[App.String.Concat('L_' , App.String.Pad(Option , 4 , 0).Start)] , 'String' , '');
	}
	async Lang(Original , Implement){
		if(!App.Verify.Null(Original) && !App.Verify.Confirm(App.Const.Language , Original)){
			App.Const.Language = Original;
			await App.Cache.Local.Set(App.Const.Prefix.Language , App.Const.Language);
		}
		if(Implement) App.Language = await App.Require.Json(App.Const.Language);
	}
	async Login(Original){
		App.Const.Validate = true;
		App.Const.Valition = true;
		App.Const.User = Original;
		App.Const.Secret = App.Const.User.Secret;
		await this.Lang(App.Const.User.Language , true);
		await App.Cache.Local.Set(App.Const.Prefix.Secret , App.Const.User.Secret);
		delete App.Const.User.Secret , App.Const.User.Language;
		App.Const.Invitation = App.String.Concat(App.Const.Domain , '/' , App.Const.User.Invite);
	}
	Email(Objective){
		App.Event.Input(Objective.find('> .Container.Label:nth-child(3) > input[name="Captcha"]') , Self => {
			const Value = Self.val();
			if(App.Verify.Gt(App.Length(Value) , 4) || !App.Verify.PositiveInteger(Value)) Self.val(App.String.Substr(Value , 0 , App.Calculate.Sub(App.Length(Value) , 1)));
			if(App.Verify.Length(Self.val() , 4)){
				Objective.parent().parent().find('> button:nth-child(2)').removeClass('Activate');
			}else{
				Objective.parent().parent().find('> button:nth-child(2)').addClass('Activate');
			}
		});
		App.Event.Bind(Objective.find('> .Container.Label:nth-child(3) > button') , Self => {
			if(Self.hasClass('Activate')) return false;
			const Email = Objective.find('> .Container.Label:nth-child(2) > input[name="Email"]').val();
			if(!App.Verify.Email(Email)) return this.Layer.Error(4002);
			App.Ajax.Email.Send(Email , () => {
				this.Layer.Success(4000 , () => {
					let Count = 60;
					Self.attr('data-language' , Count).addClass('Activate');
					const Timer = setInterval(() => {
						Count = App.Calculate.Sub(Count , 1);
						Self.attr('data-language' , Count);
						if(App.Verify.Eq(Count , 0)){
							clearInterval(Timer);
							Self.attr('data-language' , this.Language(6077)).removeClass('Activate');
						}
					} , 1000);
				});
			});
		});
	}
	Wallet(Objective , Callable){
		App.Event.Bind(Objective.find('> .Container.Label:nth-child(1) > button') , Self => {
			App.Layer.Loading(this.Language(7011)).then(Loading => {
				App.Layer.Render({
					TitleClose : false ,
					Area : [App.Number.Convert(App.Number.Fixed(App.Target.Magic.outerWidth() , 0)) , App.Number.Convert(App.Number.Fixed(App.Target.Magic.outerHeight() , 0))] ,
					Shade : [] ,
					ShadeClose : false ,
					Skin : 'Wallet' ,
					Content : [App.String.Concat(App.Const.Domain , '/Wallet.html') , false] ,
				}).then(Layer => {
					let Boolean = true;
					addEventListener('message' , Event => {
						try{
							if(App.Verify.Length(Loading.Element.Mask , 1)) App.Layer.Close(Loading.Uniqid);
							const Data = App.String.Json(Event.data);
							if(App.Verify.Require(Data.Method , 'string')){
								if(App.Verify.Confirm(Data.Method , 'close')){
									App.Layer.Close(Layer.Uniqid);
								}else if(App.Verify.Confirm(Data.Method , 'connect')){
									if(App.Verify.Require(Data.Address , 'string') && Boolean && App.Verify.Function(Callable)){
										Boolean = false
										Callable(Data.Address);
									}
								}
							}
						}catch{}
					} , false);
				});
			});
		});
	}
	Twitter(){
		App.Ajax.Twitter.Authorization(Response => {
			location.href = Response;
		});
	}
	Telegram(){
		
	}
	Scroll(Callable){
		App.Event.Bind(App.Target.Frame , Self => {
			Callable(Self[0].scrollTop , Self);
		} , 'scroll');
	}
	Roll(){
		return App.Array.Join([
			'Scroll' ,
			(App.Const.Mobile ? 'Mobile' : '') ,
		] , ' ');
	}
	Back(Objective){
		App.Event.Bind(Objective , Self => {
			App.Jump(-1 , {
				Forward : 5 ,
			});
		});
	}
	Label(Objective){
		App.Event.Input(Objective , Self => {
			if(App.Verify.Empty(Self.val())){
				Self.parent().removeClass('Input');
			}else{
				Self.parent().addClass('Input');
			}
		});
	}
	Detail(Objective , Forward){
		App.Event.Bind(Objective , async Self => {
			const Link = await App.Aux.Switch.Make(Forward , {
				Protocol : false ,
				Query : {
					Id : Self.attr('data-id') ,
				} ,
			});
			if(App.Verify.Confirm(App.Const.Link , 'Home') && App.Verify.Empty(App.Const.User)) return App.Module.Login(Link);
			return App.Jump(Link);
		});
	}
	Copy(Original){
		if(App.Aux.Copy(Original)) return this.Layer.Success(9006);
		return this.Layer.Error(9007);
	}
	Friend = new class {
		Price(Original , Length){
			if(App.Verify.Confirm(Original , '-')) return Original;
			if(!App.Verify.Number(Length)) Length = 3;
			if(App.Verify.Lt(App.Calculate.Mul(Original , 10000) , 1)){
				if(App.Verify.In(Original , 'e')) Original = App.String.Replace(App.Number.Fixed(Original , 20) , /\.?0+$/ , '');
				const Match = App.String.Convert(Original).match(/0\.0+/);
				if(Match){
					Length = App.Length(Match[0]);
					const Zero = App.Calculate.Sub(Length , 2);
					return `$0.0{${Zero}}${App.String.Substr(Original , Length , App.Calculate.Add(Length , 3))}`;
				}
				return `$${App.Number.Fixed(Original , Length)}`;
			}
			if(App.Verify.Lt(Original , 10000)) return `$${App.Number.Fixed(Original , Length)}`;
			Original = App.Calculate.Div(Original , 1000);
			if(App.Verify.Lt(Original , 10000)) return `$${App.Number.Fixed(Original , Length)}K`;
			Original = App.Calculate.Div(Original , 1000);
			if(App.Verify.Lt(Original , 10000)) return `$${App.Number.Fixed(Original , Length)}M`;
			return `$${App.Number.Fixed(App.Calculate.Div(Original , 1000) , Length)}B`;
		}
		Background(Original){
			if(App.Verify.Gt(Original , 0)) return 'Green';
			if(App.Verify.Lt(Original , 0)) return 'Red';
			return 'Gray';
		}
		Percent(Original , Length){
			if(App.Verify.Confirm(Original , '-')) return Original;
			if(!App.Verify.Number(Length)) Length = 3;
			return `${App.Number.Precision(Original , Length)}%`;
		}
		Date(Original , Mat){
			return App.Date.Format(Original , Mat , true);
		}
	}
	Ico(Original){
		const Option = {};
		Option['private token sale'] = 8100;
		Option['extended seed'] = 8101;
		Option['pre-series a'] = 8102;
		Option['pre-seed'] = 8103;
		Option['pre-sale'] = 8104;
		Option['seed'] = 8105;
		Option['undisclosed'] = 8106;
		Option['strategic'] = 8107;
		Option['private'] = 8108;
		Option['series a'] = 8109;
		Option['series b'] = 8110;
		Option['series c'] = 8111;
		Option['series d'] = 8112;
		Option['ieo'] = 8113;
		Option['ido'] = 8114;
		Option['angel'] = 8115;
		Option['ico'] = 8116;
		return this.Language(Option[App.String.Lower(Original)]);
	}
	Layer = new class {
		Notify(Language){
			return App.Layer.Alert(App.Function.Language(Language) , 3);
		}
		Error(Language , Callable){
			App.Module.Modal(App.Target.Magic , [{
				Class : 'Error' ,
				Language : null ,
				Content : App.Function.Language(Language) ,
			}] , Objective => {
				Objective.find('> .Modal.Error').removeClass('Hidden');
				Objective.find('> .Mask').removeClass('Hidden');
				App.Aux.Sleep(2).then(() => {
					Objective.find('> .Modal.Error').remove();
					Objective.find('> .Mask').remove();
					if(App.Verify.Function(Callable)) Callable();
				});
			});
		}
		Success(Language , Callable){
			App.Module.Modal(App.Target.Magic , [{
				Class : 'Success' ,
				Language : null ,
				Content : App.Function.Language(Language) ,
			}] , Objective => {
				Objective.find('> .Modal.Success').removeClass('Hidden');
				Objective.find('> .Mask').removeClass('Hidden');
				App.Aux.Sleep(1).then(() => {
					Objective.find('> .Modal.Success').remove();
					Objective.find('> .Mask').remove();
					if(App.Verify.Function(Callable)) Callable();
				});
			});
		}
	}
	Request = new class {
		Loading(Language){
			App.Layer.Loading(App.Function.Language(Language));
			return this;
		}
		Get(Option){
			return this.#Ajax('Get' , Option);
		}
		Post(Option){
			return this.#Ajax('Post' , Option);
		}
		Path(Original){
			return App.String.Replace(App.String.Concat('Platform.' , Original) , '.' , '/');
		}
		async #Ajax(Method , Option){
			return await App.Request[Method](await this.#Make(Method , Option));
		}
		async #Make(Method , Option){
			if(App.Verify.Empty(App.Const.Secret)) App.Const.Secret = await App.Ajax.Secret.Create();
			return await this.#Structure(Method , Option);
		}
		async #Structure(Method , Option){
			let Array = [];
			if(App.Verify.Array(Option)){
				App.Each.Waiting(Option , async Item => {
					Array = App.Array.Concat(Array , await this.#Structure(Method , Item));
					return true;
				});
			}else if(App.Verify.Object(Option) && App.Verify.Require(Option.Url , 'string')){
				const Parameter = (App.Verify.Confirm(Method , 'Post') ? Option.Data : Option.Query);
				const Signatrue = await App.Cypher.Md5(App.String.Concat((await App.Cypher.Md5(App.String.Replace(App.Object.Json((App.Verify.Object(Parameter) ? Parameter : {})) , ' ' , ''))) , '.' , App.Const.Secret));
				App.Array.Push(Array , App.Object.Assign(Option , {
					Url : this.Path(Option.Url) ,
					Timeout : 5 ,
					Header : {
						'Magic-Secret' : App.Const.Secret ,
						'Magic-Signatrue' : Signatrue ,
						'Magic-Language' : App.Const.Language ,
					} ,
					Before : Xhr => {
						if(App.Verify.Object(Option.Header)) App.Each.In(Option.Header , (Item , Index) => {
							if(!App.Verify.Undefined(Item)) Xhr.setRequestHeader(Index , Item);
							return true;
						});
					} ,
					Error : () => {
						this.#Reload(Method , Option);
					} ,
					Success : async Response => {
						if(App.Verify.Eq(Response.Code , 508)){
							App.Const.Secret = Response.Data;
							await App.Cache.Local.Set(App.Const.Prefix.Secret , Response.Data);
							this[Method](Option);
						}else if(App.Verify.Eq(Response.Code , 507)){
							App.Const.Secret = '';
							await App.Cache.Local.Delete(App.Const.Prefix.Secret);
							App.Jump('Login' , {
								Remove : App.Target.Magic.find('> .Frame').attr('id') ,
							});
						}else if(App.Verify.Eq(Response.Code , 200)){
							if(App.Verify.Function(Option.Success)) Option.Success(Response.Data);
						}else if(App.Verify.Function(Option.Stop) && App.Verify.Gt(Response.Code , 999)){
							Option.Stop(Response.Code);
						}else if(App.Verify.Eq(Option.Count , 10)){
							if(App.Verify.Function(Option.Fail)){
								Option.Fail(Response.Code);
							}else if(App.Verify.Gt(Response.Code , 999)){
								App.Function.Layer.Error(Response.Code);
							}
						}else{
							this.#Reload(Method , Option);
						}
					} ,
				}));
			}
			return Array;
		}
		#Reload(Method , Option){
			if(!App.Verify.Number(Option.Count)) Option.Count = 0;
			Option.Count = App.Calculate.Add(Option.Count , 1);
			if(App.Verify.Eq(Option.Count , 11)){
				// App.Function.Layer.Notify(9999);
			}else{
				App.Aux.Sleep(1).then(() => {
					this[Method](Option);
				});
			}
		}
	}
}