let streamerAddress;
let name;
let currBlockBase;
let currBlockEthereum;
let currBlockPolygon;
let tippingBase;
let tippingEthereum;
let tippingPolygon;
let idriss;
let txnHashes = new Array();
let resTip = new Array();

let tokenAddresses = {
    base: {
        eth: "0x0000000000000000000000000000000000000000",
        prime: "0xfa980ced6895ac314e7de34ef1bfae90a5add21b",
        degen: "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
    },
    ethereum: {
        eth: "0x0000000000000000000000000000000000000000",
        prime: "0xb23d80f5fefcddaa212212f028021b41ded428cf",
        ghst: "0x3f382dbd960e3a9bbceae22651e88158d2791550",
        usdc: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    },
    polygon: {
        pol: "0x0000000000000000000000000000000000000000",
        ghst: "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
        usdc: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    },
};

function getTokenSymbol(network, address) {
    for (let [symbol, addr] of Object.entries(tokenAddresses[network])) {
        if (addr.toLowerCase() === address.toLowerCase()) {
            return symbol;
        }
    }
    return "unknown";
}

async function resolveENS(identifier, web3) {
    try {
        if (web3.utils.isAddress(identifier)) {
            const ensName = await fetch(
                `https://www.idriss.xyz/v1/ENS-Addresses?identifer=${identifier}`
            );
            return {address: identifier, ens: ensName};
        } else {
            const resolvedAddress = await web3.eth.ens.getAddress(identifier);
            return {address: resolvedAddress, ens: identifier};
        }
    } catch (error) {
        return {};
    }
}

async function resolveIDriss(identifier, idriss) {
    try {
        if (!web3Ethereum.utils.isAddress(identifier)) {
            let idrissAddress = await idriss.resolve(identifier, {
                network: "evm",
            });
            if (Object.values(idrissAddress).length > 0) {
                idrissAddress =
                    idrissAddress["Public ETH"] ??
                    Object.values(idrissAddress)[0];
                return {address: idrissAddress, idriss: identifier};
            } else {
                return {address: null, idriss: identifier};
            }
        } else {
            const idrissName = await idriss.reverseResolve(identifier);
            return {address: identifier, idriss: idrissName};
        }
    } catch (error) {
        return {};
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    idriss = new IdrissCrypto.IdrissCrypto();

    streamerAddress = urlParams.get("streamerAddress");
});

let abiTippingOG = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_maticUsdAggregator",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [{internalType: "bytes", name: "innerError", type: "bytes"}],
        name: "BatchError",
        type: "error",
    },
    {
        inputs: [],
        name: "tipping__withdraw__OnlyAdminCanWithdraw",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "recipientAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "message",
                type: "string",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
        ],
        name: "TipMessage",
        type: "event",
    },
    {
        inputs: [],
        name: "MINIMAL_PAYMENT_FEE",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MINIMAL_PAYMENT_FEE_DENOMINATOR",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "PAYMENT_FEE_PERCENTAGE",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "PAYMENT_FEE_PERCENTAGE_DENOMINATOR",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "PAYMENT_FEE_SLIPPAGE_PERCENT",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_adminAddress", type: "address"},
        ],
        name: "addAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{internalType: "address", name: "", type: "address"}],
        name: "admins",
        outputs: [{internalType: "bool", name: "", type: "bool"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{internalType: "address", name: "", type: "address"}],
        name: "balanceOf",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{internalType: "bytes[]", name: "_calls", type: "bytes[]"}],
        name: "batch",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_minimalPaymentFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_paymentFeeDenominator",
                type: "uint256",
            },
        ],
        name: "changeMinimalPaymentFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_paymentFeePercentage",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_paymentFeeDenominator",
                type: "uint256",
            },
        ],
        name: "changePaymentFeePercentage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "contractOwner",
        outputs: [{internalType: "address", name: "", type: "address"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_adminAddress", type: "address"},
        ],
        name: "deleteAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "uint256", name: "_value", type: "uint256"},
            {internalType: "enum AssetType", name: "_assetType", type: "uint8"},
        ],
        name: "getPaymentFee",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{internalType: "address", name: "", type: "address"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_recipient", type: "address"},
            {internalType: "uint256", name: "_assetId", type: "uint256"},
            {internalType: "uint256", name: "_amount", type: "uint256"},
            {
                internalType: "address",
                name: "_assetContractAddress",
                type: "address",
            },
            {internalType: "string", name: "_message", type: "string"},
        ],
        name: "sendERC1155To",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_recipient", type: "address"},
            {internalType: "uint256", name: "_tokenId", type: "uint256"},
            {
                internalType: "address",
                name: "_nftContractAddress",
                type: "address",
            },
            {internalType: "string", name: "_message", type: "string"},
        ],
        name: "sendERC721To",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_recipient", type: "address"},
            {internalType: "uint256", name: "", type: "uint256"},
            {internalType: "string", name: "_message", type: "string"},
        ],
        name: "sendTo",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_recipient", type: "address"},
            {internalType: "uint256", name: "_amount", type: "uint256"},
            {
                internalType: "address",
                name: "_tokenContractAddr",
                type: "address",
            },
            {internalType: "string", name: "_message", type: "string"},
        ],
        name: "sendTokenTo",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{internalType: "bytes4", name: "interfaceId", type: "bytes4"}],
        name: "supportsInterface",
        outputs: [{internalType: "bool", name: "", type: "bool"}],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{internalType: "address", name: "newOwner", type: "address"}],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_tokenContract", type: "address"},
        ],
        name: "withdrawToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
