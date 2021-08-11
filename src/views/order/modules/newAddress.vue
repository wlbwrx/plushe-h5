
<template>
<el-dialog title="" :visible.sync="dialogFormVisible">
    <h1 class="new-address">SHIPPING ADDRESS</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="show-one-tables">
            <el-form-item label-width="0" prop="country">
              <el-select placeholder="Please Choose Your Country/Region"  v-model="ruleForm.country" @change="seleCountryCLick">
                <el-option-group
                  v-for="(arrays,key) in countrys"
                  :key="key"
                  :label="key">
                  <el-option
                    v-for="(item,index) in arrays"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-option-group>
              </el-select>
          </el-form-item>
        </div>
        <div class="show-two-tables">
            <el-form-item label-width="0" prop="firstName">
                <el-input placeholder="*First Name" v-model.trim="ruleForm.firstName"></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="lastName">
                <el-input placeholder="*Last Name" v-model="ruleForm.lastName"></el-input>
            </el-form-item>
        </div>
        <div class="show-tables">
            <el-form-item label-width="0" prop="name">
                <el-input v-model="phoneCode"></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="phoneNumber">
                <el-input placeholder="*Phone Number" v-model="ruleForm.phoneNumber"></el-input>
            </el-form-item>
        </div>
        <div class="show-two-tables">
            <el-form-item label-width="0" prop="city">
                <el-input placeholder="*City" v-model="ruleForm.city"></el-input>
            </el-form-item>
            <el-form-item v-show="provinces.length>0" label-width="0" prop="state">
                <el-select placeholder="State/Province(Optional)" v-model="ruleForm.state" >
                  <el-option
                    v-for="(item,index) in provinces"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
            </el-form-item>
        </div>
        <el-form-item label-width="0" prop="postCode">
            <el-input placeholder="*Post/Zip Code" v-model="ruleForm.postCode"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="firstAddress">
            <el-input placeholder="*Address Line 1: Street, Address, Company Name, C/O" v-model="ruleForm.firstAddress"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="secondAddress">
            <el-input placeholder="*Address Line 2: Apartment, Suite, Unit, Building, Floor, etc(Optional)" v-model="ruleForm.secondAddress"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="isDefaultAddress">
            <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.isDefaultAddress"></el-switch><span class="make-default">Make Default</span>
        </el-form-item>
        <el-form-item label-width="0">
            <div class="submit-btn">
                <el-button type="primary" @click="submitForm('ruleForm')">SAVE</el-button>
            </div>
        </el-form-item>
    </el-form>
