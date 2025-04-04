import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import { LoginQRCallbackEvent, Zalo, API } from 'zca-js';
import { tmpdir } from 'os';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Store Zalo API instance at module level
let zaloApiInstance: API | undefined;

export class ZaloLoginByQR implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Login By QR',
		name: 'zaloLoginByQr',
		icon: 'file:zalo.svg',
		group: ['Zalo'],
		version: 2,
		description: 'Đăng nhập Zalo bằng QR code và lưu thông tin vào Credential',
		defaults: {
			name: 'Zalo Login By QR',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Tạo QR Code',
				name: 'action',
				type: 'options',
				options: [{ name: 'Generate QR', value: 'generateQR' }],
				default: 'generateQR',
			},
			{
				displayName: 'Lưu ý',
				name: 'note',
				type: 'notice',
				default: 'Lưu ý: việc sử dụng thư viện này đồng nghĩa với việc bạn đang làm trái với chính sách của Zalo và nó có thể khiến cho tài khoản của bạn bị vô hiệu hóa. Chúng tôi sẽ không chịu trách nhiệm nếu điều đó xảy ra, vậy nên hãy cân nhắc trước khi sử dụng.',
				description:'Lưu ý: việc sử dụng thư viện này đồng nghĩa với việc bạn đang làm trái với chính sách của Zalo và nó có thể khiến cho tài khoản của bạn bị vô hiệu hóa. Chúng tôi sẽ không chịu trách nhiệm nếu điều đó xảy ra, vậy nên hãy cân nhắc trước khi sử dụng.',
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];

		// Initialize Zalo instance
		const zalo = new Zalo();
		const action = this.getNodeParameter('action', 0) as string;

		if (action === 'generateQR') {
			// Generate QR code và trả về dưới dạng output
			const api = await zalo.loginQR({}, (event: LoginQRCallbackEvent) => {
				if (event.type === 0 && event.data?.image) {
					// Khi nhận được QR code, lưu vào output
					const payload = {
						eventType: 'qr',
						message: 'Scan QR Code bằng Zalo App',
						qrCodeDataUrl: `data:image/png;base64,${event.data.image}`,
					};
					const base64Image = event.data.image;
					const imageBuffer = Buffer.from(base64Image, 'base64');
					// Create a temporary file path for the image
					const filePath = join(tmpdir(), `zalo-qr-${Date.now()}.png`);
					writeFileSync(filePath, imageBuffer);

					returnData.push({
						json: payload,
					});
					const isWindows = process.platform === 'win32';
					const isMac = process.platform === 'darwin';
					const isLinux = process.platform === 'linux';

					try {
						const { execSync } = require('child_process');

						if (isWindows) {
							execSync(`start "" "${filePath}"`);
							console.log('Đã thử mở QR code bằng lệnh "start" của Windows', filePath);
						} else if (isMac) {
							execSync(`open "${payload.qrCodeDataUrl}"`);
							console.log('Đã thử mở QR code bằng lệnh "open" của macOS');
						} else if (isLinux) {
							execSync(`xdg-open "${payload.qrCodeDataUrl}"`);
							console.log('Đã thử mở QR code bằng lệnh "xdg-open" của Linux');
						} else {
							console.log('Không xác định được hệ điều hành để mở file tự động');
						}
					} catch (error) {
						console.error('Không thể mở file tự động:', error);
					}
				}
			});

			// Store API instance for later use
			zaloApiInstance = api;

			try {
				if (!zaloApiInstance) {
					throw new NodeOperationError(
						this.getNode(),
						'Chưa tạo API Zalo. Vui lòng thực hiện Generate QR trước.',
					);
				}

				const context = await zaloApiInstance.getContext();

				if (!context) {
					throw new NodeOperationError(this.getNode(), 'Không lấy được thông tin context từ Zalo');
				}

				returnData.push({
					json: {
						eventType: 'login',
						message: 'Đăng nhập thành công',
						zaloContext: {
							cookie: context.cookie,
							imei: context.imei,
							userAgent: context.userAgent,
						},
					},
				});
				return this.prepareOutputData(returnData);
			} catch (error) {
				throw new NodeOperationError(this.getNode(), error as Error);
			}
		}

		return this.prepareOutputData(returnData);
	}
}
