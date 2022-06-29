import request from '@/util/request';

export function update(parms) {
    return request({
        method: 'POST',
        url: '/user/update',
        data:parms
        
    });
}
