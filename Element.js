class Element {

	//---------------------------------------  构造函数

	constructor ( canvas, e ) {

		//---------------------------------------  成员变量

		this.__img 	 = Functions.imgFormPath( "imgs/atlas.png" )
		this.canvas  = document.querySelector("#" + canvas)
		this.x 		 = 0
		this.y 		 = 0
		this.sx 	 = e.x
		this.sy 	 = e.y
		this.end_x 	 = e.end_x
		this.end_y 	 = e.end_y
		this.width 	 = e.end_x - e.x
		this.height  = e.end_y - e.y
		this.context = this.canvas.getContext('2d')
		this.animate = {}

		//------------------------------------------  动画

		this.animate.scale = function () {
			//元素的缩放动画
		}
		this.animate.transform = function () {
			//元素的变换动画
		}
	}

	//--------------------------------------- 成员函数

	draw () {
		//画出此元素
		var that = this
		that.context = that.canvas.getContext('2d')

		this.__img.onload = function () {
			that.context.drawImage(
				that.__img,
				0,
				0,
				that.width,
				that.height,
				that.x,
				that.y,
				that.width,
				that.height,
			)
		}
	}

	update () {
		//更新元素

		this.context = this.canvas.getContext('2d')
		this.context.clearRect( this.x, this.y, this.width, this.height )
		this.draw()
	}

	//-------------------------------------------  存值函数
	set x (v) {
		this.update()
	}

	set y (v) {
		this.update()
	}
}