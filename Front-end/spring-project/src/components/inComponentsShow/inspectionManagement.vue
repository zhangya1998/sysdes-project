<template>
    <div>
        <h1>this is inspectionManagement</h1>
        <el-container>
        <el-main>
          <el-table size="mini" :data="exams" border>
            <el-table-column label="ID" prop="id" v-if="false"></el-table-column>
            <el-table-column label="考试科目" prop="course.name" align="center"></el-table-column>
            <el-table-column label="地点" prop="place" align="center"></el-table-column>
            <el-table-column label="所需人数" prop="numOfPerson" align="center"></el-table-column>
            <el-table-column label="开始时间" prop="startTime" align="center"></el-table-column>
            <el-table-column label="结束时间" prop="deadTime" align="center"></el-table-column>
            <el-table-column label="状态" prop="status" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="checkExamTeacher(scope.row)">详情</el-button>
                <el-button size="mini" @click="addExamTeacher(scope.row)">
                  {{scope.row.status=="已分配" ? "重新分配" : "分配"}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="删除">
              <template slot-scope="scope">
                <el-button size="mini" @click="deleteExam(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        </el-container>

        <el-button @click="add">添加监考</el-button>

        <!--添加监考 表单对话框-->
        <el-dialog :visible.sync="dialogFormVisible">
          <el-form ref="exam" label-width="100px" class="demo-ruleForm">
            <el-form-item label="考试课程">
              <el-select v-model="course">
                <el-option v-for="c in courses" :key="c.id" :value="c.id + '-' + c.name" :label="c.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考场安排">
              <el-cascader :options="options" filterable v-model="places"></el-cascader>
            </el-form-item>
            <el-form-item label="所需人数">
              <el-input-number size="mini" :min="1" :max="2" v-model="exam.numOfPerson"></el-input-number>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm" v-model="exam.startTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm" v-model="exam.deadTime"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <!--分配老师监考对话框-->
        <el-dialog :visible.sync="addFormVisible" title="添加监考教师">
          <el-form>
            <p>本场监考需要<strong>{{ num }}</strong>名教师，请选择</p>  
            <el-form-item label="监考老师">
              <el-select v-model="teachers" multiple placeholder="请选择" :multiple-limit="`${this.num}`">
                <el-option v-for="item in recommendteachers" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="sumbmitExamTeacher">确 定</el-button>
        </el-dialog>

        <!--查看监考教师对话框-->
        <el-dialog :visible.sync="teacherDetailVisible" title="本场监考详情">
          <div>
            <el-table :data="examTeachers" style="width:75%;" border>
              <el-table-column label="教师姓名" prop="name"></el-table-column>
              <el-table-column label="联系电话" prop="phone"></el-table-column>
            </el-table>
          </div>
        </el-dialog>
  </div>
    
</template>

<script>
import axios from "../../api/MyAxios";
import { Message } from "element-ui";
import { getAllLesions } from "../../api/Main";
import { getExams } from "../../api/Main";
import bus from "../../api/bus";
export default {
    data() {
    return {
      exams: [],
      exam: {
        id: "",
        course: {
          id: "",
          name: ""
        },
        numOfPerson: 0,
        place: "",
        startTime: "",
        deadTime: "",
        status: "未分配"
      },
      course: "",
      places: [],
      courses: [],
      teachers: [],
      recommendteachers: [],
      dialogFormVisible: false,
      addFormVisible: false,
      teacherDetailVisible: false,
      options: [
        {
          value: "丹青",
          label: "丹青",
          children: [{
              value: "9楼",
              label: "9楼",
              children: [
                { value: "922",label: "922"},{ value: "903",label: "903"},{ value: "901",label: "901"}
              ]},
            {
              value: "8楼",
              label: "8楼",
              children: [
                { value: "801",label: "801" },{ value: "803",label: "803" },{ value: "805",label: "805" },
                { value: "811",label: "811" },{ value: "813",label: "813" }
              ]},
            {
              label: "4楼",
              value: "4楼",
              children: [
                { value: "403",label: "403" },{ value: "405",label: "405" },{ value: "413",label: "413"}
              ]
            }
          ]
        },
        {
          value: "锦绣",
          label: "锦绣",
          children: [
            {
              value: "3楼",
              label: "3楼",
              children: [
                { value: "T301",label: "T301" },{ value: "303",label: "303" },{ value: "305", label: "305"},
                { value: "311",label: "311"},{ value: "322",label: "322" }
              ]
            },
            {
              label: "4楼",
              value: "4楼",
              children: [
                { value: "401",label: "401" },{ value: "403",label: "403" },{ value: "411",label: "411"},
                { value: "413",label: "413"}
              ]
            }
          ]
        }
      ],
      num: 0,
      examing: {
        tids: [],
        exam: null
      },
      examTeachers: [],
      fenpeiflag: false
    };
  },
  created() {
    getAllLesions();
    bus.$on(bus.lessions, data => {
      this.courses = data;
    });
    getExams();
    bus.$on(bus.exams, data => {
      this.exams = data;
    });
  },
  methods: {
    deleteExam(row) {
      this.exam = row;
      axios.post("/exam/delete/examdetail", this.exam).then(resp => {
          if (resp && resp.status == 200) {
            this.examTeachers = [];
            this.teacherDetailVisible = false;
          }
        }).then(()=>{
          axios.post("/exam/admin/delete", row).then(resp => {
              if (resp && resp.status == 200) {
                Message.success("删除成功");
                getExams();
              }
          });
        })
    },
    checkExamTeacher(row) {
      this.teacherDetailVisible = true;
      this.exam.id = row.id;
      axios.post("/exam/get/teachers", this.exam).then(resp => {
        this.examTeachers = resp.data.teachers;
      });
    },
    addExamTeacher(row) {
      this.exam = row;
      if (row.status == "已分配") {
        this.$confirm("要重新分配老师吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            axios.post("/exam/delete/examdetail", this.exam).then(resp => {
              if (resp && resp.status == 200) {
                this.examTeachers = [];
                this.teacherDetailVisible = false;
              }
            });
        }).then(()=>{
          axios.get("/exam/list/teachers").then(response => {
            this.recommendteachers = response.data.teachers;
          });
          this.num = row.numOfPerson;
          this.examing.exam = row;
          setTimeout(()=>{
              this.addFormVisible = true;
          },500)
        }).then(()=>{
          getExams();
        });
      }
      else{
        axios.get("/exam/list/teachers").then(response => {
            this.recommendteachers = response.data.teachers;
          }).then(()=>{
            getExams();
          });
          this.num = row.numOfPerson;
          this.examing.exam = row;
          this.addFormVisible = true;
      }     
    },
    add() {
      this.dialogFormVisible = true;
      this.exam.id = "";
      this.exam.name="";
      this.exam.place="";
      this.exam.startTime = "";
      this.exam.deadTime = "";
    },
    submitForm() {
      let values = this.course.split("-");
      this.exam.course.id = values[0];
      this.exam.course.name = values[1];
      this.exam.place = this.places.toString().replace(",", "").replace(",", "");
      window.console.log(this.exam);
      axios.post("/exam/admin/add", this.exam).then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data.flag) {
              Message.warning("检测到有冲突");
            } else {
              Message.success("创建成功");
              this.exam.course.id = "";
              this.exam.course.name = "";
              this.exam.place = "";
              this.dialogFormVisible = false;
            }
            getExams();
          }})
          .catch(() => {
                Message.warning("检测到考场时间冲突，请重新选择教室或时间");
          });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sumbmitExamTeacher() {
      this.examing.tids = this.teachers;
      axios
        .post("/exam/update/add/teacher", this.examing)
        .then(resp => {
          if (resp.data.flag == true) {
            //存在冲突，警告提醒
            Message.warning("已添加，但检测到该教师监考时间冲突！");
          } else Message.success("添加成功！");
          this.teachers = null;
          this.addFormVisible = false;
        })
        .catch(() => {
          Message.warning("冲突警告：该监考老师在该时段已经有监考");
        });
    },
    close() {
      this.teachers = null;
      this.addFormVisible = false;
    }
  }
}
</script>

<style scoped>

</style>