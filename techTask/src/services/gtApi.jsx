import axios from 'axios';

const path = 'http://pmdweb.ddns.net:666/';

export const getLanguages = async () => {
	try {
		
		const { data } = await axios.get(path + 'languages/');
		return data;
	} catch (error) {
		console.log(error)
	}
}
export const detectLanguage = async (toTranslate) => {
	try {
		
		const { data } = await axios.post(
			path + 'locate/',{"texto":toTranslate}
		);
			  return data
	} catch (error) {
		console.log(error)
	}
}
export const translateText = async (text,target) => {
	try {
		const { data } = await axios.post(path + 'translate/',{"texto":text,"target":target});
		return data;
	} catch (error) {
		console.log(error)
	}
}