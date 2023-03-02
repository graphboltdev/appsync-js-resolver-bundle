// resolvers/createPost.js
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

// resolvers/createPost.js
function request(ctx) {
  const item = createItem(ctx.args.post);
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
