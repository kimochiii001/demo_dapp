import { useEthers } from '@usedapp/core'

const TryUseDappExample = () => {

    const { activateBrowserWallet, deactivate, account } = useEthers()

    return (
        <div>
            {!account && <button onClick={activateBrowserWallet}> Connect </button>}
            {account && <button onClick={deactivate}> Disconnect </button>}
            {account && <p>Account: {account}</p>}
        </div>
    )
}

export default TryUseDappExample