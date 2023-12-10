let streamerAddress ;
let name;
let currBlockBase;
let currBlockOP;
let currBlockEthereum;
let currBlockPolygon;
let tippingBase;
let tippingOP;
let tippingEthereum;
let tippingPolygon;
let txnHashes = new Array();
let resTip = new Array();

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);

    streamerAddress = urlParams.get('streamerAddress');
});


let abiTippingOG = [{"inputs":[{"internalType":"address","name":"_maticUsdAggregator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes","name":"innerError","type":"bytes"}],"name":"BatchError","type":"error"},{"inputs":[],"name":"tipping__withdraw__OnlyAdminCanWithdraw","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipientAddress","type":"address"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"TipMessage","type":"event"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_SLIPPAGE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_calls","type":"bytes[]"}],"name":"batch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimalPaymentFee","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changeMinimalPaymentFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_paymentFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changePaymentFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"}],"name":"getPaymentFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_assetId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_assetContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC1155To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC721To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_tokenContractAddr","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTokenTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenContract","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];
let abiTippingOP = [{"inputs":[{"internalType":"address","name":"_nativeUsdAggregator","type":"address"},{"internalType":"address","name":"_eas","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes","name":"innerError","type":"bytes"}],"name":"BatchError","type":"error"},{"inputs":[],"name":"InvalidEAS","type":"error"},{"inputs":[],"name":"tipping__withdraw__OnlyAdminCanWithdraw","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipientAddress","type":"address"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"TipMessage","type":"event"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_SLIPPAGE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"publicGoodAddress","type":"address"}],"name":"addPublicGood","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_calls","type":"bytes[]"}],"name":"batch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimalPaymentFee","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changeMinimalPaymentFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_paymentFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changePaymentFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"publicGoodAddress","type":"address"}],"name":"deletePublicGood","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"}],"name":"getPaymentFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"publicGoods","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_assetId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_assetContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC1155To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC721To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_tokenContractAddr","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTokenTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenContract","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];
let abiTippingBase = [{"inputs":[{"internalType":"address","name":"_nativeUsdAggregator","type":"address"},{"internalType":"address","name":"_eas","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes","name":"innerError","type":"bytes"}],"name":"BatchError","type":"error"},{"inputs":[],"name":"InvalidEAS","type":"error"},{"inputs":[],"name":"tipping__withdraw__OnlyAdminCanWithdraw","type":"error"},{"inputs":[],"name":"unknown_function_selector","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipientAddress","type":"address"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"TipMessage","type":"event"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_SLIPPAGE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"publicGoodAddress","type":"address"}],"name":"addPublicGood","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_calls","type":"bytes[]"}],"name":"batch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimalPaymentFee","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changeMinimalPaymentFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_paymentFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changePaymentFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"publicGoodAddress","type":"address"}],"name":"deletePublicGood","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"}],"name":"getPaymentFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"publicGoods","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_assetId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_assetContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC1155To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC721To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_tokenContractAddr","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTokenTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenContract","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];
let tippingAddressBase = "0x324Ad1738B9308D5AF5E81eDd6389BFa082a8968";
let tippingAddressOP = "0x43F532D678b6a1587BE989a50526F89428f68315";
let tippingAddressEthereum = "0xe18036D7E3377801a19d5Db3f9b236617979674E";
let tippingAddressPolygon = "0xe35B356ac2c880cCcc769bA9393F0748d94ABBCa";

const web3Base = new Web3(new Web3.providers.HttpProvider("https://mainnet.base.org"));
const web3OP = new Web3(new Web3.providers.HttpProvider("https://mainnet.optimism.io"));
const web3Ethereum = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/"));
const web3Polygon = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));


