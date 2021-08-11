<template>
	<div class="filter-wrap">
		<div class="filter-wrap__operate" id="operate">
			<van-dropdown-menu class="filter-wrap__menu" active-color="@color-222" :overlay="true">
				<van-dropdown-item @open="open" ref="dropdownSort">
					<template #title>
						<div class="menu-tit is-active">
							<span class="menu-text">Sort</span>
							<i class="iconfont icon-xiala"></i>
						</div>
					</template>
					<template #default>
						<ul class="menu-down-list">
							<li class="menu-down-item is-active" @click="clickSortItem">Recommed</li>
							<li class="menu-down-item">Most Popular</li>
							<li class="menu-down-item">Recommed</li>
						</ul>
					</template>
				</van-dropdown-item>
			</van-dropdown-menu>
			<!-- <van-tabs
				id="tabs"
				v-model="currentTabId"
				:line-width="0"
				@click="tabClick"
			>
				<van-tab v-for="obj in tabs" :key="obj.id" :name="obj.id">
					<template #title>
						<div
							:class="[
								'filter-wrap__tab-title',
								{ 'is-active': currentTabId == obj.id }
							]"
						>
							{{ obj.name }}
						</div>
					</template>
				</van-tab>
			</van-tabs> -->
		</div>
		<!-- 右侧筛选框 -->
		<van-popup v-model="openPopup" position="right">
			<div class="filter-wrap__popup">
				<van-icon class="filter-wrap__popup-close" name="cross" @click="close"></van-icon>
				<van-collapse v-model="activeNames" :border="false">
					<van-collapse-item :name="items.title" v-for="items of filters" :key="items.title" :border="false">
						<template #title>
							<div class="filter-wrap__popup-title">
								{{ items.title }}
							</div>
						</template>
						<!-- <ul class="filter-wrap__popup-list">
							<li :class="['filter-wrap__popup-item', {'is-selected': obj.selected}]" v-for="obj of items.list" :key="obj.id">
								{{obj.name}}
							</li>
						</ul> -->
						<div class="filter-wrap__popup-list" v-if="items.id != 99">
							<van-checkbox v-model="obj.selected" :class="['filter-wrap__popup-item', { 'is-selected': obj.selected }]" v-for="obj of items.list" :key="obj.id">
								<template #icon>{{ obj.name }}</template>
							</van-checkbox>
						</div>
						<div class="filter-wrap__popup-range" v-else>
							<van-field v-model="items.lowest" input-align="center" type="number" :border="false" placeholder="The Lowest"></van-field>
							<span class="filter-wrap__wavy">~</span>
							<van-field v-model="items.highest" input-align="center" type="number" :border="false" placeholder="The Highest"></van-field>
						</div>
					</van-collapse-item>
				</van-collapse>
				<div class="filter-wrap__footer">
					<van-button class="filter-wrap__footer-btn" block color="#595959" @click="reset">Reset</van-button>
					<van-button class="filter-wrap__footer-btn" block color="#FF5269" @click="confirm">Confirmed</van-button>
				</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
