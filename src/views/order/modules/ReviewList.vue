<template>
	<van-form validate-first @submit="onSubmit">
		<div class="review-list border-top">
			<div class="review-list-product">
				<div class="review-list-img">
					<van-image class="default-image" :src="$utils.imageHandler(0, reviewList.picKey)" />
				</div>
				<span>{{ reviewList.brand }}</span>
				<p class="review-list-info text-hidden-row-3">{{ reviewList.productName }}</p>
			</div>
			<div class="review-list-box">
				<div class="flex">
					<label>{{ $t('review.sizing') }}<i class="required">*</i></label>
					<van-rate v-model="param.evaluateStart" :size="18" color="#FFBF00" void-color="#FFBF00" />
				</div>
				<div class="flex">{{ $t('review.overfit') }}<i class="required">*</i></div>
				<div class="flex">
					<van-radio-group :disabled="type" class="review-list-group flex" v-model="param.productMatch">
						<van-radio :name="0">{{ $t('review.trueSize') }}</van-radio>
						<van-radio :name="1">{{ $t('review.large') }}</van-radio>
						<van-radio :name="2">{{ $t('review.small') }}</van-radio>
					</van-radio-group>
				</div>
				<div class="flex">
					<label>{{ $t('review.content') }}<i class="required">*</i></label>
					<span style="overflow-wrap: anywhere" v-show="type">{{ param.evaluateContent }}</span>
					<van-field maxlength="250" v-show="!type" v-model="param.evaluateContent" rows="2" border label="" type="textarea" :placeholder="$t('review.writeReview')" />
				</div>
				<div class="review-list-goods flex">
					<ul v-show="type">
						<li v-if="param.evaluatePicsOnekey"><van-image class="default-image" :src="$utils.imageHandler(0, param.evaluatePicsOnekey)" /></li>
						<li v-if="param.evaluatePicsTwokey"><van-image class="default-image" :src="$utils.imageHandler(0, param.evaluatePicsTwokey)" /></li>
						<li v-if="param.evaluatePicsOnekey"><van-image class="default-image" :src="$utils.imageHandler(0, param.evaluatePicsThreekey)" /></li>
					</ul>
					<van-uploader :before-read="beforeRead" :after-read="afterRead" max-count="3" v-show="!type" v-model="fileList" />
					<em v-show="type && fileList.length > 0">{{ fileList.length }}/3</em>
					<van-button v-show="!type" type="info" native-type="submit">{{ $t('submit') }}</van-button>
				</div>
			</div>
		</div>
	</van-form>
</template>
<script>
import { Toast } from 'vant'
import { mapActions } from 'vuex'
export default {
	props: {
		type: {
			type: Boolean,
			default: true,
		},
		reviewList: {
			type: Object,
			default: () => {
				return {}
			},
		},
	},
	inject: ['reload'],
	components: {},
	data() {
		return {
			fileList: [],
			param: {
				evaluatePicsOnekey: '',
				evaluatePicsTwokey: '',
				evaluatePicsThreekey: '',
				evaluateStart: 5,
				productMatch: '',
				evaluateContent: '',
				userId: '1403577268437024',
			},
		}
	},
	created() {
		console.log(888888, this.reviewList)
		this.param['orderId'] = this.reviewList.orderId
		this.param['orderSn'] = this.reviewList.orderSn
		// this.param['productId'] = this.reviewList.productId
		this.param['productNo'] = this.reviewList.productNo
		this.param['skuNo'] = this.reviewList.skuNo
		this.param['shopsId'] = this.reviewList.shopsId
		let { evaluateStart, productMatch, evaluateContent, evaluatePicsOnekey, evaluatePicsTwokey, evaluatePicsThreekey } = this.reviewList
		if (evaluateStart || evaluateStart === 0) this.param.evaluateStart = evaluateStart
		if (productMatch || productMatch === 0) this.param.productMatch = productMatch
		if (evaluateContent) this.param.evaluateContent = evaluateContent
		if (evaluatePicsOnekey) {
			let item = {
				url: evaluatePicsOnekey,
			}
			this.param.evaluatePicsOnekey = evaluatePicsOnekey
			this.fileList.push(item)
		}
		if (evaluatePicsTwokey) {
			let item = {
				url: evaluatePicsTwokey,
			}
			this.param.evaluatePicsTwokey = evaluatePicsTwokey
			this.fileList.push(item)
		}
		if (evaluatePicsThreekey) {
			let item = {
				url: evaluatePicsThreekey,
			}
			this.param.evaluatePicsThreekey = evaluatePicsThreekey
			this.fileList.push(item)
		}
	},
	methods: {
		...mapActions('order', ['createEvaluate', 'UploadImg']),
		onSubmit() {
			let { evaluateStart, productMatch, evaluateContent } = this.param
			if (evaluateStart === 0) {
				Toast.fail(this.$t('review.selectRating'))
				return
			}
			if (productMatch === '' || evaluateContent.length < 1) {
				Toast.fail(this.$t('review.completeFields'))
				return
			}
			this.createEvaluate(this.param).then((res) => {
				if (res.code === 0) {
					Toast.success({
						duration: 0, // 持续展示 toast
						forbidClick: true,
						message: this.$t('review.submittedSuccessfully'),
					})
					setTimeout(() => {
						Toast.clear()
						this.reload()
					}, 1500)
				}
			})
		},
		beforeRead(file) {
			console.log('beforeRead', file.size)
			if (file.size > 3000000) {
				Toast(this.$t('review.picturesWithin'))
				return false
			}
			return true
		},
		afterRead(file) {
			let formData = new FormData()
			formData.append('type', 'evaluate_img')
			formData.append('image', file.file)
			this.UploadImg(formData)
				.then((res) => {
					if (res.code === 0) {
						let { pathKey } = res.data
						let length = this.fileList.length
						if (length == 1) {
							this.param.evaluatePicsOnekey = pathKey
						} else if (length == 2) {
							this.param.evaluatePicsTwokey = pathKey
						} else {
							this.param.evaluatePicsThreekey = pathKey
						}
					}
				})
				.catch(() => {
					setTimeout(() => {
						this.fileList = this.fileList.filter((v) => v.file.name !== file.file.name)
					}, 1500)
				})
		},
	},
}
</script>
<style lang="less" scoped>
@import '@/style/modules/order.less';
/deep/ .van-button {
	height: auto;
	padding: 8px 14px;
}
/deep/ .van-field {
	border: 1px solid #999;
}
/deep/ .van-uploader {
	display: flex;
}
/deep/ .van-uploader__wrapper {
	display: flex;
}
/deep/ .van-image,
/deep/ .van-uploader__upload {
	width: 44px;
	height: 44px;
}
</style>