let abiTippingBase = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_nativeUsdAggregator",
                type: "address",
            },
            {internalType: "address", name: "_eas", type: "address"},
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [{internalType: "bytes", name: "innerError", type: "bytes"}],
        name: "BatchError",
        type: "error",
    },
    {inputs: [], name: "InvalidEAS", type: "error"},
    {
        inputs: [],
        name: "tipping__withdraw__OnlyAdminCanWithdraw",
        type: "error",
    },
    {inputs: [], name: "unknown_function_selector", type: "error"},
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "recipientAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "message",
                type: "string",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "fee",
                type: "uint256",
            },
        ],
        name: "TipMessage",
        type: "event",
    },
    {
        inputs: [],
        name: "MINIMAL_PAYMENT_FEE",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MINIMAL_PAYMENT_FEE_DENOMINATOR",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "PAYMENT_FEE_PERCENTAGE",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "PAYMENT_FEE_PERCENTAGE_DENOMINATOR",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "PAYMENT_FEE_SLIPPAGE_PERCENT",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_adminAddress", type: "address"},
        ],
        name: "addAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "publicGoodAddress",
                type: "address",
            },
        ],
        name: "addPublicGood",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{internalType: "address", name: "", type: "address"}],
        name: "admins",
        outputs: [{internalType: "bool", name: "", type: "bool"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{internalType: "bytes[]", name: "_calls", type: "bytes[]"}],
        name: "batch",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_minimalPaymentFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_paymentFeeDenominator",
                type: "uint256",
            },
        ],
        name: "changeMinimalPaymentFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_paymentFeePercentage",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_paymentFeeDenominator",
                type: "uint256",
            },
        ],
        name: "changePaymentFeePercentage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_adminAddress", type: "address"},
        ],
        name: "deleteAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "publicGoodAddress",
                type: "address",
            },
        ],
        name: "deletePublicGood",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "uint256", name: "_value", type: "uint256"},
            {internalType: "enum AssetType", name: "_assetType", type: "uint8"},
        ],
        name: "getPaymentFee",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{internalType: "address", name: "", type: "address"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{internalType: "address", name: "", type: "address"}],
        name: "publicGoods",
        outputs: [{internalType: "bool", name: "", type: "bool"}],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_recipient", type: "address"},
            {internalType: "uint256", name: "_assetId", type: "uint256"},
            {internalType: "uint256", name: "_amount", type: "uint256"},
            {
                internalType: "address",
                name: "_assetContractAddress",
                type: "address",
            },
            {internalType: "string", name: "_message", type: "string"},
        ],
        name: "sendERC1155To",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_recipient", type: "address"},
            {internalType: "uint256", name: "_tokenId", type: "uint256"},
            {
                internalType: "address",
                name: "_nftContractAddress",
                type: "address",
            },
            {internalType: "string", name: "_message", type: "string"},
        ],
        name: "sendERC721To",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_recipient", type: "address"},
            {internalType: "uint256", name: "", type: "uint256"},
            {internalType: "string", name: "_message", type: "string"},
        ],
        name: "sendTo",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_recipient", type: "address"},
            {internalType: "uint256", name: "_amount", type: "uint256"},
            {
                internalType: "address",
                name: "_tokenContractAddr",
                type: "address",
            },
            {internalType: "string", name: "_message", type: "string"},
        ],
        name: "sendTokenTo",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{internalType: "bytes4", name: "interfaceId", type: "bytes4"}],
        name: "supportsInterface",
        outputs: [{internalType: "bool", name: "", type: "bool"}],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{internalType: "address", name: "newOwner", type: "address"}],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {internalType: "address", name: "_tokenContract", type: "address"},
        ],
        name: "withdrawToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
