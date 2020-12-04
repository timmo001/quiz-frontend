import React, { ReactElement } from "react";
import { GetStaticProps } from "next";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import useStyles from "../assets/jss/components/layout";

interface HomeProps {}

function Home(props: HomeProps): ReactElement {
  const classes = useStyles();

  return (
    <Layout
      {...props}
      classes={classes}
      title="Home"
      url="https://material-frontend-template.timmo.dev"
      description="A Frontend Template written using Material UI Next.js/React in TypeScript.">
      <Container className={classes.main} component="article" maxWidth="xl">
        <Card>
          <CardContent>
            <Typography color="textPrimary" component="div">
              <Markdown source="## Frontend" escapeHtml={false} />
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 1,
  };
};

export default Home;
