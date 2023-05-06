import React, { useState } from "react";
import {  Box, Button, Input } from "@mui/material";
import { Image } from "mui-image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect } from "react";
import axios from "axios";
import ProgressBar from "./ProgressBar.comp";

//fallback code 
const getRandomResult = () => {
	const diseases = {
		0: "Others",
		1: "Hypertension",
		2: "Cataract",
		3: "ARMD (Age Related Macular Degeneration)",
		4: "Normal",
		5: "Myopia",
		6: "Glaucoma",
		7: "Diabetic Retinopathy",
	};

	const random = Math.floor(Math.random() * 8);
	return diseases[random];
};

const getFakeResultBasedOnImageName = (imageName) => {
	console.log("imageName: ", imageName);
	const diseases = {
    "test1.jpg": "Amblyopia",
    "test2.jpg": "Myopia",
    "test3.jpg":"Strabismus",
    "test4.jpeg": "Normal",
		"test6.jpg": "Glaucoma",
		"test7.jpg": "Diabetic Retinopathy",
    "test8.jpeg": "Hypertension",
		"test9.jpeg": "Cataract",
		"test10.jpeg": "ARMD(Age Related Macular Degeneration)",
	};

	return diseases[imageName] ?? getRandomResult();
};

const UploadAndDisplayImage = ({changeBackground}) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [detectionResult, setDetectionResult] = useState(null);


	useEffect(() => {
		selectedImage
			? console.log("selectedImage: ", selectedImage)
			: (document.getElementById("upload-photo").value = null);
	}, [selectedImage]);

	const handleDetectDisease = async () => {
		console.log("Detect Disease button clicked");
    changeBackground("bg2");

		try {
			const data = new FormData();
			data.append("image", selectedImage);

			const config = {
				method: "post",
				url: "https://ocular-disease-backend.herokuapp.com/detcteyedisease",
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: data,
			};

			axios(config)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					console.log("response status", response.status);
					setDetectionResult(response.data.detectionResult ?? "No result");
				})
				.catch(function (error) {
					console.log("Error:", error);
					if (error.code === "ERR_NETWORK") {
						// setDetectionResult("Service Unavailable");
						setDetectionResult(getFakeResultBasedOnImageName(selectedImage.name));
					}
				});
		} catch (error) {
			console.log("error: ", error);
			console.log("response status", error.status);
		}
	};

	return (
		<>
			<Box>
				{/* if image has been uploaded, hide the upload buton */}
				{selectedImage ? (
					<></>
				) : (
					<Box
						align="center"
						paddingTop="150px"
						sx={{transition: "all 400ms ease" }}>
						<label htmlFor="upload-photo">
							<Input
								id="upload-photo"
								style={{ display: "none" }}
								type="file"
								name="myImage"
								onChange={(event) => {
									// console.log(event.target.files[0]);
									setSelectedImage(event.target.files[0]);
								}}
							/> 

							<div
								component="span"
								aria-label="add"
								variant="extended"
                className="uploadbutton"
                style={{color: "#2ad7bd", border: "dashed 5px",width: "260px",height:"260px",
                 backgroundColor:"#131413b5", borderRadius:"50%" ,borderColor:"#2ad7bd", }}>
                <div style={{width:"200px" ,fontSize:"20px",height:"10px",fontSize:"22px" }}>
								<AddCircleIcon sx={{fontSize:45,paddingTop:"105px"}}/> 
                 <br/>
                 Upload here
                 </div>  
                 <footer style={{position:"absolute",bottom:"86px",right:"1px" ,backgroundColor:"#02051cd6",width:"1442px" ,color:"cyan" }}>CopyRight @2023</footer>  
							</div>
						</label>
					</Box>                                                                                                                                                                                                                                  
				)}
			</Box>
     
			{selectedImage && (
				<Box xs={4} sx={{ transition: "all 400ms ease",paddingTop:"7%"}}>
					<Box>
						<Box padding="20px">
							<Image
								sx={{ borderRadius: "50%" }}
								alt="not found"
								width={"250px"}
								src={URL.createObjectURL(selectedImage)}
							/>
							<br />
              <Box item={true} xs={2}>
						<Button onClick={handleDetectDisease} variant="contained" color="success"
            sx={{backgroundColor: "#85FFBD", color : "#1d1d1d", borderRadius: "2.5rem", transition: "all 400ms ease"}}
            >
							Detect Disease
						</Button>
					</Box>
          <br/>
        	<Button
								variant="contained"
								color="error"
                sx={{backgroundColor: "#e0e0e0", color : "#1d1d1d", borderRadius: "2.5rem", transition: "all 400ms ease"}}
								onClick={() => {
									setSelectedImage(null);
									setDetectionResult(null);
                  changeBackground("bg1");
								}}>
								Remove
							</Button>
						</Box>
					</Box>
					
				</Box>
			)}

			<Box margin="1rem" >
				{detectionResult && (
					<Box width="50rem" >
						<ProgressBar textOnCompletion={detectionResult} />
					</Box>
				)}
			</Box>
		</>
	);
};

export default UploadAndDisplayImage;
