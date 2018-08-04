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
            sortable: false,
            showNavigation: 'auto',
            fields: [
                { key: 'VnodeProtocolBaseAddr', label: 'Vnode Protocol Base Address', sortable: false },
                { key: 'bondMin', label: 'Min Bond', sortable: false},
                { key: 'vnodeCount', label: 'Vnode Count', sortable: false},
                { key: 'vnodeAddresses', label: 'Vnode IP/Port', sortable: false}
            ],
            useFontAwesome: true,
            group: 'client'
        };
    }
});