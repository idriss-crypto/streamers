let streamerAddress ;
let name;
let currBlockBase;
let currBlockEthereum;
let currBlockPolygon;
let tippingBase;
let tippingEthereum;
let tippingPolygon;
let txnHashes = new Array();
let resTip = new Array();

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);

    streamerAddress = urlParams.get('streamerAddress');
});


let abiTippingOG = [{"inputs":[{"internalType":"address","name":"_maticUsdAggregator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes","name":"innerError","type":"bytes"}],"name":"BatchError","type":"error"},{"inputs":[],"name":"tipping__withdraw__OnlyAdminCanWithdraw","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipientAddress","type":"address"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"TipMessage","type":"event"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_SLIPPAGE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_calls","type":"bytes[]"}],"name":"batch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimalPaymentFee","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changeMinimalPaymentFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_paymentFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changePaymentFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"}],"name":"getPaymentFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_assetId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_assetContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC1155To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC721To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_tokenContractAddr","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTokenTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenContract","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];
let abiTippingBase = [{"inputs":[{"internalType":"address","name":"_nativeUsdAggregator","type":"address"},{"internalType":"address","name":"_eas","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes","name":"innerError","type":"bytes"}],"name":"BatchError","type":"error"},{"inputs":[],"name":"InvalidEAS","type":"error"},{"inputs":[],"name":"tipping__withdraw__OnlyAdminCanWithdraw","type":"error"},{"inputs":[],"name":"unknown_function_selector","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipientAddress","type":"address"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"TipMessage","type":"event"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_SLIPPAGE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"publicGoodAddress","type":"address"}],"name":"addPublicGood","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_calls","type":"bytes[]"}],"name":"batch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimalPaymentFee","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changeMinimalPaymentFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_paymentFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changePaymentFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"publicGoodAddress","type":"address"}],"name":"deletePublicGood","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"}],"name":"getPaymentFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"publicGoods","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_assetId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_assetContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC1155To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC721To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_tokenContractAddr","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTokenTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenContract","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];
let tippingAddressBase = "0x324Ad1738B9308D5AF5E81eDd6389BFa082a8968";
let tippingAddressEthereum = "0xe18036D7E3377801a19d5Db3f9b236617979674E";
let tippingAddressPolygon = "0xe35B356ac2c880cCcc769bA9393F0748d94ABBCa";
let NULL_ADDR = "0x0000000000000000000000000000000000000000";

const web3Base = new Web3(new Web3.providers.HttpProvider("https://mainnet.base.org"));
const web3Ethereum = new Web3(new Web3.providers.HttpProvider("https://eth.llamarpc.com"));
const web3Polygon = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));


let portal_fi = {
    base: {
        "0x0000000000000000000000000000000000000000": ["base:0x0000000000000000000000000000000000000000", 18],
        "0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b": ["base:0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b", 18]
    },
    ethereum: {
        "0x0000000000000000000000000000000000000000": ["ethereum:0x0000000000000000000000000000000000000000", 18],
        "0xb23d80f5fefcddaa212212f028021b41ded428cf": ["ethereum:0xb23d80f5fefcddaa212212f028021b41ded428cf", 18],
        "0x3F382DbD960E3a9bbCeaE22651E88158d2791550": ["ethereum:0x3F382DbD960E3a9bbCeaE22651E88158d2791550", 18],
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": ["ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6]
    },
    polygon: {
        "0x0000000000000000000000000000000000000000": ["polygon:0x0000000000000000000000000000000000000000", 18],
        "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7": ["polygon:0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7", 18]
    }
}


async function loadTipping(web3, contractAddr, contractABI) {
    return await new web3.eth.Contract(contractABI, contractAddr);
}


async function loadTippingContracts() {
    tippingBase = await loadTipping(web3Base, tippingAddressBase, abiTippingBase);
    tippingEthereum = await loadTipping(web3Ethereum, tippingAddressEthereum, abiTippingOG);
    tippingPolygon = await loadTipping(web3Polygon, tippingAddressPolygon, abiTippingOG);
}


async function setCurrBlock() {
    currBlockBase = await web3Base.eth.getBlockNumber();
    currBlockEthereum = await web3Ethereum.eth.getBlockNumber();
//    currBlockPolygon = await web3Polygon.eth.getBlockNumber();
    currBlockPolygon = 51018860;
}


// Only support native and erc20 transfer fetching for now
async function getInputs(_method, _remove) {
    // OG/OP/Base sendTo()
    if (_method == "16e49145") {
        return await web3Base.eth.abi.decodeParameters(
            [
                {
                    type: "address",
                    name: "_recipient",
                },
                {
                    type: "uint256",
                    name: "_amount"
                },
                {
                    type: "string",
                    name: "_message",
                },
            ],
            _remove
        );
    // OG/OP sendTokenTo()
    } else if (_method == "41dfeca5") {
        return await web3Base.eth.abi.decodeParameters(
            [
                {
                    type: "address",
                    name: "_recipient",
                },
                {
                    type: "uint256",
                    name: "_amount",
                },
                {
                    type: "address",
                    name: "_tokenContractAddr",
                },
                {
                    type: "string",
                    name: "_message",
                },
            ],
            _remove
        );
    }
}


