import { _ } from 'meteor/underscore';
import './collections';

/**
SubChainProtocolPool

@module SubChainProtocolPool
**/


/**
 * @ class
 * @constructor
 */
SubChainProtocolPool = {
    isSyncRunning: false
}

/**
Get data from Chain and update mongo for changed data

@method syncPublicPropertiesFromChain
**/
SubChainProtocolPool.syncPublicPropertiesFromChain = function() {
    console.log("Calling refresh SubChainProtocolPool");
    if(!this.isSyncRunning)
    {
        console.log("Begin refresing SubChainProtocolPool");

        this.isSyncRunning = true;
        let data = SubChainProtocol.find({}, {fields:{ _id: 0 }, sort: {SubChainProtocolAddr: 1}}).fetch();
        let len = data.length;

        let subChainProtocolData = [];
        let subChainProtocolSCSData = [];
        console.log('len: ' + len);
        
        const contractAbi = [ { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "approvalAddresses", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "releaseFromSubchain", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "setSubchainActiveBlock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawRequest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "approvalAmounts", "outputs": [ { "name": "", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "approveBond", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "forfeitBond", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "subChainLastActiveBlock", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "scsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "scsApprovalList", "outputs": [ { "name": "bondApproved", "type": "uint256" }, { "name": "bondedCount", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PENDING_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "scs", "type": "address" }, { "name": "subchain", "type": "address" } ], "name": "releaseRequest", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "scsArray", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "blk", "type": "uint256" } ], "name": "setSubchainExpireBlock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "subChainExpireBlock", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "scsList", "outputs": [ { "name": "from", "type": "address" }, { "name": "bond", "type": "uint256" }, { "name": "state", "type": "uint256" }, { "name": "registerBlock", "type": "uint256" }, { "name": "withdrawBlock", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bondMin", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_addr", "type": "address" } ], "name": "isPerforming", "outputs": [ { "name": "res", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "thousandth", "type": "uint256" }, { "name": "minnum", "type": "uint256" } ], "name": "getSelectionTarget", "outputs": [ { "name": "target", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "targetnum", "type": "uint256" } ], "name": "getSelectionTargetByCount", "outputs": [ { "name": "target", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "subChainProtocol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "WITHDRAW_BLOCK_DELAY", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "protocol", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "protocol", "template": "elements_input_string", "value": "" }, { "name": "bmin", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "bmin", "template": "elements_input_uint", "value": "" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "scs", "type": "address" } ], "name": "Registered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "UnRegistered", "type": "event" } ];
        
        for (let i=0; i<len; i++) {
            let contractAddress = data[i].SubChainProtocolAddr;
            console.log('contractAddress: ', contractAddress);
            let subChainProtocolDataItem = {
                "SubChainProtocolAddr": contractAddress
            };
            let contractInstance = chain3.mc.contract(contractAbi).at(contractAddress);

            if (contractInstance) {
                let scsCount = contractInstance.scsCount().toNumber();
                subChainProtocolDataItem.scsCount = scsCount;

                let subChainProtocol = "";
                try {
                    subChainProtocol = contractInstance.subChainProtocol();
                }
                catch(error){
                    //console.log(error);
                }
                finally
                {
                    subChainProtocolDataItem.subChainProtocol = subChainProtocol;
                }

                let bondMin = contractInstance.bondMin().toNumber();
                subChainProtocolDataItem.bondMin = bondMin;

                subChainProtocolData.push(subChainProtocolDataItem);

                let scs, scsApproval, bond, bondNumber, bondApproved, bondApprovedNumber, scsAvailableFund, scsIsPerforming;
                if(scsCount!==0){
                    for(let j=0; j<scsCount; j++){
                        let subChainProtocolSCSDataItem = {
                            "SubChainProtocolAddr": contractAddress
                        };
                        let scsAddr = contractInstance.scsArray(j);
                        subChainProtocolSCSDataItem.scsAddr = scsAddr;
                        // console.log('scsAddr: ', scsAddr);
        
                        if(scsAddr !== '0x'){
                            scs = contractInstance.scsList(scsAddr);
                            scsApproval = contractInstance.scsApprovalList(scsAddr);

                            bond = scs[1];
                            bondNumber = bond.toString();

                            bondApproved = scsApproval[0];
                            bondApprovedNumber = bondApproved.toNumber();

                            scsAvailableFund = (bondNumber-bondApprovedNumber)/1e18;
                            scsIsPerforming = contractInstance.isPerforming(scsAddr);

                            subChainProtocolSCSDataItem.scsAvailableFund = scsAvailableFund;
                            subChainProtocolSCSDataItem.scsIsPerforming = scsIsPerforming;
                            //scsPool.push({scsAvailableFund: scsAvailableFund, scsIsPerforming: scsIsPerforming});
    
                            subChainProtocolSCSData.push(subChainProtocolSCSDataItem);
                        } 
                        // else {
                        //     scsAvailableFund = "N/A";
                        //     scsIsPerforming  = "N/A";
                        // }
                    }
                }
            }
        }

        let subChainProtocolDataFromDB = SubChainProtocolProp.find({}, {sort:{SubChainProtocolAddr: 1}}).fetch();
        let res = this.diffSubChainProtocolData(subChainProtocolData, subChainProtocolDataFromDB);

        let subChainProtocolSCSDataFromDB = SubChainProtocolSCS.find({}, {sort:{SubChainProtocolAddr: 1, scsAddr: 1}}).fetch();
        subChainProtocolSCSData = _.sortBy((_.sortBy(subChainProtocolSCSData, 'scsAddr')), 'SubChainProtocolAddr');
        let res1 = this.diffSubChainProtocolSCSData(subChainProtocolSCSData, subChainProtocolSCSDataFromDB);

        console.log('res[0]', res[0]); //upsert
        console.log('res[1]', res[1]); //delete

        for(let i=0; i<res[0].length; i++){
            SubChainProtocolProp.upsert({SubChainProtocolAddr: res[0][i].SubChainProtocolAddr}, {$set: {
                SubChainProtocolAddr: res[0][i].SubChainProtocolAddr,
                scsCount: res[0][i].scsCount,
                subChainProtocol: res[0][i].subChainProtocol,
                bondMin: res[0][i].bondMin,
                updatedAt: Date.now().toString(),
            }}, {upsert: true});
        }

        for(let i=0; i<res[1].length; i++){
            SubChainProtocolProp.remove({SubChainProtocolAddr: res[1][i].SubChainProtocolAddr});
        }

        // console.log('scs res[0]', res[0]); //upsert
        // console.log('scs res[1]', res[1]); //delete

        for(let i=0; i<res1[0].length; i++){
            SubChainProtocolSCS.upsert({SubChainProtocolAddr: res1[0][i].SubChainProtocolAddr, scsAddr: res1[0][i].scsAddr}, {$set: {
                SubChainProtocolAddr: res1[0][i].SubChainProtocolAddr,
                scsAddr: res1[0][i].scsAddr,
                scsAvailableFund: res1[0][i].scsAvailableFund,
                scsIsPerforming: res1[0][i].scsIsPerforming,
                updatedAt: Date.now().toString(),
            }}, {upsert: true});
        }

        for(let i=0; i<res1[1].length; i++){
            SubChainProtocolSCS.remove({SubChainProtocolAddr: res1[1][i].SubChainProtocolAddr, scsAddr: res1[1][i].scsAddr});
        }

        this.isSyncRunning = false;
    }
};

