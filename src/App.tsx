import { defineComponent } from 'vue';
import { RouterView } from "vue-router";
// Initialization App main
// Vue tsx development model
// https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
export default defineComponent({
	name: 'App',
	setup() {
		return () => <RouterView></RouterView>;
	}
});