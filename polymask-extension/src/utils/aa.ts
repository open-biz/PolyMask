import { createPublicClient, http } from 'viem';
import { polygon } from 'viem/chains';
import { toSafeSmartAccount } from 'permissionless/accounts';
import { toAccount } from 'viem/accounts';

export const publicClient = createPublicClient({
  chain: polygon,
  transport: http(),
});

/**
 * Calculates the counterfactual address of a user's PolyMask Safe Account.
 */
export async function getSafeAccountAddress(ownerAddress: `0x${string}`) {
  // Convert hex address to viem account
  const owner = toAccount(ownerAddress);

  const safeAccount = await toSafeSmartAccount({
    client: publicClient,
    owners: [owner],
    version: "1.4.1",
    entryPoint: {
        address: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
        version: "0.7"
    }
  });
  
  return safeAccount.address;
}
