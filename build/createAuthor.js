// resolvers/createAuthor.js
import { util as util2 } from "@aws-appsync/utils";

// helpers.js
import { util } from "@aws-appsync/utils";
function createItem(item) {
  return {
    ...item,
    createdAt: util.time.nowISO8601(),
    updatedAt: util.time.nowISO8601()
  };
}
function validateUser(user) {
  if (user.age < 18) {
    util.appendError("User must be at least 18 years old");
  }
}

// resolvers/createAuthor.js
function request(ctx) {
  const item = createItem(ctx.args.author);
  validateUser(item);
  return {
    operation: "PutItem",
    key: {
      id: util2.dynamodb.toDynamoDB(util2.autoId())
    },
    attributeValues: util2.dynamodb.toMapValues(item)
  };
}
function response(ctx) {
  return ctx.result;
}
export {
  request,
  response
};
