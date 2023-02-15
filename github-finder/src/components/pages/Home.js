import React, { Fragment } from "react";
import Users from "../users/Users";
import Search from "../users/Search";

export default function Home() {
  return (
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
}
