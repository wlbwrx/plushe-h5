<template>
	<div class="field-input">
		<div class="field-input__fields">
			<span :class="['field-input__label', { 'is-active': labelActive }]">{{ label }}</span>
			<van-field v-model.trim="inputValue" :name="name" clearable @focus="focus" @blur="blur" @click="clickInput" :readonly="readonly" :right-icon="rightIcon" :maxlength="maxlength" :rules="rules" :placeholder="placeholder"> </van-field>
		</div>
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
		// 验证规则
		rules: {
			type: Array,
			default: function() {
				return []
			},
		},
		// 最大长度
		maxlength: {
			type: String,
			default: '250',
		},
		// 只读
		readonly: {
			type: Boolean,
			default: false,
		},
		// 右侧icon
		rightIcon: {
			type: String,
		},
		// 表单输入框名
		name: {
			type: String,
			default: '',
		},
		error: {
			type: String,
			default: '',
		},
		hideIcon: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
		},
	},
	data() {
		return {
			isFocus: false,
			inputType: this.type,
		}
	},
	components: {
	},
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
			return this.inputType != 'password' ? 'van-icon-eye-o' : 'van-icon-closed-eye'
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

		// 只读下--点击input
		clickInput() {
			if (this.readonly) {
				this.$emit('clickInput')
			}
		},
	},
}
</script>
<style scoped lang="less">
@import '@/style/variable.less';

.field-input {
	.field-input__fields {
		position: relative;
		border-bottom: 1px solid @color-bg;
		padding-top: 14px;
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
		/deep/ .van-field__control::placeholder {
			color: #999;
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