let coingeckoId = {
    "base": {
        "0x0000000000000000000000000000000000000000": ["ethereum", 18],
        "0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b": ["echelon-prime", 18]
        "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": ["usdc", 6]
    },
    "optimism": {
        "0x0000000000000000000000000000000000000000": ["ethereum", 18]
        "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85": ["usdc", 18]
    },
    "ethereum": {
        "0x0000000000000000000000000000000000000000": ["ethereum", 18],
        "0xb23d80f5fefcddaa212212f028021b41ded428cf": ["echelon-prime", 18]
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": ["usdc", 6]
    },
    "polygon": {
        "0x0000000000000000000000000000000000000000": ["matic", 18]
        "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": ["usdc", 6]
    }
};


async function loadTipping(web3, contractAddr, contractABI) {
    return await new web3.eth.Contract(contractABI, contractAddr);
}


async function loadTippingContracts() {
    tippingBase = await loadTipping(web3Base, tippingAddressBase, abiTippingBase);
    tippingOP = await loadTipping(web3OP, tippingAddressOP), abiTippingOG;
    tippingEthereum = await loadTipping(web3Ethereum, tippingAddressEthereum, abiTippingOG);
    tippingPolygon = await loadTipping(web3Polygon, tippingAddressPolygon, abiTippingOG);
}


async function setCurrBlock() {
    currBlockBase = await web3Base.eth.getBlockNumber();
    currBlockOP = await web3OP.eth.getBlockNumber();
    currBlockEthereum = await web3Ethereum.eth.getBlockNumber();
    currBlockPolygon = await web3Polygon.eth.getBlockNumber();
    // currBlockBase = 8235798 ;
}


