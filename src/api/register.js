import request from '@/util/request';

export function register(parms) {
    return request({
        method: 'POST',
        url: '/user/register',
        data:parms
    });
}
