import { util } from '@aws-appsync/utils';
import { generateUpdateExpressions, validateUser } from '../helpers';

export function request(ctx) {
  const { id, ...author } = ctx.args.author;

  validateUser(author)

  return {
    operation: 'UpdateItem',
    key: {
      id: util.dynamodb.toDynamoDB(id),
    },
    update: generateUpdateExpressions(author),
    condition: {
      expression: 'attribute_exists(#id)',
      expressionNames: {
        '#id': 'id',
      },
    },
  };
}

export function response(ctx) {
  ctx.stash.event = {
    DetailType: 'postUpdated',
    Detail: JSON.stringify(ctx.result),
  };
  return ctx.result;
}
