import React, { Component } from 'react';
import ProductStore from './ProductStore'
import { Provider} from 'mobx-react';
import MainPage from './components/MainPage';

class App extends Component {

   store = new ProductStore();


  render() {
    return (
      <Provider store={this.store}>
      <div>
       <MainPage/>
       </div>
      </Provider>
    );
  }
}

export default App;
