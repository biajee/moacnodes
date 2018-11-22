import { _ } from 'meteor/underscore';

import './collections';

/**
VnodeProtocolPool

@module VnodeProtocolPool
**/

/**
 * @ class
 * @constructor
 */
VnodeProtocolPool = {
    isSyncRunning: false
}

/**
Get data from Chain and update mongo for changed data

@method syncPublicPropertiesFromChain
**/
VnodeProtocolPool.syncPublicPropertiesFromChain = function() {
    console.log("Calling refresh VnodeProtocolPool");
    if(!this.isSyncRunning)
    {
        console.log("Begin refreshing VnodeProtocolPool");

        this.isSyncRunning = true;
        let data = VnodeProtocolBase.find({}, {fields:{ _id: 0 }, sort: {VnodeProtocolBaseAddr: 1}}).fetch();
        let len = data.length;

        let vnodeProtocolData = [];
        let vnodeProtocolVnodeData = [];
        console.log('len: ' + len);

        const contractAbi = [ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "vnodeList", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "randness", "type": "uint256" } ], "name": "pickRandomVnode", "outputs": [ { "name": "target", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawRequest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "vnodeCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PEDNING_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "outageReportList", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "level", "type": "uint256" }, { "name": "startpos", "type": "uint256" }, { "name": "count", "type": "uint256" } ], "name": "sweepOutage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "bondMin", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_addr", "type": "address" } ], "name": "isPerforming", "outputs": [ { "name": "res", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "vnodeStore", "outputs": [ { "name": "from", "type": "address" }, { "name": "bond", "type": "uint256" }, { "name": "state", "type": "uint256" }, { "name": "registerBlock", "type": "uint256" }, { "name": "withdrawBlock", "type": "uint256" }, { "name": "link", "type": "string" }, { "name": "via", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "vnode", "type": "address" }, { "name": "via", "type": "address" }, { "name": "link", "type": "string" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "vnode", "type": "address" } ], "name": "reportOutage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "WITHDRAW_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "bmin", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "bmin", "template": "elements_input_uint", "value": "" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" } ];
    
        for (let i=0; i<len; i++) {
            let contractAddress = data[i].VnodeProtocolBaseAddr;
            console.log('contractAddress: ', contractAddress);
            let vnodeProtocolDataitem = {
                "VnodeProtocolBaseAddr": contractAddress
            };
            let contractInstance = chain3.mc.contract(contractAbi).at(contractAddress);
            
            if (contractInstance) {
                let vnodeCount = contractInstance.vnodeCount().toNumber();
                vnodeProtocolDataitem.vnodeCount = vnodeCount - 1;
                let bondMin = contractInstance.bondMin().toNumber();
                vnodeProtocolDataitem.bondMin = bondMin;

                vnodeProtocolData.push(vnodeProtocolDataitem);
    
                for (let j=1; j<vnodeCount; j++){
                    let vnodeStore = contractInstance.vnodeStore(j);
                    let link = vnodeStore[5];
                    let vnodeProtocolVnodeItem = {
                        "VnodeProtocolBaseAddr": contractAddress
                    };

                    if(link!==''){
                        vnodeProtocolVnodeItem.link = link;
                        vnodeProtocolVnodeData.push(vnodeProtocolVnodeItem);
                    }
                }
            }
        }

        let vnodeProtocolDataFromDB = VnodeProtocolProp.find({}, {sort:{VnodeProtocolBaseAddr: 1}}).fetch();
        let res = this.diffVnodeProtocolData(vnodeProtocolData, vnodeProtocolDataFromDB);

        let vnodeProtocolVnodeDataFromDB = VnodeProtocolVnode.find({}, {sort:{VnodeProtocolBaseAddr: 1, link: 1}}).fetch();
        vnodeProtocolVnodeData = _.sortBy((_.sortBy(vnodeProtocolVnodeData, 'link')), 'VnodeProtocolBaseAddr');
        let res1 = this.diffVnodeProtocolVnodeData(vnodeProtocolVnodeData, vnodeProtocolVnodeDataFromDB);        

        // console.log('res[0]', res[0]); //upsert
        // console.log('res[1]', res[1]); //delete

        for(let i=0; i<res[0].length; i++){
            VnodeProtocolProp.upsert({VnodeProtocolBaseAddr: res[0][i].VnodeProtocolBaseAddr}, {$set: {
                VnodeProtocolBaseAddr: res[0][i].VnodeProtocolBaseAddr,
                bondMin: res[0][i].bondMin,
                vnodeCount: res[0][i].vnodeCount,
                updatedAt: Date(),
            }}, {upsert: true});
        }

        for(let i=0; i<res[1].length; i++){
            VnodeProtocolProp.remove({VnodeProtocolBaseAddr: res[0][i].VnodeProtocolBaseAddr});
        }


        // console.log('vnode res[0]', res[0]); //upsert
        // console.log('vnode res[1]', res[1]); //delete

        for(let i=0; i<res1[0].length; i++){
            VnodeProtocolVnode.upsert({VnodeProtocolBaseAddr: res1[0][i].VnodeProtocolBaseAddr, link: res1[0][i].link}, {$set: {
                VnodeProtocolBaseAddr: res1[0][i].VnodeProtocolBaseAddr,
                link: res1[0][i].link,
                updatedAt: Date(),
            }}, {upsert: true});
        }

        for(let i=0; i<res1[1].length; i++){
            VnodeProtocolVnode.remove({VnodeProtocolBaseAddr: res1[1][i].VnodeProtocolBaseAddr, link: res1[1][i].link});
        }

        this.isSyncRunning = false;
    }
};

