import { createMachine, assign } from "xstate";
import { dbApi } from "./api";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwAQFkCGAxgBYCWAdmAHQAyqeE5UWaGsAxBhZeQG6oDWVFplyFSXWvUbN0mBL1QE8AFxKoyAbQAMAXW07EoAA6YSq9YZAAPRACYAzAE5K9p1oCsT2wA5HAFgA2ABoQAE9Eez8-SlstWNtHAHYtALiARjSAgF8skOFsfGJyKkkGMiZ8jnUqBUFKfNEiiToyitlYeTI+JXNNXQ00gyQQE1gzNTJLGwRU+0oA72T7RKjHLS1vEPCEJ0TKQPdFuLWfJPscvPbG8RKW6UqwACdH1EfKIwAbFQAzV4BbepXQo3Gh3coyVidboqCb6fSWUbjCzDabeLR7NKBPxaeyHby2WxpdxbRB+dwudFaRzUtKJZaE9zZXIgBrA4qUADKRFQAHcIZg2ABhR5gFRgLAUPnKWTw4aI3pTRBpLyURIJWzuOnuWmJOkkmZ+OYBNb2bx+RzGhaYi4soFidlc3n82CUAAiYA+YFU4OlGCqXFqQjtTSojr5+TdHq90l9qChihh6jhugRpgVKMQiWc3nxu0JqzJtn15rS+zRGwCpxxOL8NtZ9q4Yedkc93qYsbYTxeb0+P3+gNY1wd3PD7Rb0Z9snjPVh-RTcrTE0VCDVAUoaS0flsdOWaTRK31aNsqsOsSx-jRaTrwZBTYjJAgnrY7tb4tjsuMi+RoFR6NVfl1LQ0jPTx7DSfUAnNMsAjA7EYNibxzmZesQ0oAAlL1HlCLAPjBdt2jYKxYGUMVKDwb5lCeAAKdx1gASjYFCQQw5QsJwvCsFjWAPxGL9JgzBAyTmdwt0iU1gLWRJ9UxPZINSNZEPsDZgNsa9BzZLgWLY3CpEnVhCOI0jyMox4aPoxib3ZLTsJ01pOPaAYhk-MZ0x-Ul8RiKkiUcekAkSYIwjsRZ5ncBI1UUzIMjUkQNKoYVRTbCUwClWRORHaRfkeP4sHIIwAFdlDYAAxf4crIfLlCwYg8HKSAePlJcBOAvxvH2RJ91SSslL8fVXFLY0CVNHEYICTrooKBs4pFGFwUleyMDS3kMtK3KCrYDk8oAIz+Mx6r45dMliShPDNU1EO8Y1-N6jcXGVXFII3bxgO8cahy4eKZqYObY05PAeBjWR-RqLoBCDdTJsoD7Eu+1KOT+gGMGnRM+j0ednKRfi3IQO7nAtHyPErbF8X1ABaJSTz3C73G1QIiRe5DLPe6boeS+bUF+-69NQTtnled4vmUTKASY9koekGGFrhzn8MRhQZyTOcnN4lzGqxyLnFxRZNRzSD7GkxxjwCWjINsKJzUJC7XtiyHmfF1mfqlhHUCwLtXkgNgACFCH4PaVe-awlUiclGUWextzDkTQukzJ11xFIWva6nHEQq2IbF2b7dh+GuZd3mRQgAySMosiKOopTzJFpmErtlLJezmXndd-PfYxg6-Bj7cyXRTVdTAzZAuxnN128TUNUxU2RKvBnwdQl8Jwb3Pu3dr2CB9tHldbgTTdaqlUi1RxgPa3EIOT1V4jxoCgLD1PZ6jRLY0Xt2C6IouqGMsv1i0BjK6oOf79kR+zd14NX9tMSIWhKCOEOLiR6jIwJG31IkamlB1jAXcFA-yhN6bMjIOgOAlgf6pj9pjAOOxSw5gcEkfM5oyS0lJipGI3ULroj3D4LcN8QSlHuO0Ihm8sYJAgYcNYdN6SBEcKTSIFMw41mrF4Dhw4nT5F4a5UhkFySEmSNuc6vh0T6k8KWWh0jQr2D8o4eRjYRzNj-k7ZRqtSEZFpCg40cCD7bxEhBPckCmFnSAtSRI5jQyWPvI+MAtjQGIGNHMDRcQj45kkhBNUMQDZgV1GaDU1IAnoUwjZDiXEwkkNRJ4dcyRaJnnRBbaSKxPI5jSD5Om6SkKXBniCdOX1M4YHyQdWIECAIdRSA4Tc+ofDzC3CPQ06J26mncJk1pSVa7szDMtLKZUKqdKapEfqDgzSBACN5HwQyoLrBHsnBY2s4gzNthneZHMbELmIQdHM0ROpxEQv4ZUUChmhUgYSSKmpTSmz3Bc6uVy2Y3Jzk3SAay1balagcamMEDb+E1NHNcKkcQWkxOiwkmTrHgrzpCu5fDSEalaohbEHhIirkyIeU2KDsRIJ8NTK+tZp4xQhlwrm2AIUQChaQqm+wWqRDqYaJSxIB6MpPHjLMKQ0EspyEAA */
  createMachine(
    {
      predictableActionArguments: true,
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: "",
        todoToDelete: "",
        retries: 0,
      },
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      schema: {
        events: {} as
          | { type: "Create new todo" }
          | { type: "Form input changed"; value: string }
          | { type: "Submit" }
          | { type: "Delete todo"; value: string }
          | { type: "Back" },
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
          deleteTodo: {
            data: void;
          };
        },
      },
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                target: "Show Todos",
                cond: "Has todos",
                actions: ["assignTodosToContext", "reset retries count"],
              },
              {
                target: "Creating new todo",
                actions: "reset retries count",
              },
            ],
            onError: [
              {
                target: "Retry loading todos",
                actions: "assignErrorMessageToContext",
              },
            ],
          },
        },

        "Show Todos": {
          on: {
            "Create new todo": {
              target: "Creating new todo",
            },
          },

          states: {
            "Deleting todo": {
              invoke: {
                src: "deleteTodo",
                onDone: "#Todos Machine.Loading Todos",
                onError: {
                  target: "#Todos Machine.Deleting todo errored",
                  actions: "assignErrorMessageToContext",
                },
              },
            },

            idle: {
              on: {
                "Delete todo": {
                  target: "Deleting todo",
                  actions: "assignTodoToDeleteToContext",
                },
              },
            },
          },

          initial: "idle",
        },

        "Retry loading todos": {
          after: {
            "500": [
              {
                target: "Loading Todos",
                actions: "increase retries count",
                cond: "not max retries",
              },
              {
                target: "Loading todos errored",
              },
            ],
          },
        },

        "Creating new todo": {
          initial: "Showing form input",
          states: {
            "Showing form input": {
              on: {
                "Form input changed": {
                  actions: "assignFormInputToContext",
                },
                Submit: {
                  target: "Saving todo",
                },
              },
            },

            "Saving todo": {
              invoke: {
                src: "saveTodo",
                onDone: [
                  {
                    target: "#Todos Machine.Loading Todos",
                  },
                ],
                onError: {
                  target: "Saving todo errored",
                  actions: "assignErrorMessageToContext",
                },
              },
            },

            "Saving todo errored": {
              after: {
                "3000": "Showing form input",
              },

              on: {
                Back: "Showing form input",
              },
            },
          },
        },

        "Deleting todo errored": {
          after: {
            "3000": {
              target: "#Todos Machine.Show Todos",
              actions: [],
              internal: false,
            },
          },

          on: {
            Back: {
              target: "Show Todos",
            },
          },

          exit: "resetTodoToDelete",
        },

        "Loading todos errored": {},
      },
      id: "Todos Machine",
    },
    {
      guards: {
        "Has todos": (context, event) => event.data.length > 0,
        "not max retries": (context, event) => context.retries < 5,
      },
      services: {
        loadTodos: async () => {
          const result = await dbApi.getTodos();

          return Array.from(result.data);
        },
        saveTodo: async (context, event) => {
          const result = await dbApi.addTodo(context.createNewTodoFormInput);
          // todos.add(context.createNewTodoFormInput);
        },
        deleteTodo: async (context, event) => {
          const result = await dbApi.deleteTodo(context.todoToDelete);
        },
      },
      actions: {
        "increase retries count": assign((context, event) => ({
          retries: (context.retries += 1),
        })),
        "reset retries count": assign((context, event) => ({
          retries: 0,
        })),
        assignTodosToContext: assign((context, event) => ({
          todos: event.data,
        })),
        assignErrorMessageToContext: assign((context, event) => ({
          errorMessage: (event.data as Error).message,
        })),
        assignFormInputToContext: assign((context, event) => ({
          createNewTodoFormInput: event.value,
        })),
        assignTodoToDeleteToContext: assign((context, event) => ({
          todoToDelete: event.value,
        })),
        resetTodoToDelete: assign((context, event) => ({
          todoToDelete: "",
        })),
      },
    }
  );
