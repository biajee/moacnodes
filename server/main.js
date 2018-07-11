import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  SubChainProtocol = new Meteor.Collection('subchainprotocol');
  VnodeProtocolBase = new Meteor.Collection('vnodeprotocolbase');
});

// GET /SubChainProtocolPool - returns every SubChainProtocolAddr from MongoDB collection.
Router.route('/SubChainProtocolPool', {where: 'server'})
    .get(function(){
        var response = SubChainProtocol.find().fetch();
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(response));
    })

    .post(function(){
        var response;
        if(this.request.body.SubChainProtocolAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8 === undefined) {
            console.log(this.request.body);
            response = {
                "error" : true,
                "message" : "invalid data"
            };
        } else {
            SubChainProtocol.update(
                {SubChainProtocolAddr : this.request.body.SubChainProtocolAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8}
                ,{SubChainProtocolAddr : this.request.body.SubChainProtocolAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8}
                ,true
            );
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
        var response = VnodeProtocolBase.find().fetch();
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(response));
    })

    .post(function(){
        var response;
        if(this.request.body.VnodeProtocolBaseAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8 === undefined) {
            console.log(this.request.body);
            response = {
                "error" : true,
                "message" : "invalid data"
            };
        } else {
            VnodeProtocolBase.update(
                {VnodeProtocolBaseAddr : this.request.body.VnodeProtocolBaseAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8}
                ,{VnodeProtocolBaseAddr : this.request.body.VnodeProtocolBaseAddr_d9dfba965afcf22d124ba3d18b41f47317b98ca8}
                ,true
            );
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
        console.log(randomNum);
        console.log(allData);
        console.log(data);
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