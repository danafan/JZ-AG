import {
    Toast
} from 'vant';

export const loading = (flag) => {
    if (flag) {
        Toast.loading({
            mask: true,
            message: '載入中...'
        });
    } else {
        Toast.clear();
    }
}