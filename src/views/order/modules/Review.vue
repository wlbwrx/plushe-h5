<template>
	<div class="order-list">
		<div class="order-status">
			<div class="order-status-box">
				<div class="order-status-img">
					<van-image width="96" height="144" src="" />
				</div>
				<div class="order-status-item">
					<div class="">
						<div class="order-status-title">Trendy fashion plus size simple lace Trendy fashion</div>
						<div class="order-status-sum">US$39.9</div>
					</div>
					<div class="order-status-grade">
						<van-rate v-model="rate" color="#FFBF00;" :size="13" void-icon="star" void-color="#eee" />
						<p>I really loved this items, look just like the pictures.</p>
					</div>
				</div>
			</div>
			<div class="order-status-opea">
				<label>Estimated shipping on 2020-12-01</label>
				<span>Cancel</span>
			</div>
		</div>
		<div class="order-comment">
			<div class="comment-rate"><van-rate v-model="rate" color="#FFBF00;" :size="24" void-icon="star" void-color="#eee" /></div>
			<span class="comment-title">Comment</span>
			<ul class="comment-list">
				<li>
					<b>Height</b>
					<span><label>6’4’ ft/193 cm</label><i class="icon icon-fanhui-copy"></i></span>
				</li>
				<li>
					<b>Weight</b>
					<span><label>6’4’ ft/193 cm</label><i class="icon icon-fanhui-copy"></i></span>
				</li>
				<li>
					<b>Waist</b>
					<span><label>6’4’ ft/193 cm</label><i class="icon icon-fanhui-copy"></i></span>
				</li>
				<li>
					<b>Hips</b>
					<span><label>6’4’ ft/193 cm</label><i class="icon icon-fanhui-copy"></i></span>
				</li>
			</ul>
			<p class="add-pic">Add Pircture</p>
			<div class="upload">
				<van-uploader v-model="fileList" multiple :max-count="3" />
			</div>
			<van-checkbox class="anonymous" v-model="checked">Anonymous</van-checkbox>
		</div>
		<div class="submit-order-btn">
			<van-button class="submit-order" type="primary">SUBMIT</van-button>
		</div>
	</div>
</template>
<script>
export default {
	props: ['type'],
	components: {},
	data() {
		return {
			rate: 3,
			fileList: [],
			checked: false,
		}
	},
}
</script>
<style lang="less" scoped>
.order-status {
	background: #fff;
	padding: 16px;
	font-size: 14px;
	.order-status-box {
		display: flex;
		.order-status-img {
			width: 96px;
			height: 128px;
			flex-shrink: 0;
			overflow: hidden;
		}
		.order-status-item {
			margin-left: 12px;
			.order-status-title {
				color: #666;
				line-height: 18px;
			}
			.order-status-sum {
				font-weight: bold;
				margin-top: 8px;
			}
			.order-status-grade {
				margin-top: 20px;
				p {
					line-height: 16px;
					color: #666;
				}
			}
		}
	}
	.order-status-opea {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		label {
			color: #767676;
		}
		span {
		}
	}
}
.order-comment {
	padding: 0 16px;
	margin-top: 10px;
	background: #fff;
	.comment-rate {
		display: flex;
		padding-top: 24px;
		justify-content: flex-end;
	}
	.comment-title {
		font-size: 14px;
		color: #999;
	}
	.comment-list {
		font-size: 14px;
		margin-top: 80px;
		li {
			display: flex;
			justify-content: space-between;
			padding: 10px 0;
			border-bottom: 1px solid #f5f5f5;
			b {
				font-weight: normal;
			}
			span {
				color: #999;
				display: flex;
				label {
				}
				i {
					margin-left: 6px;
					font-size: 16px;
				}
			}
		}
	}
	.add-pic {
		padding-top: 10px;
		color: #999;
		font-size: 14px;
	}
	.upload {
		margin-top: 10px;
		width: 80px;
		height: 80px;
	}
	.anonymous {
		font-size: 14px;
		margin-top: 15px;
		i {
			font-size: 14px;
		}
	}
	.submit-order-btn {
		margin-top: 10px;
	}
}
</style>
