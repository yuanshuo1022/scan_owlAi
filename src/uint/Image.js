export default new class {
	#Loop(Canvas , Context , Current , Original , Resolve){
		App.Each.Loop(Current , App.Length(Original)).Add(Index => {
			const Data = Original[Index];
			if(App.Verify.Require(Data.Url , 'string')){
				this.Load(Data.Url).then(Image => {
					Context.drawImage(Image , 0 , 0 , App.Check(Data.Width , 'PositiveInteger' , Image.width) , App.Check(Data.Height , 'PositiveInteger' , Image.height) , App.Check(Data.Left , 'PositiveInteger' , 0) , App.Check(Data.Top , 'PositiveInteger' , 0) , App.Check(Data.Width , 'PositiveInteger' , Image.width) , App.Check(Data.Height , 'PositiveInteger' , Image.height));
					if(App.Verify.Length(Original , App.Calculate.Add(Index , 1))) return Resolve(Canvas.toDataURL('image/jpeg'));
					this.#Loop(Canvas , Context , App.Calculate.Add(Index , 1) , Original , Resolve);
				});
				return false;
			}else if(App.Verify.Require(Data.Text , 'string')){
				Context.fillStyle = App.Check(Data.Color , 'String' , '#23292e');
				Context.textAlign = App.Check(Data.Align , 'String' , 'center');
				Context.font = App.Array.Join([
					'normal' ,
					App.Check(Data.Weight , 'PositiveInteger' , 400) ,
					App.String.Concat(App.Check(Data.Size , 'PositiveInteger' , 14) , 'px') ,
					'Courier New' ,
				] , ' ');
				Context.fillText(Data.Text , App.Check(Data.Left , 'PositiveInteger' , 0) , App.Check(Data.Top , 'PositiveInteger' , 0));
				if(App.Verify.Length(Original , App.Calculate.Add(Index , 1))) return Resolve(Canvas.toDataURL('image/jpeg'));
				return true;
			}
		});
	}
	Canvas(Width , Height , Method){
		const Canvas = document.createElement('canvas');
		Canvas.width = Width;
		Canvas.height = Height;
		const Context = Canvas.getContext('2d');
		Context.rect(0 , 0 , Canvas.width , Canvas.height);
		if(App.Verify.Confirm(Method , 'png')){
			Context.fillStyle = '#fff0';
		}else if(App.Verify.Confirm(Method , 'jpeg')){
			Context.fillStyle = '#fff';
		}else if(App.Verify.String(Method)){
			Context.fillStyle = Method;
		}
		Context.fill();
		return [Canvas , Context , App.String.Concat('image/' , Method)];
	}
	Load(Original){
		return new Promise((Resolve , Reject) => {
			const Image = new window.Image();
			Image.crossOrigin = 'anonymous';
			Image.src = Original;
			Image.onload = () => {
				Resolve(Image);
			};
			Image.onerror = () => {
				Resolve(false);
			};
		});
	}
	Download(Original , Filename){
		const A = document.createElement('a');
		A.href = Original;
		A.download = Filename;
		A.setAttribute('type' , 'application/octet-stream');
		document.body.appendChild(A);
		A.click();
		document.body.removeChild(A);
		return true;
	}
	async Crop(Original){
		if(!App.Verify.Object(Original)) Original = {};
		const Image = await this.Load(Original.Url);
		const [Canvas , Context , Method] = this.Canvas(App.Check(Original.Width , 'PositiveInteger' , Image.Width) , App.Check(Original.Height , 'PositiveInteger' , Image.Height) , App.Check(Original.Method , 'String' , 'jpeg'));
		Context.drawImage(Image , App.Check(Original.Left , 'PositiveInteger' , 0) , App.Check(Original.Top , 'PositiveInteger' , 0) , Canvas.width , Canvas.height , 0 , 0 , Canvas.width , Canvas.height);
		return Canvas.toDataURL(Method);
	}
	async Telescoping(Original){
		if(!App.Verify.Object(Original)) Original = {};
		const Image = await this.Load(Original.Url);
		const [Canvas , Context , Method] = this.Canvas(App.Check(Original.Width , 'PositiveInteger' , Image.Width) , App.Check(Original.Height , 'PositiveInteger' , Image.Height) , App.Check(Original.Method , 'String' , 'jpeg'));
		Context.drawImage(Image , 0 , 0 , Canvas.width , Canvas.height);
		return Canvas.toDataURL(Method);
	}
	async Compress(Original){
		if(!App.Verify.Object(Original)) Original = {};
		const Image = await this.Load(Original.Url);
		const [Canvas , Context , Method] = this.Canvas(Image.Width , Image.Height , App.Check(Original.Method , 'String' , 'jpeg'));
		Context.drawImage(Image , 0 , 0 , Canvas.width , Canvas.height);
		return Canvas.toDataURL(Method , App.Number.Convert(App.Number.Fixed(App.Calculate.Div(App.Check(Original.Scale , 'PositiveInteger' , 90) , 100) , 2)));
	}
	async Base64(Original){
		if(!App.Verify.Object(Original)) Original = {};
		const Image = await this.Load(Original.Url);
		const [Canvas , Context , Method] = this.Canvas(Image.Width , Image.Height , App.Check(Original.Method , 'String' , 'jpeg'));
		Context.drawImage(Image , 0 , 0 , Canvas.width , Canvas.height);
		return Canvas.toDataURL(Method);
	}
	async Poster(Original){
		if(!App.Verify.Object(Original)) Original = {};
		const [Canvas , Context] = this.Canvas(App.Check(Original.Width , 'PositiveInteger' , 200) , App.Check(Original.Height , 'PositiveInteger' , 400) , App.Check(Original.Background , 'String' , 'jpeg'));
		return this.#Loop(Canvas , Context , 0 , App.Check(Original.Data , 'Object' , []) , App.Check(Original.Success , 'Function' , () => {}));
	}
	Qrcode(Original){
		if(!App.Verify.Object(Original)) Original = {};
		return App.Qrcode().then(async Module => {
			const Qrcode = Module({
				width : App.Check(Original.Width , 'PositiveInteger' , 200) ,
				height : App.Check(Original.Height , 'PositiveInteger' , 200) ,
				foreground : App.Check(Original.Foreground , 'String' , '#23292e') ,
				background : App.Check(Original.Background , 'String' , '#fff') ,
				img : 2 ,
				text : App.Check(Original.Text , 'String' , '') ,
			});
			if(App.Verify.Empty(Original.Logo)) return Qrcode;
			const Image = await this.Load(Qrcode);
			const [Canvas , Context] = this.Canvas(Image.width , Image.height , 'png');
			Context.drawImage(Image , 0 , 0 , Canvas.width , Canvas.height);
			const Logo = await this.Load(Original.Logo);
			Context.drawImage(Logo , window.Math.floor(App.Calculate.Div(App.Calculate.Sub(Image.width , 50) , 2)) , window.Math.floor(App.Calculate.Div(App.Calculate.Sub(Image.height , 50) , 2)) , 50 , 50);
			return Canvas.toDataURL('image/jpeg');
		});
	}
	Capture(Original){
		return App.Html2Canvas().then(async Module => {
			const Canvas = await Module(Original[0]);
			return Canvas.toDataURL('image/jpeg');
		});
	}
}