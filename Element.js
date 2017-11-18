class Element {

	//---------------------------------------  构造函数

	constructor ( canvas, e ) {

		//---------------------------------------  成员变量

		this.__img 	 	 = Functions.imgFormPath( "imgs/atlas.png" )
		this.canvas  	 = canvas
		this.x 		 	 = 0 			  //元素在画板中的坐标
		this.y 		 	 = 0
		this.sx 	 	 = e.x  		  //元素在素材中裁剪的起点坐标
		this.sy 	 	 = e.y
		this.s_width 	 = e.end_x - e.x		  //元素在素材中裁剪的终点坐标
		this.s_height 	 = e.end_y - e.y
		this.width 	 	 = e.end_x - e.x  //元素在画板中的宽高
		this.height  	 = e.end_y - e.y
		this.context 	 = this.canvas.getContext('2d')
		this.animate 	 = {}

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
		that.context.drawImage(
			that.__img,
			that.sx,
			that.sy,
			that.s_width,
			that.s_height,
			that.x,
			that.y,
			that.width,
			that.height,
		)

		this.__img.onload = function () {
			that.context.drawImage(
				that.__img,
				that.sx,
				that.sy,
				that.s_width,
				that.s_height,
				that.x,
				that.y,
				that.width,
				that.height,
			)
		}
	}

	move_right(n) {
		//向右移动
		this.x += n
	}

	move_down(n) {
		//向下移动
		this.y += n
	}

	jump() {
		var target 	= 50,
			fps 	= 30,
			cnt 	= 0,
			speed  	= 20, //初速度
			that 	= this,
			timer 	= setInterval(function () {
				if (cnt >= target) clearInterval(timer)
				that.y -= speed
				cnt += speed
				speed -= 1
			}, 1000 / fps)
		return timer
	}

	update () {
		//更新元素
		this.clear()
		this.draw()
	}

	clear() {
		//清除自己
		this.context.clearRect( this.x, this.y, this.width, this.height )
	}

	//-------------------------------------------  存值函数
}