<template>
	<VFigure v-if="figure" :payload="figure"></VFigure>
</template>
<script>

import Konva from 'konva'
import Figure from './Figure'

export default{
	name: 'cell',
	props: ['x','y','size','color','index'],
	mounted(){
		this.instance = new Konva.Rect({
					x: this.x,
					y: this.y,
					width: this.size,
					height: this.size,
					fill: this.color
				});
		this.instance.on('mousedown', () =>  {
	      	if(this.attach){
	      		const PAWN = 'PAWN'
				this.addFigure(PAWN);
	      	}
	    });


		this.$parent.$on('ROOT_LAYER_CREATE', (layer, stage) => {
			this.layer = layer;
			this.layer.add(this.instance);
			this.layer.draw();
			this.attach = true;
			this.$emit('CREATE_CELL', this.instance)
		});

	},
	data(){
		return {
			attach: false, // attach root layer
			figure: null,
			layer: null,
			instance: null
		}
	},
	methods:{
		addFigure(type){
			if(this.attach)
				this.figure = {
					x: this.x,
					y: this.y,
					size: this.size,
					type: type,
					layer: this.layer
				}
		}
	},
	components:{
		'VFigure': Figure
	}
}
</script>