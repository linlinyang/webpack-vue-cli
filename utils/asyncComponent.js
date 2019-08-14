import Loading from '@/components/Loading/index';

export default function loadAsyncComponent(src,chunkName){
    return () => {
        const ret = {
            loading: Loading,
            
        };
    };/* ({
        component: import(src),
        loading: Loading,
        error: ErrorComponent,
        timeout: 3000
    }) */
}