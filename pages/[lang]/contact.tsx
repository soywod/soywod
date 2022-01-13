import {GetStaticProps} from "next";

export {getStaticPaths} from "../../_shared/i18n";
export const getStaticProps: GetStaticProps = () => {
  return {props: {}};
};

export {default} from "../../contact/_page";
