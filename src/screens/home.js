import React, { useEffect, useState } from "react";
// import Productcard from "../components/Productcard";
import LoadingBox from "../components/loadingBox";
// import MessagingBox from "../components/MessagingBox";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, userDetails } from "../components/actions/userActions";
import { Box, Button, Paper, Typography } from "@material-ui/core";

export default function Home() {
  const dispatch = useDispatch();

  const [buttonClicked, setButtonClicked] = useState(false);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDetail = useSelector((state) => state.userDetails);
  const { loading: userLoading, error: userError, user } = userDetail;

  useEffect(() => {
    dispatch(listUsers());
    console.log("user", user);
  }, [dispatch]);

  const handleClick = (id) => {
    dispatch(userDetails(id));
    setButtonClicked(true);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h2>Error Occured</h2>
      ) : (
        <div>
          <div>
            {buttonClicked ? (
              userLoading ? (
                <LoadingBox></LoadingBox>
              ) : (
                <Paper
                  style={{
                    padding: "10px",
                    maxWidth: "300px",
                    maxHeight: "450px",
                    minWidth: "150px",
                    minHeight: "250px",
                    margin: "10px auto",
                  }}
                  elevation={6}
                >
                  <Box width="100%" style={{ display: "block" }}>
                    <div style={{ justifyContent: "center", display: "flex" }}>
                      {" "}
                      <Typography noWrap variant="h5">
                        User Info
                      </Typography>
                    </div>

                    <div style={{ justifyContent: "center", display: "flex" }}>
                      <img size={100} src={user.avatar}></img>
                    </div>
                    <Paper
                      style={{
                        width: "90%",
                        margin: "20px auto",
                        padding: "10px",
                      }}
                      elevation={3}
                    >
                      <Box
                        width="100%"
                        style={{ display: "block", textAlign: "center" }}
                      >
                        <div>
                          {" "}
                          <Typography
                            style={{ marginBottom: "10px" }}
                            noWrap
                            variant="h7"
                          >
                            ID : {user.id}
                          </Typography>
                        </div>
                        <div>
                          {" "}
                          <Typography
                            style={{ marginBottom: "10px" }}
                            noWrap
                            variant="h7"
                          >
                            Email : {user.email}
                          </Typography>
                        </div>
                        <div>
                          {" "}
                          <Typography
                            style={{ marginBottom: "10px" }}
                            noWrap
                            variant="h7"
                          >
                            First Name : {user.first_name}
                          </Typography>
                        </div>
                        <div>
                          {" "}
                          <Typography
                            style={{ marginBottom: "10px" }}
                            noWrap
                            variant="h7"
                          >
                            Last Name : {user.last_name}
                          </Typography>
                        </div>
                      </Box>
                    </Paper>
                  </Box>
                </Paper>
              )
            ) : (
              <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Click button to fetch User Info !
              </h3>
            )}
          </div>
          <div className="homeButtons">
            {users?.map((i, index) => (
              <div>
                {" "}
                <Button
                  onClick={(e) => {
                    handleClick(i.id);
                  }}
                  variant="contained"
                  component="label"
                >
                  User {index + 1}
                </Button>
              </div>
              // id={i._id}
              // category={i.category}
              // title={i.title}
              // price={i.price}
              // image={i.image}
              // rating={i.rating}
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
