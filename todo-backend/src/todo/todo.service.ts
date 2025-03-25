import { Injectable } from '@nestjs/common';
import { Todo } from './dto/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo: Todo = {
      id: uuidv4(),
      ...createTodoInput,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.todos.push(todo);
    return todo;
  }

  toggleTodo(id: string): Todo {
    const todo = this.findOne(id);
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();
    return todo;
  }

  delete(id: string): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos.length !== initialLength;
  }
}