</el-dialog>
</template>
<script>
  import mixin from '@/views/address/shipping'
  export default {
    mixins: [mixin],
    data() {
      let cityValidator = (rule, value, callback) => {
        let reg1 = /^.{2,60}$/
        if (!reg1.test(value)) {
          callback(new Error('Please enter a valid city'));
        } else {
          callback();
        }
      };
      let firstNameValidator = (rule, value, callback) => {
        let reg2 = /^[a-z\sA-Z0-9_-]+$/
        if (!reg2.test(value)) {
          callback(new Error('Please enter a valid first name'));
        } else {
          callback();
        }
      };
      let lastNameValidator = (rule, value, callback) => {
        let reg3 = /^[a-z\sA-Z0-9_-]+$/
        if (!reg3.test(value)) {
          callback(new Error('Please enter a valid last name'));
        } else {
          callback();
        }
      };
      let stateValidator = (rule, value, callback) => {
        console.log(33333, this.provinces)
        if (this.provinces.length>0 && value==='') {
          callback(new Error('Please enter a valid state'));
        } else {
          callback();
        }
      };
      let phoneValidator = (rule, value, callback) => {
        let reg4 = /^\d{5,16}$/
        if (!reg4.test(value)) {
          callback(new Error('Please enter a valid phone number'));
        } else {
          callback();
        }
      };
      let postCodeValidator = (rule, value, callback) => {
        let reg5 = /^[0-9-]{4,10}$/
        if (!reg5.test(value)) {
          callback(new Error('Please enter a valid Post/Zip Code'));
        } else {
          callback();
        }
      };
      return {
        goToNext: '',
        addressId:'',
        selectCountry: {},
        countrys: window.countrys,
        dialogFormVisible: false,
        phoneCode:'',
        provinces:[],
        ruleForm: {
          country:'',
          firstName: '',
          lastName:'',
          phoneCode:'',
          phoneNumber:'',
          state:'',
          city:'',
          postCode:'',
          firstAddress:'',
          secondAddress:'',
          isDefaultAddress: 0
        },
        rules: {
          firstName: [
            { required: true, message: 'Please enter a valid first name', trigger: 'blur' },
            { min: 2, max: 30, message: 'Please enter a valid first name', trigger: 'blur' },
            { validator: firstNameValidator, trigger: 'blur' }
          ],
          lastName: [
            { required: true, message: 'Please enter a valid last name', trigger: 'blur' },
            { min: 2, max: 30, message: 'Please enter a valid last name', trigger: 'blur' },
            { validator: lastNameValidator, trigger: 'blur' }
          ],
          phoneNumber: [
            { validator: phoneValidator, trigger: 'blur' }
          ],
          state: [
            { validator: stateValidator, trigger: 'blur' }
          ],
          city: [
            { required: true, message: 'Please enter a valid city', trigger: 'change' },
            { validator: cityValidator, trigger: 'blur' }
          ],
          postCode: [
            { min: 2, max: 50, message: 'Please enter a valid Post/Zip Code', trigger: 'blur' },
            { required: true, message: 'Please enter a valid Post/Zip Code', trigger: 'blur' },
            { validator: postCodeValidator, trigger: 'blur' }
            
          ],
          firstAddress: [
            { min: 2, max: 50, message: 'Please enter a valid first name', trigger: 'blur' },
            { required: true, message: 'Please enter a valid firstAddress', trigger: 'blur' }
          ],
          secondAddress: [
            { max: 50, message: 'Please enter a valid first name', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      show(gotoNext, addressId){
        this.dialogFormVisible = true
        this.ruleForm =  {
          country:'',
          firstName: '',
          lastName:'',
          phoneCode:'',
          phoneNumber:'',
          state:'',
          city:'',
          postCode:'',
          firstAddress:'',
          secondAddress:'',
          isDefaultAddress: 0
        }
       
        if(gotoNext==='addreslist'){
          this.goToNext = gotoNext
          if(addressId){
            this.addressId = addressId
            this.GET_USERADDRESS_DETAIL({ addressId }).then(res => {
              let { data } = res
              this.ruleForm = data
              this.getAddressList(data)
            })
          }else{
            this.getAddressList()
          }
        }else {
          this.ruleForm.isDefaultAddress = addressId.isDefaultAddress
          this.getAddressList()
        }
        
      },
      seleCountryCLick(){
        let country = this.ruleForm.country.substr(0, 1)
        this.selectCountry = this.countrys[country].filter(v => v.name == this.ruleForm.country)[0]
        this.ruleForm.city = ''
        this.ruleForm.state = ''
        this.getAddressList()
      },
      getAddressList(data) {
        let country = this.selectCountry
        let countrys = window.countrys
        let defaultCountrys = countrys['U'].filter(v => v.name == 'United States')
        let seleCountry = this.$utils.isEmptyObject(country) ? defaultCountrys[0] : country
        if (data) {
          let index = data.country.substr(0, 1)
          seleCountry = countrys[index].filter(v => v.name == data.country)[0]
        }
        let { code, dial_code, name, provinces } = seleCountry
        // console.log(33333, Object.keys(provinces))
        this.phoneCode = code + ' ' + dial_code
        this.provinces = provinces ? Object.keys(provinces) : []
        this.ruleForm.phoneCode = dial_code
        this.ruleForm.country = name
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.addressId) {
              this.UPDATE_ADDRESS(this.ruleForm).then(() => {
                 this.dialogFormVisible = false
                 this.$emit('click-newaddres', this.goToNext)
              })
            } else {
              this.ADD_ADDRESS(this.ruleForm).then(() => {
                this.dialogFormVisible = false
                this.$emit('click-newaddres', this.goToNext)
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>
<style scoped lang="less">
.submit-btn{width:100%;display: flex;justify-content: center;}
.new-address{color:#222;font-size:24px;margin-bottom:20px;}
/deep/ .el-input__inner{
    height:60px;line-height:60px;
}
.show-tables{
    display: flex;width:100%;
    .el-form-item:first-child{
        width:90px;
        /deep/ .el-input__inner{
            border-right:0 none;padding:0;text-align:center;
        }
    }
    .el-form-item:last-child{
        width:100%;
    }
}
.show-two-tables{
    display: flex;width:100%;
    .el-form-item:first-child{
        margin-right: 10px;width:50%;
    }
    .el-form-item:last-child{
        margin-left: 10px;width:50%;
        /deep/ .el-select{width:100%;}
    }
}
.show-one-tables{width:calc(100% - 20px);
  .el-form-item{
        width: 50%;
        /deep/ .el-select{width:100%;}
    }
}
.make-default{color:#222;margin-left:10px;}
</style>