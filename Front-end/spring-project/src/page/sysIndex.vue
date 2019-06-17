<template>
    <div id="wrapper">
        <el-header height="20%">
            <h1>this is sysIndex</h1>
            <el-button @click="mesShow = !mesShow">个人信息</el-button>
            <el-container>
      <el-card class="box-card" style="" shadow="hover" v-if="mesShow">
          <div slot="header" class="clearfix">
    <span>个人信息</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="mesShow = !mesShow">X</el-button>
  </div>
        <div>
          <div class="text item">
            <strong>用户名:</strong>
            {{ user.name }}
          </div>
          <div class="text item">
            <strong>学工号:</strong>
            {{ user.number }}
          </div>
          <div class="text item">
            <strong>职称:</strong>
            {{ user.title }}
          </div>
          <div class="text item">
            <strong>电话:</strong>
            {{ user.phone }}
          </div>
          <div class="text item">
            <strong>简介：</strong>
            {{ user.introduction }}
          </div>
          <el-button @click="dialogVisible = ! dialogVisible">修改信息</el-button>
        </div>
      </el-card>

      <!--修改信息对话框-->
      <el-form :model="user">
        <div style="text-align: left">
          <el-dialog
            :title="dialogTitle"
            style="padding: 0px;"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
            width="77%"
          >
            <el-row>
              <el-col :span="6">
                <div>
                  <el-form-item label="姓名:" prop="name">
                    <el-input
                      prefix-icon="el-icon-edit"
                      size="mini"
                      style="width: 130px"
                      placeholder="请输入员工姓名"
                      v-model="user.name"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="学工号">
                    <el-input
                      prefix-icon="el-icon-set-up"
                      size="mini"
                      style="width: 140px"
                      disabled="true"
                      v-model="user.number"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item label="电话">
                    <el-input
                      prefix-icon="el-icon-phone"
                      size="mini"
                      style="width: 140px"
                      placeholder="请输入员工电话"
                      v-model="user.phone"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item label="职称">
                    <el-select
                      v-model="user.title"
                      style="width: 130px"
                      size="mini"
                      placeholder="请选择职位"
                    >
                      <el-option
                        v-for="item in positions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="个人简介">
                  <el-input type="text" v-model="user.introduction"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="cancelEidt">取 消</el-button>
              <el-button size="mini" type="primary" @click="postUser"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
      </el-form>
    </el-container>
        </el-header>
        <el-container>
            <el-aside width="20%">
                <side-bar @isWho="setWho"></side-bar>
            </el-aside>
            <el-main>
                <components-show :_who="who"></components-show>
            </el-main>
        </el-container>
    </div>   
</template>

<script>
import sideBar from '../components/sideBar.vue'
import componentsShow from '../components/componentsShow.vue'
import bus from "../api/bus";
import axios from "../api/MyAxios";
import { getMyInfo } from "../api/Main";
export default {
    data(){
        return{
            componentsArr:{

            },
            who:'',
            user: {
            name: null,
            introduction: null,
            title: null,
            number: null,
        phone: null,
      authority: null
        },
    dialogVisible: false,
    dialogTitle: "",
    mesShow:false,

    positions: [
      { id: "1", name: "讲师" },
      { id: "2", name: "副教授" },
      { id: "3", name: "教授" }
    ]
        }
    },
    methods: {
      setWho(data){
          this.who = data;
      },
      cancelEidt() {
      this.dialogVisible = false;
    },
      open() {
      this.dialogTitle = "编辑个人信息";
      this.dialogVisible = true;
    },
    postUser() {
      this.$confirm("确认更新?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios.post("/set/update/user", this.user).then(response => {
            this.user = response.data.user;
          });
          this.$message({
            type: "success",
            message: "更新成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    }

    },
  created() {
    getMyInfo();
    bus.$on(bus.user, data => {
      this.user = data;
    });
  },
    components:{
        sideBar,
        componentsShow
    }
}
</script>

<style>
    #wrapper{
        width:100%;
        height:100%;
    }
    .el-container{
        height: 80%;
    }
    .el-aside{
        background: rgb(78, 76, 76);
    }
    .el-card{
        position: absolute;
        left:50%;
        transform: translateX(-50%); 
        z-index: 1;
        
    }
</style>
