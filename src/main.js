import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { Tabbar, TabbarItem, Button, NavBar,NoticeBar,Field,Popup,Picker,Grid, GridItem,Loading,Empty,Collapse,CollapseItem,MessageInput } from 'vant';
import 'vant/lib/index.css';


const app = createApp(App);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Button);
app.use(Grid);
app.use(GridItem);  
app.use(NavBar);  
app.use(NoticeBar);
app.use(Field);
app.use(Popup);
app.use(Picker);
app.use(Loading);
app.use(Empty);
app.use(Collapse);
app.use(MessageInput);  
app.use(CollapseItem);
app.use(router);
app.mount('#app');