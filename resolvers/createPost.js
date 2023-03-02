import { util } from '@aws-appsync/utils';
import { createItem } from '../helpers';

export function request(ctx) {
  
  // add timestamps
  const item = createItem(ctx.args.post);

  return {
    operation: 'PutItem',
    key: {
      id: util.dynamodb.toDynamoDB(util.autoId()),
    },
    attributeValues: util.dynamodb.toMapValues(item),
  };
}

export function response(ctx) {
  return ctx.result;
}
