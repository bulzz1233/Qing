import request from '@/util/request';

export function searchByFit(parms) {
    return request({
        method: 'POST',
        url: '/sport/selectByFit',
        data:parms
    });
}
