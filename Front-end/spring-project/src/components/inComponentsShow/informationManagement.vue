<template>
    <div id="wrapper">
        <h1>this is informationManagement</h1>
        <el-main>
            <el-table :data="users" style="width: 100%" title="普通用户列表" size="mini" stripe boolean border>
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="number" label="用户名" align="center"></el-table-column>
                <el-table-column prop="title" label="职称" align="center"></el-table-column>
                <el-table-column prop="introduction" label="简介" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="showEditEmpView(scope.row)" size="mini">编辑</el-button>
                        <el-button :type="scope.row.authority===2?'danger':'success'" size="mini" @click="open(scope.row)" >
                            {{scope.row.authority === 2 ? '解除权限' : "授予权限"}}
                        </el-button>
                        <el-button type="warning" @click="deleteUser(scope.row)" size="mini">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-button @click="addVis = !addVis">添加用户</el-button>
            <el-dialog title="添加用户" :visible.sync="addVis">
                <el-form :model="newUser">
                    <el-form-item label="姓名">
                        <el-input v-model="newUser.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="newUser.number" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="newUser.password" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="addUser">确 定</el-button>
            </el-dialog>


        <el-form :model="user">
            <div style="text-align: left">
            <el-dialog title="编辑员工" style="padding: 0px;" :visible.sync="dialogVisible">
            <el-form-item label="姓名:" prop="name">
                <el-input size="mini" placeholder="请输入员工姓名" v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input size="mini" disabled="true" v-model="user.number" ></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input size="mini" placeholder="请输入员工电话" v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="职称">
                <el-select v-model="user.title" size="mini" laceholder="请选择职位">
                    <el-option v-for="item in positions" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介">
                <el-input type="text" v-model="user.introduction"></el-input>
            </el-form-item>
            <el-button size="mini" type="primary" @click="postUser(user)">确 定</el-button>
        </el-dialog>
      </div>
    </el-form>
    </div>
</template>

<script>
import bus from "../../api/bus";
import axios from "../../api/MyAxios";
import { Message } from "element-ui";
import { getAllUsers } from "../../api/Main";
import { postUsers } from "../../api/Main";
export default {
    data(){
        return{
            users: [],
            addVis: false,
            dialogVisible: false,
            newUser:{
                name:"",
                password:"",
                number:""
            },
            user: {
                id: "",
                authority: "",
                name: "",
                number: "",
                title: "",
                phone: "",
                introduction: ""
            },
            positions: [
                { id: "1", name: "讲师" },
                { id: "2", name: "副教授" },
                { id: "3", name: "教授" }
            ]
        }
    },
    created() {
        getAllUsers();
        bus.$on(bus.users, data => {
            this.users = data;
            window.console.log(data);
        });
    },
    methods:{
        open(row) {
                this.$confirm("要"+ (row.authority===2?"解除":"授予") +"管理员权限给【" + row.name + "】吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    window.console.log(row.id);
                    this.user = row;
                    axios.post("/set/user/authority", this.user).then(resp => {
                        if (resp && resp.status == 200) {
                            window.console.log("success");
                        }
                    });
                    this.$message({
                        type: "success",
                        message: (row.authority===2?"解除":"授权") +"成功!"
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消"
                    });
                });
                getAllUsers();
        },
        deleteUser(row) {
            this.$confirm("确定删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.user = row;
                axios.post("/admin/remove", this.user).then(resp => {
                    if (resp.status == 200) {
                    Message.success("删除成功!");
                    this.dialogVisible = false;
                    getAllUsers();
                }
            })
            .catch(() => {
                Message.warning("未知错，删除失败");
            });
            });
        },
        postUser(user) {
            postUsers(user);
            this.dialogVisible = false;
            
        },
        addUser() {
            axios.post("/admin/new", this.newUser).then(resp => {
                if (resp.status == 200) {
                    Message.success("添加成功!");
                    this.newUser = { number: null, name: null, password: null };
                    this.addVis = false;
                    getAllUsers();
                } else {
                    Message.warning("未知错误");
                }
            }).catch(error => {
                window.console.log(error);
                Message.warning("学工号重复,添加失败");
            });
        },
        showEditEmpView(row) {
            this.dialogVisible = true;
            this.user = row;
            // this.user.name = row.name;
            // this.user.number = row.number;
            // this.user.id = row.id;
            // this.user.phone = row.phone;
            // this.user.introduction = row.introduction;
        },
    }
}
</script>

<style scoped>
    
</style>
