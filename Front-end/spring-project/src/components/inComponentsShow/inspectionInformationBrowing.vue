<template>
    <div>
        <h1>this is inspectionInformationBrowing</h1>
        <el-container>
            <el-header style="display: flex;justify-content: left;align-items: center;">
                <h1 style="margin-left:15px">我的监考</h1>
            </el-header>
        <el-main>
        <el-table :data="myexams" border>
          <el-table-column label="地点" prop="place" align="center"></el-table-column>
          <el-table-column label="科目" prop="course.name" align="center"></el-table-column>
          <el-table-column label="开始时间" prop="startTime" align="center"></el-table-column>
          <el-table-column label="结束时间" prop="deadTime" align="center"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
    
</template>

<script>
import axios from "../../api/MyAxios";
export default {
  data: () => ({
    myexams: []
  }),
  created() {
    axios.get("/exam/list/my/exam").then(resp => {
      this.myexams = resp.data.myexams;
    });
  }
};
</script>

<style scoped>

</style>