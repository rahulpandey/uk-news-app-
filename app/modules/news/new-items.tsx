import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Article } from "../../type/entity";
import { useRouter } from "next/router";
const useStyles = makeStyles({
  root: {
    height: "auto",
    width: "95%",
    margin: 8,
  },
  media: {
    height: 240,
  },
});
interface IPros {
  article: Article;
}
const NewsCard: React.FC<IPros> = ({ article }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card className={classes.root} onClick={() => router.push(article.url)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={article.urlToImage}
          title={article.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            color="textPrimary"
            component="p"
          >
            {article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default NewsCard;
