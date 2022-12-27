// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.Todos Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "done.invoke.Todos Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Todos Machine.Loading Todos:invocation[0]": {
      type: "done.invoke.Todos Machine.Loading Todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Todos Machine.Show Todos.Deleting todo:invocation[0]": {
      type: "done.invoke.Todos Machine.Show Todos.Deleting todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Todos Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "error.platform.Todos Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
    };
    "error.platform.Todos Machine.Loading Todos:invocation[0]": {
      type: "error.platform.Todos Machine.Loading Todos:invocation[0]";
      data: unknown;
    };
    "error.platform.Todos Machine.Show Todos.Deleting todo:invocation[0]": {
      type: "error.platform.Todos Machine.Show Todos.Deleting todo:invocation[0]";
      data: unknown;
    };
    "xstate.after(3000)#Todos Machine.Creating new todo.Saving todo errored": {
      type: "xstate.after(3000)#Todos Machine.Creating new todo.Saving todo errored";
    };
    "xstate.after(3000)#Todos Machine.Deleting todo errored": {
      type: "xstate.after(3000)#Todos Machine.Deleting todo errored";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    deleteTodo: "done.invoke.Todos Machine.Show Todos.Deleting todo:invocation[0]";
    loadTodos: "done.invoke.Todos Machine.Loading Todos:invocation[0]";
    saveTodo: "done.invoke.Todos Machine.Creating new todo.Saving todo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignErrorMessageToContext:
      | "error.platform.Todos Machine.Creating new todo.Saving todo:invocation[0]"
      | "error.platform.Todos Machine.Loading Todos:invocation[0]"
      | "error.platform.Todos Machine.Show Todos.Deleting todo:invocation[0]";
    assignFormInputToContext: "Form input changed";
    assignTodoToDeleteToContext: "Delete todo";
    assignTodosToContext: "done.invoke.Todos Machine.Loading Todos:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    "Has todos": "done.invoke.Todos Machine.Loading Todos:invocation[0]";
  };
  eventsCausingServices: {
    deleteTodo: "Delete todo";
    loadTodos:
      | "done.invoke.Todos Machine.Creating new todo.Saving todo:invocation[0]"
      | "done.invoke.Todos Machine.Show Todos.Deleting todo:invocation[0]"
      | "xstate.init";
    saveTodo: "Submit";
  };
  matchesStates:
    | "Creating new todo"
    | "Creating new todo.Saving todo"
    | "Creating new todo.Saving todo errored"
    | "Creating new todo.Showing form input"
    | "Deleting todo errored"
    | "Loading Todos"
    | "Loading todos errored"
    | "Show Todos"
    | "Show Todos.Deleting todo"
    | "Show Todos.idle"
    | {
        "Creating new todo"?:
          | "Saving todo"
          | "Saving todo errored"
          | "Showing form input";
        "Show Todos"?: "Deleting todo" | "idle";
      };
  tags: never;
}
