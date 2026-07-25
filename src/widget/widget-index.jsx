import { h, render } from 'preact';
import Widget from './widget';
import { defaultConfiguration } from './default-configuration';
import { getI18nConfiguration } from '../i18n';

if (window.attachEvent) {
    window.attachEvent('onload', injectChat);
} else {
    window.addEventListener('load', injectChat, false);
}

function injectChat() {
    if (!window.intergramId) {
        console.error('Please set window.intergramId');
    } else {
        let root = document.createElement('div');
        root.id = 'intergramRoot';
        document.getElementsByTagName('body')[0].appendChild(root);
        const server = window.intergramServer || window.location.origin;
        const iFrameSrc = server + '/chat.html';
        const host = window.location.host || 'unknown-host';
        const custom = window.intergramCustomizations || {};
        const conf = getI18nConfiguration({ ...defaultConfiguration, ...custom });

        render(
            <Widget intergramId={window.intergramId}
                    host={host}
                    isMobile={window.screen.width < 500}
                    iFrameSrc={iFrameSrc}
                    conf={conf}
            />,
            root
        );

        try {
            const request = new XMLHttpRequest();
            request.open('POST', server + '/usage-start?host=' + host);
            request.send();
        } catch (e) { /* Fail silently */ }

    }

}
