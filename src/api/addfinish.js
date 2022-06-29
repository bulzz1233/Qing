import request from '@/util/request';

export function addfinish(parms) {
    return request({
        method: 'POST',
        url: '/finish/addFinish',
        data:parms
        
    });
}
