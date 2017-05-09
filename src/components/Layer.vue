<template>
	<div>
		<div style=" margin-left:250px"id="stage">
			<div v-for="y in cell">
				<Cell 
					ref="cells"
					v-for="x in cell"
					:key="x + y"
					:stage="stage" 
					:x="x * getSize()"
					:y="y * getSize()"
					:color="getColor(x,y)"
					:size="getSize()"/>
				</Cell>
			</div>
		</div>
	</div>
</template>

<script>
import Konva from 'konva'
import Cell from './Cell'

export default {
	mounted(){
		this.stage = new Konva.Stage({
			container: 'stage',
			width: this.getSize() * this.countCell,
			height: this.getSize() * this.countCell,
		});
		const size = window.innerWidth/ 24 
		
		this.layer = new Konva.Layer();
		this.stage.add(this.layer);
		console.log('mounted')
		this.$emit('ROOT_LAYER_CREATE', this.layer, this.stage)
		this.loadFigures()
	},
	data () {
		return {
			stage : null,
			layer : null,
			countCell: 8,
		}
	},
	computed:{
		cell(){ let ar = []; for(let i= 0; i<= this.countCell; i++) ar.push(i); return ar; }
	},
	methods:{
		getColor(x, y){
			return ( (x % 2) == (y % 2) ) ? 'silver' : 'black';
		},
		getSize(){
			return window.innerWidth/ 24;
		},
		loadFigures(){
			/* Simple Load Pawn Figures */
			this.$refs.cells.slice(8,17).map( (item) => item.addFigure('PAWN') )

			let count = this.$refs.cells.length;

			this.$refs.cells.slice(count - 18 - 9, count - 18).map( (item) => item.addFigure('PAWN') )
			
			console.log(this.$refs.cells)
		}
	},
	components:{
		Cell: Cell
	}
}
</script>
