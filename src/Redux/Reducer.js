export default function reducer(
    state = {
      tasks: [] , // Changed "Tasks" to "tasks" for consistency and convention
    },
    action,
  ) {
    switch (action.type) {
      case 'ADD':
        return {
          ...state,
          tasks: {
            ...state.tasks,
            [action.payload.id]: action.payload,
          },
        };
      case 'DELETE': {
        const updatedTasks = { ...state.tasks };
        delete updatedTasks[action.payload.id];
        return {
          ...state,
          tasks: updatedTasks,
        };
      }
      case 'UPDATE':
        return {
          ...state,
          tasks: {
            ...state.tasks,
            [action.payload.id]: action.payload,
          },
        };
      default:
        return state;
    }
  }
