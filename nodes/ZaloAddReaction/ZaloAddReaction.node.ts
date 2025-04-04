import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import { Zalo } from 'zca-js';
export class ZaloAddReaction implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Add Reaction',
		name: 'zaloAddReaction',
		icon: 'file:zalo.svg',
		group: ['Zalo'],
		version: 2,
		description: 'Adds a reaction to a Zalo message',
		defaults: {
			name: 'Zalo Add Reaction',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Message Content',
				name: 'content',
				type: 'string',
				default: '',
				required: true,
				description: 'The content of the message to add the reaction to',
			},
			{
				displayName: 'Reaction',
				name: 'reaction',
				type: 'options',
				options: [
					{
					  name: 'Angry',
					  value: 'ANGRY',
					},
					{
					  name: 'Cry',
					  value: 'CRY',
					},
					{
					  name: 'Haha',
					  value: 'HAHA',
					},
					{
					  name: 'Heart',
					  value: 'HEART',
					},
					{
					  name: 'Like',
					  value: 'LIKE',
					},
					{
					  name: 'None',
					  value: 'NONE',
					},
					{
					  name: 'Wow',
					  value: 'WOW',
					},
				  ],				  
				default: 'LIKE',
				required: true,
				description: 'The reaction to add',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];

		const inputs = this.getInputData();
		const cookie = inputs.find((x: any) => x.json.cookie)?.json.cookie as any;
		const imei = inputs.find((x: any) => x.json.imei)?.json.imei as string;
		const userAgent = inputs.find((x: any) => x.json.userAgent)?.json.userAgent as string;

		if (!cookie || !imei || !userAgent) {
			throw new NodeOperationError(this.getNode(), 'Cookie, IMEI, and User Agent are required.');
		}

		const zalo = new Zalo();
		const _api = await zalo.login({ cookie, imei, userAgent });
		const api = _api;

		if (!api) {
			throw new NodeOperationError(
				this.getNode(),
				'No API instance found. Please make sure to provide valid credentials.',
			);
		}

		const content = this.getNodeParameter('content', 0) as string;
		const reaction = this.getNodeParameter('reaction', 0)?.valueOf() as string;
		enum Reactions {
			HEART = '/-heart',
			LIKE = '/-strong',
			HAHA = ':>',
			WOW = ':o',
			CRY = ':-((',
			ANGRY = ':-h',
			KISS = ':-*',
			TEARS_OF_JOY = ":')",
			SHIT = '/-shit',
			ROSE = '/-rose',
			BROKEN_HEART = '/-break',
			DISLIKE = '/-weak',
			LOVE = ';xx',
			CONFUSED = ';-/',
			WINK = ';-)',
			FADE = '/-fade',
			SUN = '/-li',
			BIRTHDAY = '/-bd',
			BOMB = '/-bome',
			OK = '/-ok',
			PEACE = '/-v',
			THANKS = '/-thanks',
			PUNCH = '/-punch',
			SHARE = '/-share',
			PRAY = '_()_',
			NO = '/-no',
			BAD = '/-bad',
			LOVE_YOU = '/-loveu',
			SAD = '--b',
			VERY_SAD = ':((',
			COOL = 'x-)',
			NERD = '8-)',
			BIG_SMILE = ';-d',
			SUNGLASSES = 'b-)',
			NEUTRAL = ':--|',
			SAD_FACE = 'p-(',
			BYE = ':-bye',
			SLEEPY = '|-)',
			WIPE = ':wipe',
			DIG = ':-dig',
			ANGUISH = '&-(',
			HANDCLAP = ':handclap',
			ANGRY_FACE = '>-|',
			F_CHAIR = ':-f',
			L_CHAIR = ':-l',
			R_CHAIR = ':-r',
			SILENT = ';-x',
			SURPRISE = ':-o',
			EMBARRASSED = ';-s',
			AFRAID = ';-a',
			SAD2 = ':-<',
			BIG_LAUGH = ':))',
			RICH = '$-)',
			BEER = '/-beer',
			NONE = '',
		}

		try {
			if (!reaction || !(reaction in Reactions)) {
				throw new NodeOperationError(this.getNode(), { itemIndex: 0 });
			}

			// Call the API to add the reaction
			//const reactionValue = Reactions[reaction as keyof typeof Reactions];

			// 4. Call the API with the Enum Value
			//const response = await api.addReaction(reactionValue, content);
			// console.log(response);

			returnData.push({
				json: {
					message: 'Reaction added successfully!',
					messageId: content,
					reaction: reaction,
				},
			});
		} catch (error) {
			throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: 0 });
		}

		return [returnData];
	}
}
