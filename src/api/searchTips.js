import request from '@/util/request';
export function search(parms){
    return request({
        method:'POST',
        url:'/sport/selectPage',
        data:parms
    })
}