let tippingAddressBase = "0x324Ad1738B9308D5AF5E81eDd6389BFa082a8968";
let tippingAddressEthereum = "0xe18036D7E3377801a19d5Db3f9b236617979674E";
let tippingAddressPolygon = "0xe35B356ac2c880cCcc769bA9393F0748d94ABBCa";
let NULL_ADDR = "0x0000000000000000000000000000000000000000";

const web3Base = new Web3(
    new Web3.providers.HttpProvider("https://mainnet.base.org")
);
const web3Ethereum = new Web3(
    new Web3.providers.HttpProvider("https://eth.llamarpc.com")
);
const web3Polygon = new Web3(
    new Web3.providers.HttpProvider("https://polygon-rpc.com/")
);

let portal_fi = {
    base: {
        "0x0000000000000000000000000000000000000000": [
            "base:0x0000000000000000000000000000000000000000",
            18,
        ],
        "0xfa980ced6895ac314e7de34ef1bfae90a5add21b": [
            "base:0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b",
            18,
        ],
        "0x4ed4e862860bed51a9570b96d89af5e1b0efefed": [
            "base:0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
            18,
        ],
    },
    ethereum: {
        "0x0000000000000000000000000000000000000000": [
            "ethereum:0x0000000000000000000000000000000000000000",
            18,
        ],
        "0xb23d80f5fefcddaa212212f028021b41ded428cf": [
            "ethereum:0xb23d80f5fefcddaa212212f028021b41ded428cf",
            18,
        ],
        "0x3f382dbd960e3a9bbceae22651e88158d2791550": [
            "ethereum:0x3F382DbD960E3a9bbCeaE22651E88158d2791550",
            18,
        ],
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": [
            "ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            6,
        ],
    },
    polygon: {
        "0x0000000000000000000000000000000000000000": [
            "polygon:0x0000000000000000000000000000000000000000",
            18,
        ],
        "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7": [
            "polygon:0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7",
            18,
        ],
        "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": [
            "polygon:0x2791Bca1f2de4661ED88a30C99a7a9449Aa84174",
            6,
        ],
    },
};

async function loadTipping(web3, contractAddr, contractABI) {
    return await new web3.eth.Contract(contractABI, contractAddr);
}

async function loadTippingContracts() {
    tippingBase = await loadTipping(
        web3Base,
        tippingAddressBase,
        abiTippingBase
    );
    tippingEthereum = await loadTipping(
        web3Ethereum,
        tippingAddressEthereum,
        abiTippingOG
    );
    tippingPolygon = await loadTipping(
        web3Polygon,
        tippingAddressPolygon,
        abiTippingOG
    );
}

async function setCurrBlock() {
    currBlockBase = await web3Base.eth.getBlockNumber();
    // currBlockBase = 15702660;
    currBlockEthereum = await web3Ethereum.eth.getBlockNumber();
    currBlockPolygon = await web3Polygon.eth.getBlockNumber();
}

