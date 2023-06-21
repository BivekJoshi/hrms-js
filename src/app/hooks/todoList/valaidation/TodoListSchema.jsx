import * as Yup from 'yup';

const TodoListSchema = Yup.object().shape({
    message: Yup.string(),
});

export { TodoListSchema };