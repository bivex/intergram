import { h, render } from 'preact';
import Chat from './chat';
import store from 'store';
import { getI18nConfiguration } from '../i18n';

let conf = {};
const confString = getUrlParameter('conf');
if (confString) {
    try {
        conf = JSON.parse(confString);
    } catch (e) {
        console.log('Failed to parse conf', confString, e);
    }
}
conf = getI18nConfiguration(conf);

render(
    <Chat
        chatId={getUrlParameter('id')}
        userId={getUserId()}
        host={getUrlParameter('host')}
        conf={conf}
    />,
    document.getElementById('intergramChat')
);

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getUserId() {
    try {
        let userId = store.get('userId');
        if (!userId) {
            userId = generateRandomId();
            store.set('userId', userId);
        }
        return userId;
    } catch (e) {
        return generateRandomId();
    }
}

function generateRandomId() {
    return Math.random().toString(36).substr(2, 6);
}