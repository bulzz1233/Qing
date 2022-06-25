import request from '@/util/request';

export function allplan(parms) {
    return request({
        method: 'POST',
        url: '/plan/all',
        data:parms
    });
}
