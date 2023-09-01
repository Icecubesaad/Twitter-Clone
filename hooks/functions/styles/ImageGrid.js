const getting_image_grid_styles = (amount,setImageGrid) => {
  if (amount === 1) {
    setImageGrid({
      main: {
        display: "flex",
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
      },
      Left: {
        display: "flex",
        width: "100%",
        height: "250px",
        justifyContent: "center",
        alignItems: "center",
      },
    });
  }
  if (amount === 2) {
    setImageGrid({
      main: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        width: "80%",
      },
      Left: {
        display: "flex",
        width: "100%",
        height: "250px",
      },
      Right: {
        display: "flex",
        width: "100%",
        height: "250px",
      },
    });
  }
  if (amount === 3) {
    setImageGrid({
      main: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        width: "80%",
        columnGap: "20px",
      },
      Right: {
        display: "grid",
        gridTemplateRows: "repeat(2,1fr)",
        width: "100%",
        height: "200px",
      },
    });
  }
  if (amount === 4) {
    setImageGrid({
      main: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        width: "80%",
      },
      Left: {
        display: "grid",
        gridTemplateRows: "repeat(2,1fr)",
        width: "100%",
        height: "250px",
      },
      Right: {
        display: "grid",
        gridTemplateRows: "repeat(2,1fr)",
        width: "100%",
        height: "250px",
      },
    });
  }
};
export default getting_image_grid_styles
