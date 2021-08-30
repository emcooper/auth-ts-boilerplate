
export const signUpQuery: string = "mutation {\n    signup(params: {email: \"ellen@gmail.com\", username: \"emcooper\", password: \"password123\", firstName: \"Ellen\", lastName: \"Cooper\"}) {\n          errors {\n        message\n      }\n      user {\n        id\n        email\n        username\n        emailVerifiedAt\n      }\n    }\n  }"
export const signInQuery: string = "mutation {\n    signin(params: {email: \"ellen@gmail.com\", password: \"password123\"}) {\n      message\n      user {\n        id\n        refreshToken\n        accessToken\n        tokens {\n          token\n        }\n      }\n      errors {\n        message\n      }\n    }\n  }"
export const createTodoQuery: string = "mutation {\n    createTodo(params: {name: \"water plants\"}) {\n      todo {\n        id\n        name\n        owner {\n          id\n        }\n        completedAt\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      errors {\n        message\n      }\n    }\n  }"
export const listTodosQuery: string = "query {\n    listTodos {\n      errors {\n        message\n      }\n      todos {\n      id\n        name\n        owner {\n          id \n          email\n        }\n        completedAt\n        createdAt\n        updatedAt\n        deletedAt\n      }\n    }\n    }"
export const updateTodoQuery: string = "mutation {\n    updateTodo(params: {id: \"INSERT TODO ID \", name: \"water basil plants\", isComplete: true}) {\n      errors {\n        message\n      }\n      todo {\n        id\n        name\n        owner {\n          id\n        }\n        completedAt\n        updatedAt\n        deletedAt\n      }\n    }\n    }"
export const deleteTodoQuery: string = "mutation {\n    deleteTodo(params: {id: \"INSERT TODO ID \"}) {\n      errors {\n        message\n      }\n      todo {\n        id\n        name\n        owner {\n          id\n        }\n        completedAt\n        createdAt\n        updatedAt\n        deletedAt\n      }\n    }\n  }"
