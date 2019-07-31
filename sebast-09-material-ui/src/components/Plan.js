import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Plan = props => {
  console.log("Rendering the url");
  console.log(props.plan.fields.imageUrl);

  return (
    <div>
      {props.plan ? (
        <Card>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={props.plan.fields.imageUrl}
            title={props.plan.fields.placeName}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {props.plan.fields.placeName}
            </Typography>
            <Typography component="p">
              {props.plan.fields.placeDescription}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              href={props.plan.fields.placeUrl}
              target="_blank"
            >
              Go To Place
            </Button>
          </CardActions>
        </Card>
      ) : null}
    </div>
  );
};

export default Plan;
