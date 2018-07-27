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

var getScsCount = function(data) {
    var newData = [];
    var len = data.length;
    var contractAbi = [{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"approvalAddresses","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"scs","type":"address"},{"name":"amount","type":"uint256"}],"name":"releaseFromSubchain","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"setSubchainActiveBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawRequest","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"approvalAmounts","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"scs","type":"address"}],"name":"register","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"scs","type":"address"},{"name":"amount","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"approveBond","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"scs","type":"address"},{"name":"amount","type":"uint256"}],"name":"forfeitBond","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"subChainLastActiveBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"scsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"scsApprovalList","outputs":[{"name":"bondApproved","type":"uint256"},{"name":"bondedCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PEDNING_BLOCK_DELAY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"scs","type":"address"},{"name":"subchain","type":"address"}],"name":"releaseRequest","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"blk","type":"uint256"}],"name":"setSubchainExpireBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"subChainExpireBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"scsList","outputs":[{"name":"from","type":"address"},{"name":"bond","type":"uint256"},{"name":"state","type":"uint256"},{"name":"registerBlock","type":"uint256"},{"name":"withdrawBlock","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bondMin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isPerforming","outputs":[{"name":"res","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"thousandth","type":"uint256"},{"name":"minnum","type":"uint256"}],"name":"getSelectionTarget","outputs":[{"name":"target","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"targetnum","type":"uint256"}],"name":"getSelectionTargetByCount","outputs":[{"name":"target","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"subChainProtocol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"WITHDRAW_BLOCK_DELAY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"protocol","type":"string"},{"name":"bmin","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"scs","type":"address"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"}],"name":"UnRegistered","type":"event"}];

    for (var i=0; i<len; i++) {
        var contractAddress = data[i].SubChainProtocolAddr;
        var item = {
            "SubChainProtocolAddr": contractAddress
        };
        var contractInstance = chain3.mc.contract(contractAbi).at(contractAddress);
        if (contractInstance) {
            var scsCount = contractInstance.scsCount().toNumber();
            item.scsCount = scsCount;
        }

        newData.push(item);
    }

    return newData;
};

// GET /VnodePool - merge every Vnode information from MongoDB collection and Chain3 result.
Router.route('/VnodePool', {where: 'server'})
    .get(function(){
        var vnodes = chain3.net.getVnodes();
        console.log("vnodes: ", vnodes);

        var result = _.map(vnodes, function(vnode)
                        { 
                            return {
                                ip: vnode.ip,
                                serviceCfgPort: vnode.serviceCfgPort,
                                beneficialAddress: vnode.beneficialAddress
                            };
                        }
                    );

        console.log("result: ", vnodes);

        result = result.concat(Vnode.find({}, {fields:{ _id: 0 }}).fetch());

        console.log("result: ", result)
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
        var response = getScsCount(subChainProtocols);
        console.log("response", response);
        /////add scscount from public view of contract
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
        var response = VnodeProtocolBase.find({}, {fields:{ _id: 0 }}).fetch();
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