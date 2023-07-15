import { motion, Reorder } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { create } from "../../features/todoSlice";
import "../../Form.css";

interface Todo {
  id: number;
  title: string;
  body: string;
}

type Store = {
  todos: [];
};

type Inputs = {
  title: string;
  body: string;
};

const Form = () => {
  const [items, setItems] = useState<Todo[]>([]);
  const todos: Todo[] = useSelector((store: Store) => store.todos);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    dispatch(create(data.title, data.body));

  console.log(watch("title")); // watch input value by passing the name of it

  return (
    <div className="flex flex-col justify-center items-center border-2">
      {/* <motion.div
        initial={{ y: -250 }}
        animate={{ y: -10 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        <p>Hi</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <p>Hello</p>
      </motion.div>
      <motion.button
        whileHover={{
          scale: 1.1,
        }}
      >
        Lets Go
      </motion.button> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center"
      >
        <input {...register("title")} className="rounded border" />

        <textarea
          {...register("body", { required: true })}
          className="rounded border"
        />
        {errors.body && <span>This field is required</span>}

        <input type="submit" />
      </form>
      {todos.map((todo) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          key={todo.id}
          className="border-2 px-4 py-2 dark:bg-slate-800 text-white"
        >
          <p>{todo.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Form;
