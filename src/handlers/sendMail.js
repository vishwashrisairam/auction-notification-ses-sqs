import AWS from 'aws-sdk';

const ses = new AWS.SES({region : 'us-east-1'});

async function sendMail(event, context) {

  const record = event.Records[0];
  console.log('sendMail lambda',record);

  const email = JSON.parse(record.body)
  const {subject,body,recipient}  = email 

  const params = {
    Source : 'v.sairam123@yahoo.in',
    Destination : {
      ToAddresses : [recipient]
    },
    Message : {
      Body : {
        Text : {
          Data : body
        }
      },
      Subject : {
        Data : subject
      }
    }
  };

  try{
    const res = await ses.sendEmail(params).promise();
    console.log(res);
    return res;
  }catch(error){
    console.log(error);
  }
}

export const handler = sendMail;


