import { Meteor } from 'meteor/meteor';
import { _ } from 'underscore';

import './lib/moac/chain3Init';
import './collections';
import './SubChainProtocolPool';
import './VnodeProtocolPool';

const interval = 10000;

Meteor.startup(() => {
    Meteor.publish("SubChainProtocolProp", function(){
        console.log('publish SubChainProtocolProp');
        return SubChainProtocolProp.find({});
    });

    Meteor.publish("SubChainProtocolSCS", function(){
        console.log('publish SubChainProtocolSCS');
        return SubChainProtocolSCS.find({});
    });

    Meteor.publish("VnodeProtocolProp", function(){
        console.log('publish VnodeProtocolProp');
        return VnodeProtocolProp.find({});
    });

    Meteor.publish("VnodeProtocolVnode", function(){
        console.log('publish VnodeProtocolVnode');
        return VnodeProtocolVnode.find({});
    });

    Meteor.setInterval(function(){
        SubChainProtocolPool.syncPublicPropertiesFromChain();
        VnodeProtocolPool.syncPublicPropertiesFromChain();
    }, interval);
});

var getSubChainProtoclBasePublicProperties = function(data) {
    var newData = [];
    var len = data.length;
    // console.log("len: ", len);
    var contractAbi = [ { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "approvalAddresses", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "releaseFromSubchain", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "setSubchainActiveBlock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawRequest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "approvalAmounts", "outputs": [ { "name": "", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "approveBond", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "forfeitBond", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "subChainLastActiveBlock", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "scsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "scsApprovalList", "outputs": [ { "name": "bondApproved", "type": "uint256" }, { "name": "bondedCount", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PENDING_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "subchain", "type": "address" } ], "name": "releaseRequest", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "scsArray", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "blk", "type": "uint256" } ], "name": "setSubchainExpireBlock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "subChainExpireBlock", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "scsList", "outputs": [ { "name": "from", "type": "address" }, { "name": "bond", "type": "uint256" }, { "name": "state", "type": "uint256" }, { "name": "registerBlock", "type": "uint256" }, { "name": "withdrawBlock", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bondMin", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_addr", "type": "address" } ], "name": "isPerforming", "outputs": [ { "name": "res", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "thousandth", "type": "uint256" }, { "name": "minnum", "type": "uint256" } ], "name": "getSelectionTarget", "outputs": [ { "name": "target", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "targetnum", "type": "uint256" } ], "name": "getSelectionTargetByCount", "outputs": [ { "name": "target", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "subChainProtocol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "WITHDRAW_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "protocol", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "protocol", "template": "elements_input_string", "value": "" }, { "name": "bmin", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "bmin", "template": "elements_input_uint", "value": "" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "scs", "type": "address" } ], "name": "Registered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "UnRegistered", "type": "event" } ];
    
    for (var i=0; i<len; i++) {
        var contractAddress = data[i].SubChainProtocolAddr;
        console.log("contractAddress: ", contractAddress);
        var item = {
            "SubChainProtocolAddr": contractAddress
        };
        var contractInstance = chain3.mc.contract(contractAbi).at(contractAddress);

        //console.log(contractInstance);

        if (contractInstance) {
            var scsCount = contractInstance.scsCount().toNumber();
            console.log('scsCount', scsCount);

            item.scsCount = scsCount;
            var subChainProtocol = "";
            try {
                subChainProtocol = contractInstance.subChainProtocol();
            }
            catch(error){}
            finally
            {
                item.subChainProtocol = subChainProtocol;
            }
            var bondMin = contractInstance.bondMin().toNumber();
            item.bondMin = bondMin

            var scsAddresses = [];
            var scsAvailableFunds = [];
            var scsIsPerforming = [];
            var scs;
            if(scsCount!==0){
                for(var j=0; j<scsCount; j++){
                    var scsAddress = contractInstance.scsArray(j);
    
                    if(scsAddress !== '0x'){
                        var scs = contractInstance.scsList(scsAddress);
                        var scsApproval = contractInstance.scsApprovalList(scsAddress);

                        var bond = scs[1];
                        var bondNumber = bond.toNumber();

                        var bondApproved = scsApproval[0];
                        var bondApprovedNumber = bondApproved.toNumber();
                        var scsAvailableFund = (bondNumber-bondApprovedNumber)/1e18;


                        var isPerforming = contractInstance.isPerforming(scsAddress);
    
                        //scsAddresses.push(scsAddress);
                        scsAvailableFunds.push(scsAvailableFund);
                        scsIsPerforming.push(isPerforming);
                    } 
                    else{
                        //scsAddresses.push("N/A");
                        scsAvailableFunds.push("N/A");
                        scsIsPerforming.push("N/A");
                    }
                }
    
                for (var k=0; k<scsCount; k++){
                    if(k===0){
                        item.id = i;
                        //item.scsAddress = scsAddresses[k];
                        item.scsAvailableFund = scsAvailableFunds[k];
                        item.scsIsPerforming = scsIsPerforming[k];
                        newData.push(item);
                    }
                    else{
                        var newItem = {
                            id: i,
                            SubChainProtocolAddr: ' ',
                            scsCount: ' ',
                            subChainProtocol: ' ',
                            bondMin: ' ',
                            //scsAddress: scsAddresses[k],
                            scsAvailableFund: scsAvailableFunds[k],
                            scsIsPerforming: scsIsPerforming[k]
                        }
    
                        newData.push(newItem);
                    }
                }    
            }  
            else {
                newData.push(item);
            }      
        }
    }
    console.log('newData')
    console.log(newData);
    return newData;
};

