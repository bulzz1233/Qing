import request from '@/util/request';

export function allLikes(parms) {
    return request({
        method: 'POST',
        url: '/likes/LikesSelect',
        data:parms
        
    });
}
