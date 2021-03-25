<template>
  <div class="nk-container">
    <Header></Header>
    <!-- 内容 -->
    <div class="main">
      <div class="container p-5 mt-3 mb-3">
        <!-- 上传头像 -->
        <h6 class="text-left text-info border-bottom pb-2">上传头像</h6>
        <el-upload
          :action="posterUrl"
          :before-upload="beforeUpload"
          :http-request="(params)=>uploadImage(params)"
          :on-remove="(file, fileList)=>removeImage(file, fileList)"
          list-type="picture"
          accept="image/*"
        >
          <el-button size="small">选择图片</el-button>
        </el-upload>

        <!-- 修改密码 -->
        <h6 class="text-left text-info border-bottom pb-2 mt-5">修改密码</h6>
<!--        <form class="mt-5" :model = Form :rules = rules>-->
<!--          <div class="form-group row mt-4">-->
<!--            <label for="old-password" class="col-sm-2 col-form-label text-right">原密码:</label>-->
<!--            <div class="col-sm-10" prop = "old_password">-->
<!--              <input type="password" class="form-control" autocomplete=‘current-password’ id="old-password"-->
<!--                     v-model="Form.old_password" placeholder="请输入原始密码!" required>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="form-group row mt-4">-->
<!--            <label for="new-password" class="col-sm-2 col-form-label text-right">新密码:</label>-->
<!--            <div class="col-sm-10" prop="new_password">-->
<!--              <input type="password" class="form-control" autocomplete=‘new-password’ id="new-password"-->
<!--                     v-model="Form.new_password" placeholder="请输入新的密码!" required>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="form-group row mt-4">-->
<!--            <label for="confirm-password" class="col-sm-2 col-form-label text-right">确认密码:</label>-->
<!--            <div class="col-sm-10" prop="confirm_password">-->
<!--              <input type="password" class="form-control" autocomplete=‘re-password’ id="confirm-password"-->
<!--                     v-model="Form.confirm_password" placeholder="再次输入新密码!" required>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="form-group row mt-4">-->
<!--            <div class="col-sm-2"></div>-->
<!--            <div class="col-sm-10 text-center">-->
<!--              <el-button type="primary" @click="submit" class="submitBtn">立即登录</el-button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </form>-->
        <el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码" prop="old_password">
            <el-input type="password" v-model="Form.old_password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_password">
            <el-input  type="password" v-model="Form.new_password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_password">
            <el-input type="password" v-model="Form.confirm_password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('Form')" class="submitBtn">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import axios from "axios";
import qs from 'QS';
export default {
  components: {
    Header
  },
  data() {
    return {
      posterUrl: '',
      imgUrls: [],
      imgWidth: '1500',
      imgHeight: '1500',
      Form: {
        old_password: '',
        new_password: '',
        confirm_password: '',
        userId: ''
      },
      rules: {
        old_password: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  created() {

  },
  methods: {
    beforeUpload(file) {
      let _this = this;
      let _checkSize = false; //是否需要指定上传图片的尺寸
      if(file.size > 1024*500) { //大小超过500kb
        _this.$message.error('图片太大，请重新选择');
        return false;
      }
      const isSize = new Promise((resolve, reject)=>{
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function () {
          if(!_checkSize || (_checkSize && img.width===_this.imgWidth && img.height===_this.imgHeight)) {
            resolve();
          }
          else {
            reject();
          }
        }
        img.src = _URL.createObjectURL(file);
      }).then(()=>{
        return file;
      }, ()=>{
        _this.$message.error('图片尺寸不对，请重新选择');
        return Promise.reject();
      });
      return isSize;
    },

    uploadImage(params) {
      console.log(params);
      let uploadData = new FormData();
      uploadData.append('headerImage', params.file);
      uploadData.append('userId',localStorage.getItem('userId'))
      console.log(localStorage.getItem('userId'))
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      this.uploadPoster('/upload', uploadData, config)
        .then(res=>{
          if (res.data.code === 200) {
            location.reload()
          }else {
            this.$message.error("上传头像失败")
          }
        })
    },

    removeImage(file, fileList) {
      console.log(fileList);
    },

    uploadPoster(url, obj, config) {
      let poster_upload_path = "http://localhost:8081/communityPlatform/user";
      return axios.post(poster_upload_path+url, obj, config);
    },

    submit (formName) {
      this.$refs[formName].validate( (valid) => {
        if (valid){
          const _this = this
          _this.Form.userId = localStorage.getItem("userId");
          if (_this.Form.new_password !== _this.Form.confirm_password) {
            _this.$message.error("两次密码输入不一致")
          }else {
            _this.$axios.post("http://localhost:8081/communityPlatform/user/password",
              qs.stringify(_this.Form)
            ).then( res => {
              console.log(res)
              if (res.data.errorMsg) {
                _this.$message.error(res.data.errorMsg)
              }else {
                _this.$axios.get('http://localhost:8081/communityPlatform/logout'
                ).then( res => {
                  if (res.data.code === 200){
                    sessionStorage.clear()
                    _this.$router.push("/login")
                  }else {
                    _this.$message.error("退出失败");
                  }
                })
              }
            })
          }
        } else {
          this.$message.error("error submit!!")
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.submitBtn{
  width: 100%;
}
</style>