var getSCSAvailableFundBySubChainProtocol = function(SubChainProtocolAddr, SCSAddr){
    var newData = [];
    // console.log("len: ", len);
    var contractAbi = [ { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "approvalAddresses", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "releaseFromSubchain", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "setSubchainActiveBlock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawRequest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "approvalAmounts", "outputs": [ { "name": "", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "approveBond", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "forfeitBond", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "subChainLastActiveBlock", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "scsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "scsApprovalList", "outputs": [ { "name": "bondApproved", "type": "uint256" }, { "name": "bondedCount", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PENDING_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "subchain", "type": "address" } ], "name": "releaseRequest", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "scsArray", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "blk", "type": "uint256" } ], "name": "setSubchainExpireBlock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "subChainExpireBlock", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "scsList", "outputs": [ { "name": "from", "type": "address" }, { "name": "bond", "type": "uint256" }, { "name": "state", "type": "uint256" }, { "name": "registerBlock", "type": "uint256" }, { "name": "withdrawBlock", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bondMin", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_addr", "type": "address" } ], "name": "isPerforming", "outputs": [ { "name": "res", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "thousandth", "type": "uint256" }, { "name": "minnum", "type": "uint256" } ], "name": "getSelectionTarget", "outputs": [ { "name": "target", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "targetnum", "type": "uint256" } ], "name": "getSelectionTargetByCount", "outputs": [ { "name": "target", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "subChainProtocol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "WITHDRAW_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "protocol", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "protocol", "template": "elements_input_string", "value": "" }, { "name": "bmin", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "bmin", "template": "elements_input_uint", "value": "" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "scs", "type": "address" } ], "name": "Registered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "UnRegistered", "type": "event" } ];
    
    var item = {
        "SubChainProtocolAddr": SubChainProtocolAddr
        ,"SCSAddr": SCSAddr
    };
    var contractInstance = chain3.mc.contract(contractAbi).at(SubChainProtocolAddr);
    if (contractInstance) {
        var scsCount = contractInstance.scsCount().toNumber();
        item.scsCount = scsCount;

        var scsAddresses = [];
        var scsAvailableFunds = [];
        if(scsCount!==0){
            for(var j=0; j<scsCount; j++){
                var scsAddress = contractInstance.scsArray(j);

                if(scsAddress === item.SCSAddr){
                    var scs = contractInstance.scsList(scsAddress);
                    var scsApproval = contractInstance.scsApprovalList(scsAddress);

                    var bond = scs[1];
                    var bondNumber = bond.toNumber();
                    var bondApproved = scsApproval[0];
                    var bondApprovedNumber = bondApproved.toNumber();

                    var scsAvailableFund = (bondNumber-bondApprovedNumber)/1e18;

                    return {
                        "SubChainProtocolAddr": SubChainProtocolAddr
                        ,"SCSAddr": SCSAddr
                        ,"AvailableFund": scsAvailableFund
                    };
                } 
            }
        }        
    }
    return newData;
}