function roundUp(num, precision) {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
}


async function fetchDonations() {
    console.log("Searching on base from block: ", currBlockBase);
    
    let tempNewDonations = new Array();

    eventsBase = await tippingBase.getPastEvents("TipMessage", {
        fromBlock: currBlockBase - 5,
        filter: {
            recipientAddress: streamerAddress,
        },
    });
    for (let i = 0; i < eventsBase.length; i++) {
        if (!txnHashes.includes(eventsBase[i].transactionHash)) {
            txn = await web3Base.eth.getTransaction(eventsBase[i].transactionHash);
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            let tempRet = {
                amount: inputs._amount,
                tokenAddress: eventsBase[i].returnValues.tokenAddress,
                tokenId : inputs._assetId,
                message: eventsBase[i].returnValues.message,
                fromAddress: from_,
                network: "base"
            }

            tempNewDonations.push(tempRet);
            txnHashes.push(eventsBase[i].transactionHash);
        }
    }

    console.log("Searching on eth from block: ", currBlockEthereum);

    eventsEthereum = await tippingEthereum.getPastEvents("TipMessage", {
        fromBlock: currBlockEthereum - 5,
        filter: {
            recipientAddress: streamerAddress,
        },
    });
    for (let i = 0; i < eventsEthereum.length; i++) {
        if (!txnHashes.includes(eventsEthereum[i].transactionHash)) {
            txn = await web3Ethereum.eth.getTransaction(eventsEthereum[i].transactionHash);
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            let tempRet = {
                amount: inputs._amount,
                tokenAddress: eventsEthereum[i].returnValues.tokenAddress,
                tokenId : inputs._assetId,
                message: eventsEthereum[i].returnValues.message,
                fromAddress: from_,
                network: "ethereum"
            }

            tempNewDonations.push(tempRet);
            txnHashes.push(eventsEthereum[i].transactionHash);
        }
    }

    console.log("Searching on poly from block: ", currBlockPolygon);
    eventsPolygon = await tippingPolygon.getPastEvents("TipMessage", {
        fromBlock: currBlockPolygon - 5,
        filter: {
            recipientAddress: streamerAddress,
        },
    });
    for (let i = 0; i < eventsPolygon.length; i++) {
        if (!txnHashes.includes(eventsPolygon[i].transactionHash)) {
            txn = await web3Polygon.eth.getTransaction(eventsPolygon[i].transactionHash);
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            let tempRet = {
                amount: inputs._amount,
                tokenAddress: eventsPolygon[i].returnValues.tokenAddress,
                tokenId : inputs._assetId,
                message: eventsPolygon[i].returnValues.message,
                fromAddress: from_,
                network: "polygon"
            }

            tempNewDonations.push(tempRet);
            txnHashes.push(eventsPolygon[i].transactionHash);
        }
    }

    await setCurrBlock();

    return tempNewDonations;
}

async function getVal(tippingAmount, tokenPrice, decimals) {
    return roundUp((tippingAmount / Math.pow(10, decimals)) * tokenPrice, 2);
}

async function calculateDollar(_assetAddr, _amount, _network) {
    let priceSt;
    let response = await (await fetch(`https://api.portals.fi/v2/tokens?ids=${portal_fi[_network.toLowerCase()][_assetAddr][0]}`)).json();
    priceSt = response['tokens'][0]['price'];

    let decimals = portal_fi[_network.toLowerCase()][_assetAddr][1];
    let val = this.getVal(_amount, priceSt, decimals);
    return val;
}

interval = setInterval(async function () {
    ret = await fetchDonations();
    retString = "";
    for (let i = 0; i < ret.length; i++) {

        fromAccount = ret[i].fromAddress;
         //add some prettify for addr
        if (typeof(ret[i].tokenId) == "undefined") {
            basicInfo = fromAccount.substring(0, 6).concat("...").concat(fromAccount.substr(-4)) + " tipped you " + "$" + (await calculateDollar(ret[i].tokenAddress, ret[i].amount, ret[i].network.toLowerCase()));
            console.log(basicInfo)
        } else {
            continue
        }
        
        message = ret[i].message;

        resTip.push([basicInfo, message]);
    }

}, 5000);

displayAlerts = setInterval(async function () {
    if (resTip.length > 0) {
        if (document.getElementById('fader').style.opacity == 0) {
            document.getElementById("baseInfo").innerHTML = resTip[0][0];
            document.getElementById("message").innerHTML = resTip[0][1];
            document.getElementById('fader').style.opacity = 1;
            resTip.shift();
            console.log("timeout start")
            await setTimeout(function () {
                document.getElementById('fader').style.opacity = 0;
            }, 5000);
            console.log("timeout end")
        }
    }
}, 2000);

async function init() {
    await loadTippingContracts();
    await setCurrBlock();
    txnHashes = new Array();
}

init();
