import axios from 'axios';
import fs from 'fs';
import os from 'os';
import path from 'path';

// Optional Sharp import for image conversion
let sharp: any;
try {
	sharp = require('sharp');
} catch (error) {
	// Sharp is optional, conversion will be skipped if not available
	sharp = null;
}

/**
 * Convert HEIC/HEIF files to JPEG using Sharp
 */
async function convertHeicToJpeg(inputPath: string): Promise<string | null> {
	if (!sharp) {
		console.warn('Sharp library not available, cannot convert HEIC files');
		return null;
	}

	try {
		const outputPath = inputPath.replace(/\.(heic|heif)$/i, '.jpg');
		
		await sharp(inputPath)
			.jpeg({ quality: 90 })
			.toFile(outputPath);
		
		// Remove original HEIC file
		fs.unlinkSync(inputPath);
		
		console.log(`Converted HEIC to JPEG: ${outputPath}`);
		return outputPath;
	} catch (error) {
		console.error('Error converting HEIC to JPEG:', error);
		return null;
	}
}

/**
 * Tải file bất kỳ (ảnh, pdf, zip...) và lưu vào thư mục tạm trong n8n
 */
export async function saveFile(url: string): Promise<string | null> {
	try {
		const n8nUserFolder = process.env.N8N_USER_FOLDER || path.join(os.homedir(), '.n8n');
		const dataStoragePath = path.join(n8nUserFolder, 'temp_files');

		if (!fs.existsSync(dataStoragePath)) {
			fs.mkdirSync(dataStoragePath, { recursive: true });
		}

		// Lấy phần mở rộng từ URL (nếu có), ví dụ: .png, .pdf, .JPEG
		const urlPath = new URL(url).pathname;
		let ext = path.extname(urlPath);
		
		// Nếu không có extension, cố gắng đoán từ tên file trong URL
		if (!ext || ext === '') {
			const fileName = path.basename(urlPath);
			const dotIndex = fileName.lastIndexOf('.');
			if (dotIndex > 0) {
				ext = fileName.substring(dotIndex);
			} else {
				ext = '.bin'; // fallback nếu không tìm được extension
			}
		}
		
		// Chuẩn hóa phần mở rộng: chuyển về lowercase để đảm bảo tương thích với .JPEG, .PNG, etc.
		ext = ext.toLowerCase();

		const timestamp = Date.now();
		let filePath = path.join(dataStoragePath, `temp-${timestamp}${ext}`);

		const { data } = await axios.get(url, { responseType: 'arraybuffer' });
		fs.writeFileSync(filePath, data); // đúng kiểu nhị phân

		// Convert HEIC/HEIF files to JPEG if Sharp is available
		if (ext === '.heic' || ext === '.heif') {
			const convertedPath = await convertHeicToJpeg(filePath);
			if (convertedPath) {
				filePath = convertedPath;
			} else {
				console.warn(`Could not convert HEIC file: ${filePath}`);
			}
		}

		return filePath;
	} catch (error) {
		console.error('Lỗi khi tải/lưu file:', error);
		return null;
	}
}

/**
 * Xoá file đã lưu
 */
export function removeFile(filePath: string): void {
	try {
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}
	} catch (error) {
		console.error('Lỗi khi xoá file:', error);
	}
}
