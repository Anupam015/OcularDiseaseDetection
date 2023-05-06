import axios from "axios";

const detectDisease = (imageFile) => {
	const formData = new FormData();
	formData.append("image", imageFile);
	return axios.post("http://127.0.0.1:5000/detcteyedisease'", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export { detectDisease };
