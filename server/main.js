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

// GET /VnodePool - merge every Vnode information from MongoDB collection and Chain3 result.
Router.route('/VnodePool', {where: 'server'})
    .get(function(){
        var vnodes = chain3.net.getVnodes();
        // var vnodes = [  { nodeAddress: 'enode://6fb0e7577795d66a4cb0c839ccc6e8f9952233ca34000a5de4fa1a4bf74e7b558f569edaabe7f3e3b027f01cce93151c985f1ef5658c2aa069bef296b09cc36d@23.29.125.169:30333?servicecfgport=&beneficialaddress=0x0000000000000000000000000000000000000000',
        //                 ip: '23.29.125.169',
        //                 serviceCfgPort: '50061',
        //                 beneficialAddress: '0x4e2cE50cC6C8C1228C6Cb70574c15C918b7c1666' },
        //                 { nodeAddress: 'enode://e4315633324ca223443968c475aecd0586cc3a7f01a4a5de2dd312209f40f472fa3a223df496191995787b1ebbe77c42fc90048ef7e3826d78c7b66a5de18a14@24.19.168.22:30333?servicecfgport=:50062&beneficialaddress=0x4e2cE50cC6C8C1228C6Cb70574c15C918b7c1e60',
        //                 ip: '24.19.168.22',
        //                 serviceCfgPort: '50062',
        //                 beneficialAddress: '0x4e2cE50cC6C8C1228C6Cb70574c15C918b7c1e60' } ] 

        var result = _.map(vnodes, function(vnode)
                        { 
                            return {
                                ip: vnode.ip,
                                serviceCfgPort: vnode.serviceCfgPort,
                                beneficialAddress: vnode.beneficialAddress
                            };
                        }
                    );

        result = result.concat(Vnode.find({}, {fields:{ _id: 0 }}).fetch());
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
        var response = SubChainProtocol.find({}, {fields:{ _id: 0 }}).fetch();
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
Router.route('/SubChainProtocolNode',{where: 'server'})
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
Router.route('/VnodeProtocolBaseNode',{where: 'server'})
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