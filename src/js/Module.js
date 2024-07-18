export default new class {
	Login(Refresh , Column){
		if(!App.Verify.Confirm(App.Const.Link , 'Login')) App.Target.Magic.append(App.Template.Container('div' , ['Mask' , 'Overflow']));
		App.Target.Magic.append(App.Template.Container('div' , ['Login Modal' , 'Background Background-White' , 'Shadow' , 'Flex Flex-Column' , 'Overflow'] , null , null , App.Array.Join([
			App.Template.Container('div' , ['Flex Flex-Column' , 'Overflow'] , null , null , App.Array.Join([
				App.Template.Container('div' , [
					'Flex' , 'Width' , 'Overflow' ,
					(App.Verify.Confirm(App.Const.Link , 'Account') ? 'Hidden' : '') ,
				] , null , null , App.Array.Join([
					App.Template.Container('button' , ['Gray' , 'Weight' , 'Overflow' , 'Hover-Black'] , 6071) ,
					App.Template.Container('button' , ['Gray' , 'Weight' , 'Overflow' , 'Hover-Black'] , 6072) ,
				] , '')) ,
				App.Template.Container('div' , ['Flex Flex-Column' , 'Width' , 'Overflow'] , null , null , App.Array.Join([
					App.Template.Label.Input(6073 , 'text' , 'Wallet' , 6074) ,
					App.Template.Label.Input(6075 , 'text' , 'Email') ,
					App.Template.Label.Input(6076 , 'text' , 'Captcha' , 6077) ,
				] , '')) ,
			] , '')) ,
			App.Template.Container('button' , [
				'Sign' , 'Activate' , 'Background-Black' , 'White' , 'Overflow' , 'Hover-Pointer' ,
			] , (App.Verify.Confirm(App.Const.Link , 'Account') ? 6119 : 6078)) ,
			App.Template.Container('button' , [
				'Close' , 'Background' , 'Overflow' , 'Hover-Pointer' ,
				(App.Verify.Confirm(App.Const.Frame , 'Login') ? 'Hidden' : '') ,
			]) ,
		] , '')));
		App.Function.Label(App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2) > .Container > input'));
		App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2) > .Container > input[name="Wallet"]').attr('readonly' , 'readonly');
		App.Event.Bind(App.Target.Magic.find('.Modal.Login > .Close') , Self => {
			App.Target.Magic.find('> .Modal.Login').remove();
			App.Target.Magic.find('> .Mask').remove();
			if(App.Verify.Confirm(App.Const.Link , 'Account')) App.Target.Bodyer.find('> .Account > .Personal > .Popup.Tool > li[data-forward="Profile"]').trigger('click');
		});
		App.Event.Bind(App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(1) > button') , Self => {
			if(Self.hasClass('Activate')) return false;
			Self.addClass('Activate').siblings('button').removeClass('Activate');
			App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2) > .Container').removeClass('Activate');
			if(App.Verify.Eq(Self.index() , 1)){
				App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2) > .Container:nth-child(1)').addClass('Activate');
			}else if(App.Verify.Eq(Self.index() , 0)){
				App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2) > .Container:not(:nth-child(1))').addClass('Activate');
			}
		}).then(() => {
			if(!App.Verify.Number(Column)) Column = 1;
			App.Target.Magic.find(App.String.Concat('> .Login > .Container:nth-child(1) > .Container:nth-child(1) > button:nth-child(' , Column , ')')).trigger('click');
		});
		App.Function.Email(App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2)'));
		const Original = {};
		App.Function.Wallet(App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2)') , Address => {
			Original.Wallet = Address;
			App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2) > .Container > input[name="Wallet"]').val(App.String.Concat(App.String.Substr(Address , 0 , 10) , '......')).parent().addClass('Input');
			App.Target.Magic.find('> .Login > button:nth-child(2)').removeClass('Activate');
		});
		App.Event.Bind(App.Target.Magic.find('> .Login > button:nth-child(2)') , Self => {
			if(Self.hasClass('Activate')) return false;
			Original.Email = App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2) > .Container > input[name="Email"]').val();
			Original.Captcha = App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(2) > .Container > input[name="Captcha"]').val();
			const Index = App.Target.Magic.find('> .Login > .Container:nth-child(1) > .Container:nth-child(1) > button.Activate').index();
			if(App.Verify.Eq(Index , 0)){
				if(!App.Verify.Email(Original.Email)) return App.Function.Layer.Error(4002);
				if(App.Verify.Empty(Original.Captcha)) return App.Function.Layer.Error(4005);
				if(App.Verify.Confirm(App.Const.Link , 'Account')){
					App.Ajax.Email.Bind(Original.Email , Original.Captcha , async Response => {
						App.Const.User.Email = Response;
						App.Function.Layer.Success(9009 , () => {
							App.Target.Bodyer.find('> .Account > .Modal.Profile > .Label:nth-child(4)').attr('data-text' , App.Const.User.Email).empty();
							App.Target.Magic.find('> .Login > .Close').trigger('click');
						});
					});
				}else{
					App.Ajax.Email.Login(Original.Email , Original.Captcha , async Response => {
						await App.Function.Login(Response);
						App.Function.Layer.Success(4003 , () => {
							App.Target.Magic.find('> .Login > .Close').trigger('click');
							return App.Jump(decodeURIComponent(Refresh));
						});
					});
				}
			}else if(App.Verify.Eq(Index , 1)){
				if(App.Verify.Empty(Original.Wallet)) return App.Function.Layer.Error(4006);
				if(App.Verify.Confirm(App.Const.Link , 'Account')){
					App.Ajax.Wallet.Bind(Original.Wallet , async Response => {
						App.Const.User.Wallet = Response;
						App.Function.Layer.Success(9009 , () => {
							App.Target.Bodyer.find('> .Account > .Modal.Profile > .Label:nth-child(5)').attr('data-text' , App.Const.User.Wallet).empty();
							App.Target.Magic.find('> .Login > .Close').trigger('click');
						});
					});
				}else{
					App.Ajax.Wallet.Login(Original.Wallet , Original.Captcha , async Response => {
						await App.Function.Login(Response);
						App.Function.Layer.Success(4003 , () => {
							App.Target.Magic.find('> .Login > .Close').trigger('click');
							return App.Jump(decodeURIComponent(Refresh));
						});
					});
				}
			}
		});
	}
	async Frame(){
		App.Target.Magic.find('> .Frame[data-forward="Bulletin"]').remove();
		App.Target.Magic.find('> .Frame[data-forward="Project"]').remove();
		App.Target.Magic.find('> .Frame[data-forward="Chat"]').remove();
		App.Target.Magic.find('> .Frame').addClass('Hidden');
		const Frameid = App.String.Concat('> .Frame[data-forward="' , App.Const.Frame , '"]');
		if(App.Verify.Length(App.Target.Magic.find(Frameid) , 0)) App.Target.Magic.append(App.Template.Container('div' , [
			'Frame' ,
			App.Const.Language ,
			(App.Const.Mobile ? 'Mobile' : '') ,
			'Width' ,
			'Height' ,
			'Hidden' ,
			App.Function.Roll() ,
		] , null , {
			Forward : App.Const.Frame ,
		} , App.Array.Join([
			App.Template.Container('div' , ['Header' , 'Background-White' ,'Shadow']) ,
			App.Template.Container('div' , ['Bodyer']) ,
			App.Template.Container('div' , ['Footer' , 'Overflow']) ,
			App.Template.Container('div' , ['Topper Hidden' , 'Background Background-White Shadow' , 'Hover-Pointer' , 'Overflow']) ,
		] , '')));
		App.Target.Frame = App.Target.Magic.find(Frameid);
		App.Target.Header = App.Target.Frame.find('> .Header');
		App.Target.Bodyer = App.Target.Frame.find('> .Bodyer');
		App.Target.Footer = App.Target.Frame.find('> .Footer');
		App.Target.Topper = App.Target.Frame.find('> .Topper');
		App.Function.Scroll(Distance => {
			if(App.Verify.Gt(Distance , 500)){
				App.Target.Topper.removeClass('Hidden');
			}else{
				App.Target.Topper.addClass('Hidden');
			}
		});
		App.Event.Bind(App.Target.Topper , Self => {
			App.Target.Frame.animate({
				scrollTop : 0 ,
			} , 100);
		});
		App.Target.Frame.removeClass('Hidden');
		App.Event.Bind(App.Target.Magic , Self => {
			Self.find('.Popup').addClass('Hidden');
		});
	}
	Header(){
		if(App.Target.Header.hasClass('Complete')) return false;
		App.Target.Header.addClass('Complete').append(App.Array.Join([
			App.Template.Container('div' , [
				'Logo' ,
				'Background' ,
				'Hover-Pointer' ,
			]) ,
			App.Template.Container('ul' , [
				'Navigation' ,
				'Flex' ,
				'Height' ,
				'Overflow' ,
			] , null , null , App.Array.Join([
				App.Template.Container('li' , ['Height' , 'Weight' , 'Gray' , 'Overflow' , 'Hover-Black'] , 6000 , {
					Forward : 'Chat' ,
				}) ,
				App.Template.Container('li' , ['Height' , 'Weight' , 'Gray' , 'Overflow' , 'Hover-Black'] , 6001 , {
					Forward : 'Flash' ,
				}) ,
			] , '')) ,
			App.Template.Container('div' , [
				'Language' ,
				'Background' ,
				'Overflow' ,
				'Hover-Pointer' ,
			]) ,
			(App.Const.Validate ? App.Template.Container('div' , [
				'Account' ,
				'Flex' ,
			] , null , null , App.Array.Join([
				App.Template.Image(App.Const.User.Avatar) ,
				App.Template.Container('div' , [
					'Omit' ,
					'Size-12 Weight' ,
					'Hover-Black' ,
					(App.Verify.Confirm('Account' , App.Const.Link) ? 'Activate' : '') ,
					'Overflow' ,
				] , null , null , App.Const.User.Nickname) ,
			] , '')) : App.Template.Container('div' , [
				'Account' ,
				'Background-Black' ,
				'White' ,
				'Hover-Pointer' ,
			] , 6002)) ,
			App.Template.Container('ul' , ['Popup' , 'Shadow' , 'Background-White' , 'Flex Flex-Column' , 'Hidden' , 'Overflow']) ,
		] , ''));
		new App.Function.Image();
		App.Event.Bind(App.Target.Header.find('> .Logo') , Self => {
			return App.Jump('Home');
		});
		App.Event.Bind(App.Target.Header.find('> .Navigation > li') , Self => {
			if(Self.hasClass('Activate')) return false;
			return App.Jump(Self.attr('data-forward'));
		}).then(() => {
			let Link = App.Const.Frame;
			if(App.Verify.Confirm(Link , 'Bulletin')) Link = 'Flash';
			if(App.Verify.In(['Flash' , 'Chat'] , Link)) App.Target.Header.find(App.String.Concat('> .Navigation > li[data-forward="' , Link , '"]')).addClass('Activate');
		});
		App.Event.Bind(App.Target.Header.find('> .Language') , Self => {
			if(App.Verify.Length(App.Target.Header.find('> .Popup > li') , 0)){
				const Template = [];
				App.Each.Of(App.Const.Lang , Item => {
					App.Array.Push(Template , App.Template.Container('li' , [
						'Omit' ,
						'Weight' ,
						App.String.Concat('Hover-Background-Gray' , (App.Verify.Confirm(App.Const.Language , App.String.Capitalize(Item.Code)) ? ' Activate' : '')) ,
						'Flex-Justify-Start' ,
						'Overflow' ,
					] , Item.Text , {
						Id : Item.Id ,
						Code : Item.Code ,
					}));
					return true;
				});
				App.Target.Header.find('> .Popup').append(App.Array.Join(Template , ''));
				App.Event.Bind(App.Target.Header.find('> .Popup > li') , Self => {
					App.Ajax.Language.Switch(Self.attr('data-id') , async Response => {
						await App.Function.Lang(App.String.Capitalize(Self.attr('data-code')) , false);
						App.Function.Layer.Success(6135 , () => {
							location.reload();
						});
					});
				});
			}
			if(App.Target.Header.find('> .Popup').hasClass('Hidden')){
				App.Target.Header.find('> .Popup').removeClass('Hidden');
			}else{
				App.Target.Header.find('> .Popup').addClass('Hidden');
			}
			return false;
		});
		App.Event.Bind(App.Target.Header.find('> .Account') , Self => {
			if(Self.find('> .Container:nth-child(2)').hasClass('Activate')) return false;
			if(App.Const.Validate) return App.Jump('Account');
			return App.Module.Login('Account');
		});
	}
	Footer(){
		if(App.Target.Footer.hasClass('Complete')) return false;
		App.Target.Footer.addClass('Complete').append(App.Template.Container('div' , ['Surround' , 'Overflow'] , null , null , App.Array.Join([
			App.Template.Container('ul' , [
				'Correlation' ,
				'Flex Flex-Wrap Flex-Justify-Between' ,
				'Size-12' ,
				'Gray' ,
				'Overflow' ,
			] , null , null , App.Array.Join([
				App.Template.Container('li' , [
					'Background' ,
					'Flex Flex-Justify-Start' ,
					'Overflow' ,
				] , 7050 , null , App.Array.Join([
					App.Template.Container('div' , ['Link' , 'Twitter' , 'Background' , 'Hover-Pointer'] , null , {
						Link : 'https://x.com/OwlX_ai' ,
					}) ,
					App.Template.Container('div' , ['Link' , 'Telegram' , 'Background' , 'Hover-Pointer'] , null , {
						Link : 'https://t.me/OwlXaiOfficialAIWeb3' ,
					}) ,
					App.Template.Container('div' , ['Link' , 'Discord' , 'Background' , 'Hover-Pointer'] , null , {
						Link : 'https://discord.com/invite/Mx9RqYtRj7' ,
					}) ,
				])) ,
				App.Template.Container('li' , [
					'Overflow' ,
				] , 7052 , {
					Title : App.Function.Language(7051) ,
				} , App.Template.Label.Button(7053 , 7054)) ,
			])) ,
			App.Template.Container('ul' , [
				'Support Hidden' ,
				'Flex Flex-Align-Start Flex-Wrap' ,
				'Weight' ,
				'Overflow' ,
			] , 7100 , null , App.Template.Support([7101 , 7102 , 7103 , 7104])) ,
			App.Template.Container('div' , [
				'Quick Hidden' ,
				'Flex Flex-Wrap' ,
				'Overflow' ,
			] , null , null , App.Template.Link({
				7200 : [7300 , 7301 , 7302] ,
				7201 : [7300 , 7301 , 7302] ,
				7202 : [7300 , 7301 , 7302] ,
				7203 : [7300 , 7301 , 7302] ,
				7204 : [7300 , 7301 , 7302] ,
			})) ,
		] , '')));
		App.Event.Bind(App.Target.Footer.find('> .Surround > .Correlation > li:nth-child(1) > .Link') , Self => {
			open(Self.attr('data-link'));
			return false;
		});
	}
	Head(Original){
		const Template = [];
		App.Each.Of(Original , Item => {
			App.Array.Push(Template , App.Template.Container('li' , ['Flex' , 'Background' , 'Gray' , 'Overflow'] , Item));
			return true;
		});
		return App.Template.Container('ul' , ['Head' , 'Width' , 'Background-White' , 'Weight' , 'Flex' , 'Overflow'] , null , null , App.Array.Join(Template , ''));
	}
	Modal(Objective , Original , Finish){
		Objective.append(App.Template.Modal(Original , true));
		App.Event.Bind(Objective.find('> .Modal > button.Close') , Self => {
			Objective.find('> .Modal').addClass('Hidden');
			Objective.find('> .Mask').addClass('Hidden');
		});
		if(App.Verify.Function(Finish)) Finish(Objective);
	}
	Popup(Objective , Original , Callable , Finish){
		Objective.append(App.Template.Popup(Original.Option , Original.Class));
		App.Event.Bind(Objective.find(App.String.Concat('> .Popup.' , Original.Class , ' > li')) , Self => {
			if(App.Verify.Function(Callable)) Callable(Self);
		});
		if(App.Verify.Function(Finish)) Finish(Objective);
	}
	Menu(Objective , Original , Finish){
		Objective.append(App.Template.Menu(Original));
		App.Event.Bind(Objective.find('> .Menu-Head > li') , Self => {
			if(Self.hasClass('Activate')) return false;
			let Left = 0;
			if(App.Verify.Gt(Self.index() , 0)) Left = 200;
			Self.parent().animate({
				scrollLeft : Left ,
			});
			Self.addClass('Activate').siblings('li').removeClass('Activate');
			Objective.find(App.String.Concat('> .Menu-Tabulation > li[data-menu="' , Self.attr('data-menu') , '"]')).addClass('Activate').siblings('li').removeClass('Activate');
			let Top = App.Calculate.Sub(Self.parent()[0].offsetTop , 10);
			if(Self.parent().hasClass('Fixed')) Top = App.Calculate.Add(Top , 60);
			App.Target.Frame.animate({
				scrollTop : Top ,
			} , 100);
		}).then(() => {
			if(App.Verify.Function(Finish)) Finish(Objective);
		}).then(() => {
			if(App.Verify.Require(App.Config.Query.Menu , 'string') && App.Verify.Length(Objective.find(App.String.Concat('> .Menu-Head > li[data-menu="' , App.Config.Query.Menu , '"]')) , 1)) return Objective.find(App.String.Concat('> .Menu-Head > li[data-menu="' , App.Config.Query.Menu , '"]')).trigger('click');
			return Objective.find('> .Menu-Head > li:nth-child(1)').trigger('click');
		});
	}
	Switch(Objective , Original , Callable , Finish){
		Objective.append(App.Template.Switch(Original));
		App.Event.Bind(Objective.find('> .Switch-Head > li') , Self => {
			if(Self.hasClass('Activate')) return false;
			Self.addClass('Activate').siblings('li').removeClass('Activate');
			Self.parent().animate({
				scrollLeft : App.Calculate.Sub(Self[0].offsetLeft , Math.ceil(App.Calculate.Div(Self.outerWidth() , 2))) ,
			});
			Objective.find(App.String.Concat('> .Switch-Tabulation > li[data-switch="' , Self.attr('data-switch') , '"]')).addClass('Activate').siblings('li').removeClass('Activate');
			if(App.Verify.Function(Callable)) Callable(Self.attr('data-switch') , Objective);
		}).then(() => {
			if(App.Verify.Function(Finish)) Finish(Objective);
		}).then(() => {
			Objective.find('> .Switch-Head > li:nth-child(1)').trigger('click');
		});
	}
	Discussion(Objective){
		App.Ajax.Discussion(Response => {
			App.Each.Of(Response , Item => {
				Objective.append(App.Template.Program(Item , ['Discussions' , 'Track']));
				return true;
			});
			new App.Function.Image();
			App.Function.Detail(Objective.find('> ul:not(.Head) > li:nth-child(1)') , 'Program');
		});
	}
	Position(Objective){
		App.Ajax.Position(Response => {
			App.Each.Of(Response , Item => {
				Objective.append(App.Template.Program(Item , ['Amount' , 'Change']));
				return true;
			});
			new App.Function.Image();
			App.Function.Detail(Objective.find('> ul:not(.Head) > li:nth-child(1)') , 'Program');
		});
	}
	Search(Objective , Keyword){
		if(App.Verify.Require(Keyword , 'string')){
			App.Ajax.Search(Keyword , Response => {
				if(!Objective.hasClass('Searching') || Objective.hasClass('Surveying')) return false;
				if(!App.Verify.Confirm(Objective.find('> .Search > input').val() , Response.Keyword)) return false;
				App.Each.Of(Response.List , Item => {
					Objective.append(App.Template.Program(Item));
					return true;
				});
				new App.Function.Image();
				App.Function.Detail(Objective.find('> ul:not(.Head) > li:nth-child(1)') , 'Program');
			});
		}else{
			App.Ajax.Survey(Response => {
				if(Objective.hasClass('Searching') || !Objective.hasClass('Surveying')) return false;
				App.Each.Of(Response , Item => {
					Objective.append(App.Template.Program(Item));
					return true;
				});
				new App.Function.Image();
				App.Function.Detail(Objective.find('> ul:not(.Head) > li:nth-child(1)') , 'Program');
			});
		}
	}
	Searching(Objective , Callable){
		App.Event.Input(Objective.find('> input') , Self => {
			if(App.Verify.Empty(Self.val())){
				Self.parent().addClass('Activate').find('> button').addClass('Hidden');
			}else{
				Self.parent().removeClass('Activate').find('> button').removeClass('Hidden');
			}
			if(App.Verify.Function(Callable)) Callable(Self.val());
		});
		App.Event.Bind(Objective.find('> button') , Self => {
			Self.addClass('Hidden').parent().addClass('Activate').find('> input').val('');
			if(App.Verify.Function(Callable)) Callable(Self.val());
		});
	}
	Flash(Objective , Method , Finish){
		App.Const.Page.Popular = '1,9';
		App.Ajax.Popular(Method , Response => {
			const Template = [];
			App.Each.Of(Response , Item => {
				App.Array.Push(Template , App.Template.Article(Item));
				return true;
			});
			if(App.Verify.Min(Template , 1)) Objective.parent().removeClass('Hidden');
			Objective.append(App.Array.Join(Template , ''));
			new App.Function.Image();
			App.Function.Detail(Objective.find('> .New > .Wicket > .Coin > li') , 'Program');
			App.Function.Detail(Objective.find('> .New > .Wicket > .Title') , 'Bulletin');
			App.Event.Bind(Objective.find('> .New > img') , Self => {
				Self.parent().find('> .Wicket > .Title').trigger('click');
				return false;
			});
			if(App.Verify.Function(Finish)) Finish(Objective);
		});
	}
	Statistics(Objective){
		App.Ajax.Integral.Statistics(Response => {
			Objective.find('> .Point').attr('data-point' , App.Number.Fixed(Response.Total , 2));
			Objective.find('> .Statistics > .Container:nth-child(1) > .Container:nth-child(1)').text(App.Number.Fixed(Response.Invite , 2));
			Objective.find('> .Statistics > .Container:nth-child(2)').text(App.Number.Fixed(Response.Daliy , 2));
		});
	}
	Tasking(Objective){
		App.Ajax.Welfare.Current(Response => {
			App.Each.Loop(0 , Response.Signed).Add(Index => {
				Objective.find(App.String.Concat('> .Check > ul > li:eq(' , Index , ')')).addClass('Activate');
			});
			if(App.Verify.Eq(Response.Today , 0)) Objective.find(App.String.Concat('> .Check > ul > li:eq(' , Response.Signed , ')')).removeClass('Ban');
			Objective.find('> .Daily > li:nth-child(1) > .Container:nth-child(1)').attr('data-complete' , App.String.Concat(Response.Chat , ' / 5'));
			Objective.find('> .Daily > li:nth-child(2) > .Container:nth-child(1)').attr('data-complete' , App.String.Concat(Response.Reading , ' / 3'));
			Objective.find('> .Daily > li:nth-child(3) > .Container:nth-child(1)').attr('data-complete' , Response.Friend);
			Objective.removeClass('Hidden').parent().parent().find('> .Switch > li[data-switch="Tasking"]').removeClass('Hidden');
		});
	}
	Integer(Objective){
		App.Ajax.Integral.Tabulation(Response => {
			const Template = [];
			App.Each.Of(Response , Item => {
				App.Array.Push(Template , App.Template.Container('ul' , ['Flex' , 'Weight' , 'Size-12' , 'Overflow'] , null , null , App.Array.Join([
					App.Template.Container('li' , ['Overflow' , 'Amount' , App.Function.Friend.Background(Item.Fraction)] , App.String.Concat((App.Verify.Gt(Item.Fraction , 0) ? '+' : '') , Item.Fraction)) ,
					App.Template.Container('li' , ['Overflow'] , App.Number.Convert(App.Calculate.Add(8300 , Item.Type))) ,
					App.Template.Container('li' , ['Overflow'] , App.Function.Friend.Date(Item.Time , '%m-%d %H:%i')) ,
				] , '')));
				return true;
			});
			Objective.append(App.Array.Join(Template , ''));
			if(App.Verify.Min(Template , 1)) Objective.removeClass('Hidden').parent().parent().find('> .Switch > li[data-switch="Record"]').removeClass('Hidden');
		});
	}
	Invite(Objective){
		App.Ajax.Invite(Response => {
			const Template = [];
			App.Each.Of(Response , Item => {
				App.Array.Push(Template , App.Template.Container('ul' , ['Flex' , 'Weight' , 'Size-12' , 'Overflow'] , null , null , App.Array.Join([
					App.Template.Container('li' , ['Overflow' , 'Amount' , 'Green'] , App.String.Convert(Item.Fraction)) ,
					App.Template.Container('li' , ['Flex' , 'Overflow'] , null , null , App.Array.Join([
						App.Template.Image(Item.Avatar) ,
						App.Template.Container('div' , ['Omit' , 'Overflow'] , null , null , Item.Nickname) ,
					] , '')) ,
					App.Template.Container('li' , ['Overflow'] , App.Function.Friend.Date(Item.Time , '%m-%d %H:%i')) ,
				] , '')));
				return true;
			});
			Objective.append(App.Array.Join(Template , ''));
			new App.Function.Image();
			if(App.Verify.Min(Template , 1)) Objective.removeClass('Hidden').parent().parent().find('> .Switch > li[data-switch="Referral"]').removeClass('Hidden');
		});
	}
	Ranking(Objective){
		App.Ajax.Integral.Ranking(Response => {
			const Template = [];
			App.Each.In(Response , (Item , Index) => {
				App.Array.Push(Template , App.Template.Container('ul' , ['Flex' , 'Weight' , 'Size-12' , 'Overflow'] , null , null , App.Array.Join([
					App.Template.Container('li' , ['Overflow' , 'Ranking'] , App.String.Convert(App.Calculate.Add(Index , 1))) ,
					App.Template.Container('li' , ['Flex' , 'Overflow'] , null , null , App.Array.Join([
						App.Template.Image(Item.Avatar) ,
						App.Template.Container('div' , [
							'Omit' , 'Overflow' ,
							(App.Verify.Confirm(App.Const.User.Nickname , Item.Nickname) ? 'Green' : '') ,
						] , null , null , Item.Nickname) ,
					] , '')) ,
					App.Template.Container('li' , ['Overflow' , 'Amount' , 'Orange'] , App.String.Convert(Item.Fraction)) ,
				] , '')));
				return true;
			});
			Objective.append(App.Array.Join(Template , ''));
			if(App.Verify.Length(Objective.find('> ul > li:nth-child(2) > .Container.Green') , 0)) Objective.append(App.Template.Container('ul' , ['Flex' , 'Weight' , 'Size-12' , 'Overflow'] , null , null , App.Array.Join([
				App.Template.Container('li' , ['Overflow' , 'Ranking'] , '-') ,
				App.Template.Container('li' , ['Flex' , 'Overflow'] , null , null , App.Array.Join([
					App.Template.Image(App.Const.User.Avatar) ,
					App.Template.Container('div' , [
						'Omit' , 'Overflow' , 'Green' ,
					] , null , null , App.Const.User.Nickname) ,
				] , '')) ,
				App.Template.Container('li' , ['Overflow' , 'Amount' , 'Orange'] , App.Target.Bodyer.find('> .Account > .Personal > .Point').attr('data-point')) ,
			] , '')));
			new App.Function.Image();
			Objective.removeClass('Hidden').parent().parent().find('> .Switch > li[data-switch="Ranking"]').removeClass('Hidden');
		});
	}
	Problem(Objective , Question , Choice , Flash){
		const Template = [];
		App.Array.Push(Template , App.Template.Container('div' , ['Flex-Justify-Start' , 'Width' , 'Overflow'] , null , null , Question));
		App.Each.Of(Choice , Item => {
			App.Array.Push(Template , App.Template.Container('li' , [
				'Background-Gray' , 'Overflow' , 'Hover-Orange' ,
			] , null , null , App.String.Replace(Item , '答：' , 'A. ')));
			return true;
		});
		Objective.append(App.Template.Container('ul' , ['Problem' , 'Flex Flex-Column' , 'Weight' , 'Overflow'] , null , null , App.Array.Join(Template , '')));
		App.Event.Bind(Objective.find('> .Problem > li') , Self => {
			this.Modal(Objective , [{
				Class : 'Confirm' ,
				Language : 6136 ,
				Content :  App.Array.Join([
					App.Template.Container('div' , ['Overflow'] , null , null , Self.text()) ,
					App.Template.Container('button' , ['No' , 'Background-Gray' , 'Overflow' , 'Hover-Pointer'] , 6121) ,
					App.Template.Container('button' , ['Yes' , 'Background-Black' , 'White' , 'Overflow' , 'Hover-Pointer'] , 6137) ,
				] , '') ,
			}] , () => {
				Objective.find('> .Modal.Confirm').removeClass('Hidden');
				Objective.find('> .Mask').removeClass('Hidden');
				App.Event.Bind(Objective.find('> .Modal.Confirm > button.No') , Button => {
					Button.parent().find('> .Close').trigger('click');
				});
				App.Event.Bind(Objective.find('> .Modal.Confirm > button.Yes') , Button => {
					Button.parent().find('> .Close').trigger('click');
					App.Ajax.Feedback.Problem(Flash , Self.text() , Response => {
						App.Function.Layer.Success(6138 , () => {
							Objective.find('> .Problem').remove();
						});
					});
				});
			});
		});
	}
	Related(Objective , Question){
		const Template = [];
		App.Each.Of(Question , Item => {
			App.Array.Push(Template , App.Template.Container('li' , ['Background-Gray' , 'Overflow' , 'Hover-Orange'] , null , null , Item));
			return true;
		});
		Objective.append(App.Template.Container('ul' , ['Related' , 'Flex Flex-Column Flex-Justify-Start' , 'Weight' , 'Overflow'] , 6062 , null , App.Array.Join(Template , '')));
		App.Event.Bind(Objective.find('> .Related > li') , Self => {
			if(!App.Verify.Length(App.Target.Bodyer.find('> .Detail > .Showy') , 1) || App.Const.Chating) return false;
			App.Target.Bodyer.find('> .Detail > .Showy > .Close').trigger('click');
			App.Target.Bodyer.find('> .Detail > .Showy > .Asking > input').val(Self.text());
			App.Target.Bodyer.find('> .Detail > .Showy > .Asking > button').removeClass('Activate').trigger('click');
			App.Target.Topper.trigger('click');
		});
	}
	Brain(Objective , Topic , Brain){
		const Template = [];
		App.Each.Of(Brain , Item => {
			App.Array.Push(Template , App.Template.Container('div' , ['Flex'] , null , null , App.Array.Join([
				App.Template.Container('button' , ['Overflow' , 'Background' , 'Hover-Pointer']) ,
				App.Template.Container('div' , [] , null , null , Item) ,
			] , '')));
		});
		Objective.append(App.Array.Join([
			App.Template.Container('div' , ['Level' , 'Flex'] , null , null , App.Template.Container('div' , [
				'Flex' ,
			] , null , null , App.Array.Join([
				App.Template.Container('button' , ['Overflow' , 'Background' , 'Hover-Pointer']) ,
				App.Template.Container('div' , [] , null , null , Topic) ,
			] , ''))) ,
			App.Template.Container('div' , [
				'Level' , 'Flex Flex-Column Flex-Align-Start' ,
			] , null , null , App.Array.Join(Template , '')) ,
		] , ''));
		const Document = {};
		App.Event.Auto({
			Element : Objective.parent() ,
			Tap : (Self , Event) => {
				if(App.Verify.Confirm(Event.target.localName , 'button')){
					const Target = App.$(Event.target);
					if(Target.hasClass('Enlarge') || Target.hasClass('Narrow') || Target.hasClass('Share')){
						if(Target.hasClass('Share')){
							App.Layer.Loading(App.Function.Language(7009)).then(async Layer => {
								const Clone = Target.parent().parent().clone();
								Clone.addClass('Clone').find('> .Button').addClass('Hidden');
								Target.parent().parent().parent().append(Clone);
								App.Image.Capture(Target.parent().parent().parent().find('> .Clone')).then(Capture => {
									App.Image.Download(Capture , App.Const.Prefix.Mind);
									App.Layer.Close(Layer.Uniqid);
								});
							});
						}else{
							const Transform = App.String.Replace(Objective.css('transform') , ' ' , '');
							const Matrix = App.String.Split(App.String.Replace(App.String.Replace(Transform , 'matrix(' , '') , ')' , '') , ',');
							const Scale = App.Number.Convert(Matrix[0]);
							if(Target.hasClass('Enlarge')){
								Objective.css({
									transform : App.String.Concat('scale(' , App.Calculate.Add(Scale , 0.2) , ')') ,
								});
							}else if(Target.hasClass('Narrow')){
								Objective.css({
									transform : App.String.Concat('scale(' , App.Calculate.Sub(Scale , 0.2) , ')') ,
								});
							}
						}
					}else{
						if(!App.Verify.Length(App.Target.Bodyer.find('> .Detail > .Showy') , 1) || App.Const.Chating) return false;
						App.Target.Bodyer.find('> .Detail > .Showy > .Close').trigger('click');
						App.Target.Bodyer.find('> .Detail > .Showy > .Asking > input').val(Target.parent().find('> .Container:nth-child(2)').text());
						App.Target.Bodyer.find('> .Detail > .Showy > .Asking > button').removeClass('Activate').trigger('click');
						App.Target.Topper.trigger('click');
					}
				}
			} ,
			Down : (Self , Difference) => {
				Document.Top = App.Number.Convert(App.String.Replace(App.String.Lower(Objective.css('top')) , 'px' , ''));
				Document.Left = App.Number.Convert(App.String.Replace(App.String.Lower(Objective.css('left')) , 'px' , ''));
			} ,
			Move : {
				Drag : (Self , Difference) => {
					Objective.css({
						top : App.Calculate.Add(Document.Top , Difference.Y) ,
						left : App.Calculate.Add(Document.Left , Difference.X) ,
					});
				} ,
			} ,
		});
	}
	Popular(Objective){
		if(!App.Verify.Number(App.Const.Page.Popular)) App.Const.Page.Popular = 1;
		App.Ajax.Popular(2 , Response => {
			const Template = [];
			let Index = App.Length(Objective.find('> ul > .New'));
			App.Each.Of(Response , Item => {
				Index = App.Calculate.Add(Index , 1);
				App.Array.Push(Template , App.Template.Article(Item , Index));
				return true;
			});
			Objective.removeClass('Loading').append(App.Template.Container('ul' , ['Flex Flex-Column'] , null , null , App.Array.Join(Template , '')));
			new App.Function.Image();
			App.Function.Detail(Objective.find('> ul:last-child > .New > .Wicket > .Coin > li') , 'Program');
			App.Function.Detail(Objective.find('> ul:last-child > .New > .Wicket > .Title') , 'Bulletin');
			App.Event.Bind(Objective.find('> ul:last-child > .New > img') , Self => {
				Self.parent().find('> .Wicket > .Title').trigger('click');
				return false;
			});
		});
	}
	Recommend(Objective){
		App.Ajax.Recommend(Response => {
			if(!App.Verify.Empty(Response.Circle)){
				const Template = [];
				App.Each.In(Response.Circle , (Item , Index) => {
					const Subchild = [];
					App.Each.Of(Item , Value => {
						const ThrChild = [];
						App.Each.Of(Value.Children , Children => {
							App.Array.Push(ThrChild , App.Template.Container('li' , ['Overflow'] , null , null , App.Array.Join([
								App.Template.Container('div' , ['Overflow' , 'Hover-Orange'] , null , {
									Id : Children.Id ,
								} , Children.Title) ,
								App.Template.Container('div' , ['Domain' , 'Flex' , 'Width Gray Size-12' , 'Overflow'] , null , null , App.Array.Join([
									App.Template.Container('div' , [
										'Flex-Justify-Start' ,
										'Omit' ,
										'Overflow Hidden' ,
									] , Children.Originate.Nickname , null , App.Template.Image(Children.Originate.Avatar)) ,
									App.Template.Container('div' , ['Flex-Justify-End' , 'Blue' , 'Omit' , 'Overflow'] , App.Array.Join(Children.Domain , ' | ')) ,
								] , '')) ,
							] , '')));
							return true;
						});
						App.Array.Push(Subchild , App.Template.Container('ul' , ['Flex Flex-Column' , 'Background-White'] , null , null , App.Array.Join([
							App.Template.Container('div' , ['Title' , 'Weight Width'] , null , null , Value.Title) ,
							App.Template.Project(Value.Project) ,
							App.Template.Container('ul' , ['Width' , 'Overflow'] , null , null , App.Array.Join(ThrChild , '')) ,
						] , '')));
						return true;
					});
					App.Array.Push(Template , App.Template.Container('div' , [
						'Circle' ,
						'Background-Gray' ,
						'Overflow' ,
					] , Index , null , App.Array.Join([
						App.Template.Container('button' , ['Background' , 'Hover-Pointer' , 'Overflow']) ,
						App.Array.Join(Subchild , '') ,
					] , '')));
					return true;
				});
				Objective.removeClass('Loading').append(App.Array.Join(Template , ''));
				new App.Function.Image();
				App.Function.Detail(Objective.find('> .Circle > ul > .Coin > li') , 'Program');
				App.Function.Detail(Objective.find('> .Circle > ul > ul:not(.Coin) > li > .Container:nth-child(1)') , 'Bulletin');
				App.Event.Bind(Objective.find('> .Circle > button') , Self => {
					App.Jump('Circle');
				});
			}
			if(!App.Verify.Empty(Response.Recommend)){
				const Template = [];
				App.Each.Of(Response.Recommend , Item => {
					App.Array.Push(Template , App.Template.Article(Item));
					return true;
				});
				Objective.removeClass('Loading').append(App.Template.Container('ul' , ['Flex Flex-Column' , 'Overflow'] , null , null , App.Array.Join(Template , '')));
				if(App.Verify.Length(Objective.find('> .Important') , 0)){
					Objective.append(App.Template.Container('div' , [
						'Important' ,
						'Flex Flex-Justify-End' ,
						'Overflow' ,
					] , 6165 , null , App.Template.Container('button' , ['Overflow'])));
					App.Event.Bind(Objective.find('> .Important > button') , Self => {
						if(Self.hasClass('Activate')){
							Self.removeClass('Activate');
							Self.parent().parent().find('> ul > .New').removeClass('Hidden');
						}else{
							Self.addClass('Activate');
							Self.parent().parent().find('> ul > .New > .Wicket > .Title:not(.Green)').parent().parent().addClass('Hidden');
						}
					});
				}else if(Objective.find('> .Important > button').hasClass('Activate')){
					Objective.find('> ul > .New > .Wicket > .Title:not(.Green)').parent().parent().addClass('Hidden');
				}
				new App.Function.Image();
				App.Function.Detail(Objective.find('> ul > .New > .Wicket > .Coin > li') , 'Program');
				App.Function.Detail(Objective.find('> ul > .New > .Wicket > .Title') , 'Bulletin');
				App.Event.Bind(Objective.find('> ul > .New > img') , Self => {
					Self.parent().find('> .Wicket > .Title').trigger('click');
				});
			}
		});
	}
	Circle(Objective){
		App.Ajax.Circle(Response => {
			const Template = [];
			App.Each.In(Response , (Item , Index) => {
				const Subchild = [];
				App.Each.Of(Item , Value => {
					const ThrChild = [];
					App.Each.Of(Value.Children , Children => {
						App.Array.Push(ThrChild , App.Template.Container('li' , ['Overflow'] , null , null , App.Array.Join([
							App.Template.Container('div' , ['Overflow' , 'Hover-Orange'] , null , {
								Id : Children.Id ,
							} , Children.Title) ,
							App.Template.Container('div' , ['Domain' , 'Flex' , 'Width Gray Size-12' , 'Overflow'] , null , null , App.Array.Join([
								App.Template.Container('div' , [
									'Flex-Justify-Start' ,
									'Omit' ,
									'Overflow Hidden' ,
								] , Children.Originate.Nickname , null , App.Template.Image(Children.Originate.Avatar)) ,
								App.Template.Container('div' , ['Flex-Justify-End' , 'Blue' , 'Omit' , 'Overflow'] , App.Array.Join(Children.Domain , ' | ')) ,
							] , '')) ,
						] , '')));
						return true;
					});
					App.Array.Push(Subchild , App.Template.Container('ul' , ['Flex Flex-Column' , 'Background-White'] , null , null , App.Array.Join([
						App.Template.Container('div' , ['Title' , 'Weight Width'] , null , null , Value.Title) ,
						App.Template.Project(Value.Project) ,
						App.Template.Container('ul' , ['Width' , 'Overflow'] , null , null , App.Array.Join(ThrChild , '')) ,
					] , '')));
					return true;
				});
				App.Array.Push(Template , App.Template.Container('div' , ['Circle' , 'Background-Gray' , 'Overflow'] , Index , null , App.Array.Join(Subchild , '')));
				return true;
			});
			Objective.removeClass('Loading').append(App.Array.Join(Template , ''));
			new App.Function.Image();
			App.Function.Detail(Objective.find('> .Circle > ul > .Coin > li') , 'Program');
			App.Function.Detail(Objective.find('> .Circle > ul > ul:not(.Coin) > li > .Container:nth-child(1)') , 'Bulletin');
		});
	}
	Realtime(Objective){
		App.Ajax.Realtime(Response => {
			const Template = [];
			App.Each.Of(Response , Item => {
				App.Array.Push(Template , App.Template.Article(Item));
				return true;
			});
			Objective.removeClass('Loading').append(App.Template.Container('ul' , ['Flex Flex-Column' , 'Overflow'] , null , null , App.Array.Join(Template , '')));
			if(App.Verify.Length(Objective.find('> .Important') , 0)){
				Objective.append(App.Template.Container('div' , [
					'Important' ,
					'Flex Flex-Justify-End' ,
					'Overflow' ,
				] , 6165 , null , App.Template.Container('button' , ['Overflow'])));
				App.Event.Bind(Objective.find('> .Important > button') , Self => {
					if(Self.hasClass('Activate')){
						Self.removeClass('Activate');
						Self.parent().parent().find('> ul > .New').removeClass('Hidden');
					}else{
						Self.addClass('Activate');
						Self.parent().parent().find('> ul > .New > .Wicket > .Title:not(.Green)').parent().parent().addClass('Hidden');
					}
				});
			}else if(Objective.find('> .Important > button').hasClass('Activate')){
				Objective.find('> ul > .New > .Wicket > .Title:not(.Green)').parent().parent().addClass('Hidden');
			}
			new App.Function.Image();
			App.Function.Detail(Objective.find('> ul > .New > .Wicket > .Coin > li') , 'Program');
			App.Function.Detail(Objective.find('> ul > .New > .Wicket > .Title') , 'Bulletin');
			App.Event.Bind(Objective.find('> ul > .New > img') , Self => {
				Self.parent().find('> .Wicket > .Title').trigger('click');
			});
		});
	}
	Market(Objective){
		App.Ajax.Market(App.Config.Query.Id , Response => {
			if(!App.Verify.Object(Response) || (App.Verify.Empty(Response.Ico) && App.Verify.Empty(Response.Market))) return false;
			if(App.Verify.Require(Response.Ico , 'array')){
				const Menu = [];
				const Tabulation = [];
				App.Each.Of(Response.Ico , Item => {
					App.Array.Push(Menu , App.Template.Container('li' , ['Flex' , 'Overflow' , 'Gray Weight' , 'Hover-Black'] , null , null , Item.Type));
					App.Array.Push(Tabulation , App.Template.Container('li' , ['Flex Flex-Column' , 'Width' , 'Overflow'] , null , null , App.Array.Join([
						App.Template.Container('div' , [
							'Head' ,
							'Width' ,
							'Weight' ,
							'Overflow' ,
							'Flex-Justify-Start' ,
						] , App.Function.Ico(Item.Type) , null , App.Template.Container('div' , [
							'Date' ,
							'Background Background-Gray' ,
							'Flex' ,
							'Gray' ,
							'Overflow' ,
						] , null , null , Item.Date)) ,
						App.Template.Container('ul' , ['Width Weight' , 'Flex Flex-Wrap Flex-Justify-Start' , 'Overflow'] , null , null , (() => {
							const Template = [];
							if(App.Verify.Require(Item.Investors , 'array')) App.Each.Of(Item.Investors , Value => {
								App.Array.Push(Template , App.Template.Container('li' , [
									'Omit' ,
									'Background-Gray' ,
									'Overflow' ,
								] , Value.Name , null , App.Template.Image(Value.Logo)));
								return true;
							});
							if(App.Verify.Require(Item.Info , 'object')) App.Array.Push(Template , App.Array.Join([
								App.Template.Container('li' , ['Flex' , 'Overflow'] , 6011 , null , App.Function.Friend.Price(Item.Info.Price)) ,
								App.Template.Container('li' , [
									'Flex' ,
									'Overflow' ,
								] , 6042 , null , (App.Verify.Object(Item.Info.Platform) ? App.Template.Container('div' , [
									'Overflow' ,
									'Flex' ,
								] , null , null , App.Array.Join([
									App.Template.Image(Item.Info.Platform.icon) ,
									Item.Info.Platform.name ,
								] , '')) : Item.Info.Platform)) ,
								App.Template.Container('li' , ['Flex' , 'Overflow'] , 6041 , null , App.Array.Join([
									App.Template.Container('div' , ['Overflow'] , null , null , Item.Info.Roi.Value) ,
									App.Template.Container('div' , ['Red' , 'Overflow'] , null , null , Item.Info.Roi.Percent) ,
								] , '')) ,
								App.Template.Container('li' , ['Flex' , 'Overflow'] , 6043 , null , App.Array.Join([
									App.Template.Container('div' , ['Overflow'] , null , null , Item.Info.Ath.Value) ,
									App.Template.Container('div' , ['Red' , 'Overflow'] , null , null , Item.Info.Ath.Percent) ,
								] , '')) ,
							] , ''));
							return App.Array.Join(Template , '');
						})()) ,
					] , '')));
					return true;
				});
				Objective.append(App.Template.Container('ul' , ['Ico' , 'Flex Flex-Column' , 'Overflow'] , null , null , App.Array.Join(Tabulation , '')));
				new App.Function.Image();
				Objective.removeClass('Hidden').parent().parent().find('> .Switch > li[data-switch="Market"]').removeClass('Hidden');
			}
			if(App.Verify.Require(Response.Market , 'array')){
				const Template = [];
				App.Each.Of(Response.Market , Item => {
					App.Array.Push(Template , App.Template.Container('ul' , ['Flex' , 'Weight' , 'Size-12' , 'Overflow'] , null , null , App.Array.Join([
						App.Template.Container('li' , ['Omit' , 'Purple' , 'Overflow'] , Item.Name) ,
						App.Template.Container('li' , ['Omit' , 'Overflow'] , Item.Pair) ,
						App.Template.Container('li' , ['Omit' , 'Overflow' , 'Green'] , App.Function.Friend.Price(Item.Price)) ,
						App.Template.Container('li' , ['Overflow'] , App.Function.Friend.Price(Item.Quote)) ,
						App.Template.Container('li' , ['Overflow'] , App.Function.Friend.Percent(Item.Percent)) ,
						App.Template.Container('li' , ['Overflow'] , App.Function.Friend.Price(Item.Positive)) ,
						App.Template.Container('li' , ['Overflow'] , App.Function.Friend.Price(Item.Negative)) ,
					] , '')));
					return true;
				});
				Objective.append(App.Array.Join([
					this.Head([6045 , 6044 , 6046 , 6047 , 6048 , 6049 , 6050]) ,
					App.Array.Join(Template , '') ,
				] , ''));
				Objective.removeClass('Hidden').parent().parent().find('> .Switch > li[data-switch="Market"]').removeClass('Hidden');
				console.log(App.Verify.Length(Objective.find('> .Ico') , 1))
				if(App.Verify.Length(Objective.find('> .Ico') , 1)) App.Event.Bind(Objective , Self => {
					Objective.find('> .Ico').css({
						left : Self[0].scrollLeft ,
					});
				} , 'scroll');
			}
		});
	}
	Summary(Objective , Original){
		const Template = [];
		App.Each.In({
			'official' : 6053 ,
			'history' : 6054 ,
			'cooperate' : 6055 ,
			'business' : 6056 ,
			'economy' : 6057 ,
			'develop' : 6058 ,
			'competition' : 6059 ,
			'track' : 6060 ,
		} , (Item , Index) => {
			if(App.Verify.Require(Original[Index] , 'string')) App.Array.Push(Template , App.Template.Container('div' , [
				'Summary' ,
				'Width' ,
				'Background' ,
				'Overflow' ,
			] , null , null , App.Array.Join([
				App.Template.Container('div' , ['Weight' , 'Flex-Justify-Start' , 'Hover-Green' , 'Overflow'] , Item) ,
				App.Template.Container('div' , ['Substance Hidden' , 'Overflow'] , null , null , Original[Index]) ,
			] , '')));
			return true;
		});
		Objective.append(App.Array.Join(Template , ''));
		let Boolean = false;
		App.Event.Bind(Objective.find('> .Summary > .Container:nth-child(1)') , Self => {
			let Top = (App.Verify.Gt(App.Target.Frame.outerWidth() , 750) ? 815 : (App.Verify.Gt(App.Target.Frame.outerWidth() , 550) ? 711 : 613));
			if(Self.parent().find('> .Container:nth-child(2)').hasClass('Hidden')){
				Self.addClass('Purple').parent().addClass('Activate').find('> .Container:nth-child(2)').removeClass('Hidden').parent().siblings('.Summary').removeClass('Activate').find('> .Container:nth-child(1)').removeClass('Purple').parent().find('> .Container:nth-child(2)').addClass('Hidden');
				Top = App.Calculate.Add(Self.parent()[0].offsetTop , Top);
			}else{
				Self.removeClass('Purple').parent().removeClass('Activate').find('> .Container:nth-child(2)').addClass('Hidden');
			}
			if(Boolean) App.Target.Frame.animate({
				scrollTop : Top ,
			} , 100);
			Boolean = true;
		}).then(() => {
			Objective.find('> .Summary:eq(0) > .Container:nth-child(1)').trigger('click');
		});
	}
	Twitter(Objective){
		App.Ajax.Twitter(App.Config.Query.Id , Response => {
			if(App.Verify.Empty(Response)) return false;
			this.Summary(Objective , Response);
			Objective.removeClass('Hidden').parent().parent().find('> .Switch > li[data-switch="Twitter"]').removeClass('Hidden');
			const Shuffle = App.Array.Shuffle([8250 , 8251 , 8252 , 8253 , 8254]);
			App.Module.Related(Objective , [
				App.Function.Language(Shuffle[0]) ,
				App.Function.Language(Shuffle[1]) ,
				App.Function.Language(Shuffle[2]) ,
			]);
		});
	}
	Whitepaper(Objective){
		App.Ajax.Whitepaper(App.Config.Query.Id , Response => {
			if(App.Verify.Empty(Response.Address) && App.Verify.Empty(Response.Analysis)) return false;
			if(!App.Verify.Empty(Response.Address)){
				Objective.append(App.Template.Container('button' , ['Flex' , 'Background-Gray Weight' , 'Overflow' , 'Hover-Orange'] , 6061 , {
					Link : Response.Address ,
				}));
				App.Event.Bind(Objective.find('> button') , Self => {
					App.Jump(Self.attr('data-link') , {
						Forward : 1 ,
					});
				});
			}
			this.Summary(Objective , Response.Analysis);
			Objective.removeClass('Hidden').parent().parent().find('> .Switch > li[data-switch="Whitepaper"]').removeClass('Hidden');
			App.Module.Related(Objective , [
				App.Function.Language(8200) ,
				App.Function.Language(8201) ,
				App.Function.Language(8202) ,
			]);
		});
	}
	New(Objective){
		App.Ajax.Bulletin(App.Config.Query.Id , Response => {
			if(App.Verify.Empty(Response)) return false;
			const Template = [];
			App.Each.Of(Response , Item => {
				App.Array.Push(Template , App.Template.Article(Item));
				return true;
			});
			Objective.append(App.Template.Container('ul' , ['Flex Flex-Column' , 'Overflow'] , null , null , App.Array.Join(Template , '')));
			new App.Function.Image();
			App.Function.Detail(Objective.find('> ul > .New > .Wicket > .Coin > li') , 'Program');
			App.Function.Detail(Objective.find('> ul > .New > .Wicket > .Title') , 'Bulletin');
			App.Event.Bind(Objective.find('> ul > .New > img') , Self => {
				Self.parent().find('> .Wicket > .Title').trigger('click');
			});
			Objective.removeClass('Hidden').parent().parent().find('> .Switch > li[data-switch="New"]').removeClass('Hidden');
		});
	}
	Community(Objective){
		Objective.append(App.Array.Join([
			App.Template.Container('div' , ['Faq Hidden' , 'Flex-Justify-Start Flex-Align-Start' , 'Overflow'] , 6051) ,
			App.Template.Container('div' , ['Talking Hidden' , 'Flex-Justify-Start Flex-Align-Start' , 'Overflow'] , 6052) ,
		] , ''));
		App.Ajax.Faq(App.Config.Query.Id , Response => {
			if(App.Verify.Empty(Response)) return false;
			const Template = [];
			App.Each.Of(Response , Item => {
				if(!App.Verify.Empty(Item.q) && !App.Verify.Empty(Item.a)) App.Array.Push(Template , App.Template.Container('div' , [
					'Summary' ,
					'Width' ,
					'Background' ,
					'Overflow' ,
				] , null , null , App.Array.Join([
					App.Template.Container('div' , ['Weight' , 'Flex-Justify-Start' , 'Hover-Green' , 'Overflow'] , Item.q) ,
					App.Template.Container('div' , ['Substance Hidden' , 'Overflow'] , null , null , Item.a) ,
				] , '')));
				return true;
			});
			if(App.Verify.Length(Template , 0)) return false;
			Objective.find('> .Faq').append(App.Array.Join(Template , ''));
			new App.Function.Image();
			let Boolean = false;
			App.Event.Bind(Objective.find('> .Faq > .Summary > .Container:nth-child(1)') , Self => {
				let Top = (App.Verify.Gt(App.Target.Frame.outerWidth() , 750) ? 815 : (App.Verify.Gt(App.Target.Frame.outerWidth() , 550) ? 711 : 613));
				if(Self.parent().find('> .Container:nth-child(2)').hasClass('Hidden')){
					Self.addClass('Purple').parent().addClass('Activate').find('> .Container:nth-child(2)').removeClass('Hidden').parent().siblings('.Summary').removeClass('Activate').find('> .Container:nth-child(1)').removeClass('Purple').parent().find('> .Container:nth-child(2)').addClass('Hidden');
					Top = App.Calculate.Add(Self.parent()[0].offsetTop , Top);
				}else{
					Self.removeClass('Purple').parent().removeClass('Activate').find('> .Container:nth-child(2)').addClass('Hidden');
				}
				if(Boolean) App.Target.Frame.animate({
					scrollTop : Top ,
				} , 100);
				Boolean = true;
			}).then(() => {
				Objective.find('> .Faq > .Summary:nth-child(1) > .Container:nth-child(1)').trigger('click');
			});
			Objective.removeClass('Hidden').find('> .Faq').removeClass('Hidden').parent().parent().parent().find('> .Switch > li[data-switch="Community"]').removeClass('Hidden');
		});
		App.Ajax.Talking(App.Config.Query.Id , Response => {
			if(App.Verify.Empty(Response)) return false;
			const Template = [];
			App.Each.Of(Response , Item => {
				App.Array.Push(Template , App.Template.Container('div' , ['Flex Flex-Column' , 'Overflow'] , null , null , App.Array.Join([
					App.Template.Container('div' , ['Width' , 'Substance' , 'Overflow'] , null , null , Item.Content) ,
					App.Template.Container('div' , ['Width Size-12 Gray' , 'Flex Flex-Justify-Between' , 'Overflow'] , null , null , App.Array.Join([
						App.Template.Container('div' , [
							'Author' ,
							'Flex Flex-Justify-Start' ,
							'Overflow' ,
						] , Item.Originate.Nickname , null , App.Template.Image(Item.Originate.Avatar)) ,
						App.Template.Container('div' , ['Flex Flex-Justify-End' , 'Overflow'] , App.Function.Friend.Date(Item.Time , '%m-%d %H:%i')) ,
					] , '')) ,
				] , '')));
				return true;
			});
			Objective.find('> .Talking').append(App.Array.Join(Template , ''));
			new App.Function.Image();
			Objective.removeClass('Hidden').find('> .Talking').removeClass('Hidden').parent().parent().parent().find('> .Switch > li[data-switch="Community"]').removeClass('Hidden');
		});
	}
	Ask(Objective , Language , Callable){
		Objective.append(App.Template.Container('div' , [
			'Asking Activate' ,
			'Background-Gray Omit' ,
			'Flex-Justify-Start' ,
			'Overflow' ,
		] , Language , null , App.Array.Join([
			App.Template.Input('text' , 'Message') ,
			App.Template.Container('button' , ['Activate' , 'Background' , 'Hover-Pointer' , 'Overflow']) ,
		] , '')));
		App.Event.Input(Objective.find('> .Asking > input') , Self => {
			if(App.Verify.Empty(Self.val())){
				Self.parent().addClass('Activate').find('> button').addClass('Activate');
			}else{
				Self.parent().removeClass('Activate').find('> button').removeClass('Activate');
			}
		});
		App.Event.Bind(Objective.find('> .Asking > button') , Self => {
			const Question = Self.parent().find('> input').val();
			if(Self.hasClass('Activate') || App.Verify.Empty(Question)) return false;
			Self.addClass('Activate').parent().addClass('Activate').find('> input').val('');
			if(App.Verify.Function(Callable)) Callable(Question);
		});
		App.Event.Quick(Objective.find('> .Asking > input') , Self => {
			Self.parent().find('> button').trigger('click');
		} , {
			Code : 13 ,
		});
	}
	Chat = new class {
		Showy(Objective){
			Objective.append(App.Template.Container('div' , [
				'Showy' ,
				'Shadow' ,
				'Background-White' ,
			] , null , null , App.Array.Join([
				App.Template.Container('button' , ['Close Hidden' , 'Background' , 'Hover-Pointer' , 'Overflow']) ,
				App.Template.Container('button' , ['Restart Hidden' , 'Weight' , 'Shadow' , 'Background-White' , 'Hover-Pointer' , 'Overflow'] , 6126) ,
				(App.Verify.Length(Objective.find('> .Bulletin') , 0) ? '' : App.Template.Container('div' , ['Summary' , 'Weight' , 'Shadow' , 'Background-White' , 'Hover-Orange' , 'Overflow'] , 6139)) ,
				App.Template.Container('div' , ['Head' , 'Weight' , 'Overflow'] , 6124) ,
				App.Template.Container('ul' , ['Dialog' , 'Flex Flex-Column' , 'Overflow']) ,
			] , '')));
			App.Event.Bind(Objective.find('> .Showy > .Summary') , Self => {
				App.Const.Summary = true;
				Self.parent().find('> .Asking > input').val(Self.attr('data-language')).parent().find('> button').removeClass('Activate').trigger('click');
			});
			App.Event.Bind(Objective.find('> .Showy > button') , Self => {
				Objective.find('> .Showy > .Dialog').empty();
				Objective.find('> .Showy > .Container:not(.Dialog)').addClass('Hidden');
				Objective.find('> .Showy > .Summary').removeClass('Hidden');
				Objective.find('> .Showy > .Head , > .Showy > .Asking').removeClass('Hidden');
				App.Target.Frame.animate({
					scrollTop : 0 ,
				} , 100);
			});
			App.Module.Ask(Objective.find('> .Showy') , 6125 , Message => {
				Objective.find('> .Showy > .Container:not(.Dialog)').addClass('Hidden');
				if(App.Verify.Length(Objective.find('> .Project') , 1)) Message = App.String.Concat(App.Array.Join([
					Objective.find('> .Project > .Head > .Name').text() ,
					App.String.Concat('(' , Objective.find('> .Project > .Head > .Symbol').text() , ')') ,
					' ' ,
				] , '') , Message);
				this.Submit(Objective.find('> .Showy > .Dialog') , {
					Problem : Message ,
					Expansion : (App.Verify.Length(Objective.find('> .Bulletin') , 0) ? {} : {
						Title : Objective.find('> .Bulletin > .Title').text() ,
						Content : Objective.find('> .Bulletin > .Substance').text() ,
					}) ,
				} , () => {
					Objective.find('> .Showy > button').removeClass('Hidden');
					App.Target.Frame.animate({
						scrollTop : 0 ,
					} , 100);
				});
			});
		}
		Event(Objective){
			App.Event.Bind(Objective.find('> .Tool > button') , Self => {
				if(Self.hasClass('Share')){
					App.Layer.Loading(App.Function.Language(7009)).then(async Layer => {
						const Clone = Self.parent().parent().clone();
						Clone.addClass('Clone').find('> .Tool , > .Hunt , > .Issue , > .Correct').addClass('Hidden');
						Self.parent().parent().parent().append(Clone);
						Self.parent().parent().parent().find('> .Clone').append(await this.Share());
						new App.Function.Image();
						App.Image.Capture(Self.parent().parent().parent().find('> .Clone')).then(Capture => {
							Self.parent().parent().parent().find('> .Clone').remove();
							App.Image.Download(Capture , App.Const.Prefix.Share);
							App.Layer.Close(Layer.Uniqid);
						});
					});
				}else if(Self.hasClass('Copy')){
					App.Function.Copy(App.Array.Join([
						App.Function.Language(6140) ,
						Self.parent().parent().find('> .Question > .Substance').text() ,
						'' ,
						App.Function.Language(6141) ,
						Self.parent().parent().find('> .Answer').text() ,
						'' ,
						App.Function.Language(6142) ,
						'' ,
						App.Const.Invitation ,
					] , '\n'));
				}else if(Self.hasClass('Delete')){
					const Button = {};
					Button[App.Function.Language(6121)] = false;
					Button[App.Function.Language(6143)] = async Uniqid => {
						App.Layer.Close(Uniqid , () => {
							App.Ajax.Chat.Delete(Self.parent().parent().attr('data-uuid') , Response => {
								App.Function.Layer.Success(6144 , () => {
									let Current = Self.parent().parent().next('li');
									if(App.Verify.Length(Current , 0)) Current = Self.parent().parent().prev('li');
									if(App.Verify.Length(Self.parent().parent().parent().find('> li') , 1)) Self.parent().parent().parent().addClass('Empty');
									Self.parent().parent().remove();
									if(App.Verify.Length(Current , 1)) App.Target.Frame.animate({
										scrollTop : App.Calculate.Sub(Current[0].offsetTop , 32) ,
									} , 100);
								});
							});
						});
					};
					App.Layer.Confirm(App.Function.Language(6145) , null , Button);
				}
			});
			App.Event.Bind(Objective.find('> .Hunt > button') , Self => {
				const Uuid = Self.parent().parent().attr('data-uuid');
				if(!App.Verify.Require(App.Const.Search[Uuid] , 'array')) return false;
				const Shuffle = App.Array.Shuffle(App.Const.Search[Uuid]);
				App.Each.Loop(0 , 3).Add(Index => {
					Self.parent().find(App.String.Concat('> .Container:nth-child(' , App.Calculate.Add(Index , 2) , ')')).attr('data-link' , Shuffle[Index].Link);
					Self.parent().find(App.String.Concat('> .Container:nth-child(' , App.Calculate.Add(Index , 2) , ') > .Container:nth-child(1)')).attr('data-language' , Shuffle[Index].Title);
					Self.parent().find(App.String.Concat('> .Container:nth-child(' , App.Calculate.Add(Index , 2) , ') > .Container:nth-child(2)')).attr('data-language' , Shuffle[Index].Content);
					Self.parent().find(App.String.Concat('> .Container:nth-child(' , App.Calculate.Add(Index , 2) , ') > .Container:nth-child(1) > img')).attr('src' , Shuffle[Index].Logo);
					return true;
				});
			});
			App.Event.Bind(Objective.find('> .Hunt > .Container:not(button)') , Self => {
				if(App.Verify.Empty(Self.attr('data-link'))) return false;
				App.Jump(Self.attr('data-link') , {
					Forward : 1 ,
				});
			});
			App.Event.Bind(Objective.find('> .Issue > button') , Self => {
				const Uuid = Self.parent().parent().attr('data-uuid');
				if(!App.Verify.Require(App.Const.Issue[Uuid] , 'array')) return false;
				const Shuffle = App.Array.Shuffle(App.Const.Issue[Uuid]);
				App.Each.Loop(0 , 3).Add(Index => {
					Self.parent().find(App.String.Concat('> .Container:nth-child(' , App.Calculate.Add(Index , 2) , ')')).text(Shuffle[Index]);
					return true;
				});
			});
			App.Event.Bind(Objective.find('> .Issue > .Container:not(button)') , Self => {
				if(App.Const.Chating) return false;
				if(Objective.parent().parent().hasClass('Showy')){
					const Text = Self.text();
					const Showy = Objective.parent().parent();
					Showy.find('> .Close').trigger('click');
					Showy.find('> .Asking > input').val(Text).parent().find('> button').removeClass('Activate').trigger('click');
				}else{
					this.Submit(Objective.parent() , {
						Problem : Self.text() ,
						Expansion : (App.Verify.Length(Self.parent().parent().find('> .Question > .Expansion') , 0) ? {} : {
							Title : Self.parent().parent().find('> .Question > .Expansion > .Container:nth-child(1)').text() ,
							Content : Self.parent().parent().find('> .Question > .Expansion > .Container:nth-child(2)').text() ,
						}) ,
					} , () => {
						let Top = App.Calculate.Sub(Objective.parent().find('> li:last-child')[0].offsetTop , 32);
						if(Objective.parent().parent().hasClass('Showy')) Top = 0;
						App.Target.Frame.animate({
							scrollTop : Top ,
						} , 100);
					});
				}
			});
		}
		Submit(Objective , Original , Callable){
			if(App.Const.Chating) return false;
			App.Const.Chating = true;
			Objective.append(this.Whole(App.Object.Assign(Original , {
				Answer : App.Function.Language(7008) ,
			})));
			this.ScrollDown(Objective , false);
			new App.Function.Image();
			this.Commit(Objective.find('> li:last-child') , Original , Status => {
				if(App.Verify.Function(Callable)) Callable(Status);
				App.Const.Chating = false;
			});
		}
		Commit(Objective , Original , Callable){
			if(!App.Verify.Boolean(App.Const.Summary)) App.Const.Summary = false;
			Original.Expansion.Summary = (App.Const.Summary ? 2 : 1);
			App.Const.Summary = false;
			App.Ajax.Chat.Commit(Original.Problem , Original.Expansion , Uuid => {
				Objective.attr('data-uuid' , Uuid).find('> .Answer > .Substance').text(App.Function.Language(6131));
				App.Request.Socket({
					Protocol : true ,
					Url : '/Socket' ,
					Open : Socket => {
						Socket.Send({
							Version : 1 ,
						});
					} ,
					Error : Socket => {
						Objective.find('> .Answer > .Substance').addClass('Red').text(App.Function.Language(6132));
						Callable(false);
					} ,
					Close : Socket => {
						if(!Objective.find('> .Answer > .Substance').hasClass('Red')){
							if(Objective.hasClass('Outputing')) return Callable(true);
							Objective.find('> .Answer > .Substance').addClass('Red').text(App.Function.Language(6133));
							Callable(false);
						}
					} ,
					Message : async (Response , Socket) => {
						if(App.Verify.Eq(Response.Code , 201)){
							const Body = {};
							Body.Uuid = Uuid;
							Socket.Send({
								Body : Body ,
								Application : {
									Module : 'Platform' ,
									Controller : 'Chat' ,
									Action : 'Update' ,
								} ,
								Header : {
									Secret : App.Const.Secret ,
									Signatrue : await App.Cypher.Md5(App.String.Concat((await App.Cypher.Md5(App.String.Replace(App.Object.Json(Body) , ' ' , ''))) , '.' , App.Const.Secret)) ,
								} ,
							});
							Objective.find('> .Answer > .Substance').addClass('Waiting');
						}else if(App.Verify.Eq(Response.Code , 200)){
							if(!App.Verify.Object(Response.Data) && !App.Verify.Confirm(Response.Data.Uuid , Objective.parent().find('> li:last-child').attr('data-id'))) return false;
							if(Objective.find('> .Answer > .Substance').hasClass('Waiting')) Objective.find('> .Answer > .Substance').removeClass('Waiting').addClass('Outputing').text('');
							Objective.find('> .Answer > .Substance').append(Response.Data.Content);
							if(App.Verify.Array(Response.Data.Search) && App.Verify.Array(Response.Data.Issue)){
								Objective.append(this.Tool());
								if(App.Verify.Require(Response.Data.Search , 'array')) Objective.append(this.Hunt(Response.Data.Uuid , Response.Data.Search));
								if(App.Verify.Require(Response.Data.Issue , 'array')) Objective.append(this.Issue(Response.Data.Uuid , Response.Data.Issue));
								new App.Function.Image();
							}
							this.ScrollDown(Objective.parent() , true);
						}else{
							if(App.Verify.Empty(Objective.find('> .Answer > .Substance').text())) Objective.find('> .Answer > .Substance').addClass('Red').text(App.Function.Language(6133));
							Socket.Close(() => {
								Callable(true);
								App.Module.Chat.Correct(Objective);
								this.Event(Objective);
							});
						}
					} ,
				});
			} , () => {
				Callable(false);
			});
		}
		ScrollDown(Objective , Boolean){
			if(Objective.parent().hasClass('Showy')){
				return false;
				if(App.Verify.Lt(App.Target.Frame.outerWidth() , 900)) return false;
				const Frame = Objective.parent().parent().parent().parent();
				if(!Boolean){
					Frame.animate({
						scrollTop : 0 ,
					} , 10);
				}else{
					if(App.Verify.Gt(Objective.parent().outerHeight() , 0)){
						const Height = App.Calculate.Sub(Frame.height() , 160 , Objective.parent().outerHeight());
						Frame.animate({
							scrollTop : (App.Verify.Gt(Height , 0) ? 0 : Math.abs(Height)) ,
						} , 10);
					}
				}
			}else{
				if(App.Verify.Gt(Objective[0].scrollHeight , 0)){
					const Frame = Objective.parent().parent().parent();
					Frame.animate({
						scrollTop : Objective[0].scrollHeight ,
					} , 10);
				}
			}
		}
		Whole(Original){
			return App.Template.Container('li' , [
				'Flex Flex-Column' , 'Width' , 'Overflow' ,
			] , null , (App.Verify.Require(Original.Uuid , 'string') ? {
				Uuid : Original.Uuid ,
			} : null) , App.Array.Join([
				this.Question(Original.Problem , Original.Expansion) ,
				this.Answer(Original.Answer) ,
				(App.Verify.Boolean(Original.Tool) && Original.Tool ? this.Tool() : '') ,
				(App.Verify.Require(Original.Coin , 'array') ? this.Coin(Original.Coin) : '') ,
				(App.Verify.Require(Original.Hunt , 'array') ? this.Hunt(Original.Uuid , Original.Hunt) : '') ,
				(App.Verify.Require(Original.Issue , 'array') ? this.Issue(Original.Uuid , Original.Issue) : '') ,
			] , ''));
		}
		Question(Problem , Expansion){
			return App.Template.Container('div' , ['Question' , 'Width' , 'Flex Flex-Column' , 'Overflow'] , null , null , App.Array.Join([
				App.Template.Container('div' , [
					'Author' ,
					'Width Size-12 Weight Gray' ,
					'Flex-Justify-Start' ,
					'Overflow' ,
				] , App.Const.User.Nickname , null , App.Template.Image(App.Const.User.Avatar)) ,
				App.Template.Container('div' , ['Substance' , 'Overflow'] , null , null , App.String.Replace(Problem , '{GPT}' , '')) ,
				(App.Verify.Require(Expansion , 'object') && App.Verify.Require(Expansion.Title , 'string') && App.Verify.Require(Expansion.Content , 'string') ? App.Template.Container('div' , [
					'Expansion' ,
					App.Function.Roll() ,
					(App.Verify.Confirm(App.Const.Frame , 'Bulletin') ? 'Hidden' : '') ,
					'Background-Gray Gray Size-12' ,
					'Overflow' ,
				] , null , null , App.Array.Join([
					App.Template.Container('div' , ['Overflow'] , null , null , Expansion.Title) ,
					App.Template.Container('div' , ['Substance' , 'Overflow'] , null , null , Expansion.Content) ,
				] , '')) : '') ,
			] , ''));
		}
		Answer(Original){
			return App.Template.Container('div' , ['Answer' , 'Width' , 'Flex Flex-Column' , 'Overflow'] , null , null , App.Array.Join([
				App.Template.Container('div' , [
					'Owl' ,
					'Width Background Size-12 Weight Blue' ,
					'Flex-Justify-Start' ,
					'Overflow' ,
				] , 10000) ,
				App.Template.Container('div' , ['Substance' , 'Overflow'] , null , null , Original) ,
			] , ''));
		}
		Tool(){
			return App.Template.Container('div' , ['Tool' , 'Flex Flex-Justify-End' , 'Width' , 'Overflow'] , null , null , App.Array.Join([
				App.Template.Container('button' , ['Share' , 'Background' , 'Hover-Pointer' , 'Overflow']) ,
				App.Template.Container('button' , ['Copy' , 'Background' , 'Hover-Pointer' , 'Overflow']) ,
				App.Template.Container('button' , [
					'Delete' , 'Background' , 'Hover-Pointer' , 'Overflow' ,
					(App.Verify.In(['Bulletin' , 'Program'] , App.Const.Frame) ? 'Hidden' : '') ,
				]) ,
			] , ''));
		}
		Coin(Original){
			const Template = [];
			App.Each.Of(Original , Item => {
				App.Array.Push(Template , App.Template.Container('div' , [
					'Background-Gray' ,
					'Omit' ,
					'Hover-Orange' ,
					'Overflow' ,
				] , Item.Symbol , {
					Id : Item.Id ,
				} , App.Template.Image(Item.Logo)));
				return true;
			});
			return App.Template.Container('div' , ['Coin' , 'Flex Flex-Justify-Between' , 'Size-12 Weight' , 'Overflow'] , 6128 , null , App.Array.Join(Template , ''));
		}
		Hunt(Uuid , Original){
			const Template = [];
			App.Each.Of(App.Array.Shuffle(Original) , Item => {
				App.Array.Push(Template , App.Template.Container('div' , [
					'Flex Flex-Column' ,
					'Hover-Orange' ,
					'Overflow' ,
				] , null , {
					Link : Item.Link ,
				} , App.Array.Join([
					App.Template.Container('div' , [
						'Omit' , 'Width Weight' , 'Flex-Justify-Start' , 'Overflow' ,
					] , Item.Title , null , (App.Verify.Require(Item.Logo , 'string') ? App.Template.Image(Item.Logo) : '')) ,
					App.Template.Container('div' , ['Omit' , 'Width Gray' , 'Flex-Justify-Start' , 'Overflow'] , Item.Content) ,
				] , '')));
				if(App.Verify.Length(Template , 3)) return false;
				return true;
			});
			if(App.Verify.Min(Original , 4)){
				App.Array.Splice(Template , 0 , 0 , App.Template.Container('button' , [
					'Flex' , 'Overflow' , 'Gray Size-12' , 'Hover-Black' ,
				] , 6161));
				App.Const.Search[Uuid] = Original;
			}
			return App.Template.Container('div' , ['Hunt' , 'Flex Flex-Justify-Between Flex-Wrap' , 'Size-12' , 'Overflow'] , 6129 , null , App.Array.Join(Template , ''));
		}
		Issue(Uuid , Original){
			const Template = [];
			App.Each.Of(App.Array.Shuffle(Original) , Item => {
				App.Array.Push(Template , App.Template.Container('div' , [
					'Hover-Orange' ,
					'Gray Flex-Justify-Start' ,
					'Overflow' ,
				] , null , null , Item));
				if(App.Verify.Length(Template , 3)) return false;
				return true;
			});
			if(App.Verify.Min(Original , 4)){
				App.Array.Splice(Template , 0 , 0 , App.Template.Container('button' , [
					'Flex' , 'Overflow' , 'Gray Size-12' , 'Hover-Black' ,
				] , 6161));
				App.Const.Issue[Uuid] = Original;
			}
			return App.Template.Container('div' , ['Issue' , 'Flex Flex-Column Flex-Align-Start' , 'Size-12' , 'Overflow'] , 6130 , null , App.Array.Join(Template , ''));
		}
		async Correct(Objective){
			Objective.append(App.Template.Container('div' , ['Correct' , 'Width' , 'Flex Flex-Column Flex-Align-Start' , 'Overflow'] , 6146 , null , App.Array.Join([
				App.Template.Label.Input(6147 , 'text' , 'Correct') ,
				App.Template.Container('div' , ['Star' , 'Flex' , 'Overflow']) ,
				App.Template.Container('button' , ['Submit' , 'White Background-Black Weight' , 'Overflow' , 'Hover-Pointer'] , 6148) ,
			] , '')));
			const Icon = {};
			Icon.Solid = await App.Icon.Solid('star');
			Icon.Regular = await App.Icon.Regular('star');
			Icon.Click = () => {
				App.Event.Bind(Objective.find('> .Correct > .Star > .icon-star') , Star => {
					const Score = App.Calculate.Add(Star.index() , 1);
					Star.parent().empty();
					App.Each.Loop(0 , Score).Add(() => {
						Objective.find('> .Correct > .Star').append(Icon.Solid);
						return true;
					});
					Objective.find('> .Correct > .Star > .icon-star').addClass('Regular');
					const Residue = App.Calculate.Sub(5 , Score);
					if(App.Verify.Gt(Residue , 0)) App.Each.Loop(0 , Residue).Add(() => {
						Objective.find('> .Correct > .Star').append(Icon.Regular);
						return true;
					});
					Icon.Click();
				});
			}
			App.Each.Loop(0 , 5).Add(() => {
				Objective.find('> .Correct > .Star').append(Icon.Regular);
				return true;
			});
			Icon.Click();
			App.Event.Bind(Objective.find('> .Correct > .Submit') , Self => {
				const Score = App.Length(Objective.find('> .Correct > .Star > .icon-star.Regular'));
				const Correct = Objective.find('> .Correct > .Label > input[name="Correct"]').val();
				if(!App.Verify.Between(Score , 1 , 5) && App.Verify.Empty(Correct)) return false;
				App.Ajax.Feedback.Dialog(Objective.attr('data-uuid') , Score , Correct , Response => {
					App.Function.Layer.Success(6149 , () => {
						Objective.find('> .Correct').remove();
					});
				});
			});
			App.Event.Input(Objective.find('> .Correct > .Label > input') , Self => {
				if(App.Verify.Empty(Self.val())){
					Self.parent().removeClass('Input');
				}else{
					Self.parent().addClass('Input');
				}
			});
		}
		async Share(){
			return App.Template.Container('div' , ['Share' , 'Flex Flex-Column' , 'Width' , 'Overflow'] , null , null , App.Array.Join([
				App.Template.Image(await App.Image.Qrcode({
					Text : App.Const.Invitation ,
				})) ,
				App.Template.Container('div' , ['Orange' , 'Weight' , 'Flex' , 'Overflow'] , null , null , App.Function.Language(9008)) ,
			] , ''));
		}
	}
}