/**
Get changed data from Chain

@method diffSubChainProtocolData
**/
SubChainProtocolPool.diffSubChainProtocolData = function(dataFromChain, dataFromDB){
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

        if (dataFromChain[pDataFromChain].SubChainProtocolAddr === dataFromDB[pDataFromDB].SubChainProtocolAddr){
            if (dataFromChain[pDataFromChain].scsCount !== dataFromDB[pDataFromDB].scsCount){
                upsertDB.push(dataFromChain[pDataFromChain]);
            }
            pDataFromChain++;
            pDataFromDB++;
        }
        else if (dataFromChain[pDataFromChain].SubChainProtocolAddr < dataFromDB[pDataFromDB].SubChainProtocolAddr){
            upsertDB.push(dataFromChain[pDataFromChain]);
            pDataFromChain++;
        }
        else if (dataFromChain[pDataFromChain].SubChainProtocolAddr > dataFromDB[pDataFromDB].SubChainProtocolAddr){
            deleteDB.push(dataFromDB[pDataFromDB]);
            pDataFromDB++;
        }
    }

    return [upsertDB, deleteDB];
};

/**
Get changed data from Chain

@method diffSubChainProtocolSCSData
**/
SubChainProtocolPool.diffSubChainProtocolSCSData = function(dataFromChain, dataFromDB){
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

        if (dataFromChain[pDataFromChain].SubChainProtocolAddr === dataFromDB[pDataFromDB].SubChainProtocolAddr){
            if (dataFromChain[pDataFromChain].scsAddr === dataFromDB[pDataFromDB].scsAddr){
                if (dataFromChain[pDataFromChain].scsAvailableFund !== dataFromDB[pDataFromDB].scsAvailableFund
                    ||
                    dataFromChain[pDataFromChain].scsIsPerforming !== dataFromDB[pDataFromDB].scsIsPerforming){
                    console.log('push1: ', dataFromChain[pDataFromChain]);
                    upsertDB.push(dataFromChain[pDataFromChain]);
                }
                pDataFromChain++;
                pDataFromDB++;
            }
            else if (dataFromChain[pDataFromChain].scsAddr < dataFromDB[pDataFromDB].scsAddr){
                upsertDB.push(dataFromChain[pDataFromChain]);
                console.log('push2: ', dataFromChain[pDataFromChain]);
                pDataFromChain++;                
            }
            else if (dataFromChain[pDataFromChain].scsAddr > dataFromDB[pDataFromDB].scsAddr){
                deleteDB.push(dataFromDB[pDataFromDB]);
                pDataFromDB++;           
            }
        }
        else if (dataFromChain[pDataFromChain].SubChainProtocolAddr < dataFromDB[pDataFromDB].SubChainProtocolAddr){
            upsertDB.push(dataFromChain[pDataFromChain]);
            console.log('push3: ', dataFromChain[pDataFromChain]);
            pDataFromChain++;
        }
        else if (dataFromChain[pDataFromChain].SubChainProtocolAddr > dataFromDB[pDataFromDB].SubChainProtocolAddr){
            deleteDB.push(pDataFromDB[pDataFromDB]);
            pDataFromDB++;
        }
    }

    return [upsertDB, deleteDB];
};