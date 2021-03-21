const config = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "product-shop-upload",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://oaz8blkgw0.execute-api.us-east-1.amazonaws.com/dev",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_ASP0I2SsT",
      APP_CLIENT_ID: "78r8c6kbq88jhogiiafj6lfl6k",
      IDENTITY_POOL_ID: "us-east-1:2bba25d2-4d1b-42c2-be86-73c2dbf43384",
    },
  };
  
  export default config;

  