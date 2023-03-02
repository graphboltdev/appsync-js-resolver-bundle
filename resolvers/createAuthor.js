import { util } from '@aws-appsync/utils';
import { createItem, validateUser } from '../helpers';

export function request(ctx) {
  
  // add timestamps
  const item = createItem(ctx.args.author);
  // validate user
  validateUser(item);

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
