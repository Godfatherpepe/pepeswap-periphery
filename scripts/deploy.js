async function main(network) {
    let wbnb; 
    const FACTORY_ADDRESS = "0xD185dDBC0c585E34eb97cF03BF9c6FDfb8718F57";

    if(network === "bsc") {
        wbnb = await WBNB.at("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") 
    } else if(network === "testnet") {
        wbnb = await WBNB.at("0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd")
    } else {
        const WBNB = await ethers.getContractFactory('WBNB');
        wbnb = await WBNB.deploy();
    }

    const PepeswapV2Router02 = await ethers.getContractFactory("PepeswapV2Router02")
    const pepeswapV2Router02 = await PepeswapV2Router02.deploy(FACTORY_ADDRESS, wbnb.address)

    await pepeswapV2Router02.deployed();

    console.log(`Router V02 deployed to :  ${pepeswapV2Router02.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });