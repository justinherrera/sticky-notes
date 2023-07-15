import { useState } from "react";
import { motion } from "framer-motion";
import Form from "./components/Todo/Form";
import { Provider } from "react-redux";
import store from "./store/todo";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: { opacity: 1, height: "11rem", width: "11rem" },
    closed: { opacity: 0, height: "0px", width: "0px" },
  };

  return (
    <Provider store={store}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Cancel" : "Create"}
      </button>
      <motion.div
        drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50,
        }}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className="bg-[#F8EBA2] text-left p-4 cursor-pointer"
      >
        <p>Untitled</p>
      </motion.div>
      <Form />
    </Provider>
  );
}

export default App;
