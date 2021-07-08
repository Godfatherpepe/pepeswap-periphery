async function main(network) {
    let wbnb; 
    const FACTORY_ADDRESS = "0x24ab5a7EDcB7fa22c1853BCE2FD304F9aDa5a303";

    if(network === "bsc") {
        wbnb = await WBNB.at("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") 
    } else if(network === "testnet") {
        wbnb = await WBNB.at("0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd")
    } else {
        const WBNB = await ethers.getContractFactory('WBNB');
        weth = await WBNB.deploy();
    }

    const PepeswapRouter02 = await ethers.getContractFactory("PepeswapRouter02")
    const pepeswapRouter02 = await PepeswapRouter02.deploy(FACTORY_ADDRESS, wbnb.address)

    await pepeswapRouter02.deployed();

    console.log(`Pepe Router 02 deployed to :  ${pepeswapRouter02.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });