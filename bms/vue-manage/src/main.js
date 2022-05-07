import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {
  Button, Container, Radio, Main, Aside, Header, Menu
  , Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu
  , DropdownItem, Row, Col, Card, Table, Breadcrumb, BreadcrumbItem
  , Tag, Form, FormItem, Input, Select, Switch, DatePicker, Option, Dialog, Pagination, TableColumn
  , Autocomplete, MessageBox, Message
}
  from 'element-ui'
import router from './router'
import store from './store'
import './assets/less/index.less'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.use(Button)
Vue.use(Container)
Vue.use(Radio)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.use(Autocomplete)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
