import Loading from '@/components/Loading/index';
import ErrorPage from '@/views/ErrorPage/index';

/*
* 异步加载组件时，处理中间过渡的函数 
* @params {Object},需要加载的组件,例如import('@/views/Home/index')
* @return {Object}, 返回一个Promise对象
*/
export function loadAsyncComponent(asyncView){
    const asyncHandler = () => ({
        component: asyncView,
        loading: Loading,
        error: ErrorPage,
        delay: 200,
        timeout: 3000
    });

    return Promise.resolve({
        functional: true,
        render(h,{data,children}){
            return h(asyncHandler,data,children);
        }
    });
}