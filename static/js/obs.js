let streamerAddress;
let name;
let currBlockBase;
let currBlockEthereum;
let currBlockPolygon;
let currBlockAleph;
let tippingBase;
let tippingEthereum;
let tippingPolygon;
let idriss;
let txnHashes = new Array();
let resTip = new Array();

async function resolveENS(identifier, web3) {
    try {
        if (web3.utils.isAddress(identifier)) {
            const response = await fetch(
                `https://www.idriss.xyz/v1/ENS-Addresses?identifer=${identifier}`
            );
            const ensData = await response.json();
            return {address: identifier, ens: ensData.name};
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
let tippingAddressAleph = "0xcA6742d2d6B9dBFFD841DF25C15cFf45FBbB98f4";
const NATIVE_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const web3Base = new Web3(
    new Web3.providers.HttpProvider("https://mainnet.base.org")
);
const web3Ethereum = new Web3(
    new Web3.providers.HttpProvider("https://eth.llamarpc.com")
);
const web3Polygon = new Web3(
    new Web3.providers.HttpProvider("https://polygon-rpc.com/")
);
const web3Aleph = new Web3(
    new Web3.providers.HttpProvider("https://rpc.alephzero.raas.gelato.cloud")
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
            "polygon:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            6,
        ],
    },
};

const DECIMALS_BY_NETWORK_AND_TOKEN = {
    base: {
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": 18,
        "0xfa980ced6895ac314e7de34ef1bfae90a5add21b": 18,
        "0x4ed4e862860bed51a9570b96d89af5e1b0efefed": 18,
    },
    ethereum: {
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": 18,
        "0xb23d80f5fefcddaa212212f028021b41ded428cf": 18,
        "0x3f382dbd960e3a9bbceae22651e88158d2791550": 18,
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": 6,
    },
    polygon: {
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": 18,
        "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7": 18,
        "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": 6,
    },
    aleph: {
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": 18,
    },
};

const NETWORK_IDS = {
    base: 8453,
    ethereum: 1,
    polygon: 137,
    aleph: 41455,
};

const SELL_TOKEN_BY_NETWORK = {
    base: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    ethereum: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    polygon: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    aleph: "0x4ca4b85ead5ea49892d3a81dbfae2f5c2f75d53d",
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
    tippingAleph = await loadTipping(
        web3Aleph,
        tippingAddressAleph,
        abiTippingBase
    );
}

async function setCurrBlock() {
    currBlockBase = await web3Base.eth.getBlockNumber();
    currBlockEthereum = await web3Ethereum.eth.getBlockNumber();
    currBlockPolygon = await web3Polygon.eth.getBlockNumber();
    currBlockAleph = await web3Aleph.eth.getBlockNumber();
    // currBlockAleph = 1614830;
}

// Only support native and erc20 transfer fetching for now
async function getInputs(_method, _remove) {
    // OG/OP/Base/Aleph sendTo()
    if (_method == "16e49145") {
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
            txn = await web3Base.eth.getTransaction(
                eventsBase[i].transactionHash
            );
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            let tempRet = {
                amount: inputs._amount,
                tokenAddress: eventsBase[i].returnValues.tokenAddress,
                tokenId: inputs._assetId,
                message: eventsBase[i].returnValues.message,
                fromAddress: from_,
                network: "base",
            };

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
            txn = await web3Ethereum.eth.getTransaction(
                eventsEthereum[i].transactionHash
            );
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            let tempRet = {
                amount: inputs._amount,
                tokenAddress: eventsEthereum[i].returnValues.tokenAddress,
                tokenId: inputs._assetId,
                message: eventsEthereum[i].returnValues.message,
                fromAddress: from_,
                network: "ethereum",
            };

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
            txn = await web3Polygon.eth.getTransaction(
                eventsPolygon[i].transactionHash
            );
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            let tempRet = {
                amount: inputs._amount,
                tokenAddress: eventsPolygon[i].returnValues.tokenAddress,
                tokenId: inputs._assetId,
                message: eventsPolygon[i].returnValues.message,
                fromAddress: from_,
                network: "polygon",
            };

            tempNewDonations.push(tempRet);
            txnHashes.push(eventsPolygon[i].transactionHash);
        }
    }

    console.log("Searching on aleph from block: ", currBlockAleph);
    eventsAleph = await tippingAleph.getPastEvents("TipMessage", {
        fromBlock: currBlockAleph - 5,
        filter: {
            recipientAddress: streamerAddress,
        },
    });
    for (let i = 0; i < eventsAleph.length; i++) {
        if (!txnHashes.includes(eventsAleph[i].transactionHash)) {
            txn = await web3Aleph.eth.getTransaction(
                eventsAleph[i].transactionHash
            );
            from_ = txn.from;
            let method = txn.input.slice(2, 10);
            let remove = txn.input.replace(method, "");
            let inputs = await getInputs(method, remove);
            let tempRet = {
                amount: inputs._amount,
                tokenAddress: eventsAleph[i].returnValues.tokenAddress,
                tokenId: inputs._assetId,
                message: eventsAleph[i].returnValues.message,
                fromAddress: from_,
                network: "aleph",
            };

            tempNewDonations.push(tempRet);
            txnHashes.push(eventsAleph[i].transactionHash);
        }
    }

    await setCurrBlock();

    return tempNewDonations;
}

async function getVal(tippingAmount, tokenPerDollar, decimals) {
    return roundUp(tippingAmount / Math.pow(10, decimals) / tokenPerDollar, 2);
}

async function calculateDollar(_assetAddr, _amount, _network) {
    let amount_per_dollar = "1";
    if (_assetAddr == NULL_ADDRESS) {
        _assetAddr = NATIVE_ADDRESS;
    }
    let decimals =
        DECIMALS_BY_NETWORK_AND_TOKEN[_network.toLowerCase()][
            _assetAddr.toLowerCase()
        ];

    if (
        SELL_TOKEN_BY_NETWORK[_network.toLowerCase()] !=
        _assetAddr.toLowerCase()
    ) {
        let url = `https://api.idriss.xyz/token-price?sellToken=${
            SELL_TOKEN_BY_NETWORK[_network]
        }&buyToken=${_assetAddr.toLowerCase()}&network=${
            NETWORK_IDS[_network.toLowerCase()]
        }&sellAmount=1000000`;
        let responseNew = await (await fetch(url)).json();
        amount_per_dollar = responseNew["price"];
    }
    let val = this.getVal(_amount, amount_per_dollar, decimals);
    return val;
}

interval = setInterval(async function () {
    ret = await fetchDonations();
    retString = "";
    for (let i = 0; i < ret.length; i++) {
        fromAccount = ret[i].fromAddress;
        //add some prettify for addr
        if (typeof ret[i].tokenId == "undefined") {
            let reverse = await idriss.reverseResolve(fromAccount);
            if (!reverse)
                reverse = (await resolveENS(fromAccount, web3Ethereum)).ens;
            fromAccountIdentifier = reverse
                ? reverse
                : fromAccount
                      .substring(0, 4)
                      .concat("...")
                      .concat(fromAccount.substr(-2));
            basicInfo =
                fromAccountIdentifier +
                " sent " +
                "$" +
                (await calculateDollar(
                    ret[i].tokenAddress,
                    ret[i].amount,
                    ret[i].network.toLowerCase()
                ));
        } else {
            continue;
        }

        message = ret[i].message;
        resTip.push([basicInfo, message]);
    }
}, 5000);

displayAlerts = setInterval(async function () {
    if (resTip.length > 0) {
        if (document.getElementById("fader").style.opacity == 0) {
            document.getElementById("baseInfo").innerHTML = resTip[0][0];
            document.getElementById("message").innerHTML = resTip[0][1];
            document.getElementById("fader").style.opacity = 1;
            resTip.shift();
            console.log("timeout start");
            await setTimeout(function () {
                document.getElementById("fader").style.opacity = 0;
            }, 10000);
            console.log("timeout end");
        }
    }
}, 2000);

async function init() {
    await loadTippingContracts();
    await setCurrBlock();
    txnHashes = new Array();
}

init();
