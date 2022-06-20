import request from '@/util/request';

export function login(parms) {
    return request({
        method: 'GET',
        url: '/auth/code',
        
    });
}
