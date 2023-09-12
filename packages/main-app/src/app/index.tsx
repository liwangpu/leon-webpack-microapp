import { Outlet } from 'react-router-dom';
// import styles from './index.module.less';

// const routes: Array<IMenu> = [
//   {
//     title: '首页',
//     url: '/app/home',
//   },
//   {
//     title: '测试',
//     url: '/app/test',
//   },
// ];

const App = () => {
  return (
    // <div className={styles['app']}>
    //   <div className={styles['app__navigation']}>
    //   </div>
    //   <div className={styles['app__page']}>
    //     <Outlet />
    //   </div>
    // </div>

    <div>
      <Outlet />
    </div>
  );
}

export default App;
