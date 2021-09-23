import './App.css';
import "./App-tablet.css"
import "./App-desktop.css"

import { Switch, Route} from 'react-router';

import Home from "./containers/home"
import Contact from "./containers/contact"

import Profile from "./containers/user/profile"
import Logout from "./containers/user/logout"

import Admin from "./containers/admin/adminHome"
import AdminUsers from "./containers/admin/adminUsers"
import AdminUserEdit from "./containers/admin/adminUserEdit"
import AdminUserDelete from "./containers/admin/adminUserDelete"

import AdminProducts from "./containers/admin/adminProducts"
import AdminProductAdd from "./containers/admin/adminProductAdd"
import AdminProductEdit from "./containers/admin/adminProductEdit"
import AdminProductDelete from "./containers/admin/adminProductDelete"
import AdminRequests from "./containers/admin/adminRequests"
import AdminRequestEdit from "./containers/admin/adminRequestEdit"
import AdminShopOpinions from './containers/admin/adminShopOpinions';
import AdminDailyStand from "./containers/admin/adminDailyStand"

import Shop from "./containers/shop/shop"
import Product from "./containers/shop/product"
import Basket from "./containers/shop/basket"
import RequestSuccess from "./containers/shop/requestSuccess"
import DailyStand from "./containers/shop/dailyStand"

import RequireAuth from "./helpers/auth"

import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider} from '@material-ui/core';
import Lexend from "./assets/fonts/Lexend-Regular.ttf"

const lexend = {
  fontFamily: 'Lexend-Regular',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Lexend-Regular'),
    url(${Lexend}) format('ttf')
  `
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f7a223"
    },
    secondary: {
      main: "#ffffff"
    }
  },
  typography: {
    fontFamily: 'Lexend-Regular, Arial',
    fontSize:16,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [lexend],
      },
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={RequireAuth(Home)}/>
          <Route exact path="/contact" component={RequireAuth(Contact)} />
        
          <Route exact path="/user/profile" component={RequireAuth(Profile,true)}/>
          <Route exact path="/user/logout" component={RequireAuth(Logout, true)} />

          <Route exact path="/admin" component={RequireAuth(Admin,true,true)}/>
          <Route exact path="/admin/users" component={RequireAuth(AdminUsers,true,true)}/>
          <Route exact path="/admin/users/edit/:id" component={RequireAuth(AdminUserEdit,true,true)}/>
          <Route exact path="/admin/users/delete/:id" component={RequireAuth(AdminUserDelete,true,true)}/>

          <Route exact path="/admin/products" component={RequireAuth(AdminProducts,true,true)}/>
          <Route exact path="/admin/products/add" component={RequireAuth(AdminProductAdd,true,true)}/>
          <Route exact path="/admin/products/edit/:id" component={RequireAuth(AdminProductEdit,true,true)}/>
          <Route exact path="/admin/products/delete/:id" component={RequireAuth(AdminProductDelete,true,true)}/>

          <Route exact path="/admin/requests" component={RequireAuth(AdminRequests,true,true)} />
          <Route exact path="/admin/request/:id" component={RequireAuth(AdminRequestEdit,true,true)} />

          <Route exact path="/admin/shop/opinions" component={RequireAuth(AdminShopOpinions,true,true)} />

          <Route exact path="/admin/dailystand" component={RequireAuth(AdminDailyStand,true,true)} />

          <Route exact path="/shop" component={RequireAuth(Shop,true)}/>
          <Route exact path="/shop/products/:id" component={RequireAuth(Product, true)} />
          <Route exact path="/shop/basket" component={RequireAuth(Basket, true)} />
          <Route exact path="/shop/request/success/:id" component={RequireAuth(RequestSuccess, true)}/>
          <Route exact path="/shop/dailystand" component={RequireAuth(DailyStand)} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
