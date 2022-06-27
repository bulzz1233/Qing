import request from '@/util/request';

export function allsport() {
    return request({
        method: 'GET',
        url: '/sport/allSport',
        
    });
}
