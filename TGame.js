class TGame {

	//---------------------------------------  构造函数

	constructor (canvas) {
		
		//----------------------------------------  成员变量

		this.canvas  = document.querySelector('#' + canvas)
		this.fps 	 = 30
		this.gravity = 10
		this.__src   = {
			//图片资源
			pic: "imgs/atlas.png",
			pos: {
				bg_day: {
					x: 0,
					y: 0,
					end_x: 288,
					end_y: 512,
				},
				bg_neight: {

				},
				text_ready: {
					x: 589,
					y: 117,
					end_x: 777,
					end_y: 170,
				},
				tutorial: {
					x: 584,
					y: 220,
					end_x: 699,
					end_y: 281,
				},
				land: {
					x: 584,
					y: 0,
					end_x: 922,
					end_y: 112,
				},
				title: {
					x: 584,
					y: 0,
					end_x: 922,
					end_y: 112,
				},
				bird0_0: {
					x: 6,
					y: 980,
					end_x: 40,
					end_y: 1007,
				},
				bird0_1: {
					x: 62,
					y: 980,
					end_x: 96,
					end_y: 1007,
				},
				bird0_2: {
					x: 118,
					y: 980,
					end_x: 152,
					end_y: 1007,
				},
				pipe_down: {
					x: 112,
					y: 647,
					end_x: 165,
					end_y: 966,
				},
			}
		}
		this.__img = Functions.imgFormPath( this.__src.pic )
	}

	//------------------------------------------- 成员函数

	render () {
		//加载游戏
		var pic_pos 	= this.__src.pos
		this.bg_day 	= new Element(this.canvas, pic_pos.bg_day)
		this.text_ready = new Element(this.canvas, pic_pos.text_ready)
		this.tutorial 	= new Element(this.canvas, pic_pos.tutorial)
		this.land 		= new Element(this.canvas, pic_pos.land)
		this.title 		= new Element(this.canvas, pic_pos.title)
		this.bird0_0	= new Element(this.canvas, pic_pos.bird0_0)
		this.bird0_1	= new Element(this.canvas, pic_pos.bird0_1)
		this.bird0_2	= new Element(this.canvas, pic_pos.bird0_2)
		this.pipe_down  = new Element(this.canvas, pic_pos.pipe_down)
		this.log 		= console.log.bind()

		this.text_ready.x = (this.canvas.width - this.text_ready.width) / 2
		this.text_ready.y = 60
		this.tutorial.x   = (this.canvas.width - this.tutorial.width) / 2
		this.tutorial.y   = 240
		this.land.y 	  = this.canvas.height - this.land.height
		this.land.x 	  = 0
		this.bird0_0.x 	  = (this.canvas.width - this.bird0_0.width) / 2 
		this.bird0_0.y 	  = 200
		this.bird0_1.x 	  = (this.canvas.width - this.bird0_0.width) / 2 
		this.bird0_1.y 	  = 200
		this.bird0_2.x 	  = (this.canvas.width - this.bird0_0.width) / 2 
		this.bird0_2.y 	  = 200
		this.pipe_down.x  = this.canvas.width - 60
		this.pipe_down.y  = 0
		
		this.bg_day.draw()
		this.tutorial.draw()
		this.land.draw()
		this.text_ready.draw()
		this.bird0_0.draw()

		//地板动画
		var off = 0, that = this
		this.land_animate_timer = setInterval(function () {
			if(off >= 40) {
				off = 0
				that.land.move_right(40)
			}else{
				off += 2
				that.land.move_right(-2)
			}
			that.land.draw()
		}, 1000/this.fps)
		//飞鸟动画
		this.bird0 = [this.bird0_0, this.bird0_1, this.bird0_2]
		var index = 0,
			that  = this
		this.birdfly_animate_timer = setInterval(function () {
			index++
			that.bg_day.clear()
			that.bg_day.draw()
			that.bird0[index%3].draw()
			that.tutorial.draw()
			that.text_ready.draw()
			that.land.draw()
		}, 230)
	}

	update () {
		//更新游戏场景
		var index  = 0,
			cnt    = 0,
			that   = this
		this.speed = 0
		this.birdfly_animate_timer = setInterval(function () {
			that.speed += (that.gravity) * (that.fps / 1000)
			cnt++ 
			if(cnt%9 == 0)
				index++
			that.bg_day.clear()
			that.bg_day.draw()
			for(var bird in that.bird0){
				if (that.bird0[bird].y + that.speed >= that.canvas.height - 137){
					that.bird0[bird].y = that.canvas.height - 137
					continue
				}
				that.bird0[bird].move_down(that.speed)
			}
			that.bird0[index%3].draw()
			that.land.draw()
			that.pipe_down.draw()
		}, 1000/that.fps)
	}

	start () {
		//开始游戏
		clearInterval(this.birdfly_animate_timer)
		var that = this
		document.onkeydown = function (e) {
			if(e.key == " "){
				that.speed = 0
				for(var bird in that.bird0)
					that.bird0[bird].jump()
			}
		}

		this.update()

		setTimeout(function () {
			that.pipe_down.draw()
		}, 2000)
	}

	gameover () {
		//游戏结束
	}
}