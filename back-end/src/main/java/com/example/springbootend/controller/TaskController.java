package com.example.springbootend.controller;


import com.example.springbootend.entity.Task;
import com.example.springbootend.repository.TaskRepository;
import com.example.springbootend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.rmi.MarshalledObject;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    //添加任务
    @PostMapping("/add")
    public Map postTask(@RequestBody Task task){

        Task t = taskService.addTask(task);
        return Map.of("task",t);
    }

    //列出所有任务
    @GetMapping("/list")
    public Map getAllTasks(){
        List<Task> tasks = taskService.listAllTasks();
        return Map.of("tasks",tasks);
    }

    //关闭任务
    @PostMapping("/close")
    public Map closeTask(@RequestBody Task t){
        int  p = taskService.updateTaskStatus(t);
        return Map.of("task",p);
    }

    //更新任务
    @PostMapping("/update")
    public Map updateTask(@RequestBody Task t){
        Task task = taskService.updateTask(t);
        return Map.of("task",task);
    }

    //删除任务
    @PostMapping("/delete")
    public Map deleteTask(@RequestBody Task task){
        Task t = taskService.deleteTask(task);
        return Map.of("task",t);
    }

}