// ToDo: check correct TipMessage event inputs
async function getInputs(_method, _remove) {
    if (_method == "429c14d7") {
        return await web3Base.eth.abi.decodeParameters(
            [
                {
                    type: "address",
                    name: "_streamer",
                },
                {
                    type: "string",
                    name: "_message",
                },
            ],
            _remove
        );
    } else if (_method == "37adfb6c") {
        return await web3Base.eth.abi.decodeParameters(
            [
                {
                    type: "address",
                    name: "_streamer",
                },
                {
                    type: "uint256",
                    name: "_amount",
                },
                {
                    type: "address",
                    name: "_tokenAddr",
                },
                {
                    type: "string",
                    name: "_message",
                },
            ],
            _remove
        );
    } else if (_method == "2c875abc") {
        return await web3Base.eth.abi.decodeParameters(
            [
                {
                    type: "address",
                    name: "_streamer",
                },
                {
                    type: "uint256",
                    name: "_assetId",
                },
                {
                    type: "uint256",
                    name: "_amount",
                },
                {
                    type: "address",
                    name: "_nftAddress",
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
        console.log(eventsBase[i])
        if (!txnHashes.includes(eventsBase[i].transactionHash)) {
            txn = await web3Base.eth.getTransaction(eventsBase[i].transactionHash);
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            console.log(inputs)
            let tempRet = {
                amount: eventsBase[i].returnValues.amount,
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

    eventsOP = await tippingOP.getPastEvents("TipMessage", {
        fromBlock: currBlockOP - 5,
        filter: {
            recipientAddress: streamerAddress,
        },
    });
    for (let i = 0; i < eventsOP.length; i++) {
        console.log(eventsOP[i])
        if (!txnHashes.includes(eventsOP[i].transactionHash)) {
            txn = await web3OP.eth.getTransaction(eventsOP[i].transactionHash);
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            console.log(inputs)
            let tempRet = {
                amount: eventsOP[i].returnValues.amount,
                tokenAddress: eventsOP[i].returnValues.tokenAddress,
                tokenId : inputs._assetId,
                message: eventsOP[i].returnValues.message,
                fromAddress: from_,
                network: "optimism"
            }

            tempNewDonations.push(tempRet);
            txnHashes.push(eventsOP[i].transactionHash);
        }
    }

    eventsEthereum = await tippingEthereum.getPastEvents("TipMessage", {
        fromBlock: currBlockEthereum - 5,
        filter: {
            recipientAddress: streamerAddress,
        },
    });
    for (let i = 0; i < eventsEthereum.length; i++) {
        console.log(eventsEthereum[i])
        if (!txnHashes.includes(eventsEthereum[i].transactionHash)) {
            txn = await web3Ethereum.eth.getTransaction(eventsEthereum[i].transactionHash);
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            console.log(inputs)
            let tempRet = {
                amount: eventsEthereum[i].returnValues.amount,
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

    eventsPolygon = await tippingPolygon.getPastEvents("TipMessage", {
        fromBlock: currBlockPolygon - 5,
        filter: {
            recipientAddress: streamerAddress,
        },
    });
    for (let i = 0; i < eventsPolygon.length; i++) {
        console.log(eventsPolygon[i])
        if (!txnHashes.includes(eventsPolygon[i].transactionHash)) {
            txn = await web3Polygon.eth.getTransaction(eventsPolygon[i].transactionHash);
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            console.log(inputs)
            let tempRet = {
                amount: eventsPolygon[i].returnValues.amount,
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
    let response = await (await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId[_network.toLowerCase()][_assetAddr][0]}&vs_currencies=USD`)).json();
    priceSt = Object.values(Object.values(response)[0])[0];

    let decimals = coingeckoId[_network][_assetAddr][1];
    let val = this.getVal(_amount, priceSt, decimals);
    return val;
}

async function getMetadataURI(nftAddress, tokenId, w3) {
    const nftContract = new w3.eth.Contract(ERC1155Abi, nftAddress);
    try {
        const metadataURI = await nftContract.methods.uri(tokenId).call();
        return metadataURI;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function fetchMetadata(metadataURI) {
    try {
        const response = await fetch(metadataURI);
        const metadata = await response.json();
        return metadata;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
    }
}

interval = setInterval(async function () {
    ret = await fetchDonations();
    console.log(ret);
    retString = "";
    for (let i = 0; i < ret.length; i++) {
        let nftImgSrc;
    
        fromAccount = ret[i].fromAddress;
         //add some prettify for addr
        if (typeof(ret[i].tokenId) == "undefined") {
            basicInfo = fromAccount.substring(0, 6).concat("...").concat(fromAccount.substr(-4)) + " tipped you " + "$" + (await calculateDollar(ret[i].tokenAddress, ret[i].amount, ret[i].network.toLowerCase()));
        } else {
            const metadataURI = await getMetadataURI(ret[i].tokenAddress, ret[i].tokenId, web3Base);
            let nftName;
            let nftImg;

            if (metadataURI) {
                const metadata = await fetchMetadata(metadataURI);
                if (metadata) {
                    nftName = metadata.name;
                    nftImg = nft.image;
                } else {
                    console.log('Failed to fetch NFT metadata.');
                }
            } else {
                console.log('Failed to retrieve metadata URI.');
            }
            basicInfo = fromAccount.substring(0, 6).concat("...").concat(fromAccount.substr(-4)) + " sent " + nftName;
            nftImgSrc = nftImg;
        }
        
        message = ret[i].message;

        resTip.push([basicInfo, message, nftImgSrc]);
    }

}, 5000);

displayAlerts = setInterval(async function () {
    console.log("checking messages");
    console.log(resTip)
    if (resTip.length > 0) {
        if (document.getElementById('fader').style.opacity == 0) {
            document.getElementById("baseInfo").innerHTML = resTip[0][0];
            document.getElementById("message").innerHTML = resTip[0][1];
            if (typeof(resTip[0][2]) !== 'undefined') { 
                document.getElementById("nftImg").src = resTip[0][2];
                document.getElementById("nftImg").style.display = "";
            }
            console.log("visible")
            document.getElementById('fader').style.opacity = 1;
            console.log(document.getElementById("donationAlert").style.display);
            resTip.shift();
            console.log("timeout start")
            await setTimeout(function () {
                document.getElementById('fader').style.opacity = 0;
                document.getElementById("nftImg").style.display = "none";
            }, 5000);
            console.log("timeout end")
        }
    }
}, 2000);

async function init() {
    await loadPlayPalContracts();
    await setCurrBlock();
    txnHashes = new Array();
}

init();
