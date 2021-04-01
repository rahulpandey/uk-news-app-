import React from "react";
import NewsCom from "../app/modules/news";
import Head from "next/head";
const Index = () => {
  return (
    <>
      <Head>
        <title>Latest news</title>
      </Head>
      <NewsCom />
    </>
  );
};
export default Index;
