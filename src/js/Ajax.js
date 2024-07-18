export default new class {
	Popular(Method , Callable){
		App.Function.Request.Post({
			Url : 'Flash.Popular' ,
			Data : {
				Method : Method ,
			} ,
			Header : {
				'Magic-Page' : App.Const.Page.Popular ,
			} ,
			Success : Response => {
				if(App.Verify.Empty(Response)){
					this.Popular(Callable);
				}else{
					Callable(Response);
				}
			} ,
		});
	}
	Realtime(Callable){
		App.Function.Request.Get({
			Url : 'Flash.Realtime' ,
			Header : {
				'Magic-Page' : App.Const.Page.Realtime ,
			} ,
			Success : Response => {
				if(App.Verify.Empty(Response)){
					this.Realtime(Callable);
				}else{
					Callable(Response);
				}
			} ,
		});
	}
	Recommend(Callable){
		App.Function.Request.Get({
			Url : 'Flash.Recommend' ,
			Header : {
				'Magic-Page' : App.Const.Page.Recommend ,
			} ,
			Success : Response => {
				if(App.Verify.Empty(Response)){
					this.Recommend(Callable);
				}else{
					Callable(Response);
				}
			} ,
		});
	}
	Circle(Callable){
		App.Function.Request.Get({
			Url : 'Flash.Circle' ,
			Header : {
				'Magic-Page' : App.Const.Page.Circle ,
			} ,
			Success : Response => {
				if(App.Verify.Empty(Response)){
					this.Circle(Callable);
				}else{
					Callable(Response);
				}
			} ,
		});
	}
	Bulletin(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Flash.Bulletin' ,
			Data : {
				Coin : Coin ,
			} ,
			Header : {
				'Magic-Page' : App.Const.Page.Bulletin ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Talking(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Flash.Talking' ,
			Data : {
				Coin : Coin ,
			} ,
			Header : {
				'Magic-Page' : App.Const.Page.Talking ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Detail(Flash , Callable){
		App.Function.Request.Post({
			Url : 'Flash.Detail' ,
			Data : {
				Flash : Flash ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Discussion(Callable){
		App.Function.Request.Get({
			Url : 'Program.Discussion' ,
			Header : {
				'Magic-Page' : App.Const.Page.Discussion ,
			} ,
			Success : Response => {
				if(App.Verify.Empty(Response)){
					this.Discussion(Callable);
				}else{
					Callable(Response);
				}
			} ,
		});
	}
	Position(Callable){
		App.Function.Request.Get({
			Url : 'Program.Position' ,
			Header : {
				'Magic-Page' : App.Const.Page.Position ,
			} ,
			Success : Response => {
				if(App.Verify.Empty(Response)){
					this.Position(Callable);
				}else{
					Callable(Response);
				}
			} ,
		});
	}
	Survey(Callable){
		App.Function.Request.Get({
			Url : 'Program.Survey' ,
			Header : {
				'Magic-Page' : App.Const.Page.Survey ,
			} ,
			Success : Response => {
				if(App.Verify.Empty(Response)){
					this.Survey(Callable);
				}else{
					Callable(Response);
				}
			} ,
		});
	}
	Search(Keyword , Callable){
		App.Function.Request.Post({
			Url : 'Program.Search' ,
			Header : {
				'Magic-Page' : App.Const.Page.Search ,
			} ,
			Data : {
				Keyword : Keyword ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Introduction(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Program.Introduction' ,
			Data : {
				Coin : Coin ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Price(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Program.Price' ,
			Data : {
				Coin : Coin ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Chart(Coin , Range , Callable){
		App.Function.Request.Post({
			Url : 'Program.Chart' ,
			Data : {
				Coin : Coin ,
				Range : Range ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Description(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Program.Description' ,
			Data : {
				Coin : Coin ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Holding(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Program.Holding' ,
			Data : {
				Coin : Coin ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Market(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Program.Market' ,
			Data : {
				Coin : Coin ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Faq(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Program.Faq' ,
			Data : {
				Coin : Coin ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Twitter(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Program.Twitter' ,
			Data : {
				Coin : Coin ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Whitepaper(Coin , Callable){
		App.Function.Request.Post({
			Url : 'Program.Whitepaper' ,
			Data : {
				Coin : Coin ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Visit(){
		App.Function.Request.Post({
			Url : 'Log.Visit' ,
			Data : {
				Source : App.String.Concat((App.Verify.Empty(App.Const.Tracking) ? '' : App.String.Concat(App.Const.Tracking , '-')) , App.Array.Join(App.Config.Link , '.')) ,
			} ,
		});
	}
	Language = new class {
		Tabulation(Callable){
			App.Function.Request.Get({
				Url : 'Language.Tabulation' ,
				Success : Response => {
					if(App.Verify.Empty(Response)){
						this.Tabulation(Callable);
					}else{
						Callable(Response);
					}
				} ,
			});
		}
		Switch(Id , Callable){
			App.Function.Request.Loading(7004).Post({
				Url : 'Language.Switch' ,
				Data : {
					Language : Id ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
				Stop : Response => {
					App.Function.Layer.Error(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
	}
	Feedback = new class {
		System(Suggest , Callable){
			App.Function.Request.Loading(7004).Post({
				Url : 'Feedback.System' ,
				Data : {
					Suggest : Suggest ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
		Dialog(Uuid , Score , Correct , Callable){
			App.Function.Request.Loading(7004).Post({
				Url : 'Feedback.Dialog' ,
				Data : {
					Uuid : Uuid ,
					Score : Score ,
					Correct : Correct ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
		Problem(Flash , Answer , Callable){
			App.Function.Request.Loading(7004).Post({
				Url : 'Feedback.Problem' ,
				Data : {
					Flash : Flash ,
					Answer : Answer ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
	}
	Invite(Callable){
		App.Function.Request.Get({
			Url : 'Invite.Tabulation' ,
			Header : {
				'Magic-Page' : App.Const.Page.Invite ,
			} ,
			Success : Response => {
				Callable(Response);
			} ,
		});
	}
	Integral = new class {
		Statistics(Callable){
			App.Function.Request.Get({
				Url : 'Integral.Statistics' ,
				Success : Response => {
					Callable(Response);
				} ,
			});
		}
		Tabulation(Callable){
			App.Function.Request.Get({
				Url : 'Integral.Tabulation' ,
				Header : {
					'Magic-Page' : App.Const.Page.Integral ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
			});
		}
		Ranking(Callable){
			App.Function.Request.Get({
				Url : 'Integral.Ranking' ,
				Header : {
					'Magic-Page' : App.Const.Page.Integral ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
			});
		}
	}
	Email = new class {
		Send(Address , Callable){
			App.Function.Request.Loading(7000).Post({
				Url : 'Email.Send' ,
				Data : {
					Email : Address ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
		Login(Address , Captcha , Callable){
			App.Function.Request.Loading(7001).Post({
				Url : 'Email.Login' ,
				Data : {
					Email : Address ,
					Captcha : Captcha ,
					Invite : App.Const.Invite ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
				Stop : Response => {
					App.Function.Layer.Error(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
		Bind(Address , Captcha , Callable){
			App.Function.Request.Loading(7002).Post({
				Url : 'Email.Bind' ,
				Data : {
					Email : Address ,
					Captcha : Captcha ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
				Stop : Response => {
					App.Function.Layer.Error(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
	}
	Wallet = new class {
		Bind(Address , Callable){
			App.Function.Request.Loading(7002).Post({
				Url : 'Wallet.Bind' ,
				Data : {
					Wallet : Address ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
				Stop : Response => {
					App.Function.Layer.Error(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
		Login(Address , Captcha , Callable){
			App.Function.Request.Loading(7001).Post({
				Url : 'Wallet.Login' ,
				Data : {
					Wallet : Address ,
					Invite : App.Const.Invite ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
				Stop : Response => {
					App.Function.Layer.Error(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
	}
	Chat = new class {
		Tabulation(Callable){
			App.Function.Request.Get({
				Url : 'Chat.Tabulation' ,
				Header : {
					'Magic-Page' : App.Const.Page.Chat ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
			});
		}
		Commit(Question , Quote , Callable , Fail){
			App.Function.Request.Post({
				Url : 'Chat.Commit' ,
				Data : {
					Question : Question ,
					Quote : Quote ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
				Fail : Response => {
					Fail(Response);
				} ,
				Stop : Response => {
					App.Function.Layer.Error(Response);
				} ,
			});
		}
		Delete(Uuid , Callable){
			App.Function.Request.Loading(7007).Post({
				Url : 'Chat.Delete' ,
				Data : {
					Uuid : Uuid ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
				Stop : Response => {
					App.Function.Layer.Error(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
	}
	Welfare = new class {
		Current(Callable){
			App.Function.Request.Get({
				Url : 'Welfare.Current' ,
				Success : Response => {
					Callable(Response);
				} ,
			});
		}
		Signin(Callable){
			App.Function.Request.Loading(7012).Get({
				Url : 'Welfare.Signin' ,
				Success : Response => {
					Callable(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
	}
	Contribute = new class {
		Submit(Link , Introduction , Twitter , Telegram , Email , Callable){
			App.Function.Request.Loading(7004).Post({
				Url : 'Contribute.Submit' ,
				Data : {
					Link : Link ,
					Introduction : Introduction ,
					Twitter : Twitter ,
					Telegram : Telegram ,
					Email : Email ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
				Stop : Response => {
					App.Function.Layer.Error(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
	}
	Twitter1 = new class {
		Authorization(Callable){
			App.Function.Request.Loading(7011).Get({
				Url : 'Twitter.Authorization' ,
				Success : Response => {
					Callable(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
		Bind(Token , Code , Callable){
			App.Function.Request.Loading(7002).Post({
				Url : 'Twitter.Bind' ,
				Data : {
					Token : Token ,
					Code : Code ,
				} ,
				Success : Response => {
					Callable(Response);
				} ,
			}).then(() => {
				App.Layer.Close('Loading');
			});
		}
	}
	Secret = new class {
		async Create(){
			return (await App.Request.Get({
				Url : App.Function.Request.Path('Secret.Create') ,
				async Error(){
					App.Function.Layer.Notify(9999);
				} ,
			})).Data;
		}
		Validate(Callable){
			App.Function.Request.Get({
				Url : 'Secret.Validate' ,
				Success : Response => {
					Callable(Response);
				} ,
				Fail : Code => {
					Callable({});
				} ,
			});
		}
	}
}