var getVnodeProtocolBasePublicProperties = function(data) {
    var newData = [];
    var len = data.length;
    var contractAbi = [ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "vnodeList", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "randness", "type": "uint256" } ], "name": "pickRandomVnode", "outputs": [ { "name": "target", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawRequest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "vnodeCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PEDNING_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "outageReportList", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "level", "type": "uint256" }, { "name": "startpos", "type": "uint256" }, { "name": "count", "type": "uint256" } ], "name": "sweepOutage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "bondMin", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_addr", "type": "address" } ], "name": "isPerforming", "outputs": [ { "name": "res", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "vnodeStore", "outputs": [ { "name": "from", "type": "address" }, { "name": "bond", "type": "uint256" }, { "name": "state", "type": "uint256" }, { "name": "registerBlock", "type": "uint256" }, { "name": "withdrawBlock", "type": "uint256" }, { "name": "link", "type": "string" }, { "name": "via", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "vnode", "type": "address" }, { "name": "via", "type": "address" }, { "name": "link", "type": "string" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "vnode", "type": "address" } ], "name": "reportOutage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "WITHDRAW_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "bmin", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "bmin", "template": "elements_input_uint", "value": "" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" } ];

    for (var i=0; i<len; i++) {
        var contractAddress = data[i].VnodeProtocolBaseAddr;
        var item = {
            "VnodeProtocolBaseAddr": contractAddress
        };
        var contractInstance = chain3.mc.contract(contractAbi).at(contractAddress);
        //console.log(contractInstance);
        if (contractInstance) {
            var vnodeCount = contractInstance.vnodeCount().toNumber();
            item.vnodeCount = vnodeCount - 1;
            var bondMin = contractInstance.bondMin().toNumber();
            item.bondMin = bondMin;

            var vnodeAddresses = [];
            for (var j=1; j<vnodeCount; j++){
                var vnodeStore = contractInstance.vnodeStore(j);
                var link = vnodeStore[5];
                if(link===''){
                    link = "***.***.***.***:*****"
                }
                vnodeAddresses.push(link);
            }
            
            for (var k=0; k<vnodeAddresses.length; k++){
                if(k===0){
                    item.id = i;
                    item.vnodeAddresses = vnodeAddresses[k];
                    newData.push(item);
                }
                else{
                    var newItem = {
                        id: i,
                        VnodeProtocolBaseAddr: '',
                        bondMin: '',
                        vnodeCount: '',
                        vnodeAddresses: vnodeAddresses[k]
                    }

                    newData.push(newItem);
                }
            }
        }
    }

    return newData;
};

