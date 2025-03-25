# Todo App Backend (NestJS GraphQL API)

## Overview

This is a GraphQL API backend for a Todo application built with NestJS and Apollo Server. It provides full CRUD operations for managing todo items.

## Features

- GraphQL API with queries and mutations
- TypeScript support with proper typing
- In-memory data storage (for development)
- CORS configured for frontend access
- GraphQL Playground for testing

## Technologies

- NestJS
- Apollo Server
- GraphQL
- TypeScript

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

## http://localhost:3000/graphql

## For Create with GraphQL

<!-- {
    "query": "mutation ($input: CreateTodoInput!) { createTodo(createTodoInput: $input) { id title description completed } }",
    "variables": {
        "input": {
            "title": "New Task",
            "description": "Task description here"
        }
    }
} -->

## For GetAll with GraphQL

<!-- {
    "query": "query { todos { id title description completed createdAt updatedAt } }"
} -->

## For GetById with GraphQL

<!-- {
    "query": "query ($id: ID!) { todo(id: $id) { id title description completed } }",
    "variables": {
        "id": "1"
    }
} -->

## For Delete with GraphQL

<!-- {
    "query": "mutation ($id: ID!) { deleteTodo(id: $id) }",
    "variables": {
        "id": "1"
    }
} -->
