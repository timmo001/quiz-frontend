import React, { ReactElement } from "react";
import { Container } from "@material-ui/core";

import Layout from "../components/Layout";
import Setup from "../components/Setup";
import useStyles from "../assets/jss/components/layout";

interface HomeProps {
  query: {};
}

function Home(props: HomeProps): ReactElement {
  const classes = useStyles();

  return (
    <Layout
      {...props}
      classes={classes}
      title="Home"
      url="https://quiz.timmo.dev"
      description="A Quiz Platform">
      <Container className={classes.main} component="article" maxWidth="xl">
        <Setup />
      </Container>
    </Layout>
  );
}

Home.getInitialProps = async ({ query }) => {
  return { query };
};

export default Home;
