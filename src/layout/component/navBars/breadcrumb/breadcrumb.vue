<template>
	<div class="layout-navbars-breadcrumb" v-show="getThemeConfig.isBreadcrumb">
		<div style="flex:6;display: flex;align-items: center;height:100%;">
			<i
				class="layout-navbars-breadcrumb-icon"
				:class="getThemeConfig.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
				@click="onThemeConfigChange"
			></i>
			<el-breadcrumb class="layout-navbars-breadcrumb-hide">
				<transition-group name="breadcrumb" mode="out-in">
					<el-breadcrumb-item v-for="(v, k) in breadcrumbList" :key="v.meta.title">
						<span v-if="k === breadcrumbList.length - 1" class="layout-navbars-breadcrumb-span">
							<i :class="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon"></i>{{ (v.meta.title) }}
						</span>
						<a v-else @click.prevent="onBreadcrumbClick(v)">
							<i :class="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon"></i>{{ (v.meta.title) }}
						</a>
					</el-breadcrumb-item>
				</transition-group>
			</el-breadcrumb>
		</div>
		<div style="flex:6;height:100%;display: flex;align-items: center;justify-content: flex-end;padding-right: 40px;">
			<el-image
				style="width: 40px; height: 80%;border-radius: 50%;margin-right: 15px;"
				src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
				fit="cover">
	 		</el-image>
			<el-dropdown>
				<span class="el-dropdown-link">
					下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
					<el-dropdown-item>个人信息</el-dropdown-item>
					<el-dropdown-item>修改密码</el-dropdown-item>
					<el-dropdown-item divided>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, getCurrentInstance, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter,RouteRecordRaw } from 'vue-router';
import { useStore } from 'store/index';
import type { AppRouteRecordRaw } from 'store/interface/index';
  interface State {
		breadcrumbList:AppRouteRecordRaw[]
		routeSplit:string[]
		routeSplitFirst: string
		routeSplitIndex: number
  }
export default {
	name: 'layoutBreadcrumb',
	setup() {
		// const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive<State>({
			breadcrumbList: [],
			routeSplit: [],
			routeSplitFirst: '',
			routeSplitIndex: 1,
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig;
		});
		// 面包屑点击时
		const onBreadcrumbClick = (v: any) => {
			const { redirect, path } = v;
			if (redirect) router.push(redirect);
			else router.push(path);
		};
		// 展开/收起左侧菜单点击
		const onThemeConfigChange = () => {
			// proxy.mittBus.emit('onMenuClick');
			store.state.themeConfig.isCollapse = !store.state.themeConfig.isCollapse;
		};
		// 处理面包屑数据
		const getBreadcrumbList = (arr: AppRouteRecordRaw[]) => {
			arr.map((item: AppRouteRecordRaw) => {
				state.routeSplit.map((v: any, k: number, arrs: any) => {
					if (state.routeSplitFirst === item.path) {
						state.routeSplitFirst += `/${arrs[state.routeSplitIndex]}`;
						state.breadcrumbList.push(item);
						state.routeSplitIndex++;
						if (item.children) getBreadcrumbList(item.children);
					}
				});
			});
		};
		// 当前路由字符串切割成数组，并删除第一项空内容
		const initRouteSplit = (path: string) => {
			if (!store.state.themeConfig.isBreadcrumb) return false;
			state.breadcrumbList = [store.state.routesList.routesList[0]];
			state.routeSplit = path.split('/');
			state.routeSplit.shift();
			state.routeSplitFirst = `/${state.routeSplit[0]}`;
			state.routeSplitIndex = 1;
			getBreadcrumbList(store.state.routesList.routesList);
		};
		// 页面加载时
		onMounted(() => {
			initRouteSplit(route.path);
		});
		// 路由更新时
		onBeforeRouteUpdate((to) => {
			initRouteSplit(to.path);
		});
		return {
			onThemeConfigChange,
			getThemeConfig,
			onBreadcrumbClick,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb {
	flex: 1;
	height: inherit;
	display: flex;
	align-items: center;
	padding-left: 15px;
	.layout-navbars-breadcrumb-icon {
		cursor: pointer;
		font-size: 18px;
		margin-right: 15px;
		color: var(--bg-topBarColor);
	}
	.layout-navbars-breadcrumb-span {
		opacity: 0.7;
		color: var(--bg-topBarColor);
	}
	.layout-navbars-breadcrumb-iconfont {
		font-size: 14px;
		margin-right: 5px;
	}
	::v-deep(.el-breadcrumb__separator) {
		opacity: 0.7;
		color: var(--bg-topBarColor);
	}
}
</style>
