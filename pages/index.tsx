import React, { ReactElement } from "react";
import { GetStaticProps } from "next";
import { Container } from "@material-ui/core";

import Layout from "../components/Layout";
import Questions from "../components/Questions/Questions";
import useStyles from "../assets/jss/components/layout";

interface HomeProps {}

function Home(props: HomeProps): ReactElement {
  const classes = useStyles();

  return (
    <Layout
      {...props}
      classes={classes}
      title="Home"
      url="https://quiz.timmo.dev"
      description="A Quiz.">
      <Container className={classes.main} component="article" maxWidth="xl">
        <Questions amount={10} />
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
