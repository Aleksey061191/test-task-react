interface Params {
  nameInp: string;
  phone: string;
  message: string;
  email: string;
  date: string;
}

export const postInfo = async (params: Params) => {
  try {
    const rawResponse = await fetch('https://<your-app-name>.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const respons = await rawResponse.json();
    if (respons.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    throw Error(`Error ${err}`);
  }
};

export default postInfo;
