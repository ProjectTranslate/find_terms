import { ADD_ITEM_TERMS } from "../constatns/todo_type";
const initialState = [
 
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TERMS:
      return [
        ...state,
        {
          form: action.form,
          mean: action.mean,
          word: action.word,
          translate: action.translate,
          example: action.example
        },
      ];
    default:
      return state;
  }
};
