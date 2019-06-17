import Vue from "vue";
const compImportUrl = "./inComponentsShow"
export default new Vue({
  compImportUrl,
  data: () => ({
    isAdmin: "isAdmin",
    e: "execption",
    user: "user",
    users: "users",
    tasks: "tasks",
    replys: "replys",
    lessions: "lessions",
    exams: "exams"
  })
});
