<template>
    <div>
        <h1>this is taskManagement</h1>
        <el-main>
            <el-table :data="tasks" style="width: 100%" title="任务列表" size="mini" border>
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="title" label="任务名称" align="center"></el-table-column>
            <el-table-column prop="content" label="详细内容" align="center"></el-table-column>
            <el-table-column prop="deadLineTime" label="截止时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editTask(scope.row)">编辑</el-button >
                    <el-button size="mini" @click="closeTask()">关闭任务</el-button >
                </template>
            </el-table-column>
            </el-table>
        </el-main>
        <el-button @click="dialogFormVisible = !dialogFormVisible">创建任务</el-button>
        <el-dialog title="增加任务" :visible.sync="dialogFormVisible">
            <el-form :rules="addrules" ref="task" :model="task">
            <el-form-item label="任务名称" prop="title" >
                <el-input v-model="task.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细内容" prop="content">
                <el-input v-model="task.content" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="截止时间" prop="deadLineTime">
                <el-date-picker v-model="task.deadLineTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            </el-form>
            <el-button type="primary" @click="addTask('task')">确 定</el-button>
        </el-dialog>

        <el-dialog :visible.sync="editVis" title="编辑任务" :before-close="clear">
      <div v-if="disabled" slot="title">
        <strong>该任务已经结束，无法编辑</strong>
      </div>
      <div v-else>
          <el-form :rules="addrules" ref="task" :model="task">
                <el-form-item label="任务名称" prop="title">
                    <el-input v-model="task.title" auto-complete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="详细内容" prop="content">
                    <el-input v-model="task.content" auto-complete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="截止时间" prop="deadLineTime">
                    <el-date-picker v-model="task.deadLineTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="disabled" ></el-date-picker>
                </el-form-item> 
            </el-form>
      
        <el-button type="primary" :disabled="disabled" @click="submitEditTask('task')" >确 定</el-button>
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
            editVis:false
        }
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
        addTask(formName) {
            //this.$refs[formName].validate(valid => { 
            this.task.status = "未结束";
            axios.post("/admin/task/add", this.task).then(resp => {
                setTimeout(() => {
                  bus.$emit(bus.tasks, resp.data.tasks);
                }, 500);
              }).then(()=>{
                getTasks();
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.dialogFormVisible = false;
              }).then(()=>{
                getTasks();
              });
            //});
        },
        closeTask() {
            this.$confirm("确认关闭任务吗？", "提示", {
                confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        axios.post("/admin/task/close", this.task)
          .then(resp => {
            if (resp.status == 200) {
              Message.success("关闭成功!");
            }
          })
          .catch(() => {
            Message.warning("未知错误，请稍后再试");
          });
      });
    },
    editTask(row) {
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
      this.editVis = true;
      this.task = row;
      let flag = row.deadLineTime < new Date().format("yyyy-MM-dd hh:mm:ss");
      if (row.status == "结束" || flag) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    submitEditTask(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post("/admin/task/update", this.task).then(resp => {
            if (resp.status == 200) {
              Message.success("更新成功!");
              getTasks();
              bus.$on(bus.tasks, data => {
                this.tasks = data;
              });
              this.editVis = false;
            }
          });
        }
      });
    },
    }
}
</script>

<style scoped>

</style>