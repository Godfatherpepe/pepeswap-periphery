pragma solidity =0.6.12;

import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IPepeswapV2Migrator.sol';
import './interfaces/V1/IPepeswapV1Factory.sol';
import './interfaces/V1/IPepeswapV1Exchange.sol';
import './interfaces/IPepeswapV2Router01.sol';
import './interfaces/IBEP20.sol';

contract PepeswapV2Migrator is IPepeswapV2Migrator {
    IPepeswapV1Factory immutable factoryV1;
    IPepeswapV2Router01 immutable router;

    constructor(address _factoryV1, address _router) public {
        factoryV1 = IPepeswapV1Factory(_factoryV1);
        router = IPepeswapV2Router01(_router);
    }

    // needs to accept BNB from any v1 exchange and the router. ideally this could be enforced, as in the router,
    // but it's not possible because it requires a call to the v1 factory, which takes too much gas
    receive() external payable {}

    function migrate(address token, uint amountTokenMin, uint amountBNBMin, address to, uint deadline)
        external
        override
    {
        IPepeswapV1Exchange exchangeV1 = IPepeswapV1Exchange(factoryV1.getExchange(token));
        uint liquidityV1 = exchangeV1.balanceOf(msg.sender);
        require(exchangeV1.transferFrom(msg.sender, address(this), liquidityV1), 'TRANSFER_FROM_FAILED');
        (uint amountBNBV1, uint amountTokenV1) = exchangeV1.removeLiquidity(liquidityV1, 1, 1, uint(-1));
        TransferHelper.safeApprove(token, address(router), amountTokenV1);
        (uint amountTokenV2, uint amountBNBV2,) = router.addLiquidityBNB{value: amountBNBV1}(
            token,
            amountTokenV1,
            amountTokenMin,
            amountBNBMin,
            to,
            deadline
        );
        if (amountTokenV1 > amountTokenV2) {
            TransferHelper.safeApprove(token, address(router), 0); // be a good blockchain citizen, reset allowance to 0
            TransferHelper.safeTransfer(token, msg.sender, amountTokenV1 - amountTokenV2);
        } else if (amountBNBV1 > amountBNBV2) {
            // addLiquidityBNB guarantees that all of amountBNBV1 or amountTokenV1 will be used, hence this else is safe
            TransferHelper.safeTransferBNB(msg.sender, amountBNBV1 - amountBNBV2);
        }
    }
}
