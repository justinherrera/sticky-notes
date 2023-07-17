import { motion, Reorder } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { create, deleteOne, updateOne, clear } from "../../features/todoSlice";
import {
  PlusCircleIcon,
  XCircleIcon,
  PencilIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
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
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [currentEditItem, setCurrentEditItem] = useState("");
  const todos: Todo[] = useSelector((store: Store) => store.todos);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm<Inputs>();

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
          {editMode ? (
            <CheckCircleIcon
              onClick={(e) => {
                e.preventDefault();
                const { id } = editForm as Todo;
                const { title } = getValues();
                dispatch(updateOne({ id, title }));
                reset({ title: "" });
                setEditMode(!editMode);
              }}
              className="h-6 w-6 mt-2 text-blue-500 cursor-pointer "
            />
          ) : (
            <PlusCircleIcon className="h-6 w-6 text-blue-500 cursor-pointer " />
          )}
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

            <div className="h-6 w-6 mt-2 bg-blue-500 rounded-2xl flex justify-center items-center">
              <PencilIcon
                onClick={
                  () => {
                    setEditForm({ id: todo.id, title: getValues().title });
                    setValue("title", todo.title);
                    setEditMode(!editMode);
                  }
                  // dispatch(updateOne({ id: todo.id, title: todo.title }))
                }
                className="h-3 w-3 text-white cursor-pointer "
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Form;
