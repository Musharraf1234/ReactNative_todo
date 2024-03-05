import { Provider } from "react-redux";
import Home from "./src/Component/Home";
import store from "./src/Redux/store";
import { View } from "react-native";


export default function App() {
  return (
    <Provider store={store}>

  <Home/>

  </Provider>
  

  );
}


