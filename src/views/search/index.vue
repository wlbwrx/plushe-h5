<template>
	<div class="search-page" @touchmove="touchmove">
		<van-form class="search-page__form" action="/" @submit="onSearch">
			<img class="search-back-icon" src="@/assets/images/icons/back.png" @click="goBack" alt="" />
			<!-- <input type="text" class="search-input" v-focus ref="input" v-model="searchValue" placeholder="Search" @click-input="simulateClick" /> -->
			<van-field class="search-input" ref="input" autofocus v-model="searchValue" :placeholder="$t('home.search')" @click-input="simulateClick" maxlength="50" clearable></van-field>
			<img class="search-btn" src="@/assets/images/icons/search.png" alt="" @click="onSearch" />
		</van-form>
		<!-- <div class="search-page__main">
			<div class="search-record">
				<div class="search-record__title">
					<span class="search-record__tit">Recently Searched</span>
					<div class="search-record__clear">
						<span>
							<i class="iconfont icon-shanchu"></i>
							<span>Clear</span>
						</span>
						<span>
							<span>Clear All</span> |
							<span>Done</span>
						</span>
					</div>
				</div>
				<ul class="search-record__list">
					<li class="search-record__item">
						sage green purse
					</li>
					<li class="search-record__item">
						sage green
					</li>
				</ul>
			</div>
			<div class="search-record">
				<div class="search-record__title">
					<span class="search-record__tit">Hot Searchd</span>
				</div>
				<ul class="search-record__list">
					<li class="search-record__item is-active">
						sage green purse
					</li>
					<li class="search-record__item">
						summer
					</li>
				</ul>
			</div>
		</div> -->
		<div class="search-page__wrap">
			<div class="no-search-result" v-if="!haveResult">
				<img src="../../assets/images/sousuowu2x.png" alt="" class="no-result-pic" />
				<p class="no-result-tips">{{ $t('home.noSearchText') }}</p>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'vant'
import http from '@/api/index'

export default {
	data() {
		return {
			searchValue: '',
			active: 0,
			haveResult: true,
		}
	},
	components: {},
	created() {},
	activated() {},
	watch: {
		$route(to, from) {
			if (from.path == '/' || from.path == '/category') {
				this.simulateClick()
			}
		},
	},
	methods: {
		// 搜索
		onSearch() {
			if (this.searchValue.trim() == '') {
				Toast(this.$t('review.enterContent'))
				return
			}
			const query = {
				pageNum: 1,
				pageSize: 20,
				shopsId: this.$store.getters.shopsId || undefined, // 非平台才要传
				productName: this.searchValue.trim(),
			}
			http.home.search(query).then((res) => {
				this.haveResult = res.data.total > 0
				if (this.haveResult) {
					this.$store.commit('ssr/setCategoryDetail', {
						allRecomentList: res.data.list,
						listPicKey: undefined,
						title: this.searchValue.trim(),
						currentFullPath: `/category/${query.productName}-c-search`, // 防止列表页继续请求接口.
						fromType: 'search', // 因为下一个页面第一页不在请求,得不到fromType,再此处加上
						listInfo: res.data, // 因为下一个页面第一页不在请求
					})
					this.$router.push({
						path: `/category/${query.productName}-c-search`,
					})
				}
			})
			// 上报数据：
			this.reportGtag('search', {
				search_term: this.searchValue.trim(),
			})
			this.reportFB('Search', {
				search_string: this.searchValue.trim(),
			})
		},
		// 返回
		goBack() {
			this.$router.go(-1)
		},
		simulateClick() {
			if (this.$refs.input) {
				this.$refs.input.focus()
			}
		},
		// 失去焦点
		touchmove() {
			this.$refs.input.blur()
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.search-page {
	background: #fff;
	min-height: 100%;
	.search-page__form {
		position: fixed;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		width: 100%;
		max-width: 375px;
		border-bottom: 1px solid #ededed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		padding: 9px 16px;
		.search-back-icon {
			height: 22px;
		}
		.search-input {
			font-size: 14px;
			border: none;
			width: 286px;
			background: #f6f6f6;
			height: 32px;
			line-height: 32px;
			padding: 0 10px;
		}
		.search-btn {
			height: 22px;
		}
	}
	.search-page__main {
		padding: 0 16px;
	}
	.search-record {
		.search-record__title {
			padding-top: 20px;
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			.search-record__tit {
				font-size: 16px;
				line-height: 20px;
				color: #000;
			}
			.search-record__clear {
				color: #595959;
				font-size: 12px;
				.icon-shanchu {
					font-size: 16px;
					vertical-align: middle;
				}
			}
		}
		.search-record__list {
			display: flex;
			flex-wrap: wrap;
			.search-record__item {
				height: 32px;
				line-height: 30px;
				padding: 0 14px;
				border: 1px solid #999;
				font-size: 14px;
				color: #999;
				margin-right: 20px;
				margin-top: 10px;
				position: relative;
				overflow: hidden;
				&.is-active {
					border-color: @color-222;
					background: @color-FFF;
					color: @color-222;

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
	.no-search-result {
		padding-top: 80px;
		text-align: center;
		color: @color-666;
		font-size: 0;
		.no-result-pic {
			width: 112px;
			height: 120px;
		}
		.no-result-tips {
			margin-top: 10px;
			font-size: 14px;
		}
	}
}
</style>
