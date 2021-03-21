import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';


export default function Routes() {

  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/product/:id" component={Product} />
      <Route path="/login" component={Login} />
      <Route path="/registro" component={Registro} />
    </BrowserRouter>
  );

}
