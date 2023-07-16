import { motion, Reorder } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { create, deleteOne, clear } from "../../features/todoSlice";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import "../../Form.css";

interface Todo {
  id: string;
  title: string;
}

type Store = {
  todos: [];
};

type Inputs = {
  title: string;
};

const Form = () => {
  const todos: Todo[] = useSelector((store: Store) => store.todos);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset({ title: "" });
    dispatch(create(data.title));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex space-x-2 justify-center items-center"
      >
        <input
          {...register("title")}
          className="p-1 border border-blue-500 rounded focus:outline-none"
        />

        <button type="submit">
          <PlusCircleIcon className="h-6 w-6 text-blue-500 cursor-pointer " />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(clear());
          }}
          className="bg-blue-500 cursor-pointer text-white py-1 px-2 rounded-lg"
        >
          Clear
        </button>
        {/* <input type="submit" value="Create" className="" /> */}
      </form>
      <div className="flex flex-col space-y-2 mt-2">
        {todos.map((todo) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex space-x-2 justify-end"
            key={todo.id}
          >
            <p className="rounded-lg px-4 py-2 bg-blue-500 text-white">
              {todo.title}
            </p>

            <XCircleIcon
              onClick={() => dispatch(deleteOne(todo.id))}
              className="h-6 w-6 mt-2 text-blue-500 cursor-pointer "
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Form;
