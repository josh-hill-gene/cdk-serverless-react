var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// services/node-lambda/hello.ts
__export(exports, {
  handler: () => handler
});
async function handler(event, context) {
  if (isAuthorized(event)) {
    return {
      statusCode: 200,
      body: JSON.stringify("You're authorized!")
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify("You're NOT authorized :(")
    };
  }
}
function isAuthorized(event) {
  var _a;
  const groups = (_a = event.requestContext.authorizer) == null ? void 0 : _a.claims["cognito:groups"];
  if (groups) {
    return groups.includes("admins");
  } else {
    return false;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
