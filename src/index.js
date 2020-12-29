export default async (event, context, callback) => {
  try {
    const response = {
      statusCode: 200,
      body: 'Hello World',
    };

    callback(null, response);
  } catch (error) {
    callback(new Error('internal server error'));
  }
};
