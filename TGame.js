class TGame {

	//---------------------------------------  构造函数

	constructor (canvas) {
		this.canvas = document.querySelector('#' + canvas)

		//----------------------------------------  成员变量

		this.__src = {
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
					y: 182,
					end_x: 699,
					end_y: 281,
				},
			}
		}
		this.__img = Functions.imgFormPath( this.__src.pic )

	}

	//------------------------------------------- 成员函数

	render () {
		//加载游戏
	}

	start () {
		//开始游戏
	}

	update () {
		//更新游戏场景
	}

	gameover () {
		//游戏结束
	}
}