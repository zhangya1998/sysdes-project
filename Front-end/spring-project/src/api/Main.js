import axios from "./MyAxios";
import bus from "./bus";
import { Message } from "element-ui";
export function getMyInfo() {
  axios.get("/user").then(response => {
    // 模拟异步延时操作
    bus.$emit(bus.user, response.data.user);
  });
}

export function getTasks() {
  axios.get("/admin/task/list").then(resp => {
    bus.$emit(bus.tasks, resp.data.tasks);
  });
}

export function getReplys(data) {
  axios.get(`/taskdetail/get/${data.id}`).then(resp => {
    window.console.log(resp.data);
  });
}
export function postCourse(data) {
  axios.post("admin/courses", data.course).then(response => {
    if (response.status == 200) {
      setTimeout(() => {
        bus.$emit(bus.courses, response.data.courses);
      }, 100);
    } else {
      Message.warning("提交失败");
    }
  });
}
export function getAllLesions() {
  axios.get("/lession/list").then(resp => {
    bus.$emit(bus.lessions, resp.data.lessions);
  });
}
export function getUsers() {
  axios.get("/get/users").then(response => {
    bus.$emit(bus.users, response.data.users);
  });
}

export function getAllUsers(){
  axios.get("/get/allusers").then(response =>{
    bus.$emit(bus.users,response.data.users);
  });
}
export function getExams() {
  axios.get("/exam/admin/list").then(response => {
    bus.$emit(bus.exams, response.data.exams);
  });
}
export function postUsers(data) {
  axios
    .post("/set/update/user", data)
    .then(response => {
      setTimeout(() => {
        bus.$emit(bus.users, response.data.user);
      }, 500);
      Message.success("修改成功");
    })
    .catch(() => {
      Message.warning("未知错误，修改失败");
    });
}
