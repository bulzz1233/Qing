import request from '@/util/request';

export function userLikes(parms) {
    return request({
        method: 'Post',
        url: '/likes/userlikes',
        data:parms
    });
}
