import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class MyappStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // creates new Dynamodb
    const table = new dynamodb.Table(this, "Table", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    // creates a new Lambda function that uses TypeScript (see myapp-stack.func.ts)
    const func = new lambdaNode.NodejsFunction(this, "func", {
      environment: { DYNAMO_TABLE_NAME: table.tableName },
    });

    // grants permission to the Lambda to write on the table
    table.grantWriteData(func);
  }
}
