import request from '@/util/request';

export function delplan(parm) {
    return request({
        method: 'Post',
        url: '/plan/delById',
        data:parm
    });
}
