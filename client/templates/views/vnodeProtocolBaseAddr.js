import {Template} from 'meteor/templating';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session'

import './vnodeProtocolBaseAddr.html';

Template.VnodeProtocolBaseAddrPool.onCreated(function (){
    Session.set('isVnodeProtocolBaseAddrPoolReady', false);
    HTTP.call('GET', 'http://127.0.0.1:3000/VnodeProtocolBasePool', {}, 
        function(error, response){
            if (!error) {
                Session.set('isVnodeProtocolBaseAddrPoolReady', true);
                Session.set('isVnodeProtocolBaseAddrPoolReadyResult', response.data);
            }
        });
});

Template.VnodeProtocolBaseAddrPool.helpers({
    vnodeProtocolBaseAddrCollection() {
        while(Session.get('isVnodeProtocolBaseAddrPoolReady')===false){ window.setTimeout(checkFlag, 100); }
        return Session.get('isVnodeProtocolBaseAddrPoolReadyResult');
    },
    settings: function () {
        return {
            rowsPerPage: 15,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'VnodeProtocolBaseAddr', label: 'Vnode Protocol Base Address' },
            ],
            useFontAwesome: true,
            group: 'client'
        };
    }
});