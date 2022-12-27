import { useMachine } from "@xstate/react";
import { todosMachine } from "./todoAppMachine";

function App() {
  const [state, send] = useMachine(todosMachine);

  return (
    <>
      <div>
        {state.matches("Loading Todos") && <p>Loading...</p>}

        {state.matches("Show Todos") && (
          <>
            <button
              autoFocus
              onClick={() => {
                send({ type: "Create new todo" });
              }}
            >
              Create New
            </button>
            <ul>
              {state.context.todos.map((todo) => (
                <li key={todo}>
                  <p>
                    {todo}{" "}
                    {state.matches("Show Todos.Deleting todo") ? (
                      "Deleting..."
                    ) : (
                      <button
                        onClick={() =>
                          send({ type: "Delete todo", value: todo })
                        }
                      >
                        delete
                      </button>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}

        {(state.matches("Deleting todo errored") ||
          state.matches("Creating new todo.Saving todo errored")) && (
          <div>
            <p style={{ color: "red" }}>{state.context.errorMessage}</p>
            <button
              onClick={() => {
                send({ type: "Back" });
              }}
            >
              Back
            </button>
          </div>
        )}

        {state.matches("Creating new todo") &&
          !state.matches("Creating new todo.Saving todo errored") && (
            <>
              <p>Create a new todo:</p>

              {state.matches("Creating new todo.Saving todo") && (
                <p>Saving...</p>
              )}

              {state.matches("Creating new todo.Showing form input") && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send({ type: "Submit" });
                  }}
                >
                  <input
                    autoFocus
                    onChange={(e) => {
                      send({
                        type: "Form input changed",
                        value: e.target.value,
                      });
                    }}
                  ></input>
                </form>
              )}
            </>
          )}
      </div>
    </>
  );
}

export default App;
