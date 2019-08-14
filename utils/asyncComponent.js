import Loading from '@/components/Loading/index';

export default function loadAsyncComponent(src){
    const matches = src.match(/([^\\/]+)(\.[^\\/]+)?$/);
    if(!matches){
        throw new Error(`Component not found,cannnot resolve ${src}`);
    }
    const [_,filename,ext] = matches;

    return () => ({
        component: import(
            src
        ),
        loading: Loading,
        timeout: 3000
    })
}
