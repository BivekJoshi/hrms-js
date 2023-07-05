import * as Yup from 'yup';

const TodoListSchema = Yup.object().shape({
    message: Yup.string().required("Message can't be empty").min(3, 'Message Name must be at least 3 characters'),
});

export { TodoListSchema };