let idriss;
const w3 = new Web3(
    new Web3.providers.HttpProvider("https://eth.llamarpc.com")
);

async function resolveENS(identifier, web3) {
    try {
        return await web3.eth.ens.getAddress(identifier);
    } catch (error) {
        return null;
    }
}

async function resolveIDriss(identifier, idriss) {
    try {
        const idrissAddress = await idriss.resolve(identifier, {
            network: "evm",
        });
        return (
            idrissAddress["Public ETH"] ??
            Object.values(idrissAddress)[0] ??
            null
        );
    } catch (error) {
        return null;
    }
}

function openPopup(url) {
    const urlPopup = document.getElementById("urlPopup");
    const generatedUrlTextarea = document.getElementById("generatedUrl");
    const copyButton = document.getElementById("copyButton");
    const closeButton = document.getElementById("closeButton");

    generatedUrlTextarea.value = url;
    urlPopup.classList.remove("hidden");

    copyButton.addEventListener("click", function () {
        generatedUrlTextarea.select();
        document.execCommand("copy");
    });

    closeButton.addEventListener("click", function () {
        urlPopup.classList.add("hidden");
    });
}

function getSelectedValues(checkboxes) {
    return Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
}

document.addEventListener("DOMContentLoaded", function () {
    idriss = new IdrissCrypto.IdrissCrypto();

    const generateObsLinkButton = document.getElementById(
        "generateObsLinkButton"
    );
    const generateDonationLinkButton = document.getElementById(
        "generateDonationLinkButton"
    );
    const walletAddressInput = document.getElementById("walletAddress");
    const donationNetworksCheckboxes = document.querySelectorAll(
        'input[name="donationNetworks"]'
    );
    const donationCoinsCheckboxes = document.querySelectorAll(
        'input[name="donationCoins"]'
    );
    const networkError = document.getElementById("networkError");
    const coinError = document.getElementById("coinError");
    const addressError = document.getElementById("addressError");

    async function preGenerate() {
        let inputAddress = walletAddressInput.value.trim();

        if (!inputAddress) {
            addressError.classList.remove("hidden");
            return null;
        }

        addressError.classList.add("hidden");

        if (!w3.utils.isAddress(inputAddress)) {
            let resolvedAddress =
                (await resolveENS(inputAddress, w3)) ||
                (await resolveIDriss(inputAddress, idriss));
            console.log("resAddr", resolvedAddress);
            if (!resolvedAddress) {
                addressError.classList.remove("hidden");
                return null;
            }
            inputAddress = resolvedAddress;
        }

        const selectedNetworks = getSelectedValues(donationNetworksCheckboxes);
        const selectedCoins = getSelectedValues(donationCoinsCheckboxes);

        if (!selectedNetworks.length) {
            networkError.classList.remove("hidden");
            return null;
        }
        networkError.classList.add("hidden");

        if (!selectedCoins.length) {
            coinError.classList.remove("hidden");
            return null;
        }
        coinError.classList.add("hidden");

        return {
            networks: selectedNetworks,
            coins: selectedCoins,
            address: inputAddress,
        };
    }

    generateDonationLinkButton.addEventListener("click", async function () {
        const urlData = await preGenerate();

        if (!urlData) return null;
        const donationUrl = `https://www.idriss.xyz/streamers/donate?streamerAddress=${
            urlData.address
        }&network=${urlData.networks.join(",")}&token=${urlData.coins.join(
            ","
        )}`;
        openPopup(donationUrl);

        document.getElementById("generatedLinkHeader").innerHTML =
            "Donation Link";
        document.getElementById("previewButton").classList.add("hidden");
    });

    generateObsLinkButton.addEventListener("click", async function () {
        const urlData = await preGenerate();

        if (!urlData) return null;

        const obsUrl = `https://www.idriss.xyz/streamers/obs?streamerAddress=${urlData.address}`;
        openPopup(obsUrl);

        document.getElementById("generatedLinkHeader").innerHTML = "OBS Link";
        document.getElementById("previewButton").classList.remove("hidden");
    });

    walletAddressInput.addEventListener("input", function () {
        addressError.classList.add("hidden");
    });

    donationNetworksCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            networkError.classList.add("hidden");
        });
    });

    donationCoinsCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function (event) {
            coinError.classList.add("hidden");
        });
    });
});