/**
Get changed data from Chain

@method diffVnodeProtocolData
**/
VnodeProtocolPool.diffVnodeProtocolData = function(dataFromChain, dataFromDB){
    let pDataFromChain = 0;
    let pDataFromDB = 0;

    let upsertDB = [];
    let deleteDB = [];

    let continueLoop = true;

    const lDataFromChain = dataFromChain.length;
    const lDataFromDB = dataFromDB.length;

    while(continueLoop){
        if ((pDataFromChain > lDataFromChain - 1) && (pDataFromDB > lDataFromDB - 1)){
            break;
        }
        else if (pDataFromChain > lDataFromChain - 1){
            deleteDB.push(dataFromDB[pDataFromDB]);
            pDataFromDB++;       
            continue;     
        }
        else if (pDataFromDB > lDataFromDB - 1){
            upsertDB.push(dataFromChain[pDataFromChain]);
            pDataFromChain++;      
            continue;      
        }
        // console.log("pDataFromChain, ", pDataFromChain);
        // console.log("lDataFromChain, ", lDataFromChain);
        // console.log("pDataFromDB, ", pDataFromDB);
        // console.log("lDataFromDB, ", lDataFromDB);

        if (dataFromChain[pDataFromChain].VnodeProtocolBaseAddr === dataFromDB[pDataFromDB].VnodeProtocolBaseAddr){
            if (dataFromChain[pDataFromChain].vnodeCount !== dataFromDB[pDataFromDB].vnodeCount){
                upsertDB.push(dataFromChain[pDataFromChain]);
            }
            pDataFromChain++;
            pDataFromDB++;
        }
        else if (dataFromChain[pDataFromChain].VnodeProtocolBaseAddr < dataFromDB[pDataFromDB].VnodeProtocolBaseAddr){
            upsertDB.push(dataFromChain[pDataFromChain]);
            pDataFromChain++;
        }
        else if (dataFromChain[pDataFromChain].VnodeProtocolBaseAddr > dataFromDB[pDataFromDB].VnodeProtocolBaseAddr){
            deleteDB.push(dataFromDB[pDataFromDB]);
            pDataFromDB++;
        }
    }

    return [upsertDB, deleteDB];
};

/**
Get changed data from Chain

@method diffVnodeProtocolVnodeData
**/
VnodeProtocolPool.diffVnodeProtocolVnodeData = function(dataFromChain, dataFromDB){
    let pDataFromChain = 0;
    let pDataFromDB = 0;

    let upsertDB = [];
    let deleteDB = [];

    let continueLoop = true;

    const lDataFromChain = dataFromChain.length;
    const lDataFromDB = dataFromDB.length;

    while(continueLoop){
        if ((pDataFromChain > lDataFromChain - 1) && (pDataFromDB > lDataFromDB - 1)){
            break;
        }
        else if (pDataFromChain > lDataFromChain - 1){
            deleteDB.push(dataFromDB[pDataFromDB]);
            pDataFromDB++;       
            continue;     
        }
        else if (pDataFromDB > lDataFromDB - 1){
            upsertDB.push(dataFromChain[pDataFromChain]);
            pDataFromChain++;      
            continue;      
        }
        // console.log("pDataFromChain, ", pDataFromChain);
        // console.log("lDataFromChain, ", lDataFromChain);
        // console.log("pDataFromDB, ", pDataFromDB);
        // console.log("lDataFromDB, ", lDataFromDB);

        if (dataFromChain[pDataFromChain].VnodeProtocolBaseAddr === dataFromDB[pDataFromDB].VnodeProtocolBaseAddr){
            if (dataFromChain[pDataFromChain].link === dataFromDB[pDataFromDB].link){
                pDataFromChain++;
                pDataFromDB++;
            }
            else if (dataFromChain[pDataFromChain].link < dataFromDB[pDataFromDB].link){
                upsertDB.push(dataFromChain[pDataFromChain]);
                console.log('push2: ', dataFromChain[pDataFromChain]);
                pDataFromChain++;                
            }
            else if (dataFromChain[pDataFromChain].link > dataFromDB[pDataFromDB].link){
                deleteDB.push(pDataFromDB[pDataFromDB]);
                pDataFromDB++;           
            }
        }
        else if (dataFromChain[pDataFromChain].VnodeProtocolBaseAddr < dataFromDB[pDataFromDB].VnodeProtocolBaseAddr){
            upsertDB.push(dataFromChain[pDataFromChain]);
            console.log('push3: ', dataFromChain[pDataFromChain]);
            pDataFromChain++;
        }
        else if (dataFromChain[pDataFromChain].VnodeProtocolBaseAddr > dataFromDB[pDataFromDB].VnodeProtocolBaseAddr){
            deleteDB.push(dataFromDB[pDataFromDB]);
            pDataFromDB++;
        }
    }

    return [upsertDB, deleteDB];
};