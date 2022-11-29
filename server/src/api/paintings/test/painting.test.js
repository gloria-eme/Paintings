const axios = require('axios');

const getFirstPaintingName = async () => {
  const response = await axios.get('https://localhost:8080/api/paintings%27');
  return response.data[0].name;
};

const postPainting = async () => {
  const response = await axios.get('https://localhost:8080/api/paintings%27');
  return response.data[1].date;
};

jest.mock('axios');

test('returns the name of the first painting', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        name: 'La Gioconda',
        date: '1500s',
      },
      {
        name: 'Las Tres Gracias',
        date: '1639',
      },
    ],
  });

  const name = await getFirstPaintingName();
  expect(name).toEqual('La Gioconda');
});

test('post a new painting', async () => {
  axios.post.mockResolvedValue({
    data: [
      {
        name: 'La Gioconda',
        date: '1500s',
      },
      {
        name: 'Las Tres Gracias',
        date: '1639',
      },
    ],
  });

  const date = await postPainting();
  expect(date).toEqual('1639');
});
