import { API, Zalo } from 'zca-js';
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
let api: API | undefined;

export class ZaloGetGroupInfo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Get Group Info',
		name: 'zaloGetGroupInfo',
		icon: 'file:zalo.svg',
		group: ['Zalo'],
		version: 2,
		description: 'Get group information from Zalo',
		defaults: {
			name: 'Zalo Get Group Info',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'zaloApi',
				required: true,
				displayName: 'Zalo Credential to connect with',
			},
        ],
		properties: [
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'string',
				default: '',
				description: 'The ID of the group to retrieve information for',
				required: true,
			},
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const inputs = this.getInputData();
		const zaloCred = await this.getCredentials("zaloApi");

        const cookieFromCred = JSON.parse(zaloCred.cookie as string);
        const imeiFromCred = zaloCred.imei as string;
        const userAgentFromCred = zaloCred.userAgent as string;

        const cookie = cookieFromCred ?? inputs.find((x) => x.json.cookie)?.json.cookie as any;
        const imei = imeiFromCred ?? inputs.find((x) => x.json.imei)?.json.imei as string;
        const userAgent = userAgentFromCred ?? inputs.find((x) => x.json.userAgent)?.json.userAgent as string;


		const zalo = new Zalo();
		const _api = await zalo.login({ cookie, imei, userAgent });
		api = _api;
		if (!api) {
			throw new NodeOperationError(
				this.getNode(),
				'No API instance found. Please make sure to provide valid credentials.',
			);
		}

		const groupId = this.getNodeParameter('groupId', 0) as string;
		try {
			this.logger.info(`Parameters before getting group: ${JSON.stringify(groupId)}`);

			const response = await api.getGroupInfo(groupId);
			this.logger.info(`Find successfully: ${JSON.stringify(groupId)}`);

			returnData.push({
				json: response,
			});
		} catch (error) {
			this.logger.error('Error in get Group:', { error });
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
