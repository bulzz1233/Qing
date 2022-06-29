import request from '@/util/request';

export function allfinish(parms) {
    return request({
        method: 'POST',
        url: '/finish/all',
        data:parms
        
    });
}
