import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import { API, Zalo } from 'zca-js';
let api: API | undefined;

export class ZaloAcceptFriendRequest implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Accept Friend Request (Cookie)',
		name: 'zaloAcceptFriendRequest',
		icon: 'file:zalo.svg',
		group: ['Zalo'],
		version: 2,
		description: 'Chấp nhận lời mời kết bạn qua API Zalo sử dụng kết nối đăng nhập bằng cookie',
		defaults: {
			name: 'Zalo Accept Friend Request (Cookie)',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của người dùng cần chấp nhận lời mời kết bạn',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const inputs = this.getInputData();
		const cookie = inputs.find((x: any) => x.json.cookie)?.json.cookie as any;
		const imei = inputs.find((x: any) => x.json.imei)?.json.imei as string;
		const userAgent = inputs.find((x: any) => x.json.userAgent)?.json.userAgent as string;

		const zalo = new Zalo();
		const _api = await zalo.login({ cookie, imei, userAgent });
		api = _api;
		if (!api) {
			throw new NodeOperationError(
				this.getNode(),
				'No API instance found. Please make sure to provide valid credentials.',
			);
		}

		const userId = this.getNodeParameter('userId', 0) as string;
		const meta = { userId };
		try {
			this.logger.info(`Parameters before accepting friend request: ${JSON.stringify(meta)}`);

			const response = await api.acceptFriendRequest(userId);

			this.logger.info('Friend request accepted successfully', { response });
			returnData.push({
				json: {},
			});
		} catch (error) {
			this.logger.error('Error in acceptFriendRequest:', { error });
			if ((error as any).response) {
				this.logger.error('Error response:', { response: (error as any).response });
			}
			if ((error as any).stack) {
				this.logger.error('Error stack:', { stack: (error as any).stack });
			}
			throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: 0 });
		}

		return [returnData];
	}
}
