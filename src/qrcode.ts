
import { config } from "dotenv";
import { authenticator } from 'otplib';
// import QRCode from "qrcode";
config();

(async () => {
  try {
    const otpAuthUrl = authenticator.keyuri('0x16a18c10301132505b2a7469b8857b97b155c86a', 'B3X', 'PVTXU7ZLJMOBSMSL');
    console.log(otpAuthUrl);
    
  } catch (error: any) {
    console.error('Transaction failed:', error.message)
  }
})();