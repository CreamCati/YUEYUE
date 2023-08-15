import { message as antdMessage } from 'antd';

const msg = (content, type = 'info', duration = 2) => {
    switch (type) {
        case 'success':
            antdMessage.success(content, duration);
            break;
        case 'error':
            antdMessage.error(content, duration);
            break;
        case 'warning':
            antdMessage.warning(content, duration);
            break;
        default:
            antdMessage.info(content, duration);
    }
};

export default msg;
