import type { IEmailMessageHistory, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IEmailMessageHistoryModel } from '@rocket.chat/model-typings';
import type { Collection, Db, InsertOneWriteOpResult, WithId, IndexSpecification } from 'mongodb';
import { getCollectionName } from '@rocket.chat/models';

import { BaseRaw } from './BaseRaw';

export class EmailMessageHistoryRaw extends BaseRaw<IEmailMessageHistory> implements IEmailMessageHistoryModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IEmailMessageHistory>>) {
		super(db, getCollectionName('email_message_history'), trash);
	}

	protected modelIndexes(): IndexSpecification[] {
		return [{ key: { createdAt: 1 }, expireAfterSeconds: 60 * 60 * 24 }];
	}

	async create({ _id, email }: IEmailMessageHistory): Promise<InsertOneWriteOpResult<WithId<IEmailMessageHistory>>> {
		return this.insertOne({
			_id,
			email,
			createdAt: new Date(),
		});
	}
}
