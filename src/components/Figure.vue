<template>

</template>

<script>
	import Konva from 'konva'
	export default{
		props: ['payload'],
		mounted(){
			// @ TODO Дописать
			// this.instance = new Konva.i
			// this.$parent.$on('ROOT_LAYER_CREATE', (layer) => {
			// 	this.layer = layer;
			// 	this.layer.add(this.instance);
			// 	this.layer.draw();
			// 	this.attach = true;
			// })
			console.log('Figure create')
			let imageObj = new Image();
    		imageObj.onload = () => {
      			this.instance = new Konva.Image({
        			x: this.x,
        			y: this.y,
			        image: imageObj,
			        width: this.size,
			        height: this.size
      			});
		      // add the shape to the layer
		      this.layer.add(this.instance).draw();
   			};	
    		imageObj.src = 'http://izumrudni.berezin.it/storage/app/media/pawn.png';
		},
		data(){
			return {
				instance: null,
				layer: this.payload.layer,
				x: this.payload.x,
				y: this.payload.y,
				size: this.payload.size,
				type: this.payload.type,
			}
		}
	}
</script>