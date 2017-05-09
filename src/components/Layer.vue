<template>
	<div>
		<div style=" margin-left:250px"id="stage">
			<div v-for="y in cell">
				<Cell v-for="x in cell"
					:key="x + y"
					:stage="stage" 
					:x="(x - 1) * getSize()"
					:y="(y - 1) * getSize()"
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
		}
	},
	components:{
		Cell: Cell
	}
}
</script>
