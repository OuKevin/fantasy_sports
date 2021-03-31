import DocumentClient from './DocumentClient';

const hasHandledFinalWeek = async (year) => {
  const params = {
    TableName: 'fantasy_completed_years',
    KeyConditionExpression: 'fantasy_year = :fantasy_year',
    ExpressionAttributeValues: { ':fantasy_year': year },
  };

  const { Items } = await DocumentClient.query(params).promise();

  return Items.length > 0;
};

export default hasHandledFinalWeek;