var getVnodeInfo = function(vnodeProtocolBaseAddress) {
    var contractAbi = [ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "vnodeList", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "randness", "type": "uint256" } ], "name": "pickRandomVnode", "outputs": [ { "name": "target", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawRequest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "vnodeCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PEDNING_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "outageReportList", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "level", "type": "uint256" }, { "name": "startpos", "type": "uint256" }, { "name": "count", "type": "uint256" } ], "name": "sweepOutage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "bondMin", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_addr", "type": "address" } ], "name": "isPerforming", "outputs": [ { "name": "res", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "vnodeStore", "outputs": [ { "name": "from", "type": "address" }, { "name": "bond", "type": "uint256" }, { "name": "state", "type": "uint256" }, { "name": "registerBlock", "type": "uint256" }, { "name": "withdrawBlock", "type": "uint256" }, { "name": "link", "type": "string" }, { "name": "via", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "vnode", "type": "address" }, { "name": "via", "type": "address" }, { "name": "link", "type": "string" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "vnode", "type": "address" } ], "name": "reportOutage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "WITHDRAW_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "bmin", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "bmin", "template": "elements_input_uint", "value": "" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" } ];
    var contractInstance = chain3.mc.contract(contractAbi).at(vnodeProtocolBaseAddress);

    if (contractInstance) {
        var index = 0;
        var vnodeStores;
        var vnodeInfo = [];

        while(true){
            try{
                var vnodeStores = contractInstance.vnodeStore(index);
                var via = vnodeStores[6];
                var vnodeAddr = vnodeStores[5];

                var newItem = {
                    via: via,
                    VnodeAddress: vnodeAddr
                }

                if (via !== "0x0000000000000000000000000000000000000000"){
                    vnodeInfo.push(newItem);
                }
            }
            catch(e){
                break;
            }

            index ++;
        }

        return vnodeInfo;
    }
};

var getMonitorInfo = function(subChainBaseAddress) {
    var contractAbi = [{ "constant": true, "inputs": [], "name": "maxMember", "outputs": [ { "name": "", "type": "uint256" } ], 
                        "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "index", "type": "uint256" } ], 
                        "name": "requestRelease", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
                        { "constant": true, "inputs": [], "name": "blockReward", "outputs": [ { "name": "", "type": "uint256" } ], 
                        "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "recv", "type": "address" }, 
                        { "name": "amount", "type": "uint256" } ], "name": "withdrawTokenMoac", "outputs": [], "payable": false, "stateMutability": "nonpayable", 
                        "type": "function" }, { "constant": false, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "removeSyncNode", "outputs": [], 
                        "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "amount", "type": "uint256" } ], 
                        "name": "sellMintToken", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
                        { "constant": false, "inputs": [ { "name": "addr", "type": "address" } ], "name": "setToken", "outputs": [], 
                        "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "BALANCE", 
                        "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
                        { "constant": true, "inputs": [ { "name": "userAddr", "type": "address" } ], "name": "getEnteringAmount", 
                        "outputs": [ { "name": "enteringAmt", "type": "uint256[]" }, { "name": "enteringtime", "type": "uint256[]" } ], "payable": false, 
                        "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "nodeList", 
                        "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
                        { "constant": true, "inputs": [], "name": "getMonitorInfo", "outputs": [ { "name": "", "type": "address[]" }, { "name": "", "type": "string[]" } ], 
                        "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getVnodeSimInfo", 
                        "outputs": [ { "components": [ { "name": "protocol", "type": "address" }, { "name": "minMember", "type": "uint256" }, { "name": "maxMember", 
                        "type": "uint256" }, { "name": "curFlushIndex", "type": "uint256" }, { "name": "lastFlushBlk", "type": "uint256" }, { "name": "proposalHashApprovedLast", 
                        "type": "bytes32" }, { "name": "blockReward", "type": "uint256" }, { "name": "txReward", "type": "uint256" }, { "name": "viaReward", "type": "uint256" }, 
                        { "name": "proposalExpiration", "type": "uint256" }, { "name": "VnodeProtocolBaseAddr", "type": "address" }, { "name": "penaltyBond", "type": "uint256" }, 
                        { "name": "subchainstatus", "type": "uint256" }, { "name": "owner", "type": "address" }, { "name": "BALANCE", "type": "uint256" }, { "name": "nodeList", 
                        "type": "address[]" }, { "name": "nodesToJoin", "type": "address[]" } ], "name": "", "type": "tuple" } ], "payable": false, "stateMutability": "view", 
                        "type": "function" }, { "constant": true, "inputs": [], "name": "nodeToReleaseCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, 
                        "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "scsBeneficiary", 
                        "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], 
                        "name": "minMember", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
                        { "constant": true, "inputs": [], "name": "funcCode", "outputs": [ { "name": "", "type": "bytes" } ], "payable": false, "stateMutability": "view", 
                        "type": "function" }, { "constant": true, "inputs": [], "name": "consensusFlag", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, 
                        "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "BackupUpToDate", 
                        "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "bytes32" } ], 
                        "name": "proposals", "outputs": [ { "name": "proposedBy", "type": "address" }, { "name": "lastApproved", "type": "bytes32" }, { "name": "hash", 
                        "type": "bytes32" }, { "name": "start", "type": "uint256" }, { "name": "end", "type": "uint256" }, { "name": "flag", "type": "uint256" }, 
                        { "name": "startingBlock", "type": "uint256" }, { "name": "votecount", "type": "uint256" }, { "name": "distributeFlag", "type": "uint256" } ], 
                        "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], 
                        "name": "nodesToDispel", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
                        { "constant": false, "inputs": [], "name": "setOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
                        { "constant": false, "inputs": [], "name": "close", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
                        { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "monitors", "outputs": [ { "name": "from", "type": "address" }, 
                        { "name": "bond", "type": "uint256" }, { "name": "link", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
                        { "constant": true, "inputs": [], "name": "txReward", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", 
                        "type": "function" }, { "constant": false, "inputs": [ { "name": "monitor", "type": "address" }, { "name": "link", "type": "string" } ], 
                        "name": "registerAsMonitor", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, 
                        "inputs": [ { "name": "scs", "type": "address" } ], "name": "getSCSRole", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, 
                        "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "nodesWatching", 
                        "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, 
                        "inputs": [], "name": "registerOpen", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, 
                        "inputs": [], "name": "rebuildFromLastFlushPoint", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
                        { "constant": false, "inputs": [], "name": "registerClose", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, 
                        "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "currentRefundGas", 
                        "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], 
                        "name": "buyMintToken", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "nodeCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "address" }, { "name": "link", "type": "string" } ], "name": "addSyncNode", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "AUTO_RETIRE", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "hash", "type": "bytes32" } ], "name": "requestDistributeAction", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "penaltyBond", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "indexInlist", "type": "uint256" }, { "name": "hashlist", "type": "bytes32[]" }, { "name": "blocknum", "type": "uint256[]" }, { "name": "distAmount", "type": "uint256[]" }, { "name": "badactors", "type": "uint256[]" }, { "name": "viaNodeAddress", "type": "address[]" }, { "name": "viaNodeAmount", "type": "uint256[]" }, { "name": "ercAddress", "type": "address[]" }, { "name": "ercAmount", "type": "uint256[]" } ], "name": "createProposal", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "protocol", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MONITOR_JOIN_FEE", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "beneficiary", "type": "address" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "registerAsSCS", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "beneficiary", "type": "address" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "registerAsBackup", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "tokenAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "addFund", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "contractNeedFund", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "nodesToJoin", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "nodePerformance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viaReward", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" }, { "name": "index1", "type": "uint8" }, { "name": "index2", "type": "uint8" } ], "name": "matchSelTarget", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "nodeToAdd", "type": "uint256" } ], "name": "registerAdd", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "indexInlist", "type": "uint256" }, { "name": "hash", "type": "bytes32" } ], "name": "voteOnProposal", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "MAX_DELETE_NUM", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "syncNodes", "outputs": [ { "name": "nodeId", "type": "address" }, { "name": "link", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getFlushInfo", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getEstFlushBlock", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "syncReward", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "hash", "type": "bytes32" } ], "name": "checkProposalStatus", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "types", "type": "uint256" } ], "name": "getProposal", "outputs": [ { "components": [ { "name": "proposedBy", "type": "address" }, { "name": "lastApproved", "type": "bytes32" }, { "name": "hash", "type": "bytes32" }, { "name": "start", "type": "uint256" }, { "name": "end", "type": "uint256" }, { "name": "distributionAmount", "type": "uint256[]" }, { "name": "flag", "type": "uint256" }, { "name": "startingBlock", "type": "uint256" }, { "name": "voters", "type": "uint256[]" }, { "name": "votecount", "type": "uint256" }, { "name": "badActors", "type": "uint256[]" }, { "name": "viaNodeAddress", "type": "address[]" }, { "name": "viaNodeAmount", "type": "uint256[]" }, { "name": "ercAddress", "type": "address[]" }, { "name": "ercAmount", "type": "uint256[]" }, { "name": "userAddr", "type": "address[]" }, { "name": "amount", "type": "uint256[]" }, { "name": "minerAddr", "type": "address[]" }, { "name": "distributeFlag", "type": "uint256" } ], "name": "", "type": "tuple" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "proposalHashInProgress", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "nodesToRelease", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "randIndex", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "indexInlist", "type": "uint256" }, { "name": "hash", "type": "bytes32" } ], "name": "requestProposalAction", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "isMemberValid", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "joinCntNow", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "AUTO_RETIRE_COUNT", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "selTarget", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "reset", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "proposalHashApprovedLast", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "NODE_INIT_PERFORMANCE", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "VnodeProtocolBaseAddr", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "holdingPoolPos", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "monitor", "type": "address" } ], "name": "removeMonitorInfo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "MAX_GAS_PRICE", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "joinCntMax", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "proposalExpiration", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "DEFLATOR_VALUE", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MONITOR_MIN_FEE", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "recv", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "amount", "type": "uint256" } ], "name": "requestEnterMicrochain", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "flushInRound", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MAX_USERADDR_TO_SUBCHAIN", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "proto", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "proto", "template": "elements_input_address", "value": "" }, { "name": "vnodeProtocolBaseAddr", "type": "address", "index": 1, "typeShort": "address", "bits": "", "displayName": "vnode Protocol Base Addr", "template": "elements_input_address", "value": "" }, { "name": "min", "type": "uint256", "index": 2, "typeShort": "uint", "bits": "256", "displayName": "min", "template": "elements_input_uint", "value": "" }, { "name": "max", "type": "uint256", "index": 3, "typeShort": "uint", "bits": "256", "displayName": "max", "template": "elements_input_uint", "value": "" }, { "name": "thousandth", "type": "uint256", "index": 4, "typeShort": "uint", "bits": "256", "displayName": "thousandth", "template": "elements_input_uint", "value": "" }, { "name": "flushRound", "type": "uint256", "index": 5, "typeShort": "uint", "bits": "256", "displayName": "flush Round", "template": "elements_input_uint", "value": "" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "message", "type": "string" } ], "name": "ReportStatus", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "addr", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "TransferAmount", "type": "event" } ];
    var contractInstance = chain3.mc.contract(contractAbi).at(subChainBaseAddress);

    if (contractInstance) {
        var index = 0;
        var monitors;
        var monitorInfo = [];

        while(true){
            try{
                monitors = contractInstance.monitors(index);

                var monitorAddr = monitors[2];
                var newItem = {
                    MonitorAddress: monitorAddr
                }

                if (monitorAddr !== ""){
                    monitorInfo.push(newItem);
                }
            }
            catch(e){
                break;
            }

            index ++;
        }

        return monitorInfo;
    }
};

//Meteor Func
Meteor.methods({
    // 'VnodePool': function(){
    //     var vnodes = chain3.net.getVnodes();
    //     var result = _.map(vnodes, function(vnode)
    //                     { 
    //                         return {
    //                             ip: vnode.ip,
    //                             serviceCfgPort: vnode.serviceCfgPort,
    //                             beneficialAddress: vnode.beneficialAddress
    //                         };
    //                     }
    //                 );

    //     result = result.concat(Vnode.find({}, {fields:{ _id: 0 }}).fetch());
    //     response = _.uniq(result, v => [v.ip, v.serviceCfgPort, v.beneficialAddress].join());
    //     console(response);
    //     return response;
    // },
    'SubChainProtocolPool': function(){
        var subChainProtocols = SubChainProtocol.find({}, {fields:{ _id: 0 }}).fetch();
        var response = getSubChainProtoclBasePublicProperties(subChainProtocols);
        return response;
    },    
    'VnodeProtocolBasePool': function(){
        var VnodeProtocolBases = VnodeProtocolBase.find({}, {fields:{ _id: 0 }}).fetch();
        var response = getVnodeProtocolBasePublicProperties(VnodeProtocolBases);
        return response;
    }
});

//Restful API
// GET /VnodePool - merge every Vnode information from MongoDB collection and Chain3 result.
Router.route('/VnodePool', {where: 'server'})
    .get(function(){
        var vnodes = chain3.net.getVnodes();
        //console.log("vnodes: ", vnodes);

        var result = _.map(vnodes, function(vnode)
                        { 
                            return {
                                ip: vnode.ip,
                                serviceCfgPort: vnode.serviceCfgPort,
                                beneficialAddress: vnode.beneficialAddress
                            };
                        }
                    );

        //console.log("result: ", vnodes);

        result = result.concat(Vnode.find({}, {fields:{ _id: 0 }}).fetch());

        //console.log("result: ", result)
        response = _.uniq(result, v => [v.ip, v.serviceCfgPort, v.beneficialAddress].join());

        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(response));
    })

    .post(function(){
        var response;
        if(this.request.body.ip_d9dfba965afcf22d124ba3d18b41f47317b98ca8 === undefined) {
            response = {
                "error" : true,
                "message" : "invalid data"
            };
        } else {
            var result = Vnode.find({ip_ : this.request.body.ip_d9dfba965afcf22d124ba3d18b41f47317b98ca8}).count();

            if(result === 0){
                Vnode.insert(
                    {
                        ip : this.request.body.ip_d9dfba965afcf22d124ba3d18b41f47317b98ca8
                        ,serviceCfgPort :  this.request.body.serviceCfgPort
                        ,beneficialAddress : this.request.body.beneficialAddress
                    });
            }

            response = {
                "error" : false,
                "message" : "Vnode information added."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

// GET /SubChainProtocolPool - returns every SubChainProtocolAddr from MongoDB collection.
Router.route('/SubChainProtocolPool', {where: 'server'})
    .get(function(){
        var subChainProtocols = SubChainProtocol.find({}, {fields:{ _id: 0 }}).fetch();
        //console.log("subChainProtocols", subChainProtocols);
        var response = getSubChainProtoclBasePublicProperties(subChainProtocols);
        //console.log("response", response);
        //add scscount from public view of contract
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(response));
    })

    .post(function(){
        var response;
        if(this.request.body.SubChainProtocolAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8 === undefined) {
            //console.log(this.request.body);
            response = {
                "error" : true,
                "message" : "invalid data"
            };
        } else {
            var result = SubChainProtocol.find({SubChainProtocolAddr : this.request.body.SubChainProtocolAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8}).count();

            if(result === 0){
                SubChainProtocol.insert({SubChainProtocolAddr : this.request.body.SubChainProtocolAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8});
            }

            response = {
                "error" : false,
                "message" : "Subchain protocol address added."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/DeleteSubChainProtocol_d9dfba965afcf22d124ba3d18b41f47317b98ca8/:ProtocolAddr', {where: 'server'})
    .delete(function(){
        var response;
        if(this.params.ProtocolAddr !== undefined) {
            var data = SubChainProtocol.find({SubChainProtocolAddr : this.params.ProtocolAddr}).fetch();
            console.log(data);
            if(data.length >  0) {
                if(SubChainProtocol.remove(data[0]._id) === 1) {
                    response = {
                        "error" : false,
                        "message" : "Protocol addresses deleted."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Protocol addresses not deleted."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Protocol addresses not found."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

// GET /SubChainProtocolNode - returns a random SubChainProtocolAddr from MongoDB collection.
Router.route('/SubChainProtocolAddr',{where: 'server'})
    .get(function(){
        var response;
        var allData = SubChainProtocol.find().fetch();
        var randomNum = Math.floor(SubChainProtocol.find().count() * Math.random());
        var data = allData[randomNum];
        if(data !== undefined) {
            response = data
        } else {
            response = {
                "error" : true,
                "message" : "Subchain protocol node not found."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

// GET /VnodeProtocolBasePool - returns every VnodeProtocolBaseAddr from MongoDB collection.
Router.route('/VnodeProtocolBasePool', {where: 'server'})
    .get(function(){
        var VnodeProtocolBases = VnodeProtocolBase.find({}, {fields:{ _id: 0 }}).fetch();
        var response = getVnodeProtocolBasePublicProperties(VnodeProtocolBases);
        //console.log("response", response);
        //add scscount from public view of contract
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(response));
    })

    .post(function(){
        var response;
        if(this.request.body.VnodeProtocolBaseAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8 === undefined) {
            //console.log(this.request.body);
            response = {
                "error" : true,
                "message" : "invalid data"
            };
        } else {
            var result = VnodeProtocolBase.find({VnodeProtocolBaseAddr : this.request.body.VnodeProtocolBaseAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8}).count();

            if(result === 0){
                VnodeProtocolBase.insert({VnodeProtocolBaseAddr : this.request.body.VnodeProtocolBaseAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8});
            }

            response = {
                "error" : false,
                "message" : "Vnode protocol base address added."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/DeleteVnodeProtocol_d9dfba965afcf22d124ba3d18b41f47317b98ca8/:ProtocolAddr', {where: 'server'})
    .delete(function(){
        var response;
        if(this.params.ProtocolAddr !== undefined) {
            var data = VnodeProtocolBase.find({VnodeProtocolBaseAddr : this.params.ProtocolAddr}).fetch();
            console.log(data);
            if(data.length >  0) {
                if(VnodeProtocolBase.remove(data[0]._id) === 1) {
                    response = {
                        "error" : false,
                        "message" : "Protocol addresses deleted."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Protocol addresses not deleted."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Protocol addresses not found."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

// GET /VnodeProtocolBaseNode - returns a random VnodeProtocolBaseAddr from MongoDB collection.
Router.route('/VnodeProtocolBaseAddr',{where: 'server'})
    .get(function(){
        var response;
        var allData = VnodeProtocolBase.find().fetch();
        var randomNum = Math.floor(VnodeProtocolBase.find().count() * Math.random());
        var data = allData[randomNum];
        //console.log(randomNum);
        //console.log(allData);
        //console.log(data);
        if(data !== undefined) {
            response = data
        } else {
            response = {
                "error" : true,
                "message" : "Vnode protocol base not found."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

// GET /VnodeAddr - returns vnode address base on VnodeProtocolBaseAddress.
Router.route('/VnodeAddr/:VnodeProtocolBaseAddr',{where: 'server'})
    .get(function(){
        var protocolAddr = this.params.VnodeProtocolBaseAddr;
        var data = getVnodeInfo(protocolAddr);
        if(data !== undefined) {
            response = {"VnodeList": data};
        } else {
            response = {
                "error" : true,
                "message" : "Vnode protocol base not found."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

// GET /ScsAvailableFund - returns available fund for scs address.
Router.route('/SCSAvailableFund/ProtocolAddr/:ProtocolAddr/SCSAddr/:SCSAddr', {where: 'server'})
    .get(function(){
        var protocolAddr = this.params.ProtocolAddr;
        var scsAddr = this.params.SCSAddr;

        var subChainProtocol = SubChainProtocol.find({}, {fields:{ SubChainProtocolAddr: protocolAddr}}).fetch();
        
        var result = getSCSAvailableFundBySubChainProtocol(protocolAddr, scsAddr);
        
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(result));
    });


// GET /MonitorAddr - returns monitor address base on SubChainBaseAddress.
Router.route('/MonitorAddr/:SubChainBaseAddr',{where: 'server'})
    .get(function(){
        var protocolAddr = this.params.SubChainBaseAddr;
        var data = getMonitorInfo(protocolAddr);

        if(data !== undefined) {
            response = {"MonitorList": data};
        } else {
            response = {
                "error" : true,
                "message" : "Subchain Base not found."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });