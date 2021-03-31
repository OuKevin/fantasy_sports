import DocumentClient from './DocumentClient';

const handleFinalWeek = async (year) => {
  const params = {
    TableName: 'fantasy_completed_years',
    Item: {
      fantasy_year: year,
    },
  };

  return DocumentClient.put(params).promise();
};

export default handleFinalWeek;
