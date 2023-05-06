import { Box, Grid, Button, Typography } from "@mui/material";
import React from "react";

const DetectDiseaseAndShowResults = (props) => {
	return (
		<Grid
			container
			spacing={2}
			direction="row"
			alignItems="center"
			margin="2rem"
      display="flex">
			<Grid item={true} xs={2}>
				<Button onClick={props.handleDetectDisease} variant="contained">
					Detect Disease
				</Button>
			</Grid>

			<Grid item={true} xs={1}>
				<Typography variant="h5" gutterBottom>
					Results
				</Typography>
			</Grid>
		</Grid>
	);
};

export default DetectDiseaseAndShowResults;
