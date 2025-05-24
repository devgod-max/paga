import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import store from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  );
}
