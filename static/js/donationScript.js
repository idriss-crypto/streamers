let streamerAddress;
let provider;
let connectedAccount;
let web3;
let selectedNetwork;
let selectedToken;
let networkParams;
let tokenParams;
let networkParamsArray;
let tokenParamsArray;
let assetAddress;
let idriss;
const maxLength = 70;

const networkSelect = document.getElementById("network");
const tokenSelect = document.getElementById("token");
const connectWalletButton = document.getElementById("connectWalletButton");
const disconnectWalletButton = document.getElementById("disconnectWallet");
const sendButton = document.getElementById("sendButton");
const textarea = document.getElementById('message');
const charCount = document.getElementById('charCount');

let EXPLORER_LINK = "https://basescan.org/"
const w3 = new Web3(new Web3.providers.HttpProvider("https://eth.llamarpc.com"));

const ERC20Abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const abiTippingOG = [{"inputs":[{"internalType":"address","name":"_maticUsdAggregator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes","name":"innerError","type":"bytes"}],"name":"BatchError","type":"error"},{"inputs":[],"name":"tipping__withdraw__OnlyAdminCanWithdraw","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipientAddress","type":"address"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"TipMessage","type":"event"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_SLIPPAGE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"_calls","type":"bytes[]"}],"name":"batch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimalPaymentFee","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changeMinimalPaymentFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_paymentFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changePaymentFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"}],"name":"getPaymentFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_assetId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_assetContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC1155To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendERC721To","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_tokenContractAddr","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendTokenTo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenContract","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];
let tippingAddressBase = "0x324Ad1738B9308D5AF5E81eDd6389BFa082a8968";
let tippingAddressEthereum = "0xe18036D7E3377801a19d5Db3f9b236617979674E";
let tippingAddressPolygon = "0xe35B356ac2c880cCcc769bA9393F0748d94ABBCa";

const tippingAddresses = {
    "base": tippingAddressBase,
    "ethereum": tippingAddressEthereum,
    "polygon": tippingAddressPolygon
}

let portal_fi = {
    base: {
        "0x0000000000000000000000000000000000000000": ["base:0x0000000000000000000000000000000000000000", 18],
        "0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b": ["base:0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b", 18],
        "0x4ed4e862860bed51a9570b96d89af5e1b0efefed": ["base:0x4ed4e862860bed51a9570b96d89af5e1b0efefed", 18]
    },
    ethereum: {
        "0x0000000000000000000000000000000000000000": ["ethereum:0x0000000000000000000000000000000000000000", 18],
        "0xb23d80f5fefcddaa212212f028021b41ded428cf": ["ethereum:0xb23d80f5fefcddaa212212f028021b41ded428cf", 18],
        "0x3F382DbD960E3a9bbCeaE22651E88158d2791550": ["ethereum:0x3F382DbD960E3a9bbCeaE22651E88158d2791550", 18],
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": ["ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6]
    },
    polygon: {
        "0x0000000000000000000000000000000000000000": ["polygon:0x0000000000000000000000000000000000000000", 18],
        "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7": ["polygon:0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7", 18],
        "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": ["polygon:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", 6]
    }
}


let tokenAddresses = {
    base: {
        "eth": "0x0000000000000000000000000000000000000000",
        "prime": "0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b",
        "degen": "0x4ed4e862860bed51a9570b96d89af5e1b0efefed"
    },
    ethereum: {
        "eth": "0x0000000000000000000000000000000000000000",
        "prime": "0xb23d80f5fefcddaa212212f028021b41ded428cf",
        "ghst": "0x3F382DbD960E3a9bbCeaE22651E88158d2791550",
        "usdc": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    },
    polygon: {
        "matic": "0x0000000000000000000000000000000000000000",
        "ghst": "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7",
        "usdc": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    }
}

const tokenNetworkCombinations = {
    base: ["ETH", "PRIME", "DEGEN"],
    ethereum: ["ETH", "USDC", "PRIME", "GHST"],
    polygon: ["MATIC", "USDC", "GHST"]
}

let availableTokens = {};


async function resolveENS(identifier, web3) {
    try {
        return await web3.eth.ens.getAddress(identifier);
    } catch (error) {
        return null;
    }
}

async function resolveIDriss(identifier, idriss) {
    try {
        const idrissAddress = await idriss.resolve(identifier, { network: "evm" });
        return idrissAddress["Public ETH"] ?? Object.values(idrissAddress)[0] ?? null;
    } catch (error) {
        return null;
    }
}


function intersect(array1, array2) {
    return array1.filter(element => array2.includes(element));
}

