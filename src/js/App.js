export default class {
	constructor(){
		this.#Initialize().then(() => {
			this.#Validate();
		});
	}
	async #Initialize(){
		if(!App.Verify.Object(App.Const)){
			App.Const = {};
			App.Const.Mobile = (App.Verify.Wap() || App.Verify.Elt(screen.width , 850) ? true : false);
			App.Const.Wechat = App.Verify.Wx();
			App.Const.Domain = location.origin;
			App.Const.Invite = App.Check(App.String.Substr(location.pathname , 1) , 'Length' , '' , 5);
			App.Const.Tracking = App.Check(App.String.Substr(location.pathname , 1) , 'Length' , '' , 10);
			App.Const.Search = {};
			App.Const.Issue = {};
			App.Const.Page = {};
			App.Const.Page.Chat = 1;
			App.Const.Page.Popular = 1;
			App.Const.Page.Realtime = 1;
			App.Const.Page.Circle = 1;
			App.Const.Page.Recommend = 1;
			App.Const.Page.Bulletin = 1;
			App.Const.Page.Talking = 1;
			App.Const.Page.Discussion = 1;
			App.Const.Page.Position = 1;
			App.Const.Page.Survey = 1;
			App.Const.Page.Search = 1;
			App.Const.Page.Invite = 1;
			App.Const.Page.Integral = 1;
			App.Const.Prefix = {};
			App.Const.Prefix.Main = 'Owlx.';
			App.Const.Prefix.Mind = App.String.Concat(App.Const.Prefix.Main , 'Mind.png');
			App.Const.Prefix.Share = App.String.Concat(App.Const.Prefix.Main , 'Chat.png');
			App.Const.Prefix.Qrcode = App.String.Concat(App.Const.Prefix.Main , 'Qrcode.png');
			App.Const.Prefix.Secret = App.String.Concat(App.Const.Prefix.Main , 'Secret');
			App.Const.Prefix.Language = App.String.Concat(App.Const.Prefix.Main , 'Language');
			App.Const.Validate = false;
			App.Const.Valition = true;
			App.Const.Secret = await App.Cache.Local.Get(App.Const.Prefix.Secret , '');
			if(App.Verify.Empty(App.Const.Secret)){
				App.Const.Secret = await App.Ajax.Secret.Create();
				App.Const.Valition = false;
			}
			App.Const.Language = App.String.Capitalize(App.Check(App.String.Lower((await App.Cache.Local.Get(App.Const.Prefix.Language , App.String.Replace(App.String.Lower(navigator.language) , 'zh-' , '')))) , 'In' , 'en' , App.Config.Language));
			App.Function.Lang(null , true);
		}
		App.Const.Link = App.Array.Join(App.Config.Link , '.');
		App.Const.Frame = App.Array.Join(App.Config.Link , '-');
		App.Const.Chating = false;
	}
	#Validate(){
		if(!App.Verify.Object(App.Const.Lang)) App.Ajax.Language.Tabulation(Response => {
			App.Const.Lang = Response;
		});
		if(!App.Const.Validate && App.Const.Valition) return App.Ajax.Secret.Validate(async Response => {
			if(!App.Verify.Empty(Response)) await App.Function.Login(Response);
			return this.#Forward();
		});
		return this.#Forward();
	}
	#Forward(){
		if(App.Const.Validate && App.Verify.Confirm(App.Const.Link , 'Login')) return App.Jump('Home');
		if(!App.Const.Validate && !App.Verify.In(['Home' , 'Login'] , App.Const.Link)) return App.Jump('Login' , {
			Query : {
				Refresh : encodeURIComponent(App.String.Substr(location.hash , 1)) ,
			} ,
		});
		App.Jump(App.Const.Link , {
			Forward : 4 ,
			Fail : Error => {
				location.href = '/';
			} ,
		});
		// App.Aux.Sleep(1).then(() => {
			// App.Target.Magic.removeClass('Hidden');
		// });
		App.Ajax.Visit();
	}
}