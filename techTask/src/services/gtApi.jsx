import axios from 'axios';

const path = 'http://pmdweb.ddns.net:666/';

export const getLanguages = async (codigo) => {
	try {
		
		const { data } = await axios.get(path + 'languages/' + codigo);
		return data;
	} catch (error) {
		console.log(error)
	}
}