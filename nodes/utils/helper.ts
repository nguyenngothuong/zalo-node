import axios from 'axios';
import fs from 'fs';
import os from 'os';
import path from 'path';


export async function saveImage(url: string) {
    try {
			let n8nUserFolder;

			// Cố gắng lấy đường dẫn từ biến môi trường N8N_USER_FOLDER
			if (process.env.N8N_USER_FOLDER) {
					n8nUserFolder = process.env.N8N_USER_FOLDER;
			} else {
					// Nếu biến môi trường không được đặt, sử dụng đường dẫn mặc định
					n8nUserFolder = path.join(os.homedir(), '.n8n');
			}

			const dataStoragePath = path.join(n8nUserFolder, 'temp_files');

			// Kiểm tra xem thư mục đã tồn tại chưa, nếu chưa thì tạo mới
			const fs = require('fs');
			if (!fs.existsSync(dataStoragePath)){
					fs.mkdirSync(dataStoragePath, { recursive: true }); // recursive: true để tạo các thư mục cha nếu chưa có
			}

			const timestamp = Date.now();
			const imgPath  = path.join(dataStoragePath,`temp-${timestamp}.png`);

			const { data } = await axios.get(url, { responseType: "arraybuffer" });
			fs.writeFileSync(imgPath, Buffer.from(data, "utf-8"));

			return imgPath;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function removeImage(imgPath: string) {
    try {
        fs.unlinkSync(imgPath);
    } catch (error) {
        console.error(error);
    }
}
