import { Todo } from '../entity/Todo';
import { CreateTodoInput, DeleteTodoInput, UpdateTodoInput } from '../inputs/TodoInput';
import { ContextType } from '../types';
import { FormError } from '../types/FormError';
import { Arg, Authorized, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';
import { User, UserType } from '../entity/User';

@ObjectType()
export class TodoResponse {
    @Field(() => [FormError], { nullable: true })
    errors?: FormError[];

    @Field(() => Todo, { nullable: true })
    todo?: Todo;
}

@ObjectType()
export class ListTodosResponse {
    @Field(() => [FormError], { nullable: true })
    errors?: FormError[];

    @Field(() => [Todo], { nullable: false })
    todos?: Todo[];
}

@Resolver(Todo)
export class TodoResolver {

    @Mutation(() => TodoResponse)
    @Authorized([UserType.ADMIN_USER, UserType.NORMAL_USER])
    async createTodo(
        @Arg('params')
        { name }: CreateTodoInput,
        @Ctx() { req }: ContextType,
    ): Promise<TodoResponse> {
        try {

            const userId = req.session.userId

            const owner = await User.findOneOrFail({
                where: { id: userId },
            });


            const todo = await getManager().transaction(async (transaction) => {
                // create a new todo instance
                const todo = transaction.create(Todo, {
                    name,
                    owner
                });
                await transaction.save(todo, {
                    reload: true,
                });
                // return the created todo
                return todo;
            })

            return {
                todo
            };
        } catch (error) {
            return {
                errors: [
                    {
                        field: error.field || 'exception',
                        message: error.message,
                    },
                ],
            };
        };
    }

    @Mutation(() => TodoResponse)
    @Authorized([UserType.ADMIN_USER, UserType.NORMAL_USER])
    async updateTodo(
        @Arg('params')
        { id, name, isComplete }: UpdateTodoInput,
        @Ctx() { req }: ContextType,
    ): Promise<TodoResponse> {
        try {
            const userId = req.session.userId

            const todo = await Todo.findOneOrFail({
                where: { id, owner: userId }
            });

            if (name) {
                todo.name = name
            }

            if (isComplete) {
                todo.completedAt = new Date()
            }

            await todo.save({
                reload: true,
              });

            return {
                todo
            };
        } catch (error) {
            return {
                errors: [
                    {
                        field: error.field || 'exception',
                        message: error.message,
                    },
                ],
            };
        };
    }

    @Mutation(() => TodoResponse)
    @Authorized([UserType.ADMIN_USER, UserType.NORMAL_USER])
    async deleteTodo(
        @Arg('params')
        { id }: DeleteTodoInput,
        @Ctx() { req }: ContextType,
    ): Promise<TodoResponse> {
        try {
            const userId = req.session.userId

            const todo = await Todo.findOneOrFail({
                where: { id , owner: userId}
            });

            await todo.softRemove({
                reload: true,
              });

            return {
                todo
            };
        } catch (error) {
            return {
                errors: [
                    {
                        field: error.field || 'exception',
                        message: error.message,
                    },
                ],
            };
        };
    }

    @Query(() => ListTodosResponse)
    @Authorized([UserType.ADMIN_USER, UserType.NORMAL_USER])
    async listTodos(
        @Ctx() { req }: ContextType,
    ): Promise<ListTodosResponse> {
        try {

            const userId = req.session.userId

            const todos = await Todo.find({
                where: { owner: userId }
            });

            return {
                todos
            };
        } catch (error) {
            return {
                errors: [
                    {
                        field: error.field || 'exception',
                        message: error.message,
                    },
                ],
            };
        };
    }

}
