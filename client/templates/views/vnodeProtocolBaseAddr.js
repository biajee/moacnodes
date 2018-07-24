import {Template} from 'meteor/templating';
import './vnodeProtocolBaseAddr.html';

Template.VnodeProtocolBaseAddrPool.helpers({
    vnodeProtocolBaseAddrCollection: function(){
        //var test = new Meteor.Collection('subChainProtocolAddrCollection');
        //https://www.moac.io/nodes/VnodeProtocolBasePool
        // HTTP.call('GET', 'http://127.0.0.1:3000/VnodeProtocolBasePool', {}, 
        //     function(error, response){
        //         if (!error) {
        //             console.log(JSON.parse(response.content));
        //             //var test = [{"SubChainProtocolAddr":"0x0000000002"},{"SubChainProtocolAddr":"0x0000000003"},{"SubChainProtocolAddr":"0x0000000004"},{"SubChainProtocolAddr":"0x0000000005"},{"SubChainProtocolAddr":"0x0000000006"},{"SubChainProtocolAddr":"0x0000000007"},{"SubChainProtocolAddr":"0x0000000007"},{"SubChainProtocolAddr":"0x0000000009"},{"SubChainProtocolAddr":"0x00000000010"},{"SubChainProtocolAddr":"0x110000000017"},{"SubChainProtocolAddr":"0xd0a6e6c54dbc68db5db3a091b171a77407ff7ccf"}];
        //             return JSON.parse(response.content);
        //         }
        //     });

        var test = [
            {
                "VnodeProtocolBaseAddr": "0x100000000001"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000002"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000003"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000004"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000005"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000006"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000007"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000008"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000009"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000010"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000011"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000012"
            },
            {
                "VnodeProtocolBaseAddr": "0x100000000013"
            }
        ];
        return test;
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