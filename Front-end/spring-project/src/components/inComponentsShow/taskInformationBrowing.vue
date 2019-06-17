<template>
    <div>
        <h1>this is taskInformationBrowing</h1>
        <el-main>
        <el-table :data="tasks" style="width: 100%" title="任务列表" size="mini" border>
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="title" label="任务名称" align="center"></el-table-column>
          <el-table-column prop="content" label="详细内容" align="center"></el-table-column>
          <el-table-column prop="deadLineTime" label="截止时间" sortable align="center"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"  @click="checkDetail(scope.row)">详情</el-button>
              <el-button size="mini" @click="openSend(scope.row)">回复</el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-main>
        <el-dialog :visible.sync="detailVisible">
          <p>回复详情:</p> 
          <ul>
            <li v-for="(r, index) in replys" :key="index">
              {{ r.name }} : {{ r.comment }}
            </li>
          </ul>
        </el-dialog>

        <el-dialog title="回复任务" :visible.sync="dialogReplyVisible" :before-close="clear">
          <div v-if="alertVis">
            <el-tag>该任务已过期或被手动关闭，仍可回复，但显示未完成</el-tag>
          </div>
          <el-form :model="reply" ref="reply">
            <el-form-item label="请输入回复内容" prop="comment">
              <el-input v-model="reply.comment"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="send('reply')">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import bus from "../../api/bus";
import axios from "../../api/MyAxios";
import { Message } from "element-ui";
import { getTasks } from "../../api/Main";
import { setTimeout } from "timers";
export default {
    data(){
        return{
            tasks:[],
             task: {
                id: "",
                title: "",
                content: "",
                deadLineTime: "",
                status: ""
            },
            dialogFormVisible: false,
            editVis:false,
            detailVisible: false,
            dialogReplyVisible: false,
            alertVis: false,
            reply: {
              id: "",
              conmment: "",
              status: "1"
            }}
    },
    created() {
        getTasks();
        bus.$on(bus.tasks, data => {
            this.tasks = data;
        });
        let role = sessionStorage.getItem("role");
            if (role == "6983f953b49c88210cb9") {
            this.isAdmin = true;
            }
    },
    methods:{
      clear(done) {
      this.alertVis = false;
      done();
    },
    checkDetail(row) {
      
      axios.get(`/taskdetail/get/${row.id}`).then(resp => {
        window.console.log(resp.data);
        this.replys = resp.data.tasks;
        window.console.log(this.replys);
      }).then(()=>{
        this.detailVisible = true;
      });
    },
    openSend(row) {
      Date.prototype.format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      };
      this.dialogReplyVisible = true;
      this.reply.id = row.id;
      var date = new Date().format("yyyy-MM-dd hh:mm:ss");
      window.console.log(date);
      if (date > row.deadLineTime || row.status == "结束") {
        this.alertVis = true;
        this.reply.status = "未完成";
      } else {
        this.reply.status = "完成";
      }
      window.onsole.log(this.reply.status);
    },
    send(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //console.log("合法:" + valid);
          axios.post(`/admin/task/${this.reply.id}/reply`, this.reply)
              .then(resp => {
                if (resp.status == 200) {
                  Message.success("回复成功!");
                  this.reply = { id: null, conmment: null };
                  this.dialogReplyVisible = false;
                } else {
                  Message.warning("未知错误");
                }
              });
        } else {
          window.console.log("false");
        }
      });
    }
    }
}
</script>

<style scoped>

</style>