function populateTokenOptions(network_) {
    tokenSelect.innerHTML = "";     
    console.log("Updating with network ", network_)
    availableTokens[network_.toLowerCase()].forEach(token_ => {
        const option = document.createElement("option");
        option.value = token_;
        option.text = token_;
        tokenSelect.appendChild(option);
    });
}

function splitParams(params) {
    return params && params.length > 0 ? params.split(",") : "";
}

async function connectWallet() {
    provider = window.ethereum
    console.log(provider)
    await provider.enable()
    web3 = await new Web3(provider);
    document.querySelector('#connectWalletButton').classList.add('hidden');
    document.querySelector('#connectedWallet').classList.remove('hidden');
    let accounts = await web3.eth.getAccounts();
    connectedAccount = accounts[0]
    let reverse = await idriss.reverseResolve(accounts[0]);
    let loginDisplay = reverse? reverse : accounts[0].substring(0, 6).concat("...").concat(accounts[0].substr(-4))
    document.querySelector('#connectedWallet').firstElementChild.value = loginDisplay
    document.querySelector('#polygon-scan-link').href = EXPLORER_LINK + "/address/" + accounts[0];
    console.log(connectedAccount)
    return
}

async function disconnectWallet() {
    provider = null;
    web3 = null;
    connectedAccount = "";
    document.querySelector('#connectWalletButton').classList.remove('hidden');
    document.querySelector('#connectedWallet').classList.add('hidden');
}

async function sendDonation() {
    let message = document.getElementById("message").value;
    let amount = document.getElementById('amount').value == '' ? '1': document.getElementById("amount").value;
    let tokenAddress = tokenAddresses[selectedNetwork.toLowerCase()][selectedToken.toLowerCase()];
    console.log(message, amount, tokenAddress)

    let amountInteger;
    let amountNormal;

    let calculated = await calculateAmount(tokenAddress, amount, selectedNetwork.toLowerCase());
    amountInteger = calculated.integer;
    amountNormal = calculated.normal
    

    console.log("Calculate amount result")
    console.log(amountInteger.toString(), amountNormal.toString())
    await callDonationFunction(amountInteger.toString(), message, tokenAddress);
}

async function calculateAmount(_assetAddr, _amount, _network) {
    let BN = w3.utils.BN;
    let priceSt;

    let decimals = portal_fi[_network.toLowerCase()][_assetAddr][1];
    let response = await (await fetch(`https://www.idriss.xyz/pricing?token=${portal_fi[_network.toLowerCase()][_assetAddr][0]}`)).json();
    priceSt = response['tokens'][0]['price'];
    console.log(priceSt, decimals)

    let ten = new BN(10);
    let base = ten.pow(new BN(decimals));
    let integer = await getAmount(_amount.toString(), priceSt.toString(), decimals);
    let normal = integer.div(base)
    return { integer, normal };
}

async function getAmount(amount, tokenPrice, decimals) {
    const BN = w3.utils.BN;
    const ten = new BN(10);
    let decimalsTemp = new BN(decimals)
    let baseTemp = ten.pow(new BN(decimalsTemp));
    console.log(tokenPrice, tokenPrice.toString())
    let decimalCountPrice = tokenPrice.includes('.') ? tokenPrice.split('.')[1].length : 0;
    let multiplierPrice = Math.pow(10, decimalCountPrice) || 1;
    let tokenPriceToInt = new BN(tokenPrice.replace('.', ''));

    let decimalCountValue = amount.includes('.') ? amount.split('.')[1].length : 0;
    let multiplierValue = Math.pow(10, decimalCountValue) || 1;
    let tokenValueToInt = new BN(amount.replace('.', ''));

    console.log(decimalCountValue)
    let retVal = (new BN(multiplierPrice.toString())).mul(baseTemp).mul(tokenValueToInt).div(tokenPriceToInt).div(new BN(multiplierValue.toString()))

    return retVal;
}

async function switchNetwork(web3, networkName, provider) {
    // Get current network ID
    const currentNetworkId = await web3.eth.net.getId();
    console.log("Currently connected with id: ", currentNetworkId)

    // Get network ID for desired network
    let desiredNetworkId;
    switch (networkName.toLowerCase()) {
    case "ethereum":
        desiredNetworkId = 1;
        break;
    case "polygon":
        desiredNetworkId = 137;
        break;
    case "base":
        // Mainnet: 8453
        // Testnet: 84531
        desiredNetworkId = 8453;
        break;
    default:
        throw new Error("Invalid network name");
    }

    if (currentNetworkId !== desiredNetworkId) {

    await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: `0x${desiredNetworkId.toString(16)}` }] });
    }
}

