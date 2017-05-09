<template>
	
</template>

<script>
import Konva from 'konva'

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
				this.instance.fill('#6fa0ce'); 
				this.instance.draw()	      	
	      	}
	    });
	    this.instance.on('mouseup', () => {
	    	if(this.attach){
	    		this.instance.fill(this.color);
	    		this.instance.draw()
	    	}
	    });
		this.$parent.$on('ROOT_LAYER_CREATE', (layer, stage) => {
			this.layer = layer;
			this.layer.add(this.instance);
			this.layer.draw();
			this.attach = true;
		});
	},
	data(){
		return {
			attach: false, // attach root layer
			layer: null,
			instance: null
		}
	}
}
</script>