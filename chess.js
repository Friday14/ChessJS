function Chess()
{
	let sizeGrid = 8;
	this.grid = Array();
	//this.xGridLabel = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	this.collection = {
		figure: [],
	};
	let activeFigure = null;
	let teamSteep = "white";
	let self = this; 

	this.createGrid = function(){
		let grid = document.createElement("div");
		let color;

		grid.classList.add("grid");
		document.body.appendChild(grid);
		let xGrid = this.xGridLabel;

		for(let i = 0;i < 8; i++){
			color = (i %2 == 0) ? 'white' : 'black';
			let lineCells  = {};
			for (var k= 0; k < 8; k++) {
				let cell = new Cell(i + '_' + k);
				//let key = xGrid[k];
				lineCells[ k ] = cell;	
				grid.appendChild( cell.createElement(color) );				
				color = (color == 'white')? 'black' : 'white';				
			}
			this.grid.push(lineCells);
		}
	}


	function Cell(cellId){
		this.figure = null;
		this.DOMElement = null;
		this.createElement = function(color){
			let elem = document.createElement("div");
			elem.classList.add('cell');
			elem.classList.add(color);
			this.DOMElement = elem;
			this.DOMElement.id = cellId;

			// Ставим обработчик нажатия на все созданные поля
			this.DOMElement.onclick = function(target){
				
				let thisCell = Cell.getCellById(this.id); // Клетка на которую кликнули.
					Cell.setActive(thisCell);
				
				if(activeFigure != null && thisCell.figure == null|| 
					activeFigure != null && 
					thisCell.figure && thisCell.figure.color != activeFigure.color){
					
					let currentCell = Cell.getCellById(activeFigure.dom.parentNode.id);

					if(Cell.onMoveFigure(activeFigure, currentCell, thisCell)){
						activeFigure.dom.classList.remove("select");
						activeFigure = null;
						teamSteep = (teamSteep =="white")?"black":"white";
					}
				}
			}

			return elem;
		}


		this.addFigure = function(figureName, color){
			this.figure = new Figure(figureName, color);
			this.DOMElement.appendChild(this.figure.dom); 
		}

		this.moveFigure = function(figure){
			//this.DOMElement.appendChild(figure);
			this.figure = figure;
			this.DOMElement.appendChild(figure.dom);
		}

		this.getFigure = function(){
			if(this.DOMElement.querySelector(".figure") == null) return null;
			return self.collection.figure[ parseInt(this.DOMElement.querySelector(".figure").id) + 1];
		}

		this.getPos = function(){
			let pos = this.DOMElement.id.split('_');
			return { 'x': pos[1], 'y' : pos[0]}
		}

		this.deleteFigure = function(){
			this.getFigure().dom.parentNode.removeChild( this.getFigure().dom );
			console.log(this);
		}

		Cell.setActive = function(cell){
			if(cell.figure && teamSteep == cell.figure.color){
				if(activeFigure)
					activeFigure.dom.classList.remove("select");

				cell.figure.dom.classList.add("select");
				activeFigure = cell.figure;
			}
		}


		Cell.onMoveFigure = function(figure, currentCell, nextCell){
			let isRules = figure.type.isRules(currentCell.getPos(), nextCell.getPos());
			
			// Проверяем соответсвует ли ход правилам хода фигуры
			if(Cell.checkCleanWay(figure, currentCell.getPos(), nextCell.getPos()))
			if(isRules){
				console.log("figure move");
				currentCell.figure = null;
				// atack
				if(nextCell.getFigure() != null && figure.color != nextCell.getFigure().color)
					nextCell.deleteFigure();

				nextCell.moveFigure(figure);
				return true;
			}
		}


		Cell.getCellById = function(elementId){
			let id = elementId.split('_');
			let cell = self.grid[ id[0] ][ id[1] ];
			return cell;
		}

		Cell.checkCleanWay = function(figure, curPos, endPos){
			
			if(figure.name == "horse")
				return true;

			let end = false
			while(!end){
				if(curPos.x != endPos.x)
					if(curPos.x > endPos.x)
						curPos.x--;
					else curPos.x++;
				

				if(curPos.y != endPos.y)
					if(curPos.y > endPos.y)
						curPos.y--;
					else curPos.y++;

				let y = curPos.y,
				x = curPos.x;

				if(curPos.x == endPos.x && curPos.y == endPos.y)
					end = true;

				console.log('Проверяем: ',x, y );
				if(x != endPos.x ||  y != endPos.y)
				if(self.grid[y][x].getFigure() && self.grid[y][x].getFigure()  != figure){
					console.log('Фигура на пути.', self.grid[y][x].getFigure());
					return false;
				}

			}
			return true;
		}
	}


	function Figure( figureName, color ){
		let pawn = {
			text:'♟',
			firstUp: 2,
			isRules: function(curPos, nextPos){
				let figure = activeFigure; 
				// Ход назад запрещен
				if(figure.color == "black" && curPos.y > nextPos.y) return;
				if(figure.color == "white" && curPos.y < nextPos.y) return;
				// При первом ходе можно пройти через две клетки
				let stepUp = (this.firstUp != null) ? this.firstUp : 1;

				let twoFigure = self.grid[nextPos.y][nextPos.x].getFigure();

				// Проверяем можно ли перейти на нажатую клетку
				if(curPos.x == nextPos.x && Math.abs(curPos.y - nextPos.y) <= stepUp && !twoFigure) {
					this.firstUp = null;
					return true;
				}

				if(Math.abs(curPos.y - nextPos.y) == 1 && Math.abs(curPos.x - nextPos.x) == 1 ){					
					if(twoFigure && twoFigure.color != figure.color)
						return true;
					}

				
			}
		};

		// ладья
		let rook = {
			text:'♜',
			isRules: function(curPos, nextPos){

				if(curPos.x == nextPos.x || curPos.y == nextPos.y)
					return true;
			}
		}

		let horse = {
			text: '♞',
			isRules: function(curPos, nextPos){
				if(Math.abs(nextPos.y - curPos.y) == 2 && Math.abs(curPos.x - nextPos.x) == 1)
					return true;
				if(Math.abs(nextPos.x - curPos.x) == 2 && Math.abs(curPos.y - nextPos.y) == 1)
					return true;
			}
		}

		let elephant = {
			text: '♝',
			isRules: function(curPos, nextPos){
				if(Math.abs(nextPos.y - curPos.y) == Math.abs(curPos.x - nextPos.x))
					return true;
			}
		}

		let king = {
			text: '♚',
			isRules: function(curPos, nextPos){
				if(Math.abs(nextPos.y - curPos.y) <= 1 && Math.abs(nextPos.x - curPos.x) <= 1)
					return true;
			}
		}
		let queen = {
			text: '♛',
			isRules: function(curPos, nextPos){
				if(Math.abs(nextPos.y - curPos.y) == Math.abs(curPos.x - nextPos.x))
					return true;
				if(Math.abs(nextPos.y - curPos.y) == 0 || Math.abs(nextPos.x - curPos.x) == 0)
					return true;
			}
		}

		let id = self.collection.figure.length- 1;

		this.dom = document.createElement("div");
		this.dom.classList.add("figure");
		this.dom.classList.add(color);
		this.dom.id = id;

		this.color = color;
		this.name = figureName;
		this.type = getObjFigure(figureName);
		this.Text =  this.type.text;

		this.dom.innerHTML = this.Text;
		self.collection.figure.push(this); // коробок с фигурами

		function getObjFigure(figureName, color){
			return eval(figureName);
		}
	}

// construct
	this.createGrid();
}