import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      pickupId: uuid.v1(),
      firstName: data.content.firstName,
      lastName: data.content.lastName,
      phone: data.content.phone,
      phone2: data.content.phone2,
      address1: data.content.address1,
      address2: data.content.address2,
      pickupType: data.content.pickupType,
      pickupDescription: data.content.pickupDescription,
      dropoffLocation: data.content.dropoffLocation,
      volunteers: data.content.volunteers,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
