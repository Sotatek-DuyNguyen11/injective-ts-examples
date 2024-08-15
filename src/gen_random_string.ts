import { createHash } from "crypto";

// Hàm chuyển chuỗi hex thành BigInt
function hexToUint128(hex: string) {
    return BigInt('0x' + hex);
}

// Hàm tạo số Uint128 ngẫu nhiên từ địa chỉ và giá trị ngẫu nhiên
function generateUint128FromAddress(address: string) {
    // Kết hợp địa chỉ với một giá trị ngẫu nhiên (ví dụ: thời gian hiện tại hoặc một nonce ngẫu nhiên)
    const nonce = Date.now().toString() + Math.random().toString();
    const dataToHash = address + nonce;

    // Sử dụng SHA-256 để băm dữ liệu kết hợp
    const hash = createHash('sha256').update(dataToHash).digest('hex');

    // Lấy 32 ký tự đầu tiên (tương ứng với 128 bit)
    const uint128Hex = hash.substring(0, 32);

    // Chuyển đổi sang BigInt dạng Uint128
    return hexToUint128(uint128Hex);
}

// Ví dụ sử dụng
const address = 'inj1z6sccypszye9qke2w35m3ptmj7c4tjr2amedyf';
const randomUint128 = generateUint128FromAddress(address);
console.log(randomUint128.toString());