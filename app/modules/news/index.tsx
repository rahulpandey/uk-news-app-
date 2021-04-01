import React from "react";
import ApiRequest from "../utils";
import { News, Article } from "../../type/entity";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NewsCard from "./new-items";
import SearchAppBar from "../../components/app-bar";
import useDebounce from "../utils/debounce";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
    },
  })
);
const NewsCom = () => {
  const [newsArticles, setNewsArticles] = React.useState<Article[]>();
  const [searchText, setSearchText] = React.useState<string>();
  const classes = useStyles();

  const [isSearching, setIsSearching] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const getNews = React.useCallback(async (path: string) => {
    try {
      const news = await ApiRequest.request<News>({ path });
      setNewsArticles([...news.articles]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  }, []);
  React.useEffect(() => {
    if (debouncedSearchTerm) {
      setNewsArticles([]);
      setIsSearching(true);
      getNews("search?q=" + debouncedSearchTerm);
    } else {
      setNewsArticles([]);
      getNews("top-headlines");
    }
  }, [debouncedSearchTerm, getNews]);
  React.useEffect(() => {
    getNews("top-headlines");
  }, [getNews]);

  return (
    <div className={classes.root}>
      <SearchAppBar
        value={searchText}
        onChange={setSearchText}
        showIndicator={isSearching}
      />
      <Grid container style={{ padding: "8px" }}>
        {newsArticles &&
          newsArticles.map((item, index) => (
            <Grid
              item={true}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              key={index.toString()}
            >
              <NewsCard article={item} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default NewsCom;
