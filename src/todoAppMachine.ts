import { createMachine, assign } from "xstate";
import { dbApi } from "./api";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwAQFkCGAxgBYCWAdmAHQAyqeE5UWaGsAxBhZeQG6oDWVFplyFSXWvUbN0mBL1QE8AFxKoyAbQAMAXW07EoAA6YSq9YZAAPRACYAHPcoBmAKyv7rh1vsBOV1pazgA0IACeiM72AOyUACwAbK4JtrbOzgCMGY7OAL65ocLY+MTkVJIMZExFHOpUCoKURaKlEnSV1bKw8mR8SuaauhoZBkggJrBmamSWNggJQZQJMUHRcXG+gfahEQjOvrGJHtFatpsOB3kFIM0l4uXt0jVgAE4vqC+URgA2KgBmHwAtk0ui17jRHlUZKwen0VNN9PpLBMphYxnNllpKLYtL5nAk8Rl0lpljtEBktLFlhlXBl-ETotFXEz8oVQXcypQAMpEVAAd2hmDYAGEXmAVGAsBQBcpZEixiiBrNyftbJRomdbMy3BlGdEQuFEAk4s4lpsohsCdS4qybuyxJyefzBbBKAARMDfMCqKGyjC1LgNIT21pUJ0Coruz3e6R+1CwxTw9SI3TI0xK9Hk3xq6L2ZxnfNaxn2Y1khDMjLY3wpInOaLLXw0223B1ccMuqNen1MONsV7vT4-f5AkGsMGO3kRrqdmO+2QJ-oIoaphXp6bKhAahKUClxWz6uvZSlxMv2U7qjw4xIbOJnjLNkPg9uRkgQL1sD1dyVx+XGNdo0A5jPWI1kZLQMivVx0gyMtjV8eIS0yOISXzHwrjZMcOS4UVxW7KUwBlWRuUnaQAReQEsHIIwAFdlDYAAxIFKLIGjlCwYg8CqSBf3Gf8ZkzBAKR8Fx62iCDVlvM4y3zVwEMCJl90bLRaWiB9MNbKgcPhKFpSwONiP5UimKo2i2C5aiACNATMHjFXXASiTPeI62PexHPrVxpK0OId3Aul8Sg9w6TUkQsM0sVtKYXT9K5PAeFjWQA3qXoBGDdTQ0oLS8OiojYviucMAXJNBj0Fc-0mDNAJVfZKGrPFlJSZD7FsMsAFpnCxJlshLILEhpewQuKDTMoi7KCL03K4oS-1+w+L5fmUMjgRbDKsukHKMG5KaCvjBRF2TZdRnK1F+KqwS63got9iiBIMgWXwy2ybcTXsOJomrGIEnuwbx2w0b1vGmLtp7WQsFmsUIDYAAhQh+FsviNyyZT4gSfVlhORlbBPQ1BNxWrUnOCCIN8RwEh+sKRtwgHCM2vLptQMG3g+SA2CsWBlAlSg8D+ZRXgACg6wIAEo2BW8E1p0wHJvykGMEZgduLK3iKvss6snrHd9QyE13DOCloketzav1ZI0k8fyiXJ4bP1nWWGfBlmYYIOGlbsgDrDsW9KFxBYTcbfc808nGCScDVTjq8DwPzK2MptvC43l5nIbZjnea5nn+cFrQRbFzk4-pxOIfhlX3bmZxkNqjwdR8ZJMiSMsmVkwIINcfx60agbbTIdA4EsXOKDTEvTo9wT1nVPMC1SZlc1LHHWqyJw0gpVw3o2Dq3Jj8EKieLpB5OjdMlNRtcy3Hw4i8A4G8rWkUhX5rKQJXxN4nZ0ij3yqR+NWTbF1U5cyiPwlIyxQUrOfIkdJsyEles-Nsk4Oz5x2u-VWI8si6m9gSWu-tbwr1gtkWqHVbwAPAr4A4MCwxwJfG+MASDS5GjxNiX+AcAGbANsHDUVYl7Fj3K3J+1x+4PCkDtbADsIA0OHnME4skYhxAgvmc2OJWG7DSGqfct1aS+DessN6rgyGU0ivhGmqAxEbmrFiOsqNxJ1kkg9HGqRnKUm8jIukX0V46L4Y+TkEsopS1piRKES1mKsWMQ5Ck19Ui3hQqjMSijPY5mrDrbM5tsxk3celcW-1JaGK2jLCaGBglq2ND5AIiRjT4igQaJRiR1Q+BIY4O6tdUi6K8QY3JqBskFxEfklBAcXDGjpGkakWMEiPTxpsEm9ZPBROajaVJoVrbRnjqDTpq4h4bi1E4PMyFlLly3HdU8WNvbIQUp4AIRIZn5CAA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: "",
        todoToDelete: "",
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
                actions: "assignTodosToContext",
              },
              {
                target: "Creating new todo",
              },
            ],
            onError: [
              {
                target: "Loading todos errored",
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

        "Loading todos errored": {},

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
      },
      id: "Todos Machine",
    },
    {
      guards: {
        "Has todos": (context, event) => event.data.length > 0,
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
