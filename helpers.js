import { util } from '@aws-appsync/utils';

export function updateItem(item) {
  return {
    updatedAt: util.time.nowISO8601(),
  };
}

export function createItem(item) {
  return {
    ...item,
    createdAt: util.time.nowISO8601(),
    updatedAt: util.time.nowISO8601(),
  };
}

export function validateUser(user) {
  if (user.age < 18) {
    util.appendError('User must be at least 18 years old');
  }
}

export function generateUpdateExpressions(item) {
  const updateItem = {
    ...item,
    updatedAt: util.time.nowISO8601(),
  }

  const updateExpression = [];
  const expressionNames = {};
  const expressionValues = {};

  for (const [key, value] of Object.entries(updateItem)) {
    updateExpression.push(`#${key} = :${key}`);
    expressionNames[`#${key}`] = key;
    expressionValues[`:${key}`] = util.dynamodb.toDynamoDB(value);
  }

  return {
    expression: `set ${updateExpression.join(', ')}`,
    expressionNames,
    expressionValues,
  }
}