async function getInputs(_method, _remove) {
    if (_method == "16e49145") {
        return await web3Base.eth.abi.decodeParameters(
            [
                {type: "address", name: "_recipient"},
                {type: "uint256", name: "_amount"},
                {type: "string", name: "_message"},
            ],
            _remove
        );
    } else if (_method == "41dfeca5") {
        return await web3Base.eth.abi.decodeParameters(
            [
                {type: "address", name: "_recipient"},
                {type: "uint256", name: "_amount"},
                {type: "address", name: "_tokenContractAddr"},
                {type: "string", name: "_message"},
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

    let eventsBase = await tippingBase.getPastEvents("TipMessage", {
        fromBlock: currBlockBase - 5,
        filter: {recipientAddress: streamerAddress},
    });

    await processEvents(eventsBase, "base", tempNewDonations, web3Base);

    console.log("Searching on eth from block: ", currBlockEthereum);
    let eventsEthereum = await tippingEthereum.getPastEvents("TipMessage", {
        fromBlock: currBlockEthereum - 5,
        filter: {recipientAddress: streamerAddress},
    });

    await processEvents(
        eventsEthereum,
        "ethereum",
        tempNewDonations,
        web3Ethereum
    );

    console.log("Searching on poly from block: ", currBlockPolygon);
    let eventsPolygon = await tippingPolygon.getPastEvents("TipMessage", {
        fromBlock: currBlockPolygon - 5,
        filter: {recipientAddress: streamerAddress},
    });

    await processEvents(
        eventsPolygon,
        "polygon",
        tempNewDonations,
        web3Polygon
    );

    await setCurrBlock();
    return tempNewDonations;
}

async function processEvents(events, network, tempNewDonations, web3) {
    for (let i = 0; i < events.length; i++) {
        if (!txnHashes.includes(events[i].transactionHash)) {
            let txn = await web3.eth.getTransaction(events[i].transactionHash);
            let block = await web3.eth.getBlock(events[i].blockNumber); // Get block info for timestamp
            let from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            let tempRet = {
                amount: inputs._amount,
                tokenAddress: events[i].returnValues.tokenAddress,
                tokenId: inputs._assetId,
                message: inputs._message,
                fromAddress: from_,
                network: network,
                timestamp: block.timestamp, // Add timestamp to the event data
            };
            tempNewDonations.push(tempRet);
            txnHashes.push(events[i].transactionHash);
            await updateTipHistory(tempRet);
        }
    }
}

async function getVal(tippingAmount, tokenPrice, decimals) {
    return roundUp((tippingAmount / Math.pow(10, decimals)) * tokenPrice, 2);
}

async function calculateDollar(_assetAddr, _amount, _network) {
    let priceSt;
    let response = await (
        await fetch(
            `https://www.idriss.xyz/pricing?token=${
                portal_fi[_network.toLowerCase()][_assetAddr.toLowerCase()][0]
            }`
        )
    ).json();
    priceSt = response["tokens"][0]["price"];
    let decimals =
        portal_fi[_network.toLowerCase()][_assetAddr.toLowerCase()][1];
    return roundUp((_amount / Math.pow(10, decimals)) * priceSt, 2);
}

async function updateTipHistory(tip) {
    let tipHistory = document.getElementById("tipHistory");
    let tipEntry = document.createElement("div");
    tipEntry.classList.add("tipEntry");

    let fromAccount = tip.fromAddress;
    let reverse = await idriss.reverseResolve(fromAccount);
    if (!reverse) reverse = (await resolveENS(fromAccount, web3Ethereum)).ens;
    let fromAccountIdentifier = reverse
        ? reverse
        : fromAccount
              .substring(0, 4)
              .concat("...")
              .concat(fromAccount.substr(-2));

    let amountInUSD = await calculateDollar(
        tip.tokenAddress,
        tip.amount,
        tip.network.toLowerCase()
    );
    let tokenSymbol = getTokenSymbol(
        tip.network.toLowerCase(),
        tip.tokenAddress
    ).toUpperCase();

    let date = new Date(tip.timestamp * 1000);
    let formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    let basicInfo = `${fromAccountIdentifier} sent $${amountInUSD} in ${tokenSymbol} on ${tip.network}`;
    let message = `Message: ${tip.message}`;
    let timeInfo = `${formattedDate}`;

    tipEntry.innerHTML = `<p class="tipSender">${basicInfo}</p><p class="tipMessage">${message}</p><p class="tipTime">${timeInfo}</p>`;
    tipHistory.appendChild(tipEntry);
}

async function fetchHistory(
    web3,
    tippingContract,
    network,
    fromBlock,
    toBlock,
    batchSize
) {
    let tempNewDonations = [];
    for (let start = fromBlock; start <= toBlock; start += batchSize) {
        let end = Math.min(start + batchSize - 1, toBlock);
        let events = await tippingContract.getPastEvents("TipMessage", {
            fromBlock: start,
            toBlock: end,
            filter: {recipientAddress: streamerAddress},
        });
        await processEvents(events, network, tempNewDonations, web3);

        // Add a delay to avoid rate limit issues
        await new Promise((resolve) => setTimeout(resolve, 300)); // 1 second delay between batches
    }
    return tempNewDonations;
}

interval = setInterval(async function () {
    await fetchDonations();
}, 5000);

async function init() {
    await loadTippingContracts();
    await setCurrBlock();
    txnHashes = new Array();

    // Fetch history from block 100000 to the current block in batches of 2000 blocks
    let startBlockBase = 15502666;
    let startBlockEth = currBlockEthereum;
    let startBlockPolygon = currBlockPolygon;
    let batchSize = 2000;

    await fetchHistory(
        web3Base,
        tippingBase,
        "base",
        startBlockBase,
        currBlockBase,
        batchSize
    );
    await fetchHistory(
        web3Ethereum,
        tippingEthereum,
        "ethereum",
        startBlockEth,
        currBlockEthereum,
        batchSize
    );
    await fetchHistory(
        web3Polygon,
        tippingPolygon,
        "polygon",
        startBlockPolygon,
        currBlockPolygon,
        batchSize
    );
    console.log("Done fetching history");
}

init();
