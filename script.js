document.addEventListener("DOMContentLoaded", ready);

function ready(){
	let chess = new Chess();
	let figure = [
		'rook',
		'horse',
		'elephant',
		'queen',
		'king',
		'elephant',
		'horse',
		'rook'
	]
	for(let k=0;k<8;k++)
			chess.grid[0][k].addFigure(figure[k],"black");
	for(let k=0;k<8;k++)
		chess.grid[1][k].addFigure("pawn","black");
	// for(let i=0;i<2;i++)
	// 	for(let k=0;k<8;k++)
	// 		chess.grid[i][k].addFigure("pawn","black");


	for(let k=0;k<8;k++)
			chess.grid[7][k].addFigure(figure[k],"white");
	for(let k=0;k<8;k++)
		chess.grid[6][k].addFigure("pawn","white");
		//chess.grid[4][3].addFigure("pawn","white");
}