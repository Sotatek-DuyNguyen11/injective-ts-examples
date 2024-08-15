
import { toHex } from "@cosmjs/encoding";
import { randomBytes } from "crypto";

// Tạo một khóa riêng ngẫu nhiên 32 byte
const privkeyBytes = randomBytes(16);

console.log('privkeyBytes: ', privkeyBytes);


// Chuyển đổi khóa riêng sang chuỗi hex
const privkeyHex = toHex(privkeyBytes);

console.log("Private Key (Hex):", privkeyHex);