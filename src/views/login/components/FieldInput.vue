<template>
	<div class="field-input">
		<div class="field-input__fields">
			<span :class="['field-input__label', { 'is-active': labelActive }]">{{ label }}</span>
			<van-field v-if="type == 'text'" v-model.trim="inputValue" clearable @focus="focus" @blur="blur" maxlength="250">
				<!-- 配置pc清除输入框的按钮 -->
			</van-field>

			<van-field v-else v-model.trim="inputValue" :type="inputType" clearable right-icon="iconeye" @focus="focus" @blur="blur" @click-right-icon="toView" maxlength="250">
				<!-- 配置pc清除输入框的按钮 -->
				<van-icon :class="iconfonts" slot="right-icon" name="iconeye"></van-icon>
			</van-field>
		</div>
		<p class="field-input__error" v-if="error">{{ error }}</p>
	</div>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: 'text',
		},
		label: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		error: {
			type: String,
			default: '',
		},
		hideIcon: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isFocus: false,
			inputType: this.type,
		}
	},
	components: {},
	computed: {
		inputValue: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit('update:value', val)
			},
		},
		labelActive() {
			return this.inputValue || (!this.inputValue && this.isFocus)
		},
		pwdIcon() {
			if (this.hideIcon) return ''
			return this.inputType != 'password' ? 'iconfont eye-o' : 'iconfont closed-eye'
		},
		iconfonts() {
			if (this.hideIcon) return ''
			if (this.isIerminal) {
				return this.inputType != 'password' ? 'iconfont icon-xianshi' : 'iconfont icon-yincang'
			} else {
				return this.inputType != 'password' ? 'van-icon-eye-o' : 'van-icon-closed-eye'
			}
		},
	},
	methods: {
		focus() {
			this.isFocus = true
			this.$emit('onfocus')
		},
		blur() {
			this.isFocus = false
			this.$emit('onblur')
		},
		// 查看密码：
		toView() {
			this.inputType = this.inputType == 'text' ? 'password' : 'text'
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.field-input {
	.field-input__fields {
		position: relative;
		border-bottom: 1px solid @color-EBE;
		padding-top: 14px;
		margin-bottom: 10px;
		.field-input__label {
			color: @color-999;
			font-size: 14px;
			line-height: 14px;
			height: 14px;
			position: absolute;
			left: 0;
			top: 30px;
			transition: top 0.5s ease;
			&.is-active {
				top: 4px;
			}
			&.is-pc {
				font-size: 16px;
			}
		}
		.van-field {
			background: transparent;
			padding: 10px 16px 10px 0;
			/deep/.van-field__clear {
				color: #222;
			}
		}
	}
	.field-input__error {
		font-size: 12px;
		color: @color-red;
		line-height: 14px;
		&.is-pc {
			font-size: 16px;
		}
	}
}
</style>
