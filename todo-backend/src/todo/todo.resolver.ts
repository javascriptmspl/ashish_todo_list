import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './dto/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  async findAll() {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo)
  async toggleTodo(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.toggleTodo(id);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.delete(id);
  }
}
