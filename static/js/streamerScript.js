let idriss;

async function resolveENS(identifier, web3) {
    try {
        if (web3.utils.isAddress(identifier)) {
            const ensName = await fetch(`https://www.idriss.xyz/v1/ENS-Addresses?identifer=${identifier}`)
            return { address: identifier, ens: ensName }
        } else {
            const resolvedAddress = await web3.eth.ens.getAddress(identifier);
            return { address: resolvedAddress, ens: identifier }
        }
    } catch (error) {
        return {}
    }
}

async function resolveIDriss(identifier, idriss) {
    try {
        if (!(await idriss.web3Promise).utils.isAddress(identifier)) {
            let idrissAddress = await idriss.resolve(identifier, {network:"evm"});
            if (Object.values(idrissAddress).length > 0) {
                idrissAddress = idrissAddress["Public ETH"] ?? Object.values(idrissAddress)[0]
                return { address: idrissAddress, idriss: identifier }
            } else {
                return { address: null, idriss: identifier }
            }
        } else {
            const idrissName = await idriss.reverseResolve(identifier);
            return { address: identifier, idriss: idrissName }
        }
    } catch (error) {
        return {}
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const generateUrlButton = document.getElementById("generateUrlButton");
    const generateSnippetButton = document.getElementById("generateSnippetButton");
    const walletAddressInput = document.getElementById("walletAddress");
    const donationNetworksCheckboxes = document.querySelectorAll('input[name="donationNetworks"]');
    const donationCoinsCheckboxes = document.querySelectorAll('input[name="donationCoins"]');
    const networkError = document.getElementById("networkError");
    const coinError = document.getElementById("coinError");
    const addressError = document.getElementById("addressError");

    const web3Ethereum = new Web3(new Web3.providers.HttpProvider("https://eth.llamarpc.com"));
    idriss = new IdrissCrypto.IdrissCrypto();
    
    generateUrlButton.addEventListener("click", async function(event) {
        let inputAddress = walletAddressInput.value.replace(" ", "");

        const selectedNetworks = Array.from(donationNetworksCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        const selectedCoins = Array.from(donationCoinsCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        if (inputAddress === "") {
            addressError.classList.remove("hidden");
            return;
        } else {
            addressError.classList.add("hidden");
        }

        if (!web3Ethereum.utils.isAddress(inputAddress)) {

            let resolvedAddress = await resolveENS(inputAddress, web3Ethereum)
            if (!resolvedAddress.address) resolvedAddress = await resolveIDriss(inputAddress, idriss);
            if (!resolvedAddress.address) {
                addressError.classList.remove("hidden");
                return
            }
            addressError.classList.add("hidden");
            inputAddress = resolvedAddress.address;
        }

        if (selectedNetworks.length === 0) {
            networkError.classList.remove("hidden");
            return;
        } else {
            networkError.classList.add("hidden");
        }
        
        if (selectedCoins.length === 0) {
            coinError.classList.remove("hidden");
            return;
        } else {
            coinError.classList.add("hidden");
        }
        
        const obsUrl = `https://www.idriss.xyz/streamers/obs?streamerAddress=${inputAddress}`;
        openPopup(obsUrl);

        document.getElementById("generatedLinkHeader").innerHTML = "OBS Link";
        document.getElementById("previewButton").classList.remove("hidden")
    });

    generateSnippetButton.addEventListener("click", async function(event) {
        let inputAddress = walletAddressInput.value.replace(" ", "");

        const selectedNetworks = Array.from(donationNetworksCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        const selectedCoins = Array.from(donationCoinsCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        if (inputAddress === "") {
            addressError.classList.remove("hidden");
            return;
        } else {
            addressError.classList.add("hidden");
        }

        if (!web3Ethereum.utils.isAddress(inputAddress)) {

            let resolvedAddress = await resolveENS(inputAddress, web3Ethereum)
            if (!resolvedAddress.address) resolvedAddress = await resolveIDriss(inputAddress, idriss);
            if (!resolvedAddress.address) {
                addressError.classList.remove("hidden");
                return
            }
            addressError.classList.add("hidden");
//            inputAddress = resolvedAddress.address;
        }


        if (selectedNetworks.length === 0) {
            networkError.classList.remove("hidden");
            return;
        } else {
            networkError.classList.add("hidden");
        }
        
        if (selectedCoins.length === 0) {
            coinError.classList.remove("hidden");
            return;
        } else {
            coinError.classList.add("hidden");
        }
        
        const donationUrl = `https://www.idriss.xyz/streamers/donate?streamerAddress=${inputAddress}&network=${selectedNetworks.join(',')}&token=${selectedCoins.join(',')}`;
        openPopup(donationUrl);

        document.getElementById("generatedLinkHeader").innerHTML = "Donation Link";
        document.getElementById("previewButton").classList.add("hidden")
    });

    function openPopup(url) {
        const urlPopup = document.getElementById("urlPopup");
        const generatedUrlTextarea = document.getElementById("generatedUrl");
        const copyButton = document.getElementById("copyButton");
        const closeButton = document.getElementById("closeButton");

        generatedUrlTextarea.value = url;
        urlPopup.classList.remove("hidden");

        copyButton.addEventListener("click", function() {
            generatedUrlTextarea.select();
            document.execCommand("copy");
        });

        closeButton.addEventListener("click", function() {
            urlPopup.classList.add("hidden");
        });
    }

    walletAddressInput.addEventListener("input", function(event) {
        addressError.classList.add("hidden");
    });

    donationNetworksCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function(event) {
            networkError.classList.add("hidden");
        });
    });

    donationCoinsCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function(event) {
            coinError.classList.add("hidden");
        });
    });
});