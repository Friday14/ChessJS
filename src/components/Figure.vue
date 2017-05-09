<template>

</template>

<script>
	import Konva from 'konva'
	export default{
		props: ['x','y','size','color','index'],
		mounted(){
			// @ TODO Дописать
			// this.instance = new Konva.i
			this.$parent.$on('ROOT_LAYER_CREATE', (layer) => {
				this.layer = layer;
				this.layer.add(this.instance);
				this.layer.draw();
				this.attach = true;
			})
		},
		data(){
			return {
				instance: null,
				layer: null,
				attach: false,
			}
		}
	}
</script>