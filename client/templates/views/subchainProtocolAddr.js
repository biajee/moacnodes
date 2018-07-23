import {Template} from 'meteor/templating';
import './subchainProtocolAddr.html';

Template.SubChainProtocolAddr.helpers({
    subChainProtocolAddrCollection: function(){
        //var test = HTTP.get('https://www.moac.io/nodes/SubChainProtocolPool');
        var test = [{"_id":"cbX89M5fzMt4DvEfc","SubChainProtocolAddr":"0xd0a6e6c54dbc68db5db3a091b171a77407ff7ccf"},{"_id":"TeRwvCQkhubFqePQv","SubChainProtocolAddr":"0x111111c54dbc68db5db3a091b171a77407ff7ccf"},{"_id":"vJD54dhMM5n9xFE5P","SubChainProtocolAddr":"0x222222c54dbc68db5db3a091b171a77407ff7ccf"},{"_id":"SgMXABaw4bGtEHFuv","SubChainProtocolAddr":"0x333333c54dbc68db5db3a091b171a77407ff7ccf"},{"_id":"nFXnSK563hsxtAiyu","SubChainProtocolAddr":"0x444444c54dbc68db5db3a091b171a77407ff7ccf"},{"_id":"dhiJ3jQ2RjXABWQ8S","SubChainProtocolAddr":"0x555555c54dbc68db5db3a091b171a77407ff7ccf"},{"_id":"FGEZPCJn5XMStkXs9","SubChainProtocolAddr":"0x666666c54dbc68db5db3a091b171a77407ff7ccf"},{"_id":"3tqNi9hg9sEQyEHB7","SubChainProtocolAddr":"0x777777c54dbc68db5db3a091b171a77407ff7ccf"},{"_id":"8kic93oX7N4u8A5iz","SubChainProtocolAddr":"0x888888c54dbc68db5db3a091b171a77407ff7ccf"},{"_id":"mMW5DCYGFdzMxDwCk","SubChainProtocolAddr":"0x999999c54dbc68db5db3a091b171a77407ff7ccf"}]
        console.log(test);
        return test;
    }
});