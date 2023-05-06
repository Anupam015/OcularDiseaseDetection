import React from "react";
import { Container, Typography, Box } from "@mui/material";
import UploadAndDisplayImage from "./components/UploadAndDisplayImage.comp";
import { fontSize } from "@mui/system";
import ProgressBar from "./components/ProgressBar.comp";
import bg1 from "./backgrounds/background1.gif";
import bg2 from "./backgrounds/12_lge.gif";



const App = () => {
	const [background, setBackground] = React.useState(bg1);

	const handleChangeBackground = (name) => {
    console.log("backgroudn changed");
		if(name === "bg1") setBackground(bg1);
    else if(name === "bg2") setBackground(bg2);
	};

	return (
		<Container
			maxWidth="100"
			align="center"
			sx={{
				background: `url(${background})  no-repeat center center fixed`,
				backgroundSize: "cover",
        transition: "background 1s ease-in-out",
			}}>
			<Box
				sx={{
					marginTop: " -0.5rem",
					marginBottom: "-0.5rem",
					height: "100vh",
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-around",
					transition: "all 400ms ease",
				}}>
        <div style={{position:"absolute",top:"0px",right:"9px" ,backgroundColor:"rgb(2 5 28 / 63%)",width:"1442px",textAlign:"center" ,height:"110px" }}>
				<Typography variant="h3" color={"bisque"} sx={{ transition: "all 400ms ease",paddingTop:"35px",paddingLeft:"100px" }}>
					Ocular Eye Disease Detection
				</Typography>
        
        </div> 
				<UploadAndDisplayImage
					changeBackground={handleChangeBackground}
					sx={{ transition: "all 400ms ease",paddingTop:"50px" }}
				/>
			</Box>
		</Container>
   
	);
};
export default App;