export default {
	data() {
		return {
			openPopup: false, // 是否显示筛选框
			tabs: [
				{
					id: 1,
					name: 'Best-Sellers防守打法',
				},
				{
					id: 2,
					name: 'Dressess',
				},
				{
					id: 3,
					name: 'Best-Sellers',
				},
				{
					id: 4,
					name: 'Best-Sellers',
				},
				{
					id: 5,
					name: 'Best-Sellers',
				},
				{
					id: 6,
					name: 'Best-Sellers',
				},
			],
			currentTabId: 2, // 当前选中的tabs的值

			activeNames: ['Category', 'Size', 'range'], // 活跃的下拉项

			filters: [
				{
					title: 'Category',
					id: 1,
					list: [
						{
							id: 1,
							name: 'Jackets',
							selected: false,
						},
						{
							id: 2,
							name: 'Outerwear',
							selected: true,
						},
					],
				},
				{
					title: 'Size',
					id: 2,
					list: [
						{
							id: 1,
							name: 'XL',
							selected: false,
						},
						{
							id: 2,
							name: '2XL',
							selected: true,
						},
						{
							id: 3,
							name: 'XXL',
							selected: true,
						},
					],
				},
				{
					title: 'Price Range(USD)',
					id: 99,
					lowest: '',
					highest: '',
				},
			],
			scroll_y: 0, // 页面滚动的距离
			operateTop: null, // operate 原始距离顶部的top 定位
			tabsTop: null,
			isOpen: false,
		}
	},
	components: {},
	created() {},
	mounted() {
		// window.addEventListener('scroll', this.pageScroll)
	},
	beforeDestroy() {
		// window.removeEventListener('scroll', this.pageScroll)
	},
	methods: {
		// tabs 发生改变：
		tabClick(id) {
			this.$emit('tab-click', id)
		},
		// 显示右侧弹框筛选内容：
		open() {
			// this.openPopup = true;
			console.log('fsdaf')
		},
		clickSortItem() {
			this.$refs['dropdownSort'].toggle()
		},
		// 关闭弹框：
		close() {
			this.openPopup = false
		},
		// 重置：
		reset() {
			this.filters.forEach((items) => {
				if (items.list) {
					items.list.forEach((obj) => {
						obj.selected = false
					})
				}
				if (items.id == 99) {
					items.lowest = ''
					items.highest = ''
				}
			})
		},
		// 确定：
		confirm() {
			this.close()
			// 传递筛选条件：
			this.$emit('confirm-click')
		},
		// 页面滚动：
		pageScroll() {
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
			if (this.scroll_y == 0) {
				this.scroll_y = scrollTop
			}
			let diffY = this.scroll_y - scrollTop
			let operate = document.querySelector('#operate'),
				tabs = document.querySelector('#tabs')
			if (this.operateTop == null) {
				this.operateTop = operate.offsetTop
			}
			if (this.tabsTop == null) {
				this.tabsTop = tabs.offsetTop
			}
			console.log(this.tabsTop)
			let top = this.operateTop - scrollTop
			if (diffY < 0) {
				// 手指往上滑
				operate.style.top = top > 0 ? top + 'px' : 0
				tabs.style.top = top > 0 ? this.tabsTop + 'px' : this.tabsTop + top > 0 ? this.tabsTop + top + 'px' : 0
			} else {
				operate.style.top = this.operateTop + 'px'
				tabs.style.top = this.tabsTop + 'px'
			}
			this.scroll_y = scrollTop
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.filter-wrap {
	height: 48px;

	.filter-wrap__operate {
		z-index: 100;
		position: fixed;
		left: 0;
		top: 46px;
		width: 100%;
		transition: top 0.5s ease;

		.filter-wrap__menu {
			position: relative;
			z-index: 10;
			border-bottom: 1px solid @color-bg;
			padding: 0 8px;
			background: @color-FFF;

			.menu-tit {
				display: flex;
				align-items: center;
				color: @color-666;

				&.is-selected {
					color: @color-222;
				}

				&.is-active {
					.iconfont {
						transform: rotate(180deg);
					}
				}

				.iconfont {
					margin-left: 8px;
				}
			}
			.menu-down-list {
				.menu-down-item {
					font-size: 14px;
					line-height: 34px;
					color: #999;
					padding-left: 16px;
					border-top: 1px solid #f5f5f5;
					&.is-active {
						color: #595959;
					}
				}
			}
		}
		.van-tabs {
			position: absolute;
			left: 0;
			top: 49px;
			z-index: 1;
			width: 100%;
			background: @color-FFF;
			transition: top 0.5 ease;

			.van-tab {
				padding: 0 5px;

				.filter-wrap__tab-title {
					line-height: 26px;
					height: 28px;
					border: 1px solid @color-bg2;
					background: @color-bg2;
					padding: 0 14px;
					border-radius: 2px;
					font-size: 12px;
					color: @color-666;
					position: relative;
					overflow: hidden;

					&.is-active {
						border-color: @color-222;
						background: @color-FFF;

						&::after {
							content: '';
							position: absolute;
							right: -12px;
							top: -12px;
							height: 24px;
							width: 24px;
							background: @color-222;
							z-index: 1;
							transform: rotate(45deg);
						}

						&::before {
							font-family: 'iconfont' !important;
							font-size: 12px;
							content: '\e60e';
							position: absolute;
							right: 0;
							top: 0;
							line-height: 10px;
							color: @color-FFF;
							z-index: 2;
							transform: translateX(-4px) scale(0.8);
						}
					}
				}
			}
		}
	}

	.van-popup {
		width: 310px;
		height: 100vh;
		padding-bottom: 70px;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;

		&::-webkit-scrollbar {
			display: none;
		}

		.filter-wrap__popup {
			padding: 10px 0 0;
			background: @color-FFF;

			.filter-wrap__popup-close {
				font-size: 18px;
				margin-bottom: 16px;
			}

			.filter-wrap__popup-title {
				font-size: 18px;
				color: @color-222;
				font-weight: 500;
				margin-bottom: 12px;
				line-height: 22px;
			}

			.filter-wrap__popup-list {
				display: flex;
				flex-wrap: wrap;

				.filter-wrap__popup-item {
					padding: 0 14px;
					height: 32px;
					line-height: 30px;
					border: 1px solid @color-D1D;
					font-size: 14px;
					color: @color-999;
					margin-right: 10px;
					margin-bottom: 10px;
					overflow: hidden;

					&.is-selected {
						border-color: @color-222;
						color: @color-222;
						position: relative;

						&::after {
							content: '';
							position: absolute;
							right: -12px;
							top: -12px;
							height: 24px;
							width: 24px;
							background: @color-222;
							z-index: 1;
							transform: rotate(45deg);
						}

						&::before {
							font-family: 'iconfont' !important;
							font-size: 12px;
							content: '\e60e';
							position: absolute;
							right: 0;
							top: 0;
							line-height: 10px;
							color: @color-FFF;
							z-index: 2;
							transform: translateX(-4px) scale(0.8);
						}
					}
				}
			}

			.filter-wrap__popup-range {
				display: flex;
				align-items: center;
				justify-content: center;

				.van-field {
					background: @color-bg2;
				}

				.filter-wrap__wavy {
					margin: 0 4px;
				}
			}

			.filter-wrap__footer {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				display: flex;

				.filter-wrap__footer-btn {
					border-radius: 0;
					height: 64px;
					line-height: 64px;
				}
			}
		}
	}

	/deep/ .van-dropdown-menu__bar {
		justify-content: space-between;
		box-shadow: none;
		border-top: 0;

		&::after {
			content: '';
			position: absolute;
			z-index: 10;
			right: 54px;
			top: 50%;
			transform: translateY(-50%);
			height: 19px;
			border-right: 1px solid @color-bg;
		}

		.van-dropdown-menu__item {
			flex: 0 1 auto;
		}

		.van-dropdown-menu__title::after {
			border: 0;
			display: none;
		}
	}
	/deep/ .van-popup {
		.filter-popup {
			.van-collapse-item {
				.van-cell {
					padding: 6px 0;
				}
			}
		}
	}

	/deep/ .van-tabs {
		.van-tab {
			padding: 0 5px;
		}
	}
}
</style>
