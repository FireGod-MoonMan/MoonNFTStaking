import { ConnectButton } from "@rainbow-me/rainbowkit";
import { updateAccountData } from "../store/reducer";
import { ownerAddress } from "../utils/contracts-config.js"
import { useDispatch } from "react-redux";
import { SettingsOutlined, WalletOutlined } from "@mui/icons-material";
import { circleBtnStyle, primaryBtnStyle } from "./ThemeStyle";
const CustomButton = () => {
    const dispatch = useDispatch();
    return (
        <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
        }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
                authenticationStatus === 'authenticated');
            return (
                <div
                    {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    },
                    })}
                >
                    {(() => {
                    if (!connected) {
                        return (
                        <button 
                            id="connect_wallet"
                            className={primaryBtnStyle()}
                            onClick={openConnectModal} type="button"
                        >
                            Connect Wallet
                        </button>
                        );
                    }
                    if (chain.unsupported) {
                        return (
                        <button onClick={openChainModal} type="button">
                            Wrong network
                        </button>
                        );
                    }
                    if (chain.name != ''){
                        dispatch(updateAccountData({
                            account: account.address,
                            balance: account.displayBalance,
                            network: chain.name
                        }))
                    }
                    return (
                        <div className="flex gap-x-2.5 items-center justify-center flex-col sm:flex-row gap-y-3 sm:gap-y-0">
                            <button
                                id="chain_info"
                                className={primaryBtnStyle()}
                                onClick={openChainModal}
                                style={{ display: 'flex', alignItems: 'center' }}
                                type="button"
                            >
                                {chain.hasIcon && (
                                <div
                                    className=""
                                    style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 999,
                                    overflow: 'hidden',
                                    marginRight: 4,
                                    }}
                                >
                                    {chain.iconUrl && (
                                    <img
                                        alt={chain.name ?? 'Chain icon'}
                                        src={chain.iconUrl}                                    
                                    />
                                    )}
                                </div>
                                )}
                                <span className="">{chain.name}</span>
                            </button>
                            <button 
                                id="account_info" 
                                onClick={openAccountModal} type="button" 
                                className={primaryBtnStyle()}
                            >
                                {account.displayName}
                                <span className="hidden sm:block">{account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}</span>
                            </button>
                            <button
                                id="profile_account" 
                                onClick={() => {window.location.href="/profile"}} type="button" 
                                className={primaryBtnStyle()}
                            >
                                <WalletOutlined />
                                <span className="px-[2px] block sm:hidden">Account</span>
                            </button>
                            { account.address == ownerAddress && 
                                <a href="/settings">
                                <button 
                                    className={`${primaryBtnStyle()} sm:${circleBtnStyle()}`}
                                    onClick={() => {}}
                                >
                                    <SettingsOutlined />
                                    <span className="px-[2px] block sm:hidden">Settings</span>
                                </button> 
                                </a>
                            }
                        </div>
                    );
                    })()}
                </div>
            );
        }}
        </ConnectButton.Custom>        
    )
}

const RainBowConnect = () => {
    return (
        <CustomButton />
    )
}

export default RainBowConnect