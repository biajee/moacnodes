import { Meteor } from 'meteor/meteor';
import Chain3 from 'chain3';
import { _ } from 'underscore';

global.Buffer = global.Buffer || require("buffer").Buffer;

//"https://www.moacwalletonline.com/main"
if(typeof chain3 !== 'undefined')
  chain3 = new Chain3(chain3.currentProvider);
else
  chain3 = new Chain3(new Chain3.providers.HttpProvider("http://127.0.0.1:8545"));	

Meteor.startup(() => {
  // code to run on server at startup
  Vnode = new Meteor.Collection('vnode');
  SubChainProtocol = new Meteor.Collection('subchainprotocol');
  VnodeProtocolBase = new Meteor.Collection('vnodeprotocolbase');
});

var getSubChainProtoclBasePublicProperties = function(data) {
    var newData = [];
    var len = data.length;
    // console.log("len: ", len);
    var contractAbi = [ { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "approvalAddresses", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "releaseFromSubchain", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "setSubchainActiveBlock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawRequest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "approvalAmounts", "outputs": [ { "name": "", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "approveBond", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "forfeitBond", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "subChainLastActiveBlock", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "scsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "scsApprovalList", "outputs": [ { "name": "bondApproved", "type": "uint256" }, { "name": "bondedCount", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PENDING_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "subchain", "type": "address" } ], "name": "releaseRequest", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "scsArray", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "blk", "type": "uint256" } ], "name": "setSubchainExpireBlock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "subChainExpireBlock", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "scsList", "outputs": [ { "name": "from", "type": "address" }, { "name": "bond", "type": "uint256" }, { "name": "state", "type": "uint256" }, { "name": "registerBlock", "type": "uint256" }, { "name": "withdrawBlock", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bondMin", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_addr", "type": "address" } ], "name": "isPerforming", "outputs": [ { "name": "res", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "thousandth", "type": "uint256" }, { "name": "minnum", "type": "uint256" } ], "name": "getSelectionTarget", "outputs": [ { "name": "target", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "targetnum", "type": "uint256" } ], "name": "getSelectionTargetByCount", "outputs": [ { "name": "target", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "subChainProtocol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "WITHDRAW_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "protocol", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "protocol", "template": "elements_input_string", "value": "" }, { "name": "bmin", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "bmin", "template": "elements_input_uint", "value": "" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "scs", "type": "address" } ], "name": "Registered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "UnRegistered", "type": "event" } ];
    
    for (var i=0; i<len; i++) {
        var contractAddress = data[i].SubChainProtocolAddr;
        // console.log("contractAddress: ", contractAddress);
        var item = {
            "SubChainProtocolAddr": contractAddress
        };
        var contractInstance = chain3.mc.contract(contractAbi).at(contractAddress);
        if (contractInstance) {
            var scsCount = contractInstance.scsCount().toNumber();
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
    
                        scsAddresses.push(scsAddress);
                        scsAvailableFunds.push(scsAvailableFund);
                    } 
                    else{
                        scsAddresses.push("N/A");
                        scsAvailableFunds.push("N/A");
                    }
                }
    
                for (var k=0; k<scsCount; k++){
                    if(k===0){
                        item.id = i;
                        //item.scsAddress = scsAddresses[k];
                        item.scsAvailableFund = scsAvailableFunds[k];
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
                            scsAvailableFund: scsAvailableFunds[k]
                        }
    
                        newData.push(newItem);
                    }
                }    
            }        
        }
    }
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
    var contractAbi = [ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "vnodeList", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "vnode", "type": "address" }, { "name": "link", "type": "string" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawRequest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "vnodeCount", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PEDNING_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "randness", "type": "uint256" }, { "name": "nodecntbase", "type": "uint256" }, { "name": "i", "type": "uint256" } ], "name": "pickRandomVnode", "outputs": [ { "name": "target", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bondMin", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_addr", "type": "address" } ], "name": "isPerforming", "outputs": [ { "name": "res", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "vnodeStore", "outputs": [ { "name": "from", "type": "address" }, { "name": "bond", "type": "uint256" }, { "name": "state", "type": "uint256" }, { "name": "registerBlock", "type": "uint256" }, { "name": "withdrawBlock", "type": "uint256" }, { "name": "link", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "WITHDRAW_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "bmin", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "bmin", "template": "elements_input_uint", "value": "2" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" } ];

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


// GET /ScsAvailableFund - returns available fund for scs address.
Router.route('/SCSAvailableFund/ProtocolAddr/:ProtocolAddr/SCSAddr/:SCSAddr', {where: 'server'})
    .get(function(){
        var protocolAddr = this.params.ProtocolAddr;
        var scsAddr = this.params.SCSAddr;

        var subChainProtocol = SubChainProtocol.find({}, {fields:{ SubChainProtocolAddr: protocolAddr}}).fetch();
        console.log("subChainProtocols", subChainProtocol);
        
        var result = getSCSAvailableFundBySubChainProtocol(protocolAddr, scsAddr);
        
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(result));
    });