async function callDonationFunction(amount, message, assetAddr) {
    console.log(amount, message, assetAddr)

    let BN = w3.utils.BN;

    await switchNetwork(web3, selectedNetwork.toLowerCase(), provider);

    const contractInstance = await new web3.eth.Contract(abiTippingOG, tippingAddresses[selectedNetwork.toLowerCase()]);

    let gas;
    let gasPrice;
    let result;
    try {
        gasPrice = await web3.eth.getGasPrice();
    } catch (e) {
        console.log("Could not estimate gas price: ", e)
    }
    console.log("sending transactions through: ", contractInstance, "with gas: ", gasPrice)
    switch (assetAddr.toLowerCase()) {
        case "0x0000000000000000000000000000000000000000":
            console.log("Sending native token")
            gas = await contractInstance.methods.sendTo(streamerAddress, amount.toString(), message).estimateGas({from: connectedAccount, value: amount.toString()});
            result = await contractInstance.methods.sendTo(streamerAddress, amount.toString(), message).send({ from: connectedAccount, value: amount.toString(), gas: gas, gasPrice: gasPrice });
        break;
        default:
            console.log("Sending erc20")
            const tokenContract = new web3.eth.Contract(ERC20Abi, assetAddr);
            const allowance = await tokenContract.methods.allowance(connectedAccount, tippingAddresses[selectedNetwork.toLowerCase()]).call()
            const allowanceBN = new BN(allowance)
            const amountBN = new BN(amount)
            console.log("sending amount: ", amountBN.toString())
            if (allowanceBN.lte(amountBN)) {
                let approval = await tokenContract.methods
                    .approve(tippingAddresses[selectedNetwork.toLowerCase()], amountBN.toString())
                    .send({
                        from: connectedAccount,
                        gasPrice: gasPrice
                    })
            }
            gas = await contractInstance.methods.sendTokenTo(streamerAddress, amount.toString(), assetAddr, message).estimateGas({from: connectedAccount, value: 0});
            result = await contractInstance.methods.sendTokenTo(streamerAddress, amount.toString(), assetAddr, message).send({ from: connectedAccount, value: 0, gas: gas, gasPrice: gasPrice });
    }

    console.log(result)

    return result;
}

document.addEventListener("DOMContentLoaded", async function() {

    idriss = new IdrissCrypto.IdrissCrypto();
    let walletConnected = false;

    const toggleWalletConnection = async () => {
        if (walletConnected) {
            await disconnectWallet();
            walletConnected = false;
        } else {
            await connectWallet();
            walletConnected = true;
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    networkParams = urlParams.get('network');
    tokenParams = urlParams.get('token');
    streamerAddress = urlParams.get('streamerAddress');
    console.log(streamerAddress)

    if (!w3.utils.isAddress(streamerAddress)) {
        streamerAddress = await resolveENS(inputAddress, w3) || await resolveIDriss(inputAddress, idriss);
        console.log(streamerAddress)
    }

    const networkParamsArray = splitParams(networkParams);
    const tokenParamsArray = splitParams(tokenParams);

    networkParamsArray.forEach(network_ => {
        const intersection = intersect(tokenParamsArray, tokenNetworkCombinations[network_.toLowerCase()]);
        if (intersection.length > 0) {
            selectedNetwork = selectedNetwork || network_;
            selectedToken = selectedToken || intersection[0];
            console.log(intersection)
            availableTokens[network_.toLowerCase()] = intersection;
        }
    });

    console.log(availableTokens)

    networkSelect.innerHTML = '';
    networkParamsArray.forEach(network_ => {
        if(availableTokens[network_.toLowerCase()]) {
            const option = document.createElement("option");
            option.value = network_;
            option.text = network_;
            networkSelect.appendChild(option);
        }
    });

    populateTokenOptions(selectedNetwork.toLowerCase());
    
    connectWalletButton.addEventListener("click", toggleWalletConnection);
    
    disconnectWalletButton.addEventListener('click', async () => {
        await disconnectWallet();
        walletConnected = false;
    });
    
    sendButton.addEventListener("click", async () => {
        if (!walletConnected) {
            await connectWallet();
        }
        sendDonation();
    });

    networkSelect.addEventListener("change", (event) => {
        selectedNetwork = event.target.value;
        populateTokenOptions(selectedNetwork.toLowerCase());
        console.log("Selected network:", selectedNetwork);
    
        let changeEvent = new Event("change", { bubbles: true });
        tokenSelect.dispatchEvent(changeEvent);
    });
    
    tokenSelect.addEventListener("change", (event) => {
        selectedToken = event.target.value;
        console.log("Selected token:", selectedToken);
    });

    textarea.addEventListener('input', () => {
        const currentLength = textarea.value.length;
    
        if (currentLength > maxLength) {
            textarea.value = textarea.value.substring(0, maxLength);
        }
    
        charCount.textContent = maxLength - textarea.value.length;
    });

});

