// resolvers/updateAuthor.js
import { util as util2 } from "@aws-appsync/utils";

// helpers.js
import { util } from "@aws-appsync/utils";
function validateUser(user) {
  if (user.age < 18) {
    util.appendError("User must be at least 18 years old");
  }
}
function generateUpdateExpressions(item) {
  const updateItem = {
    ...item,
    updatedAt: util.time.nowISO8601()
  };
  const updateExpression = [];
  const expressionNames = {};
  const expressionValues = {};
  for (const [key, value] of Object.entries(updateItem)) {
    updateExpression.push(`#${key} = :${key}`);
    expressionNames[`#${key}`] = key;
    expressionValues[`:${key}`] = util.dynamodb.toDynamoDB(value);
  }
  return {
    expression: `set ${updateExpression.join(", ")}`,
    expressionNames,
    expressionValues
  };
}

// resolvers/updateAuthor.js
function request(ctx) {
  const { id, ...author } = ctx.args.author;
  validateUser(author);
  return {
    operation: "UpdateItem",
    key: {
      id: util2.dynamodb.toDynamoDB(id)
    },
    update: generateUpdateExpressions(author),
    condition: {
      expression: "attribute_exists(#id)",
      expressionNames: {
        "#id": "id"
      }
    }
  };
}
function response(ctx) {
  ctx.stash.event = {
    DetailType: "postUpdated",
    Detail: JSON.stringify(ctx.result)
  };
  return ctx.result;
}
export {
  request,
  response
};
