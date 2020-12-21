import React, { ReactElement } from "react";
import { Container } from "@material-ui/core";

import Layout from "../components/Layout";
import Questions, { QuestionsProps } from "../components/Questions/Questions";
import useStyles from "../assets/jss/components/layout";

interface PlayProps {
  query: QuestionsProps;
}

function Play(props: PlayProps): ReactElement {
  const classes = useStyles();

  return (
    <Layout
      {...props}
      classes={classes}
      title="Play"
      url="https://quiz.timmo.dev/play"
      description="A Quiz Platform - Play">
      <Container className={classes.main} component="article" maxWidth="xl">
        <Questions {...props.query} />
      </Container>
    </Layout>
  );
}

Play.getInitialProps = async ({ query }) => {
  return { query };
};

export default Play;
