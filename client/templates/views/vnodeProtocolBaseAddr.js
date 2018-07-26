import {Template} from 'meteor/templating';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session'

import './vnodeProtocolBaseAddr.html';

Template.VnodeProtocolBaseAddrPool.onCreated(function (){
    Session.set('isVnodeProtocolBaseAddrPoolReady', false);
    HTTP.call('GET', '/VnodeProtocolBasePool', {}, 
        function(error, response){
            if (!error) {
                Session.set('isVnodeProtocolBaseAddrPoolReady', true);
                Session.set('VnodeProtocolBaseAddrPoolReadyResult', response.data);
            }
        });
});

Template.VnodeProtocolBaseAddrPool.helpers({
    vnodeProtocolBaseAddrCollection() {
        while(Session.get('isVnodeProtocolBaseAddrPoolReady')===false){ window.setTimeout(vnodeProtocolBaseAddrCollection, 100); }
        return Session.get('VnodeProtocolBaseAddrPoolReadyResult');
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