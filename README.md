
## AWS require polices

###  common polices
test

```JSON
{
      ”Version”: ”2008-10-17”,
      ”Id”:”__default_policy_ID”,
      ”Statement”: [
          {
              ”Sid”: ”allow s3 to send notification messages to SQS queue”,
              ”Effect”: ”Allow”,
              ”Principal”: {
                ”Service”: ”s3.amazonaws.com”
              },
              ”Action”: ”SQS:SendMessage”,
              ”Resource”: ”${sqsArn}”,
              ”Condition”: {
                ”ArnLike”: {
                  ”aws:SourceArn”: ”arn:aws:s3:*:*:${bucketName}”
                }
              }
          },
          {
                ”Sid”: ”allow specific role to read/delete/change visibility of SQS messages and get queue url”,
                ”Effect”: ”Allow”,
                ”Principal”: {
                  ”AWS”: ”${roleArn}”
                },
                ”Action”: [
                  ”SQS:ChangeMessageVisibility”,
                  ”SQS:DeleteMessage”,
                  ”SQS:ReceiveMessage”,
                  ”SQS:GetQueueUrl”
                ],
                ”Resource”: ”${sqsArn}”
             }
         ]
      }
```
