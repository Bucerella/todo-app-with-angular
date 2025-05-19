import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      this.todoList = parsed.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
    }
  }

  saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todoList));
  }

  todoList: TodoItem[] = [];
  newTask: string = '';

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false,
        createdAt: new Date()
      };
      this.todoList.push(newTodoItem);
      this.saveTodos();
      this.newTask = '';
    }
  }

  toggleComplete(index: number): void {
    this.todoList[index].completed = !this.todoList[index].completed;
    this.saveTodos();
  }

  deleteTak(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTodos();
  }

}
