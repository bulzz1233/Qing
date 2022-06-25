import request from '@/util/request';

export function addplan(parms) {
    return request({
        method: 'POST',
        url: '/plan/add',
        data:parms
        
    });
}
