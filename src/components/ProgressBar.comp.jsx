import * as React from "react";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" {...props} sx={{ color: "green" }} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="white">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

const ProgressBar = ({ textOnCompletion }) => {
	const [progress, setProgress] = React.useState(10);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
		}, 1200);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Box sx={{ width: "100%" }}>
			{progress === 100 ? (
				<Typography variant="h3" className="result-text">
					{textOnCompletion}
				</Typography>
			) : (
				<LinearProgressWithLabel style={{padding: "10px", borderRadius : "10px"}} color="success" value={progress} />
			)}
		</Box>
	);
};

export default ProgressBar;
