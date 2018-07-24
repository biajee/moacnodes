import {Template} from 'meteor/templating';
import './vnodeIP.html';

Template.VnodeIPAddrPool.helpers({
    vnodeIPAddrCollection: function(){
        //var test = new Meteor.Collection('subChainProtocolAddrCollection');
        //https://www.moac.io/nodes/VnodePool
        // HTTP.call('GET', 'http://127.0.0.1:3000/VnodePool', {}, 
        //     function(error, response){
        //         if (!error) {
        //             console.log(JSON.parse(response.content));
        //             //var test = [{"SubChainProtocolAddr":"0x0000000002"},{"SubChainProtocolAddr":"0x0000000003"},{"SubChainProtocolAddr":"0x0000000004"},{"SubChainProtocolAddr":"0x0000000005"},{"SubChainProtocolAddr":"0x0000000006"},{"SubChainProtocolAddr":"0x0000000007"},{"SubChainProtocolAddr":"0x0000000007"},{"SubChainProtocolAddr":"0x0000000009"},{"SubChainProtocolAddr":"0x00000000010"},{"SubChainProtocolAddr":"0x110000000017"},{"SubChainProtocolAddr":"0xd0a6e6c54dbc68db5db3a091b171a77407ff7ccf"}];
        //             return JSON.parse(response.content);
        //         }
        //     });

        var test = [
            {
                "ip": "23.29.125.333",
                "serviceCfgPort": "50061",
                "beneficialAddress": "0x4e2cE50cC6C8C1228C6Cb70574c15C918b7c1666"
            },
            {
                "ip": "23.29.125.111",
                "serviceCfgPort": "50061",
                "beneficialAddress": "0x4e2cE50cC6C8C1228C6Cb70574c15C918b7c1666"
            },
            {
                "ip": "23.29.125.222",
                "serviceCfgPort": "50061",
                "beneficialAddress": "0x4e2cE50cC6C8C1228C6Cb70574c15C918b7c1666"
            },
            {
                "ip": "24.19.168.22",
                "serviceCfgPort": "50062",
                "beneficialAddress": "0x4e2cE50cC6C8C1228C6Cb70574c15C918b7c1e60"
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
                { key: 'ip', label: 'Vnode Proxy IP Address' },
                { key: 'serviceCfgPort', label: 'Vnode Proxy Port' },
                { key: 'beneficialAddress', label: 'Beneficial Address' }
            ],
            useFontAwesome: true,
            group: 'client'
        };
    }
});