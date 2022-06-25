import request from '@/util/request';

export function updateplan(parms) {
    return request({
        method: 'Post',
        url: '/plan/updateById',
        data:parms
    });
}
