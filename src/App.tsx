import Form from "./components/Todo/Form";
import { Provider } from "react-redux";
import store from "./store/todo";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen flex justify-center items-center">
        <Form />
      </div>
    </Provider>
  );
}

export default App;
