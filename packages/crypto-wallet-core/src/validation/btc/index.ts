import { IValidation } from '..';
const Ltzcore = require('ltzcore-lib');

export class BtcValidation implements IValidation {
  validateAddress(network: string, address: string): boolean {
    const Address = Ltzcore.Address;
    // Regular Address: try Bitcoin
    return Address.isValid(address, network);
  }

  validateUri(addressUri: string): boolean {
    // Check if the input is a valid uri or address
    const URI = Ltzcore.URI;
    // Bip21 uri
    return URI.isValid(addressUri);
  }
}
