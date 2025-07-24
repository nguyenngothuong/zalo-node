import axios from 'axios';
import fs from 'fs';
import os from 'os';
import path from 'path';

// HEIC conversion library
let heicConvert: any;
try {
	heicConvert = require('heic-convert');
	console.log('[HEIC] heic-convert library loaded successfully');
} catch (error: any) {
	console.error('[HEIC] Failed to load heic-convert library:', error.message);
	console.log('[HEIC] HEIC files will not be converted to JPEG');
	heicConvert = null;
}

/**
 * Convert HEIC/HEIF files to JPEG using heic-convert
 */
async function convertHeicToJpeg(inputPath: string): Promise<string | null> {
	console.log(`[HEIC] Starting conversion for: ${inputPath}`);
	
	if (!heicConvert) {
		console.error('[HEIC] heic-convert library not available, cannot convert HEIC files');
		return null;
	}

	try {
		const outputPath = inputPath.replace(/\.(heic|heif)$/i, '.jpg');
		console.log(`[HEIC] Converting to: ${outputPath}`);
		
		// Check if input file exists
		if (!fs.existsSync(inputPath)) {
			console.error(`[HEIC] Input file does not exist: ${inputPath}`);
			return null;
		}
		
		console.log(`[HEIC] Input file size: ${fs.statSync(inputPath).size} bytes`);
		
		// Read HEIC file
		const inputBuffer = fs.readFileSync(inputPath);
		
		// Convert HEIC to JPEG
		const outputBuffer = await heicConvert({
			buffer: inputBuffer,
			format: 'JPEG',
			quality: 0.9
		});
		
		// Write JPEG file
		fs.writeFileSync(outputPath, outputBuffer);
		
		// Check if output file was created
		if (!fs.existsSync(outputPath)) {
			console.error(`[HEIC] Output file was not created: ${outputPath}`);
			return null;
		}
		
		console.log(`[HEIC] Output file size: ${fs.statSync(outputPath).size} bytes`);
		
		// Remove original HEIC file
		fs.unlinkSync(inputPath);
		console.log(`[HEIC] Removed original file: ${inputPath}`);
		
		console.log(`[HEIC] Successfully converted HEIC to JPEG: ${outputPath}`);
		return outputPath;
	} catch (error) {
		console.error('[HEIC] Error converting HEIC to JPEG:', error);
		console.error('[HEIC] Error details:', JSON.stringify(error, null, 2));
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
			console.log(`[HEIC] Detected HEIC/HEIF file: ${filePath}`);
			const convertedPath = await convertHeicToJpeg(filePath);
			if (convertedPath) {
				filePath = convertedPath;
				console.log(`[HEIC] Using converted file: ${filePath}`);
			} else {
				console.error(`[HEIC] Failed to convert HEIC file, using original: ${filePath}`);
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
